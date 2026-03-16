import type { ThemeConfig, ThemeId } from '../types/index.ts';
import { spaceTheme } from './space.ts';
import { oceanTheme } from './ocean.ts';
import { forestTheme } from './forest.ts';

export const themes: Record<ThemeId, ThemeConfig> = {
  space: spaceTheme,
  ocean: oceanTheme,
  forest: forestTheme,
};

export function getTheme(id: ThemeId): ThemeConfig {
  return themes[id];
}

export function applyThemeToDOM(theme: ThemeConfig): void {
  const root = document.documentElement;
  root.style.setProperty('--color-bg-dark', theme.colors.bgDark);
  root.style.setProperty('--color-bg-light', theme.colors.bgLight);
  root.style.setProperty('--color-primary', theme.colors.primary);
  root.style.setProperty('--color-success', theme.colors.success);
  root.style.setProperty('--color-encouraging', theme.colors.encouraging);
  root.style.setProperty('--color-text-on-dark', theme.colors.textOnDark);
  root.style.setProperty('--color-text-on-light', theme.colors.textOnLight);
}

export { spaceTheme, oceanTheme, forestTheme };
