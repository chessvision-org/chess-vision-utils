/**
 * Parse a full FEN record, edit the board with the pure board helpers, and
 * serialize it back to a canonical FEN string.
 *
 *   npx tsx examples/edit-position.ts
 */
import {
  parseFENRecord,
  buildFENRecord,
  toggleActiveColor,
  movePiece,
  materialBalance,
  findKing,
  STARTING_FEN,
} from '../src/index.js';

// Parse all six fields of the starting position.
const record = parseFENRecord(STARTING_FEN);
console.log('Side to move:', record.activeColor);
console.log('White king on:', findKing(record.board, 'w'));

// Play 1. e4 by moving the pawn — board helpers never mutate their input.
const afterE4 = movePiece(record.board, 'e2', 'e4');

// Build the new record: it's now Black to move.
const next = toggleActiveColor({ ...record, board: afterE4, fullmove: 1 });
console.log('FEN after 1. e4:', buildFENRecord(next));

// Material balance is still even (positive = White ahead).
console.log('Material balance:', materialBalance(afterE4));
