# Loom

*A cartographer's atlas of why the world is the way it is.*

Loom is a personal course in world history shaped as a knowledge graph: 129
turning points from the first spark of symbolic thought to the present,
drawn on one parchment chart. The whole chart sits between two worlds: an
engraved map of the earth below the oldest era and another above the newest,
so history reads as something that rises out of the ground and arrives back
at it. Time rises from the bottom; the world's regions run left to right;
four pigment threads tie every age together:

- **Lapis** — ideas & belief
- **Oxblood** — power & institutions
- **Gilt** — wealth & exchange
- **Verdigris** — craft & science

Every node is connected to what it grew from and what it led to, each wire
labeled with *why*. Nodes with a solid ring hold a lesson: ten minutes of
story told from inside a life, then the view from above, then the threads
outward, then five questions, two of which deliberately reach back to nodes
you've already read (that's the learning model: new knowledge tied to known).
Finish a lesson, press the seal, and the node turns gold.

The main sequence reads bottom to top, but **Paths** offers the other routes:
follow a single thread across all of history as a thematic course, or start
from a feature of today ("why is the world carved into sovereign states?")
and walk backward down the wires that made it.

## Run it

Open `index.html` in a browser, or:

```
python3 -m http.server 4173
```

Progress lives in your browser's localStorage. No accounts, no network, no build.

## Grow it

The graph ships complete, but most nodes are uncharted seeds awaiting prose.
From this folder, in Claude Code:

```
forge trap-of-seeds      # one node (the dossier shows each node's command)
forge era 2              # a whole era, written by parallel agents
```

The style contract lives in `docs/forge-spec.md`; `node scripts/check.mjs`
is the gate that keeps the atlas honest (graph integrity, word budgets,
callback direction, and the no-em-dash rule).
