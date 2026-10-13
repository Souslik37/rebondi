// Palettes disponibles. Les couleurs elles-mêmes sont dans src/styles/global.css.
// `swatch` sert uniquement à l'aperçu dans le sélecteur.
export const THEMES = [
  { id: 'prairie', label: 'Prairie (vert)', swatch: ['#1d7a3e', '#e3f3dc', '#123d25'] },
  { id: 'corail', label: 'Corail (1er site)', swatch: ['#ff6a4d', '#ffe3da', '#1e1b2e'] },
  { id: 'abricot', label: 'Abricot doux', swatch: ['#ff9466', '#ffede3', '#3d2b22'] },
  { id: 'peche', label: 'Pêche & bleu ciel', swatch: ['#ff8a5c', '#eef5fb', '#1c2b45'] },
  { id: 'mandarine', label: 'Mandarine & sable', swatch: ['#f7a23b', '#fbf6ec', '#3a2f1e'] },
] as const;

export type ThemeId = (typeof THEMES)[number]['id'];
export const THEME_IDS = THEMES.map((t) => t.id) as ThemeId[];
