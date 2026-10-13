// Génère les illustrations de démonstration (châteaux fictifs).
// À supprimer quand les vraies photos seront disponibles : il suffit de
// remplacer les fichiers dans src/assets/ en gardant les mêmes noms.
import sharp from 'sharp';
import { mkdirSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..', 'src', 'assets');

const scene = (inner, { sky = '#CFE9F7', ground = '#8FCB6B', w = 1600, h = 1200 } = {}) => `
<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 1600 1200">
  <rect width="1600" height="1200" fill="${sky}"/>
  <circle cx="1350" cy="190" r="90" fill="#FFE07A"/>
  <g fill="#fff" opacity=".9">
    <ellipse cx="300" cy="200" rx="120" ry="40"/><ellipse cx="380" cy="180" rx="90" ry="45"/>
    <ellipse cx="1000" cy="140" rx="110" ry="35"/><ellipse cx="1060" cy="125" rx="70" ry="38"/>
  </g>
  <rect y="880" width="1600" height="320" fill="${ground}"/>
  <ellipse cx="800" cy="960" rx="640" ry="60" fill="#000" opacity=".12"/>
  ${inner}
</svg>`;

const tower = (x, y, w, h, body, roof, stripe) => `
  <rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${w / 2.4}" fill="${body}"/>
  <rect x="${x + w * 0.2}" y="${y + 30}" width="${w * 0.6}" height="${h - 60}" rx="${w * 0.3}" fill="${stripe}" opacity=".35"/>
  <path d="M${x - 10} ${y + 20} Q${x + w / 2} ${y - 150} ${x + w + 10} ${y + 20} Z" fill="${roof}"/>
  <circle cx="${x + w / 2}" cy="${y - 75}" r="16" fill="${roof}"/>`;

// Château 1 : Petit Donjon (bleu/jaune, murs filets)
const donjon = (side = false) => {
  const s = side ? 0.85 : 1;
  const ox = side ? 180 : 0;
  return `<g transform="translate(${ox} ${side ? 80 : 0}) scale(${s})">
    <rect x="360" y="760" width="880" height="160" rx="50" fill="#2F6FD6"/>
    <rect x="420" y="480" width="760" height="300" rx="30" fill="#fff" opacity=".45"/>
    <g stroke="#2F6FD6" stroke-width="10" opacity=".7">
      ${Array.from({ length: 9 }, (_, i) => `<line x1="${470 + i * 80}" y1="490" x2="${470 + i * 80}" y2="770"/>`).join('')}
      <line x1="420" y1="580" x2="1180" y2="580"/><line x1="420" y1="680" x2="1180" y2="680"/>
    </g>
    <rect x="400" y="420" width="800" height="80" rx="40" fill="#F5C531"/>
    ${tower(300, 380, 150, 540, '#2F6FD6', '#F5C531', '#fff')}
    ${tower(1150, 380, 150, 540, '#2F6FD6', '#F5C531', '#fff')}
    <rect x="690" y="820" width="220" height="70" rx="30" fill="#F5C531"/>
  </g>`;
};

// Château 2 : Jungle (vert, toboggan)
const jungle = (front = false) => `<g transform="translate(${front ? 60 : 0} 0)">
  <rect x="260" y="760" width="900" height="160" rx="50" fill="#2E9E5B"/>
  <rect x="320" y="420" width="780" height="360" rx="40" fill="#fff" opacity=".4"/>
  <rect x="300" y="370" width="820" height="90" rx="45" fill="#F28C28"/>
  ${tower(200, 300, 160, 620, '#2E9E5B', '#F28C28', '#fff')}
  ${tower(1060, 300, 160, 620, '#2E9E5B', '#F28C28', '#fff')}
  <path d="M1160 420 L1500 880 L1380 920 L1120 560 Z" fill="#F28C28"/>
  <path d="M1180 430 L1470 860" stroke="#fff" stroke-width="18" opacity=".5"/>
  <g fill="#2E9E5B" opacity=".9">
    <ellipse cx="560" cy="640" rx="60" ry="120"/><ellipse cx="860" cy="640" rx="60" ry="120"/>
  </g>
</g>`;

// Château 3 : Grand Parcours (rouge/orange, long)
const parcours = (profile = false) => `<g transform="translate(0 ${profile ? 40 : 0})">
  <rect x="80" y="780" width="1440" height="140" rx="50" fill="#D9442B"/>
  ${tower(80, 520, 120, 400, '#D9442B', '#FFB020', '#fff')}
  <g fill="#FFB020">
    ${Array.from({ length: 5 }, (_, i) => `<rect x="${280 + i * 170}" y="560" width="70" height="230" rx="35"/>`).join('')}
  </g>
  <path d="M260 620 Q360 520 460 620 Q560 520 660 620 Q760 520 860 620 Q960 520 1060 620" stroke="#fff" stroke-width="16" fill="none" opacity=".6"/>
  <rect x="1100" y="430" width="160" height="360" rx="30" fill="#D9442B"/>
  <g fill="#fff">${Array.from({ length: 5 }, (_, i) => `<circle cx="${1140 + (i % 2) * 70}" cy="${480 + i * 60}" r="14"/>`).join('')}</g>
  <path d="M1250 440 L1520 860 L1420 900 L1250 600 Z" fill="#FFB020"/>
</g>`;

const portrait = () => `
<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="1200" viewBox="0 0 1200 1200">
  <rect width="1200" height="1200" fill="#FDE3DA"/>
  <circle cx="600" cy="470" r="200" fill="#E8553D" opacity=".35"/>
  <path d="M250 1200 Q250 800 600 800 Q950 800 950 1200 Z" fill="#E8553D" opacity=".35"/>
  <text x="600" y="1080" font-family="Arial, sans-serif" font-size="64" font-weight="700" text-anchor="middle" fill="#7A2414">[PHOTO D'ALEX]</text>
</svg>`;

const og = () => `
<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <rect width="1200" height="630" fill="#FFF8F0"/>
  <g transform="translate(560 40) scale(.42)">${jungle()}</g>
  <text x="70" y="260" font-family="Arial Rounded MT Bold, Arial, sans-serif" font-size="96" font-weight="800" fill="#1E1B2E">Rebondi</text>
  <text x="70" y="340" font-family="Arial, sans-serif" font-size="36" fill="#1E1B2E">Châteaux gonflables livrés,</text>
  <text x="70" y="390" font-family="Arial, sans-serif" font-size="36" fill="#1E1B2E">installés et repris</text>
  <rect x="70" y="440" width="380" height="64" rx="32" fill="#FF6A4D"/>
  <text x="260" y="483" font-family="Arial, sans-serif" font-size="30" font-weight="700" text-anchor="middle" fill="#1E1B2E">Sud de Bruxelles</text>
</svg>`;

const files = {
  'chateaux/petit-donjon/1.jpg': scene(donjon()),
  'chateaux/petit-donjon/2.jpg': scene(donjon(true), { sky: '#DDEFF8', ground: '#7FBF5E' }),
  'chateaux/jungle/1.jpg': scene(jungle()),
  'chateaux/jungle/2.jpg': scene(jungle(true), { sky: '#FCE7C8', ground: '#86C467' }),
  'chateaux/grand-parcours/1.jpg': scene(parcours()),
  'chateaux/grand-parcours/2.jpg': scene(parcours(true), { sky: '#E3E9F5', ground: '#A9A9A9' }),
  'site/hero.jpg': scene(jungle(), { sky: '#FFE9DD' }),
  'site/alex.jpg': portrait(),
};

for (const [rel, svg] of Object.entries(files)) {
  const out = join(root, rel);
  mkdirSync(dirname(out), { recursive: true });
  await sharp(Buffer.from(svg)).jpeg({ quality: 85 }).toFile(out);
  console.log('✓', rel);
}

// Image Open Graph par défaut (servie telle quelle depuis public/)
const ogOut = join(root, '..', '..', 'public', 'og-default.jpg');
await sharp(Buffer.from(og())).jpeg({ quality: 85 }).toFile(ogOut);
console.log('✓ public/og-default.jpg');
