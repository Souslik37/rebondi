// Options de l'outil « Personnaliser » (aperçu temporaire pour recueillir des avis).
// Les couleurs dérivées (fonds, liens, texte) sont calculées par src/lib/preview-runtime.js
// avec des contrastes WCAG AA garantis.

/** Duos de couleurs suggérés : principale (boutons) + secondaire (fonds, bandeaux). */
export const PRESETS = [
  { id: 'prairie', label: 'Prairie', p: '#1d7a3e', s: '#123d25' },
  { id: 'corail', label: 'Corail & nuit', p: '#ff6a4d', s: '#1e1b2e' },
  { id: 'abricot', label: 'Abricot & cacao', p: '#ff9466', s: '#6b4430' },
  { id: 'peche', label: 'Pêche & ciel', p: '#ff8a5c', s: '#4f8fcf' },
  { id: 'mandarine', label: 'Mandarine & sable', p: '#f7a23b', s: '#a88452' },
  { id: 'sapin', label: 'Orange & sapin', p: '#ff7a3d', s: '#1f5f4a' },
  { id: 'lagon', label: 'Corail & lagon', p: '#ff6f59', s: '#2a9d8f' },
  { id: 'lavande', label: 'Abricot & lavande', p: '#ffa071', s: '#7b6fd6' },
  { id: 'mangue', label: 'Mangue & framboise', p: '#ffb347', s: '#c2185b' },
  { id: 'citron', label: 'Citron & ardoise', p: '#f5c518', s: '#3d4b5c' },
  { id: 'bonbon', label: 'Bonbon & menthe', p: '#ff7eb6', s: '#2f9e78' },
  { id: 'tomate', label: 'Tomate & marine', p: '#f25c3c', s: '#1d3557' },
] as const;

export type PresetId = (typeof PRESETS)[number]['id'];
export const PRESET_IDS = PRESETS.map((t) => t.id) as PresetId[];

/** Noms de site à comparer. `domain` est affiché en pied de page pour l'aperçu. */
export const BRANDS = [
  { id: 'rebondi', name: 'Rebondi', domain: 'rebondi.be' },
  { id: 'chateau-gonflable', name: 'Château Gonflable', domain: 'chateaugonflable.eu' },
] as const;
