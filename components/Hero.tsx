"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { IconArrowUpRight } from "@/components/icons";

// Video is only served at lg+ (>=1024px): on phones/tablets it would cost real
// mobile data and battery for a purely decorative background, so those
// breakpoints keep the static poster instead.
const VIDEO_BREAKPOINT_QUERY = "(min-width: 1024px)";

export function Hero() {
  const reduceMotion = useReducedMotion();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [showVideo, setShowVideo] = useState(false);

  useEffect(() => {
    if (reduceMotion) {
      setShowVideo(false);
      return;
    }
    const mql = window.matchMedia(VIDEO_BREAKPOINT_QUERY);
    const update = () => setShowVideo(mql.matches);
    update();
    mql.addEventListener("change", update);
    return () => mql.removeEventListener("change", update);
  }, [reduceMotion]);

  return (
    <section id="main" className="relative flex min-h-screen items-end overflow-hidden bg-ink">
      <div className="absolute inset-0" aria-hidden="true">
        {showVideo ? (
          <video
            ref={videoRef}
            className="h-full w-full object-cover"
            poster="/generated/hero-villa.jpg"
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            aria-hidden="true"
          >
            <source src="/generated/hero-video.webm" type="video/webm" />
            <source src="/generated/hero-video.mp4" type="video/mp4" />
          </video>
        ) : (
          <Image
            src="/generated/hero-villa.jpg"
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
        )}
        {/* Filmic base wash, lightest at the top so the video reads clearly there */}
        <div className="absolute inset-0 bg-gradient-to-t from-ink/75 via-ink/25 to-ink/10" />
      </div>

      <Container className="relative w-full pb-16 sm:pb-20 lg:pb-24">
        <motion.div
          initial={reduceMotion ? undefined : { opacity: 0, y: 24 }}
          animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-2xl rounded-[28px] bg-ink/80 p-8 shadow-2xl shadow-ink/30 backdrop-blur-sm sm:p-10 lg:p-12"
        >
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
            con un metodo di consulenza — non di semplice intermediazione — fatto di trasparenza,
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
        </motion.div>
      </Container>
    </section>
  );
}
