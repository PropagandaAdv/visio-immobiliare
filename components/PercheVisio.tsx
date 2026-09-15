import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { IconQuote } from "@/components/icons";

const PUNTI_FORZA = [
  { value: "ROI > 24%", label: "sulle operazioni selezionate per gli investitori" },
  { value: "Governance trasparente", label: "controllo e rendicontazione chiara in ogni fase" },
  { value: "Monitoraggio digitale", label: "strumenti innovativi per seguire ogni operazione" },
];

const TESTIMONIANZE = [
  {
    quote:
      "Grazie a Luca e Riccardo ho finalmente venduto la mia casa senza correre rischi o stress. Erano sempre disponibili a rispondere a ogni mia domanda, guidandomi con chiarezza e trasparenza dall'inizio alla fine.",
    author: "Rossana",
    city: "Bologna",
  },
  {
    quote:
      "Ho deciso di affidare la vendita del mio appartamento a Visio Immobiliare in un momento in cui avevo bisogno di chiudere velocemente la trattativa. Hanno gestito ogni dettaglio in modo impeccabile.",
    author: "Paolo",
    city: "Ferrara",
  },
  {
    quote:
      "Gestire la casa ereditata da mia nonna sembrava un'impresa impossibile finché non ho incontrato Luca e Riccardo. La loro competenza mi ha dato sicurezza nel negoziare con i diversi potenziali acquirenti.",
    author: "Roberto",
    city: "Ferrara",
  },
  {
    quote:
      "Grazie a Visio Immobiliare sto trasformando un sogno bloccato da tempo in realtà. La loro capacità di valorizzare i miei desideri con una strategia di presentazione ottimale ha fatto la differenza.",
    author: "Lara",
    city: "Ravenna",
  },
];

export function PercheVisio() {
  return (
    <section id="perche" className="relative overflow-hidden bg-ink py-24 text-white lg:py-32">
      <div className="absolute inset-0" aria-hidden="true">
        <Image
          src="/generated/perche-texture.png"
          alt=""
          fill
          sizes="100vw"
          className="object-cover opacity-50"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-ink via-ink/80 to-ink" />
      </div>

      <Container className="relative">
        <div className="max-w-2xl">
          <Reveal>
            <span className="text-sm font-semibold uppercase tracking-[0.18em] text-gold-light">Perché Visio Immobiliare</span>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="mt-4 font-display text-[clamp(2rem,4vw,3rem)] font-bold leading-[1.08] tracking-tight text-balance">
              La fiducia dei nostri clienti, prima di ogni promessa.
            </h2>
          </Reveal>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-10 sm:grid-cols-3">
          {PUNTI_FORZA.map((punto, i) => (
            <Reveal key={punto.value} delay={0.1 + i * 0.1}>
              <div className="border-t border-line-dark pt-6">
                <span className="font-display text-2xl font-bold text-white sm:text-3xl">{punto.value}</span>
                <p className="mt-3 text-sm leading-relaxed text-white/65">{punto.label}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <div className="mt-20 grid grid-cols-1 gap-6 lg:grid-cols-2">
          {TESTIMONIANZE.map((t, i) => (
            <Reveal key={t.author} delay={0.1 + i * 0.06}>
              <figure className="h-full rounded-2xl border border-line-dark bg-white/5 p-7 backdrop-blur-sm">
                <IconQuote className="h-7 w-7 text-gold" />
                <blockquote className="mt-4 text-base leading-relaxed text-white/85">
                  &ldquo;{t.quote}&rdquo;
                </blockquote>
                <figcaption className="mt-5 text-sm font-semibold text-white/70">
                  {t.author} <span className="font-normal text-white/45">— {t.city}</span>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
