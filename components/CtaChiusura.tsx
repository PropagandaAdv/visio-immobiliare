import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { IconArrowUpRight } from "@/components/icons";

export function CtaChiusura() {
  return (
    <section className="relative overflow-hidden bg-brand py-20 text-white lg:py-24">
      <div className="pointer-events-none absolute -left-32 -top-32 h-[420px] w-[420px] rounded-full bg-gold/20" aria-hidden="true" />
      <div className="pointer-events-none absolute -right-24 -bottom-24 h-[320px] w-[320px] rounded-full bg-white/10" aria-hidden="true" />
      <Container className="relative">
        <div className="flex flex-col items-start gap-8 lg:flex-row lg:items-center lg:justify-between">
          <Reveal className="max-w-2xl">
            <h2 className="font-display text-[clamp(1.9rem,3.6vw,2.75rem)] font-bold leading-[1.1] tracking-tight text-balance">
              Sei pronto a trasformare la tua visione in realtà?
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-white/85">
              Il tuo patrimonio merita di crescere in mani sicure: operazioni selezionate, gestione
              completa, risultati concreti.
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <a
              href="#contatti"
              className="group inline-flex items-center gap-2 whitespace-nowrap rounded-full bg-white px-8 py-4 text-base font-semibold text-brand transition-transform hover:-translate-y-0.5"
            >
              Richiedi una consulenza gratuita
              <IconArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
