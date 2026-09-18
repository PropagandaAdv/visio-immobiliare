"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { IconArrowUpRight } from "@/components/icons";

const VIDEO_MP4 = "/generated/hero-video.mp4";
const VIDEO_WEBM = "/generated/hero-video.webm";
const POSTER = "/generated/hero-villa.jpg";

// The five conditions that fall back to a static hero instead of the
// scroll-scrubbed video: phones, portrait tablets, coarse-pointer portrait,
// short landscape phones, and reduced motion. Re-checked live (resize,
// rotation, a preference flip mid-session), never decided once at load.
const STATIC_GATES = [
  "(max-width: 720px)",
  "(orientation: portrait) and (max-width: 1024px)",
  "(orientation: portrait) and (pointer: coarse)",
  "(orientation: landscape) and (pointer: coarse) and (max-height: 560px)",
  "(prefers-reduced-motion: reduce)",
];

function useCinematicAllowed() {
  const [allowed, setAllowed] = useState(false);
  useEffect(() => {
    const mqls = STATIC_GATES.map((q) => window.matchMedia(q));
    const update = () => setAllowed(!STATIC_GATES.some((q) => window.matchMedia(q).matches));
    update();
    mqls.forEach((m) => m.addEventListener("change", update));
    return () => mqls.forEach((m) => m.removeEventListener("change", update));
  }, []);
  return allowed;
}

export function ScrollJourney() {
  const cinematicAllowed = useCinematicAllowed();
  return cinematicAllowed ? <CinematicJourney /> : <StaticHero />;
}

// ---------------------------------------------------------------------------
// Static hero: what phones, tablets and reduced-motion visitors get. A
// composed layout in its own right, not an apology for the missing video.
// ---------------------------------------------------------------------------

function StaticHero() {
  const reduceMotion = useReducedMotion();

  return (
    <section id="main" className="relative flex min-h-screen items-end overflow-hidden bg-ink">
      <div className="absolute inset-0" aria-hidden="true">
        <Image src={POSTER} alt="" fill priority sizes="100vw" className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/75 via-ink/25 to-ink/10" />
      </div>

      <Container className="relative w-full pb-16 sm:pb-20 lg:pb-24">
        <motion.div
          initial={reduceMotion ? undefined : { opacity: 0, y: 24 }}
          animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-2xl rounded-[28px] bg-ink/80 p-8 shadow-2xl shadow-ink/30 backdrop-blur-sm sm:p-10 lg:p-12"
        >
          <HeroBandContent />
        </motion.div>
      </Container>
    </section>
  );
}

function HeroBandContent() {
  return (
    <>
      <p className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-sm font-medium text-white/90">
        <span className="h-1.5 w-1.5 rounded-full bg-gold" />
        Consulenza per investimenti immobiliari
      </p>

      <h1 className="font-display font-bold leading-[0.98] tracking-tightest text-[clamp(2.3rem,5.2vw,4rem)] text-white text-balance">
        <span className="block">La vostra Visione.</span>
        <span className="block text-gold-light">La nostra Missione</span>
        <span className="block">immobiliare.</span>
      </h1>

      <p className="mt-6 max-w-xl text-lg leading-relaxed text-white/85">
        Affianchiamo privati e investitori nella gestione del proprio patrimonio immobiliare,
        con un metodo di consulenza, non di semplice intermediazione, fatto di trasparenza,
        tecnologie innovative e soluzioni sostenibili.
      </p>

      <div className="mt-9 flex flex-wrap items-center gap-4">
        <a
          href="#contatti"
          className="group inline-flex items-center gap-2 rounded-full bg-brand px-7 py-4 text-base font-semibold text-white transition-transform hover:-translate-y-0.5 hover:bg-brand-dark"
        >
          Prenota una consulenza gratuita
          <IconArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </a>
        <a
          href="#approccio"
          className="inline-flex items-center gap-2 rounded-full border border-white/40 px-7 py-4 text-base font-semibold text-white transition-colors hover:border-white hover:bg-white/10"
        >
          Scopri il nostro metodo
        </a>
      </div>

      <p className="mt-7 text-sm text-white/70">
        <span className="font-semibold text-gold-light">ROI &gt;24%</span> sulle operazioni
        selezionate per i nostri investitori
      </p>
    </>
  );
}

// ---------------------------------------------------------------------------
// Cinematic journey: one pinned region, the hero video scrubbed by scroll,
// three chapters (Hero, Approccio, Aree di intervento) fading in and out as
// the camera pushes in on the villa. Settles into the real page below.
// ---------------------------------------------------------------------------

const BANDS = {
  hero: [0.0, 0.28] as const,
  approccio: [0.33, 0.61] as const,
  aree: [0.66, 1.0] as const,
};

