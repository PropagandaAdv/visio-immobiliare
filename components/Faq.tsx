"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { IconChevronDown } from "@/components/icons";

const FAQS = [
  {
    q: "Posso vendere un immobile che ho appena ereditato?",
    a: "Sì, è possibile vendere immobili ereditati, ma è fondamentale che siano stati completati tutti i passaggi richiesti dalla successione — come dichiarazione e accettazione dell'eredità — e che la documentazione sia in regola. Visio ti supporta anche nella gestione delle pratiche specifiche legate all'eredità, così da arrivare alla vendita senza intoppi.",
  },
  {
    q: "Come posso gestire un immobile in cattivo stato o da ristrutturare?",
    a: "Un immobile da ristrutturare non è un problema, ma spesso un'opportunità di valore non ancora espresso. Valutiamo insieme la soluzione più adatta: vendita as-is a investitori interessati alla riqualificazione, oppure un percorso di valorizzazione mirata prima della vendita, per aumentare il prezzo finale senza anticipare costi inutili.",
  },
  {
    q: "E se ho problemi finanziari e devo vendere rapidamente?",
    a: "In questi casi il tempo è la variabile più critica. Attiviamo un percorso di vendita accelerato, con valorizzazione essenziale dell'immobile e una rete di acquirenti già qualificati, per arrivare a un rogito certo nei tempi più brevi possibili, tutelando comunque il valore della tua proprietà.",
  },
  {
    q: "Se l'immobile è in comproprietà, tutti devono essere d'accordo per vendere?",
    a: "Nella maggior parte dei casi sì, la vendita richiede il consenso di tutti i comproprietari. Se in famiglia non c'è ancora accordo, ti affianchiamo anche nella mediazione tra le parti e nella definizione delle quote, per arrivare a una soluzione condivisa prima di mettere l'immobile sul mercato.",
  },
  {
    q: "Quanto tempo richiede il processo di consulenza, dalla prima chiamata alla chiusura?",
    a: "Dopo la prima consulenza gratuita definiamo insieme obiettivi e tempistiche realistiche in base al tuo caso. Una vendita standard segue un percorso di valorizzazione, promozione e trattativa che generalmente si conclude in poche settimane; le operazioni di investimento hanno tempi dedicati, comunicati con chiarezza prima di partire.",
  },
  {
    q: "Quanto costa affidarsi a Visio Immobiliare?",
    a: "La prima consulenza è sempre gratuita e senza impegno: serve a capire fattibilità, obiettivi e il tipo di percorso più adatto. Solo dopo questa fase ricevi una proposta economica chiara, senza costi nascosti, calibrata sull'operazione specifica — che si tratti di una vendita, un acquisto o un investimento.",
  },
  {
    q: "Quali tipologie di investimento immobiliare seguite?",
    a: "Seguiamo operazioni ad alto potenziale con ROI superiore alla media: dalla valorizzazione di immobili sottostimati, alla riqualificazione sostenibile, fino a progetti più innovativi che integrano tecnologie digitali avanzate. Ogni opportunità viene selezionata con rigore e monitorata passo dopo passo.",
  },
  {
    q: "Cosa serve per iniziare un percorso con voi?",
    a: "Basta prenotare una prima consulenza gratuita: ci racconti la tua situazione — che tu voglia vendere, acquistare o investire — e insieme valutiamo fattibilità, tempi e passi successivi. Nessun impegno prima di aver ricevuto un quadro chiaro della strategia più adatta a te.",
  },
];

export function Faq() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="bg-paper py-24 lg:py-32">
      <Container>
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Reveal>
              <span className="text-sm font-semibold uppercase tracking-[0.18em] text-brand">FAQ</span>
            </Reveal>
            <Reveal delay={0.05}>
              <h2 className="mt-4 font-display text-[clamp(2rem,4vw,3rem)] font-bold leading-[1.08] tracking-tight text-ink text-balance">
                Le domande che ci fanno più spesso.
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mt-6 text-base leading-relaxed text-muted">
                Non hai trovato risposta alla tua domanda? Scrivici: la prima consulenza è sempre
                gratuita e senza impegno.
              </p>
            </Reveal>
          </div>

          <div className="lg:col-span-8">
            <div className="divide-y divide-line border-y border-line">
              {FAQS.map((faq, i) => {
                const isOpen = openIndex === i;
                return (
                  <div key={faq.q}>
                    <button
                      type="button"
                      onClick={() => setOpenIndex(isOpen ? null : i)}
                      className="flex w-full items-center justify-between gap-6 py-6 text-left"
                      aria-expanded={isOpen}
                    >
                      <span className="font-display text-lg font-semibold text-ink">{faq.q}</span>
                      <motion.span
                        animate={{ rotate: isOpen ? 180 : 0 }}
                        transition={{ duration: 0.25 }}
                        className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-line text-ink"
                      >
                        <IconChevronDown className="h-4 w-4" />
                      </motion.span>
                    </button>
                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                          className="overflow-hidden"
                        >
                          <p className="max-w-xl pb-6 text-base leading-relaxed text-muted">{faq.a}</p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
