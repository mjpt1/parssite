/**
 * Generates the placeholder photo assets referenced by the site
 * (solar-panels.jpg, solar-field.jpg, poster.jpg) from inline SVG using sharp.
 *
 * Run:  npm run gen:assets
 *
 * Replace these with real photography for production.
 */
import sharp from "sharp";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUT = path.join(__dirname, "..", "public");

/** Build a slanted array of solar panels. */
function solarArray({ cx, baseY, rows, color, edge }) {
  let s = "";
  for (let r = 0; r < rows; r++) {
    const y = baseY + r * (30 + r * 12);
    const cellW = 48 + r * 16;
    const cellH = 24 + r * 8;
    const gap = 8 + r * 3;
    const count = 6;
    const totalW = count * cellW + (count - 1) * gap;
    const startX = cx - totalW / 2;
    for (let c = 0; c < count; c++) {
      const x = startX + c * (cellW + gap);
      s += `<g transform="translate(${x} ${y}) skewX(-20)">
        <rect width="${cellW}" height="${cellH}" rx="2" fill="${color}" stroke="${edge}" stroke-width="1.2"/>
        <line x1="${cellW / 3}" y1="0" x2="${cellW / 3}" y2="${cellH}" stroke="${edge}" stroke-width="0.7"/>
        <line x1="${(2 * cellW) / 3}" y1="0" x2="${(2 * cellW) / 3}" y2="${cellH}" stroke="${edge}" stroke-width="0.7"/>
        <line x1="0" y1="${cellH / 2}" x2="${cellW}" y2="${cellH / 2}" stroke="${edge}" stroke-width="0.7"/>
      </g>`;
    }
  }
  return s;
}

function scene({ w, h, sky, sun, sunR, ground, panelColor, panelEdge, rows, baseY }) {
  return `<svg width="${w}" height="${h}" viewBox="0 0 ${w} ${h}" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stop-color="${sky[0]}"/>
        <stop offset="1" stop-color="${sky[1]}"/>
      </linearGradient>
      <radialGradient id="sun" cx="50%" cy="50%" r="50%">
        <stop offset="0" stop-color="#FFF6DB"/>
        <stop offset="35%" stop-color="${sun}"/>
        <stop offset="100%" stop-color="${sun}" stop-opacity="0"/>
      </radialGradient>
    </defs>
    <rect width="${w}" height="${h}" fill="url(#sky)"/>
    <circle cx="${w * 0.74}" cy="${h * 0.26}" r="${sunR}" fill="url(#sun)"/>
    <circle cx="${w * 0.74}" cy="${h * 0.26}" r="${sunR * 0.42}" fill="#FFF1C4"/>
    <path d="M0 ${h * 0.7} Q ${w * 0.5} ${h * 0.62} ${w} ${h * 0.72} V ${h} H 0 Z" fill="${ground}"/>
    ${solarArray({ cx: w * 0.5, baseY, rows, color: panelColor, edge: panelEdge })}
  </svg>`;
}

const assets = [
  {
    file: "solar-field.jpg",
    svg: scene({
      w: 1600,
      h: 1000,
      sky: ["#6FB1E3", "#D8EBF8"],
      sun: "#F5D77A",
      sunR: 150,
      ground: "#8FB45A",
      panelColor: "#1E3A5F",
      panelEdge: "#5C7CA6",
      rows: 4,
      baseY: 560,
    }),
  },
  {
    file: "solar-panels.jpg",
    svg: scene({
      w: 1600,
      h: 1000,
      sky: ["#A9D6F0", "#F1F9FD"],
      sun: "#FFE08A",
      sunR: 120,
      ground: "#9FC06A",
      panelColor: "#22497A",
      panelEdge: "#7FA0C9",
      rows: 5,
      baseY: 470,
    }),
  },
  {
    file: "poster.jpg",
    svg: scene({
      w: 1920,
      h: 1080,
      sky: ["#16273E", "#2C5282"],
      sun: "#F5B400",
      sunR: 200,
      ground: "#0F1B2D",
      panelColor: "#0C1726",
      panelEdge: "#2C5282",
      rows: 4,
      baseY: 640,
    }),
  },
];

async function main() {
  for (const { file, svg } of assets) {
    const out = path.join(OUT, file);
    await sharp(Buffer.from(svg)).jpeg({ quality: 82, mozjpeg: true }).toFile(out);
    console.log("✓ generated", file);
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
