// Génère l'image de partage (WhatsApp, Facebook…) : public/og-image.jpg, 1200 × 630.
// Photo du château le moins cher (celui du prix « dès … ») + nom et accroche.
// Relancer après un changement de nom, de prix ou de photos : `npm run og`
import sharp from 'sharp';
import { readFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const site = JSON.parse(readFileSync(join(root, 'src/data/site.json'), 'utf8'));
const chateaux = JSON.parse(readFileSync(join(root, 'src/data/chateaux.json'), 'utf8'));
const cheapest = chateaux.reduce((a, b) => (b.price < a.price ? b : a));
const photo = join(root, 'src/assets/chateaux', cheapest.images[cheapest.images.length > 1 ? 1 : 0]);

const W = 1200, H = 630, PW = 560, PH = 520, PX = W - PW - 40, PY = (H - PH) / 2;
const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;');
const INK = '#1e1b2e';

const mask = Buffer.from(`<svg width="${PW}" height="${PH}"><rect width="${PW}" height="${PH}" rx="36" fill="#fff"/></svg>`);
const pic = await sharp(photo).resize(PW, PH, { fit: 'cover' }).composite([{ input: mask, blend: 'dest-in' }]).png().toBuffer();

const text = Buffer.from(`
<svg width="${W}" height="${H}" xmlns="http://www.w3.org/2000/svg">
  <text x="64" y="200" font-family="Helvetica Neue, Arial, sans-serif" font-size="92" font-weight="800" fill="${INK}">${esc(site.name)}</text>
  <text x="64" y="270" font-family="Helvetica Neue, Arial, sans-serif" font-size="34" fill="${INK}">Châteaux gonflables neufs</text>
  <text x="64" y="315" font-family="Helvetica Neue, Arial, sans-serif" font-size="34" fill="${INK}">Bruxelles &amp; Brabant wallon</text>
  <rect x="64" y="370" width="452" height="76" rx="38" fill="#ffe27a"/>
  <text x="290" y="420" text-anchor="middle" font-family="Helvetica Neue, Arial, sans-serif" font-size="34" font-weight="800" fill="${INK}">Le week-end dès ${cheapest.price} €</text>
  <text x="64" y="520" font-family="Helvetica Neue, Arial, sans-serif" font-size="26" fill="#4a4560">Retrait à Genval · livraison sur demande</text>
</svg>`);

await sharp({ create: { width: W, height: H, channels: 3, background: '#ffffff' } })
  .composite([{ input: pic, left: PX, top: PY }, { input: text, left: 0, top: 0 }])
  .jpeg({ quality: 86 })
  .toFile(join(root, 'public/og-image.jpg'));
console.log(`✓ public/og-image.jpg (${site.name}, ${cheapest.fr.name}, ${cheapest.price} €)`);
