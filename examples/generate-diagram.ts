/**
 * Render a FEN string to a self-contained SVG diagram and write it to disk.
 *
 *   npx tsx examples/generate-diagram.ts
 */
import { writeFileSync } from 'node:fs';
import { generateDiagram, STARTING_FEN, getBoardTheme } from '../src/index.js';

const theme = getBoardTheme('ocean')!;

const svg = generateDiagram({
  fen: STARTING_FEN,
  size: 480,
  showCoords: true,
  showFrame: true,
  lightSquare: theme.light,
  darkSquare: theme.dark,
  label: 'Starting position',
});

const outFile = 'starting-position.svg';
writeFileSync(outFile, svg);

console.log(`Wrote ${outFile} (${svg.length} bytes) using the "${theme.name}" theme.`);
