import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";

const PLACEHOLDER_POSTS = [
  {
    title: "Guida alle operazioni di investimento immobiliare",
    excerpt:
      "Stiamo preparando un primo approfondimento su come selezioniamo e monitoriamo le operazioni per i nostri investitori.",
    image: "/generated/aggiornamenti-1.png",
  },
  {
    title: "Vendere casa senza pensieri: la nostra metodologia",
    excerpt:
      "In arrivo un racconto dettagliato del percorso che seguiamo insieme a chi ci affida la vendita del proprio immobile.",
    image: "/generated/aggiornamenti-2.png",
  },
  {
    title: "Il mercato immobiliare a Ferrara e nel territorio",
    excerpt:
      "Presto pubblicheremo le prime osservazioni dello studio sull'andamento del mercato locale e le opportunità emergenti.",
    image: "/generated/aggiornamenti-3.png",
  },
];

export function Aggiornamenti() {
  return (
    <section id="aggiornamenti" className="bg-paper-warm py-24 lg:py-32">
      <Container>
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div className="max-w-xl">
            <Reveal>
              <span className="text-sm font-semibold uppercase tracking-[0.18em] text-brand">Aggiornamenti</span>
            </Reveal>
            <Reveal delay={0.05}>
              <h2 className="mt-4 font-display text-[clamp(2rem,4vw,3rem)] font-bold leading-[1.08] tracking-tight text-ink text-balance">
                Le attività dello Studio.
              </h2>
            </Reveal>
          </div>
          <Reveal delay={0.1}>
            <p className="max-w-xs text-sm leading-relaxed text-muted">
              Questa sezione ospiterà a breve approfondimenti, analisi di mercato e novità dallo
              Studio Visio Immobiliare.
            </p>
          </Reveal>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-3">
          {PLACEHOLDER_POSTS.map((post, i) => (
            <Reveal key={post.title} delay={0.1 + i * 0.08}>
              <article className="group relative h-full overflow-hidden rounded-2xl border border-line bg-paper transition-shadow hover:shadow-[0_20px_50px_-25px_rgba(18,36,43,0.2)]">
                <div className="relative aspect-[4/3] w-full overflow-hidden">
                  <Image
                    src={post.image}
                    alt=""
                    fill
                    sizes="(min-width: 768px) 33vw, 90vw"
                    className="object-cover opacity-90 transition-transform duration-500 group-hover:scale-105"
                  />
                  <span className="absolute left-4 top-4 rounded-full bg-gold px-3 py-1 text-xs font-semibold text-ink">
                    Contenuto in preparazione
                  </span>
                </div>
                <div className="p-6">
                  <h3 className="font-display text-lg font-semibold leading-snug text-ink">{post.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted">{post.excerpt}</p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
