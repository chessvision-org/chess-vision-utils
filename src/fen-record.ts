import { parseFEN, boardToFEN, FENParseError, type BoardMatrix } from './fen.js';

/** Side to move in a chess position. */
export type ActiveColor = 'w' | 'b';

/**
 * A fully parsed FEN record — all six fields of a standard FEN string.
 *
 * @see https://en.wikipedia.org/wiki/Forsyth%E2%80%93Edwards_Notation
 */
export interface FENRecord {
  /** Piece placement as an 8×8 matrix (rank 8 first). */
  board: BoardMatrix;
  /** Side to move. */
  activeColor: ActiveColor;
  /** Castling availability, e.g. `'KQkq'`, or `'-'` if none. */
  castling: string;
  /** En passant target square, e.g. `'e3'`, or `'-'` if none. */
  enPassant: string;
  /** Halfmove clock (moves since last capture or pawn advance). */
  halfmove: number;
  /** Fullmove number (starts at 1, increments after Black's move). */
  fullmove: number;
}

const CASTLING_RE = /^(-|[KQkq]{1,4})$/;
const EN_PASSANT_RE = /^(-|[a-h][36])$/;

/**
 * Parses a complete FEN string into its six structured fields.
 *
 * Unlike {@link parseFEN}, which returns only the board, this parses the full
 * record including side to move, castling rights, en passant target, and clocks.
 * Missing trailing fields are filled with standard defaults
 * (`w`, `-`, `-`, `0`, `1`) so that piece-placement-only strings parse too.
 *
 * @param fen - Full or partial FEN string.
 * @returns The parsed {@link FENRecord}.
 * @throws {FENParseError} If any present field is malformed.
 */
export function parseFENRecord(fen: string): FENRecord {
  if (!fen || typeof fen !== 'string') throw new FENParseError('Invalid FEN string');

  const parts = fen.trim().split(/\s+/);
  const [
    placement,
    activeColor = 'w',
    castling = '-',
    enPassant = '-',
    halfmoveRaw = '0',
    fullmoveRaw = '1',
  ] = parts;

  const board = parseFEN(placement ?? '');

  if (activeColor !== 'w' && activeColor !== 'b')
    throw new FENParseError(`Invalid active color '${activeColor}'`);

  if (!CASTLING_RE.test(castling))
    throw new FENParseError(`Invalid castling field '${castling}'`);
  if (castling !== '-' && new Set(castling).size !== castling.length)
    throw new FENParseError('Castling field contains duplicate characters');

  if (!EN_PASSANT_RE.test(enPassant))
    throw new FENParseError(`Invalid en passant square '${enPassant}'`);

  if (!/^\d+$/.test(halfmoveRaw))
    throw new FENParseError(`Invalid halfmove clock '${halfmoveRaw}'`);
  if (!/^\d+$/.test(fullmoveRaw))
    throw new FENParseError(`Invalid fullmove number '${fullmoveRaw}'`);

  const halfmove = parseInt(halfmoveRaw, 10);
  const fullmove = parseInt(fullmoveRaw, 10);
  if (fullmove < 1) throw new FENParseError('Fullmove number must be at least 1');

  return { board, activeColor, castling, enPassant, halfmove, fullmove };
}

/**
 * Serializes a {@link FENRecord} back into a canonical six-field FEN string.
 *
 * @param record - The record to serialize. Any subset of metadata fields may be
 *   omitted; standard defaults are applied for those left out.
 * @returns A full FEN string.
 */
export function buildFENRecord(record: Partial<FENRecord> & { board: BoardMatrix }): string {
  const {
    board,
    activeColor = 'w',
    castling = '-',
    enPassant = '-',
    halfmove = 0,
    fullmove = 1,
  } = record;
  return `${boardToFEN(board)} ${activeColor} ${castling} ${enPassant} ${halfmove} ${fullmove}`;
}

/**
 * Returns a new FEN record with the side to move toggled.
 * Pure — does not mutate the input.
 */
export function toggleActiveColor(record: FENRecord): FENRecord {
  return { ...record, activeColor: record.activeColor === 'w' ? 'b' : 'w' };
}

/**
 * Extracts only the piece-placement field from a full FEN string.
 * Returns the input trimmed if it has no whitespace.
 */
export function fenPlacementField(fen: string): string {
  return (fen ?? '').trim().split(/\s+/)[0] ?? '';
}

/**
 * Normalizes a FEN string to its canonical six-field form, filling defaults
 * for any missing metadata. Throws if the placement field is invalid.
 */
export function normalizeFEN(fen: string): string {
  return buildFENRecord(parseFENRecord(fen));
}
