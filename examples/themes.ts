/**
 * List board themes and piece sets, and pick a contrast-safe coordinate color.
 *
 *   npx tsx examples/themes.ts
 */
import {
  listThemeIds,
  getBoardTheme,
  pieceSetsByPopularity,
  themeContrast,
  themeCoordinateColor,
} from '../src/index.js';

console.log('Board themes (id — light/dark — square contrast — coord color):');
for (const id of listThemeIds()) {
  const theme = getBoardTheme(id)!;
  const contrast = themeContrast(theme).toFixed(2);
  const coord = themeCoordinateColor(theme);
  console.log(`  ${id.padEnd(10)} ${theme.light}/${theme.dark}  ${contrast}x  ${coord}`);
}

console.log('\nTop 5 piece sets by popularity:');
for (const set of pieceSetsByPopularity().slice(0, 5)) {
  console.log(`  ${set.id.padEnd(10)} ${set.name}`);
}
