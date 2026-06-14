/**
 * Renders public/hero.mp4 into the image sequence used by the cinematic hero
 * (public/frames/frame_0001.jpg …). Drawing pre-rendered frames to a canvas
 * makes scroll scrubbing perfectly smooth (no video keyframe stepping).
 *
 * Run:  npm run gen:frames
 * Tune: HERO_FPS=24 HERO_Q=7 npm run gen:frames   (lower Q = higher quality/size)
 *
 * Uses the ffmpeg binary bundled by @ffmpeg-installer/ffmpeg (no system ffmpeg
 * required). After running, update FRAME_COUNT in components/HeroScrollVideo.tsx
 * if the frame count changes.
 */
import { execFileSync } from "node:child_process";
import { mkdirSync, rmSync, readdirSync, existsSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import ffmpeg from "@ffmpeg-installer/ffmpeg";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const input = path.join(root, "public", "hero.mp4");
const outDir = path.join(root, "public", "frames");

const fps = process.env.HERO_FPS || "24";
const quality = process.env.HERO_Q || "7";

if (!existsSync(input)) {
  console.error(`✗ ${input} not found. Place your hero video at public/hero.mp4 first.`);
  process.exit(1);
}

rmSync(outDir, { recursive: true, force: true });
mkdirSync(outDir, { recursive: true });

console.log(`Rendering frames (fps=${fps}, q=${quality}) …`);
execFileSync(
  ffmpeg.path,
  [
    "-i", input,
    "-vf", `fps=${fps}`,
    "-q:v", quality,
    path.join(outDir, "frame_%04d.jpg"),
    "-hide_banner",
    "-loglevel", "error",
  ],
  { stdio: "inherit" }
);

const count = readdirSync(outDir).filter((f) => f.endsWith(".jpg")).length;
console.log(`✓ generated ${count} frames in public/frames`);
console.log(`  → ensure FRAME_COUNT = ${count} in components/HeroScrollVideo.tsx`);
