import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { IconShield, IconSpark, IconLeaf, IconBolt } from "@/components/icons";

const PILASTRI = [
  {
    icon: IconShield,
    title: "Sicurezza",
    text: "Transazioni protette e opportunità verificate, con la massima trasparenza su ogni fase dell'operazione.",
  },
  {
    icon: IconSpark,
    title: "Innovazione",
    text: "Un approccio digitale avanzato, con strumenti di monitoraggio e progetti evoluti per il mercato immobiliare moderno.",
  },
  {
    icon: IconLeaf,
    title: "Sostenibilità",
    text: "Selezioniamo immobili green e a basso impatto ambientale, per un patrimonio che ha valore anche nel tempo.",
  },
  {
    icon: IconBolt,
    title: "Rapidità",
    text: "Processi ottimizzati e tempi ridotti, per ottenere risultati concreti e duraturi senza rallentamenti inutili.",
  },
];

const VALORI = ["Integrità", "Innovazione", "Eccellenza", "Cliente"];

export function Approccio() {
  return (
    <section id="approccio" className="bg-paper py-24 lg:py-32">
      <Container>
        <div className="grid grid-cols-1 items-center gap-14 lg:grid-cols-12">
          <div className="lg:col-span-6">
            <Reveal>
              <span className="text-sm font-semibold uppercase tracking-[0.18em] text-brand">Chi siamo</span>
            </Reveal>
            <Reveal delay={0.05}>
              <h2 className="mt-4 font-display text-[clamp(2rem,4vw,3rem)] font-bold leading-[1.08] tracking-tight text-ink text-balance">
                Un approccio da consulenti, non da agenzia.
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted">
                Visio Immobiliare guida i propri clienti nel complesso mondo immobiliare con
                trasparenza, competenza e una visione chiara, trasformando ogni operazione in
                un&apos;esperienza di successo e valore duraturo. Non ci limitiamo a mettere in
                contatto domanda e offerta: analizziamo, selezioniamo e gestiamo ogni operazione
                come farebbe un consulente per il patrimonio dei propri clienti.
              </p>
            </Reveal>
            <Reveal delay={0.15}>
              <p className="mt-4 max-w-xl text-base leading-relaxed text-muted">
                Offriamo operazioni immobiliari selezionate con rigore, gestite in modo professionale
                e trasparente, per massimizzare il ritorno dei nostri investitori e realizzare i
                progetti di chi vende o acquista casa — con governance trasparente in ogni fase.
              </p>
            </Reveal>

            <Reveal delay={0.2}>
              <div className="mt-9 flex flex-wrap gap-3">
                {VALORI.map((valore) => (
                  <span
                    key={valore}
                    className="rounded-full border border-line bg-card px-4 py-2 text-sm font-medium text-ink-soft"
                  >
                    {valore}
                  </span>
                ))}
              </div>
            </Reveal>

            <Reveal delay={0.25}>
              <p className="mt-6 text-sm leading-relaxed text-muted">
                Fondato da <span className="font-semibold text-ink">Luca Luciani</span> e{" "}
                <span className="font-semibold text-ink">Riccardo Farina Foschi</span>, lo studio
                unisce competenza tecnica ed esperienza diretta sul mercato immobiliare di Ferrara e
                del territorio.
              </p>
            </Reveal>
          </div>

          <Reveal delay={0.15} className="lg:col-span-6">
            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-[28px] shadow-xl shadow-ink/5">
              <Image
                src="/generated/approccio-office.png"
                alt="Consulenti Visio Immobiliare al lavoro su un progetto immobiliare in uno studio luminoso e minimale"
                fill
                sizes="(min-width: 1024px) 45vw, 90vw"
                className="object-cover"
              />
            </div>
          </Reveal>
        </div>

        <div className="mt-20 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:mt-24 lg:grid-cols-4">
          {PILASTRI.map((pilastro, i) => (
            <Reveal key={pilastro.title} delay={0.1 + i * 0.08}>
              <div className="h-full rounded-2xl border border-line bg-paper-warm p-7 transition-shadow hover:shadow-[0_20px_50px_-30px_rgba(18,36,43,0.25)]">
                <span className="flex h-11 w-11 items-center justify-center rounded-full bg-brand/10 text-brand">
                  <pilastro.icon className="h-5 w-5" />
                </span>
                <h3 className="mt-5 font-display text-lg font-semibold text-ink">{pilastro.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{pilastro.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
