import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const ICONS_DIR = path.join(__dirname, '..', 'public', 'icons');

// 确保目录存在
if (!fs.existsSync(ICONS_DIR)) {
  fs.mkdirSync(ICONS_DIR, { recursive: true });
}

// 生成简单的渐变图标
async function generateIcon(size, isMaskable = false) {
  const padding = isMaskable ? Math.floor(size * 0.2) : 0;
  const contentSize = size - padding * 2;
  
  const svg = `
    <svg width="${size}" height="${size}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:#667eea;stop-opacity:1" />
          <stop offset="100%" style="stop-color:#764ba2;stop-opacity:1" />
        </linearGradient>
      </defs>
      <rect width="${size}" height="${size}" fill="#0a0a0a"/>
      <circle cx="${size/2}" cy="${size/2}" r="${contentSize/2 - 10}" fill="url(#grad)"/>
      <text x="${size/2}" y="${size/2 + 15}" font-family="Arial, sans-serif" font-size="${contentSize/3}" fill="white" text-anchor="middle" font-weight="bold">V</text>
    </svg>
  `;

  const filename = isMaskable 
    ? `icon-${size}x${size}-maskable.png` 
    : `icon-${size}x${size}.png`;
  
  await sharp(Buffer.from(svg))
    .png()
    .toFile(path.join(ICONS_DIR, filename));
  
  console.log(`Generated: ${filename}`);
}

async function main() {
  try {
    // 生成标准图标
    await generateIcon(192);
    await generateIcon(512);
    await generateIcon(1024);
    
    // 生成可遮罩图标
    await generateIcon(192, true);
    await generateIcon(512, true);
    
    console.log('All icons generated successfully!');
  } catch (error) {
    console.error('Error generating icons:', error);
    process.exit(1);
  }
}

main();
