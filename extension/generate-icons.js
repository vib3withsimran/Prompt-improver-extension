import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Standard base64 PNG for a nice purple icon (128x128)
const purpleIconBase64 = 'iVBORw0KGgoAAAANSUhEUgAAAIAAAACACAMAAADnz42xAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAAZQTFRFk5ea////AJMAAAAAjFJOU1Mixw737wAAAFRJREFUeNrs0UENwCAAwEA6+NeYgh3c4w4S0Ene2WvvpQAECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIERgETgAD/dK3fFwAAAABJRU5ErkJggg==';

const iconBuffer = Buffer.from(purpleIconBase64, 'base64');
const iconsDir = path.join(__dirname, 'public', 'icons');

if (!fs.existsSync(iconsDir)) {
  fs.mkdirSync(iconsDir, { recursive: true });
}

fs.writeFileSync(path.join(iconsDir, 'icon16.png'), iconBuffer);
fs.writeFileSync(path.join(iconsDir, 'icon48.png'), iconBuffer);
fs.writeFileSync(path.join(iconsDir, 'icon128.png'), iconBuffer);

console.log('Successfully generated purple theme icons in public/icons/');
