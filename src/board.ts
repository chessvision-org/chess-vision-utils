import { type BoardMatrix, type PieceSymbol } from './fen.js';
import { squareToIndices, indicesToSquare } from './coordinates.js';

/** A square reference: either algebraic (`'e4'`) or `[row, col]` matrix indices. */
export type SquareRef = string | readonly [number, number];

function resolve(square: SquareRef): [number, number] | null {
  if (typeof square === 'string') return squareToIndices(square);
  const [row, col] = square;
  if (row < 0 || row > 7 || col < 0 || col > 7) return null;
  return [row, col];
}

/** Returns a deep copy of a board matrix. Safe to mutate the result. */
export function cloneBoard(board: BoardMatrix): BoardMatrix {
  return board.map((row) => [...row]);
}

/**
 * Returns the piece on a square, or `''` for an empty square and `null` for an
 * out-of-range reference.
 */
export function getPieceAt(board: BoardMatrix, square: SquareRef): PieceSymbol | null {
  const idx = resolve(square);
  if (!idx) return null;
  return board[idx[0]]?.[idx[1]] ?? null;
}

/**
 * Returns a new board with `piece` placed on `square`. Pure — the input board
 * is not mutated. An out-of-range square returns the board unchanged.
 */
export function setPieceAt(board: BoardMatrix, square: SquareRef, piece: PieceSymbol): BoardMatrix {
  const idx = resolve(square);
  if (!idx) return board;
  const next = cloneBoard(board);
  const row = next[idx[0]];
  if (row) row[idx[1]] = piece;
  return next;
}

/** Returns a new board with `square` cleared. Pure. */
export function removePieceAt(board: BoardMatrix, square: SquareRef): BoardMatrix {
  return setPieceAt(board, square, '');
}

/**
 * Returns a new board with the piece moved from `from` to `to`, overwriting any
 * piece on the destination. Pure. No-ops if `from` is empty or either ref is
 * out of range.
 */
export function movePiece(board: BoardMatrix, from: SquareRef, to: SquareRef): BoardMatrix {
  const piece = getPieceAt(board, from);
  if (!piece) return board;
  const cleared = removePieceAt(board, from);
  return setPieceAt(cleared, to, piece);
}

/**
 * Returns a new board rotated 180° (equivalent to viewing it from the other
 * side). Pure.
 */
export function flipBoard(board: BoardMatrix): BoardMatrix {
  return board.map((row) => [...row].reverse()).reverse();
}

/** A piece on a specific square. */
export interface PiecePlacement {
  square: string;
  piece: PieceSymbol;
}

/** Lists every occupied square with its piece, in reading order (a8 → h1). */
export function listPieces(board: BoardMatrix): PiecePlacement[] {
  const out: PiecePlacement[] = [];
  for (let row = 0; row < 8; row++) {
    for (let col = 0; col < 8; col++) {
      const piece = board[row]?.[col];
      if (piece) out.push({ square: indicesToSquare(row, col), piece });
    }
  }
  return out;
}

/** Counts how many pieces of each symbol are on the board. */
export function countPieces(board: BoardMatrix): Record<string, number> {
  const counts: Record<string, number> = {};
  for (const row of board) {
    for (const piece of row) {
      if (piece) counts[piece] = (counts[piece] ?? 0) + 1;
    }
  }
  return counts;
}

const MATERIAL_VALUES: Record<string, number> = {
  p: 1, n: 3, b: 3, r: 5, q: 9, k: 0,
};

/** Material balance from White's perspective (positive = White ahead). */
export function materialBalance(board: BoardMatrix): number {
  let balance = 0;
  for (const row of board) {
    for (const piece of row) {
      if (!piece) continue;
      const value = MATERIAL_VALUES[piece.toLowerCase()] ?? 0;
      balance += piece === piece.toUpperCase() ? value : -value;
    }
  }
  return balance;
}

/** Finds the square of the king of the given color, or `null` if absent. */
export function findKing(board: BoardMatrix, color: 'w' | 'b'): string | null {
  const target = color === 'w' ? 'K' : 'k';
  for (let row = 0; row < 8; row++) {
    for (let col = 0; col < 8; col++) {
      if (board[row]?.[col] === target) return indicesToSquare(row, col);
    }
  }
  return null;
}

/**
 * Checks that the board has exactly one king of each color — the minimum
 * legality requirement for a renderable position.
 */
export function hasBothKings(board: BoardMatrix): boolean {
  const counts = countPieces(board);
  return counts['K'] === 1 && counts['k'] === 1;
}
