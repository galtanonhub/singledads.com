#!/usr/bin/env node
/*
 * Generates apple-touch-icon.png (180x180) — navy background with cream "SD".
 * Run: node generate-icon.js   (re-run only if you change colors/size)
 * Pure Node (zlib + manual PNG encoding), no dependencies.
 */
const zlib = require('zlib');
const fs = require('fs');

const SIZE = 180;
const NAVY = [0x14, 0x18, 0x20];
const CREAM = [0xf0, 0xe7, 0xd4];

// 5x7 bitmap letters
const GLYPHS = {
  S: ['01111','10000','10000','01110','00001','00001','11110'],
  D: ['11110','10001','10001','10001','10001','10001','11110'],
};

// RGBA canvas filled with navy
const px = Buffer.alloc(SIZE * SIZE * 4);
for (let i = 0; i < SIZE * SIZE; i++) {
  px[i*4] = NAVY[0]; px[i*4+1] = NAVY[1]; px[i*4+2] = NAVY[2]; px[i*4+3] = 255;
}
const set = (x, y) => {
  if (x < 0 || y < 0 || x >= SIZE || y >= SIZE) return;
  const i = (y * SIZE + x) * 4;
  px[i] = CREAM[0]; px[i+1] = CREAM[1]; px[i+2] = CREAM[2]; px[i+3] = 255;
};

const scale = 14;
const cols = 5 + 1 + 5;            // S + gap + D
const totalW = cols * scale, totalH = 7 * scale;
const ox = Math.round((SIZE - totalW) / 2), oy = Math.round((SIZE - totalH) / 2);
const drawGlyph = (g, colOffset) => {
  for (let r = 0; r < 7; r++)
    for (let c = 0; c < 5; c++)
      if (g[r][c] === '1')
        for (let dy = 0; dy < scale; dy++)
          for (let dx = 0; dx < scale; dx++)
            set(ox + (colOffset + c) * scale + dx, oy + r * scale + dy);
};
drawGlyph(GLYPHS.S, 0);
drawGlyph(GLYPHS.D, 6);

// Encode PNG
const crcTable = (() => {
  const t = [];
  for (let n = 0; n < 256; n++) { let c = n; for (let k = 0; k < 8; k++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1; t[n] = c >>> 0; }
  return t;
})();
const crc32 = buf => { let c = 0xffffffff; for (const b of buf) c = crcTable[(c ^ b) & 0xff] ^ (c >>> 8); return (c ^ 0xffffffff) >>> 0; };
const chunk = (type, data) => {
  const len = Buffer.alloc(4); len.writeUInt32BE(data.length);
  const td = Buffer.concat([Buffer.from(type), data]);
  const crc = Buffer.alloc(4); crc.writeUInt32BE(crc32(td));
  return Buffer.concat([len, td, crc]);
};
const ihdr = Buffer.alloc(13);
ihdr.writeUInt32BE(SIZE, 0); ihdr.writeUInt32BE(SIZE, 4);
ihdr[8] = 8; ihdr[9] = 6; ihdr[10] = 0; ihdr[11] = 0; ihdr[12] = 0;
const raw = Buffer.alloc(SIZE * (SIZE * 4 + 1));
for (let y = 0; y < SIZE; y++) {
  raw[y * (SIZE * 4 + 1)] = 0;
  px.copy(raw, y * (SIZE * 4 + 1) + 1, y * SIZE * 4, (y + 1) * SIZE * 4);
}
const png = Buffer.concat([
  Buffer.from([137,80,78,71,13,10,26,10]),
  chunk('IHDR', ihdr),
  chunk('IDAT', zlib.deflateSync(raw)),
  chunk('IEND', Buffer.alloc(0)),
]);
fs.writeFileSync('apple-touch-icon.png', png);
console.log('Wrote apple-touch-icon.png (' + SIZE + 'x' + SIZE + ', ' + png.length + ' bytes)');
