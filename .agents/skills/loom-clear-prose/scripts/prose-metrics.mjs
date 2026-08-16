#!/usr/bin/env node

import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';

const [, , inputPath, requestedSection = 'both'] = process.argv;
const validSections = new Set(['story', 'significance', 'both']);

if (!inputPath || !validSections.has(requestedSection)) {
  console.error(
    'Usage: node prose-metrics.mjs <lesson-file|text-file> [story|significance|both]',
  );
  process.exit(1);
}

const source = fs.readFileSync(inputPath, 'utf8');

function extractLesson(text) {
  let lesson;
  const context = vm.createContext({
    LOOM: {
      lesson(value) {
        lesson = value;
      },
    },
  });

  vm.runInContext(text, context, {
    filename: path.resolve(inputPath),
    timeout: 1_000,
  });
  return lesson;
}

function normalizeText(text) {
  return text
    .replace(/\[\^[^\]]+\]/g, '')
    .replace(/\s+/g, ' ')
    .trim();
}

function words(text) {
  return normalizeText(text).match(/[\p{L}\p{N}]+(?:['’][\p{L}\p{N}]+)*/gu) ?? [];
}

function sentences(text) {
  const segmenter = new Intl.Segmenter('en', { granularity: 'sentence' });
  return [...segmenter.segment(normalizeText(text))]
    .map(({ segment }) => segment.trim())
    .filter((segment) => /[\p{L}\p{N}]/u.test(segment));
}

function percentile(values, fraction) {
  if (values.length === 0) return 0;
  const sorted = [...values].sort((a, b) => a - b);
  const index = Math.min(sorted.length - 1, Math.ceil(sorted.length * fraction) - 1);
  return sorted[index];
}

function fixed(value) {
  return Number.isInteger(value) ? String(value) : value.toFixed(1);
}

function report(label, paragraphs) {
  const cleanParagraphs = paragraphs.map(normalizeText).filter(Boolean);
  const allText = cleanParagraphs.join(' ');
  const sentenceLengths = sentences(allText).map((sentence) => words(sentence).length);
  const paragraphLengths = cleanParagraphs.map((paragraph) => words(paragraph).length);
  const totalWords = words(allText).length;
  const longCount = sentenceLengths.filter((length) => length > 35).length;
  const shortCount = sentenceLengths.filter((length) => length <= 10).length;
  const average = (values) =>
    values.length === 0 ? 0 : values.reduce((sum, value) => sum + value, 0) / values.length;

  console.log(`\n${label}`);
  console.log(`  words: ${totalWords}`);
  console.log(`  paragraphs: ${paragraphLengths.length}`);
  console.log(`  sentences: ${sentenceLengths.length}`);
  console.log(
    `  sentence words: avg ${fixed(average(sentenceLengths))}, median ${percentile(sentenceLengths, 0.5)}, p90 ${percentile(sentenceLengths, 0.9)}, max ${Math.max(0, ...sentenceLengths)}`,
  );
  console.log(
    `  recovery sentences (10 words or fewer): ${shortCount} (${fixed(sentenceLengths.length ? (shortCount / sentenceLengths.length) * 100 : 0)}%)`,
  );
  console.log(
    `  pressure sentences (over 35 words): ${longCount} (${fixed(sentenceLengths.length ? (longCount / sentenceLengths.length) * 100 : 0)}%)`,
  );
  console.log(
    `  paragraph words: avg ${fixed(average(paragraphLengths))}, median ${percentile(paragraphLengths, 0.5)}, p90 ${percentile(paragraphLengths, 0.9)}, max ${Math.max(0, ...paragraphLengths)}`,
  );
}

if (path.extname(inputPath) === '.js') {
  const lesson = extractLesson(source);
  if (!lesson) {
    throw new Error(`No LOOM.lesson(...) payload found in ${inputPath}`);
  }

  for (const section of ['story', 'significance']) {
    if (requestedSection === 'both' || requestedSection === section) {
      if (!Array.isArray(lesson[section])) {
        throw new Error(`Lesson has no ${section} array`);
      }
      report(section, lesson[section]);
    }
  }
} else {
  report('text', source.split(/\n\s*\n/));
}