// Scaled to keep roughly the same vh-per-second pacing as the original
// 10s single-shot video (~38vh/s) now that the chained video runs ~18s
// (villa exterior -> interior -> pool), so each chapter still gets a
// comfortable scroll plateau.
const JOURNEY_HEIGHT_VH = 680;

function CinematicJourney() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const approccioRef = useRef<HTMLDivElement>(null);
  const areeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const wrap = wrapRef.current;
    const video = videoRef.current;
    if (!wrap || !video) return;

    const bandEls: { key: keyof typeof BANDS; el: HTMLDivElement | null }[] = [
      { key: "hero", el: heroRef.current },
      { key: "approccio", el: approccioRef.current },
      { key: "aree", el: areeRef.current },
    ];
    const cache: Record<string, { op: number; k: number }> = {
      hero: { op: -1, k: -1 },
      approccio: { op: -1, k: -1 },
      aree: { op: -1, k: -1 },
    };

    let rafId: number | null = null;
    let target = 0;
    let shown = 0;
    let lastTick = 0;
    let seekBusy = false;
    let pendingTime: number | null = null;
    // Assumed on-screen until the IntersectionObserver proves otherwise: the
    // loop must not depend on that async first callback to bootstrap itself,
    // only to stop early once the journey has genuinely scrolled out of view.
    let heroOnScreen = true;
    let loadStart = performance.now();
    let cancelled = false;
    let blobUrl: string | null = null;

    const clamp = (v: number, lo: number, hi: number) => Math.min(hi, Math.max(lo, v));
    const smoothstep = (p: number, e0: number, e1: number) => {
      const t = clamp((p - e0) / (e1 - e0), 0, 1);
      return t * t * (3 - 2 * t);
    };

    function heroProgress() {
      const total = wrap!.offsetHeight - window.innerHeight;
      if (total <= 0) return 1;
      const scrolled = -wrap!.getBoundingClientRect().top;
      return clamp(scrolled / total, 0, 1);
    }

    function requestSeek(t: number) {
      if (!video!.duration || Number.isNaN(video!.duration)) return;
      if (seekBusy) {
        pendingTime = t;
        return;
      }
      seekBusy = true;
      video!.currentTime = t;
    }

    function onSeeked() {
      seekBusy = false;
      if (pendingTime !== null) {
        const t = pendingTime;
        pendingTime = null;
        requestSeek(t);
      }
    }
    function onVideoError() {
      seekBusy = false;
      pendingTime = null;
    }

    function updateBand(key: keyof typeof BANDS, el: HTMLDivElement | null, p: number, loadK: number) {
      if (!el) return;
      const [a, b] = BANDS[key];
      const f = Math.min(0.02, (b - a) / 3);
      const opacity =
        key === "hero"
          ? 1 - smoothstep(p, b - f, b) // first band opens settled, skips the ease-in
          : smoothstep(p, a, a + f) * (1 - smoothstep(p, b - f, b));
      const ramp = Math.min(0.025, (b - a) * 0.35);
      let k = clamp((p - a) / ramp, 0, 1);
      if (key === "hero") k = Math.max(k, loadK);

      const opR = Math.round(opacity * 1000) / 1000;
      const kR = Math.round(k * 1000) / 1000;
      const c = cache[key];
      if (c.op !== opR) {
        el.style.opacity = String(opR);
        el.style.pointerEvents = opR > 0.05 ? "auto" : "none";
        c.op = opR;
      }
      if (c.k !== kR) {
        el.style.setProperty("--k", String(kR));
        c.k = kR;
      }
    }

    function tick(now: number) {
      const dt = Math.min(100, now - (lastTick || now));
      lastTick = now;
      const smoothing = 0.16;
      shown += (target - shown) * (1 - Math.pow(1 - smoothing, dt / 16.667));
      const loadK = clamp((now - loadStart) / 900, 0, 1);

      if (Math.abs(target - shown) < 0.0005) {
        shown = target;
        rafId = null;
        lastTick = 0;
      } else {
        rafId = requestAnimationFrame(tick);
      }

      requestSeek(shown * (video!.duration || 10));
      bandEls.forEach(({ key, el }) => updateBand(key, el, shown, loadK));
    }

    function onScroll() {
      target = heroProgress();
      if (rafId === null && heroOnScreen) rafId = requestAnimationFrame(tick);
    }

    const io = new IntersectionObserver(
      ([entry]) => {
        heroOnScreen = entry?.isIntersecting ?? false;
        if (heroOnScreen && rafId === null) rafId = requestAnimationFrame(tick);
      },
      { threshold: 0 },
    );
    io.observe(wrap);

    video!.addEventListener("seeked", onSeeked);
    video!.addEventListener("error", onVideoError);

    // Small clip (<8MB): fetch the whole thing as a Blob so scrubbing never
    // stalls on a network seek. Vercel does support Range requests, but a
    // fully-buffered clip is smoother regardless and this file is tiny.
    fetch(VIDEO_MP4)
      .then((r) => r.blob())
      .then((blob) => {
        if (cancelled) return;
        blobUrl = URL.createObjectURL(blob);
        video!.src = blobUrl;
        video!.load();
        video!.addEventListener(
          "loadedmetadata",
          () => {
            loadStart = performance.now();
            onScroll();
          },
          { once: true },
        );
      })
      .catch(() => {
        /* video.error fallback: bands still render over the poster */
      });

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    return () => {
      cancelled = true;
      window.removeEventListener("scroll", onScroll);
      if (rafId !== null) cancelAnimationFrame(rafId);
      io.disconnect();
      video!.removeEventListener("seeked", onSeeked);
      video!.removeEventListener("error", onVideoError);
      if (blobUrl) URL.revokeObjectURL(blobUrl);
    };
  }, []);

  return (
    <div ref={wrapRef} id="main" className="relative" style={{ height: `${JOURNEY_HEIGHT_VH}vh` }}>
      <div className="sticky top-0 h-screen w-full overflow-hidden bg-ink">
        <div className="absolute inset-0" aria-hidden="true">
          <Image src={POSTER} alt="" fill priority sizes="100vw" className="object-cover" />
          <video
            ref={videoRef}
            className="absolute inset-0 h-full w-full object-cover [will-change:transform]"
            muted
            playsInline
            preload="none"
            aria-hidden="true"
            tabIndex={-1}
          >
            <source src={VIDEO_WEBM} type="video/webm" />
            <source src={VIDEO_MP4} type="video/mp4" />
          </video>
          <div
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(ellipse 120% 90% at 50% 45%, rgba(18,36,43,0) 35%, rgba(18,36,43,0.62) 100%)",
            }}
          />
        </div>

        <div ref={heroRef} className="absolute inset-0 flex items-end" style={{ opacity: 1 }}>
          <Container className="w-full pb-16 sm:pb-20 lg:pb-24">
            <div className="max-w-2xl rounded-[28px] bg-ink/80 p-8 shadow-2xl shadow-ink/30 backdrop-blur-sm sm:p-10 lg:p-12">
              <HeroBandContent />
            </div>
          </Container>
        </div>

        <div ref={approccioRef} className="absolute inset-0 flex items-center" style={{ opacity: 0 }}>
          <Container className="w-full">
            <div className="max-w-xl rounded-[28px] bg-ink/80 p-8 shadow-2xl shadow-ink/30 backdrop-blur-sm sm:p-10 lg:p-12">
              <p className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-sm font-medium text-white/90">
                <span className="h-1.5 w-1.5 rounded-full bg-gold" />
                Chi siamo
              </p>
              <h2 className="font-display font-bold leading-[1.05] tracking-tight text-[clamp(1.9rem,3.6vw,2.75rem)] text-white text-balance">
                Un approccio da consulenti, non da agenzia.
              </h2>
              <p className="mt-5 max-w-lg text-lg leading-relaxed text-white/85">
                Trasformiamo ogni operazione in un&apos;esperienza di successo, con trasparenza e
                metodo, come farebbe un consulente per il patrimonio dei propri clienti.
              </p>
              <p className="mt-6 text-sm font-medium uppercase tracking-[0.18em] text-gold-light">
                Sicurezza · Innovazione · Sostenibilità · Rapidità
              </p>
            </div>
          </Container>
        </div>

        <div ref={areeRef} className="absolute inset-0 flex items-center" style={{ opacity: 0 }}>
          <Container className="w-full">
            <div className="max-w-xl rounded-[28px] bg-ink/80 p-8 shadow-2xl shadow-ink/30 backdrop-blur-sm sm:p-10 lg:p-12">
              <p className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-sm font-medium text-white/90">
                <span className="h-1.5 w-1.5 rounded-full bg-gold" />
                Aree di intervento
              </p>
              <h2 className="font-display font-bold leading-[1.05] tracking-tight text-[clamp(1.9rem,3.6vw,2.75rem)] text-white text-balance">
                Un percorso dedicato, per ogni esigenza.
              </h2>
              <p className="mt-5 max-w-lg text-lg leading-relaxed text-white/85">
                Investitori. Venditori. Acquirenti. Situazioni complesse come eredità e
                ristrutturazioni. Un approccio su misura per ciascuno.
              </p>
            </div>
          </Container>
        </div>
      </div>
    </div>
  );
}
