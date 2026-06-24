// FEN parsing & board utilities
export {
  parseFEN,
  validateFEN,
  getFENValidationError,
  validateFENDetailed,
  createEmptyBoard,
  boardToFEN,
  isBoardEmpty,
  pieceToName,
  describeBoardPosition,
  FENParseError,
  MAX_FEN_LENGTH,
  type PieceSymbol,
  type BoardMatrix,
  type ValidationResult,
} from './fen.js';

// Full FEN record parsing & serialization (all six fields)
export {
  parseFENRecord,
  buildFENRecord,
  toggleActiveColor,
  fenPlacementField,
  normalizeFEN,
  type FENRecord,
  type ActiveColor,
} from './fen-record.js';

// Pure board manipulation
export {
  cloneBoard,
  getPieceAt,
  setPieceAt,
  removePieceAt,
  movePiece,
  flipBoard,
  listPieces,
  countPieces,
  materialBalance,
  findKing,
  hasBothKings,
  type SquareRef,
  type PiecePlacement,
} from './board.js';

// SVG diagram generator
export { generateDiagram, type DiagramOptions } from './svg.js';

// Inline piece SVGs (CBurnett / Lichess style)
export { PIECES, getPieceSVG } from './pieces.js';

// Color utilities
export {
  hexToRgb,
  rgbToHex,
  rgbToHsv,
  hsvToRgb,
  hexToHsv,
  hsvToHex,
  relativeLuminance,
  contrastRatio,
  bestTextColor,
} from './colors.js';

// Input sanitization & validation helpers
export {
  safeJSONParse,
  sanitizeFileName,
  isValidHexColor,
  sanitizeHexColor,
  sanitizeInput,
  isRecord,
} from './validation.js';

// Board themes, piece sets, quality presets, constants
export {
  DEFAULT_LIGHT_SQUARE,
  DEFAULT_DARK_SQUARE,
  STARTING_FEN,
  EMPTY_FEN,
  PIECE_SETS,
  PIECE_SET_POPULARITY,
  BOARD_THEMES,
  QUALITY_PRESETS,
  PIECE_MAP,
  type PieceSet,
  type BoardTheme,
  type QualityPreset,
} from './constants.js';

// History types & pure utilities
export {
  calculateStatus,
  createHistoryEntry,
  touchEntry,
  sortByMostRecent,
  sortArchivedByArchiveDate,
  mergeById,
  applyFilters,
  partitionByArchiveStatus,
  convertToArchivedEntry,
  type HistorySource,
  type ArchiveSource,
  type FreshnessStatus,
  type BaseHistoryEntry,
  type ActiveHistoryEntry,
  type ArchivedHistoryEntry,
  type HistoryFilters,
  type PartitionResult,
} from './history.js';

// Coordinate math
export {
  getCoordinateParams,
  getSquareBounds,
  isLightSquare,
  getDisplayCoordinates,
  squareToIndices,
  indicesToSquare,
  type CoordinateParams,
  type SquareBounds,
} from './coordinates.js';

// DPI encoder (PNG pHYs / JPEG JFIF rewrite — Node.js + browser)
export { changeDPI } from './dpi.js';

// Theme, piece-set & quality-preset lookups
export {
  getBoardTheme,
  listThemeIds,
  getPieceSet,
  pieceSetsByPopularity,
  getQualityPreset,
  themeContrast,
  themeCoordinateColor,
} from './themes.js';

// Image header reading (dimensions) & physical print sizing
export {
  readImageDimensions,
  physicalSize,
  type ImageDimensions,
} from './image.js';
