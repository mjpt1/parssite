"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ChevronLeft, MousePointer2 } from "lucide-react";

/**
 * Cinematic scroll-controlled hero.
 *
 * Smoothness strategy: instead of seeking <video>.currentTime (which snaps to
 * sparse keyframes and looks "steppy"), the video is pre-rendered into an image
 * sequence that is drawn to a <canvas> as the user scrolls. Because every frame
 * is a standalone image, scrubbing is perfectly fluid on every device/browser.
 *
 * Frames live in /public/frames (frame_0001.jpg …). Regenerate with:
 *   npm run gen:frames
 * If the frames are missing, it falls back to scrubbing the <video> directly.
 */

const SEQUENCES = [
  { text: "انرژی خورشیدی، آیندهٔ تأمین برق", start: 0.15, end: 0.25 },
  { text: "کاهش هزینهٔ انرژی و استقلال از خاموشی", start: 0.35, end: 0.45 },
  { text: "سرمایه‌گذاری هوشمند با بازگشت سرمایهٔ سریع", start: 0.55, end: 0.65 },
  { text: "درآمد پایدار از فروش برق به شبکه", start: 0.75, end: 0.85 },
];

// Number of frames in /public/frames (24fps × ~10s). Keep in sync with gen:frames.
const FRAME_COUNT = 241;
const framePath = (i: number) => `/frames/frame_${String(i + 1).padStart(4, "0")}.jpg`;

// Fraction of each band used for the fade-in and fade-out ramps.
const FADE = 0.32;

function clamp01(n: number) {
  return Math.min(1, Math.max(0, n));
}

