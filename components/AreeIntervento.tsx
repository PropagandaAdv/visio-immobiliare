import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { IconBuilding, IconKey, IconDocument, IconTool } from "@/components/icons";

const AREE = [
  {
    icon: IconBuilding,
    tag: "Per investitori",
    title: "Investimenti immobiliari ad alto potenziale",
    text: "Operazioni selezionate con rigore, ROI superiore alla media e governance trasparente su ogni fase, con monitoraggio digitale costante dell'investimento.",
    image: "/generated/aree-skyline.png",
    alt: "Skyline urbano visto attraverso una vetrata, simbolo di opportunità di investimento immobiliare selezionate",
  },
  {
    icon: IconKey,
    tag: "Per venditori",
    title: "Vendita strategica dell'immobile",
    text: "Gestiamo l'intero processo — assistenza legale e amministrativa, valorizzazione, marketing e trattativa — per vendite rapide, sicure e al massimo valore possibile.",
    image: "/generated/aree-entrance.png",
    alt: "Ingresso elegante di un'abitazione italiana valorizzata per la vendita da Visio Immobiliare",
  },
  {
    icon: IconDocument,
    tag: "Per acquirenti",
    title: "Acquisto chiavi in mano",
    text: "Dalla ricerca dell'opportunità alla consegna dell'immobile: un servizio a zero pensieri, con nuove metodologie costruttive e nessun dettaglio lasciato al caso.",
    image: "/generated/aree-living.png",
    alt: "Soggiorno luminoso e curato, esempio di immobile seguito da Visio Immobiliare per l'acquirente",
  },
  {
    icon: IconTool,
    tag: "Situazioni complesse",
    title: "Eredità, ristrutturazioni e difficoltà finanziarie",
    text: "Supportiamo chi ha ereditato un immobile, chi deve valorizzare una proprietà da ristrutturare o chi ha bisogno di vendere rapidamente per motivi finanziari, gestendo ogni pratica.",
    image: "/generated/aree-renovation.png",
    alt: "Spazio in fase di ristrutturazione con travi in legno chiaro e pareti fresche di intonaco",
  },
];

export function AreeIntervento() {
  return (
    <section id="aree" className="bg-paper-warm py-24 lg:py-32">
      <Container>
        <div className="max-w-2xl">
          <Reveal>
            <span className="text-sm font-semibold uppercase tracking-[0.18em] text-brand">Aree di intervento</span>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="mt-4 font-display text-[clamp(2rem,4vw,3rem)] font-bold leading-[1.08] tracking-tight text-ink text-balance">
              Soluzioni su misura per ogni esigenza immobiliare.
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-6 text-lg leading-relaxed text-muted">
              Che siate investitori, venditori o acquirenti — o che vi troviate in una situazione più
              complessa — costruiamo un percorso dedicato, con approcci personalizzati e risultati
              misurabili.
            </p>
          </Reveal>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-2">
          {AREE.map((area, i) => (
            <Reveal key={area.title} delay={0.1 + i * 0.08}>
              <article className="group h-full overflow-hidden rounded-[24px] border border-line bg-paper transition-shadow hover:shadow-[0_24px_60px_-30px_rgba(18,36,43,0.25)]">
                <div className="relative aspect-[16/10] w-full overflow-hidden">
                  <Image
                    src={area.image}
                    alt={area.alt}
                    fill
                    sizes="(min-width: 768px) 50vw, 100vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink/55 via-transparent to-transparent" />
                  <span className="absolute left-5 top-5 inline-flex h-11 w-11 items-center justify-center rounded-full bg-paper/95 text-brand">
                    <area.icon className="h-5 w-5" />
                  </span>
                </div>
                <div className="p-7">
                  <p className="text-xs font-semibold uppercase tracking-[0.14em] text-brand">{area.tag}</p>
                  <h3 className="mt-3 font-display text-xl font-semibold leading-snug text-ink">{area.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted">{area.text}</p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
