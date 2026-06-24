import { BOARD_THEMES, PIECE_SETS, PIECE_SET_POPULARITY, QUALITY_PRESETS, type BoardTheme, type PieceSet, type QualityPreset } from './constants.js';
import { bestTextColor, contrastRatio } from './colors.js';

/** Looks up a board theme by id, or `null` if no such theme exists. */
export function getBoardTheme(id: string): BoardTheme | null {
  return BOARD_THEMES[id] ?? null;
}

/** All board theme ids. */
export function listThemeIds(): string[] {
  return Object.keys(BOARD_THEMES);
}

/** Looks up a piece set by id, or `null` if not found. */
export function getPieceSet(id: string): PieceSet | null {
  return PIECE_SETS.find((set) => set.id === id) ?? null;
}

/**
 * Returns the piece sets ordered by curated popularity. Any sets not listed in
 * {@link PIECE_SET_POPULARITY} are appended in their original order.
 */
export function pieceSetsByPopularity(): PieceSet[] {
  const rank = new Map(PIECE_SET_POPULARITY.map((id, i) => [id, i]));
  return [...PIECE_SETS].sort((a, b) => {
    const ra = rank.get(a.id) ?? Number.MAX_SAFE_INTEGER;
    const rb = rank.get(b.id) ?? Number.MAX_SAFE_INTEGER;
    return ra - rb;
  });
}

/** Looks up a quality preset by its multiplier value, or `null`. */
export function getQualityPreset(value: number): QualityPreset | null {
  return QUALITY_PRESETS.find((preset) => preset.value === value) ?? null;
}

/** Contrast ratio between a theme's light and dark squares (WCAG 2.1). */
export function themeContrast(theme: BoardTheme): number {
  return contrastRatio(theme.light, theme.dark);
}

/**
 * Picks the coordinate-label text color (`'white'` | `'black'`) that reads best
 * against a theme's dark squares — useful when drawing coordinates inside the
 * board rather than in a border.
 */
export function themeCoordinateColor(theme: BoardTheme): 'white' | 'black' {
  return bestTextColor(theme.dark);
}