export default function HeroScrollVideo() {
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const textRefs = useRef<Array<HTMLDivElement | null>>([]);
  const ctaRef = useRef<HTMLDivElement>(null);
  const hintRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    gsap.registerPlugin(ScrollTrigger);

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const section = sectionRef.current;
    if (!section) return;

    const isMobile = () => window.matchMedia("(max-width: 768px)").matches;

    const frames: HTMLImageElement[] = new Array(FRAME_COUNT);
    const loaded: boolean[] = new Array(FRAME_COUNT).fill(false);
    let framesReady = false; // at least the first frame is decoded
    let lastProgress = 0;
    let lastDrawnIdx = -1;
    let ctx: gsap.Context | null = null;

    /* ---------------------------- overlay text ---------------------------- */
    const applyOverlay = (p: number) => {
      lastProgress = p;
      SEQUENCES.forEach((seq, i) => {
        const el = textRefs.current[i];
        if (!el) return;
        const span = seq.end - seq.start;
        const inEnd = seq.start + span * FADE;
        const outStart = seq.end - span * FADE;
        let o = 0;
        if (p > seq.start && p < seq.end) {
          if (p < inEnd) o = (p - seq.start) / (inEnd - seq.start);
          else if (p > outStart) o = (seq.end - p) / (seq.end - outStart);
          else o = 1;
        }
        gsap.set(el, { opacity: o, y: (1 - o) * 42, filter: `blur(${(1 - o) * 12}px)` });
      });

      const cta = ctaRef.current;
      if (cta) {
        const o = clamp01((p - 0.9) / 0.06);
        gsap.set(cta, {
          opacity: o,
          y: (1 - o) * 42,
          filter: `blur(${(1 - o) * 12}px)`,
          pointerEvents: o > 0.9 ? "auto" : "none",
        });
      }

      const hint = hintRef.current;
      if (hint) gsap.set(hint, { opacity: p < 0.05 ? 1 : clamp01((0.1 - p) / 0.05) });
    };

    /* ----------------------------- canvas draw ---------------------------- */
    const resizeCanvas = () => {
      const c = canvasRef.current;
      if (!c) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      c.width = Math.floor(window.innerWidth * dpr);
      c.height = Math.floor(window.innerHeight * dpr);
      lastDrawnIdx = -1; // force redraw at new size
    };

    // Find the closest already-loaded frame to `idx` (frames stream in order).
    const nearestLoaded = (idx: number) => {
      if (loaded[idx]) return idx;
      for (let d = 1; d < FRAME_COUNT; d++) {
        if (idx - d >= 0 && loaded[idx - d]) return idx - d;
        if (idx + d < FRAME_COUNT && loaded[idx + d]) return idx + d;
      }
      return -1;
    };

    const drawFrame = (p: number) => {
      const c = canvasRef.current;
      if (!c || !framesReady) return;
      const ctx2d = c.getContext("2d");
      if (!ctx2d) return;
      const target = Math.min(FRAME_COUNT - 1, Math.max(0, Math.round(p * (FRAME_COUNT - 1))));
      const idx = nearestLoaded(target);
      if (idx < 0 || idx === lastDrawnIdx) return;
      const img = frames[idx];
      if (!img || !img.complete) return;
      lastDrawnIdx = idx;
      const cw = c.width;
      const ch = c.height;
      const ir = img.width / img.height;
      const cr = cw / ch;
      let dw: number, dh: number;
      if (ir > cr) {
        dh = ch;
        dw = ch * ir;
      } else {
        dw = cw;
        dh = cw / ir;
      }
      ctx2d.drawImage(img, (cw - dw) / 2, (ch - dh) / 2, dw, dh);
    };

    /* --------------------------- scroll driver ---------------------------- */
    const update = (p: number) => {
      if (framesReady) {
        drawFrame(p);
      } else {
        const v = videoRef.current;
        if (v && v.duration) {
          const t = v.duration * p;
          if (Math.abs(v.currentTime - t) > 0.03) v.currentTime = t;
        }
      }
      applyOverlay(p);
    };

    const buildTrigger = () => {
      ctx = gsap.context(() => {
        ScrollTrigger.create({
          trigger: section,
          start: "top top",
          end: "bottom bottom",
          // Higher smoothing = buttery, slightly weighty scrub.
          scrub: isMobile() ? 1.2 : 1,
          onUpdate: (self) => update(self.progress),
        });
      }, section);
    };

    /* ----------------------------- frame preload -------------------------- */
    const revealCanvas = () => {
      const c = canvasRef.current;
      const v = videoRef.current;
      if (c) c.style.display = "block";
      if (v) v.style.display = "none";
      resizeCanvas();
    };

    const preloadFrames = () => {
      let firstHandled = false;
      const probe = new Image();
      probe.onload = () => {
        // Frame 1 exists → load the whole sequence.
        for (let i = 0; i < FRAME_COUNT; i++) {
          const img = i === 0 ? probe : new Image();
          frames[i] = img;
          const onload = () => {
            loaded[i] = true;
            if (!firstHandled) {
              firstHandled = true;
              framesReady = true;
              revealCanvas();
            }
            // Repaint the current position as new frames stream in.
            drawFrame(lastProgress);
          };
          if (i === 0) onload();
          else {
            img.onload = onload;
            img.src = framePath(i);
          }
        }
      };
      probe.onerror = () => {
        // No frame sequence available → keep scrubbing the <video>.
      };
      probe.src = framePath(0);
    };

    /* ----------------------------- bootstrap ------------------------------ */
    applyOverlay(0);

    // Reduced motion: collapse the tall section and show a static hero.
    if (reduceMotion) {
      section.style.height = "100vh";
      const first = textRefs.current[3] || textRefs.current[0];
      if (first) gsap.set(first, { opacity: 1, y: 0, filter: "blur(0px)" });
      if (ctaRef.current)
        gsap.set(ctaRef.current, { opacity: 1, y: 0, filter: "blur(0px)", pointerEvents: "auto" });
      if (hintRef.current) gsap.set(hintRef.current, { opacity: 0 });
      const v = videoRef.current;
      if (v) v.currentTime = v.duration ? v.duration * 0.6 : 0;
      return;
    }

    const video = videoRef.current;
    const onMeta = () => {
      video?.pause();
      update(lastProgress);
    };
    if (video) {
      if (video.readyState >= 1) onMeta();
      else video.addEventListener("loadedmetadata", onMeta, { once: true });
    }

    buildTrigger();
    preloadFrames();
    window.addEventListener("resize", resizeCanvas);

    // Rebuild trigger smoothing when crossing the mobile breakpoint.
    let wasMobile = isMobile();
    const onResize = () => {
      if (isMobile() !== wasMobile) {
        wasMobile = isMobile();
        ctx?.revert();
        buildTrigger();
        ScrollTrigger.refresh();
      }
    };
    window.addEventListener("resize", onResize);

    return () => {
      ctx?.revert();
      window.removeEventListener("resize", resizeCanvas);
      window.removeEventListener("resize", onResize);
      video?.removeEventListener("loadedmetadata", onMeta);
    };
  }, []);

  return (
    <section id="top" ref={sectionRef} className="relative h-[700vh] w-full bg-primary-dark">
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        {/* Initial paint / fallback: poster + scrubbable video */}
        <video
          ref={videoRef}
          className="absolute inset-0 h-full w-full object-cover"
          muted
          playsInline
          preload="auto"
          poster="/poster.jpg"
          aria-hidden="true"
        >
          <source src="/hero.mp4" type="video/mp4" />
        </video>

        {/* Frame-sequence canvas (revealed once frames start streaming) */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0 h-full w-full object-cover"
          style={{ display: "none" }}
          aria-hidden="true"
        />

        {/* Dark gradient overlay for legibility */}
        <div className="absolute inset-0 bg-hero-fade" />
        <div className="pointer-events-none absolute inset-0 bg-primary-dark/25" />

        {/* Text sequences (stacked & centered, opacity-driven) */}
        <div className="absolute inset-0 z-10">
          {SEQUENCES.map((seq, i) => (
            <div
              key={i}
              ref={(el) => {
                textRefs.current[i] = el;
              }}
              className="absolute inset-0 flex items-center justify-center px-6"
              style={{ opacity: 0, willChange: "opacity, transform, filter" }}
            >
              <h2 className="mx-auto max-w-4xl text-balance text-center text-3xl font-extrabold leading-tight text-white drop-shadow-[0_4px_24px_rgba(0,0,0,0.45)] sm:text-4xl md:text-5xl lg:text-6xl">
                {seq.text}
              </h2>
            </div>
          ))}

          {/* CTA (90% → 100%) */}
          <div
            ref={ctaRef}
            className="absolute inset-0 flex flex-col items-center justify-center gap-6 px-6 text-center"
            style={{ opacity: 0, willChange: "opacity, transform, filter" }}
          >
            <h2 className="mx-auto max-w-3xl text-balance text-3xl font-extrabold leading-tight text-white drop-shadow-[0_4px_24px_rgba(0,0,0,0.45)] sm:text-4xl md:text-5xl">
              آینده انرژی شما، از همین امروز
            </h2>
            <a href="#evaluation" className="btn-primary px-8 py-4 text-lg">
              دریافت مشاوره رایگان
              <ChevronLeft className="h-5 w-5" />
            </a>
          </div>
        </div>

        {/* Scroll hint */}
        <div
          ref={hintRef}
          className="absolute inset-x-0 bottom-8 z-20 flex flex-col items-center gap-2 text-white/80"
        >
          <MousePointer2 className="h-5 w-5 animate-float" />
          <span className="text-sm font-medium">برای شروع اسکرول کنید</span>
        </div>
      </div>
    </section>
  );
}
