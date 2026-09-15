"use client";

import { useState, type FormEvent } from "react";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { IconMail, IconPin, IconArrowUpRight } from "@/components/icons";

const CONTACT_EMAIL = "info@visioimmobiliare.it";

const RICHIESTE = ["Vendere un immobile", "Acquistare un immobile", "Investire", "Altra richiesta"];

export function Contatti() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [type, setType] = useState(RICHIESTE[0]);
  const [message, setMessage] = useState("");

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const subject = `Richiesta consulenza — ${type}`;
    const body = [
      `Nome: ${name}`,
      `Email: ${email}`,
      phone ? `Telefono: ${phone}` : null,
      `Tipo di richiesta: ${type}`,
      "",
      message,
    ]
      .filter(Boolean)
      .join("\n");
    window.location.href = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  }

  return (
    <section id="contatti" className="relative overflow-hidden bg-ink py-24 text-white lg:py-32">
      <div className="pointer-events-none absolute -right-32 -bottom-32 h-[420px] w-[420px] rounded-full bg-brand/30" aria-hidden="true" />
      <Container className="relative">
        <div className="grid grid-cols-1 gap-16 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <Reveal>
              <span className="text-sm font-semibold uppercase tracking-[0.18em] text-gold-light">Contatti</span>
            </Reveal>
            <Reveal delay={0.05}>
              <h2 className="mt-4 font-display text-[clamp(2rem,4vw,3rem)] font-bold leading-[1.08] tracking-tight text-balance">
                Restiamo in contatto.
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mt-6 max-w-md text-lg leading-relaxed text-white/75">
                Raccontaci se vuoi vendere, acquistare o investire: la prima consulenza è gratuita e
                senza impegno.
              </p>
            </Reveal>
            <Reveal delay={0.15}>
              <ul className="mt-8 space-y-4 text-base text-white/80">
                <li className="flex items-center gap-3">
                  <IconMail className="h-5 w-5 shrink-0 text-gold-light" />
                  <a href={`mailto:${CONTACT_EMAIL}`} className="hover:text-white">{CONTACT_EMAIL}</a>
                </li>
                <li className="flex items-center gap-3">
                  <IconPin className="h-5 w-5 shrink-0 text-gold-light" />
                  <span>Via Ugo Tognazzi 1/B, Ferrara (FE)</span>
                </li>
              </ul>
            </Reveal>
          </div>

          <Reveal delay={0.15} className="lg:col-span-7">
            <form onSubmit={handleSubmit} className="rounded-[28px] bg-white p-8 text-ink sm:p-10">
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                <div className="sm:col-span-1">
                  <label htmlFor="name" className="text-sm font-medium text-ink-soft">
                    Nome e cognome
                  </label>
                  <input
                    id="name"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="mt-2 w-full rounded-xl border border-line bg-paper-warm px-4 py-3 text-base outline-none transition-colors focus:border-brand"
                    placeholder="Mario Rossi"
                  />
                </div>
                <div className="sm:col-span-1">
                  <label htmlFor="email" className="text-sm font-medium text-ink-soft">
                    Email
                  </label>
                  <input
                    id="email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="mt-2 w-full rounded-xl border border-line bg-paper-warm px-4 py-3 text-base outline-none transition-colors focus:border-brand"
                    placeholder="mario@email.it"
                  />
                </div>
                <div className="sm:col-span-1">
                  <label htmlFor="phone" className="text-sm font-medium text-ink-soft">
                    Telefono
                  </label>
                  <input
                    id="phone"
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="mt-2 w-full rounded-xl border border-line bg-paper-warm px-4 py-3 text-base outline-none transition-colors focus:border-brand"
                    placeholder="+39 333 123 4567"
                  />
                </div>
                <div className="sm:col-span-1">
                  <label htmlFor="type" className="text-sm font-medium text-ink-soft">
                    Tipo di richiesta
                  </label>
                  <select
                    id="type"
                    value={type}
                    onChange={(e) => setType(e.target.value)}
                    className="mt-2 w-full rounded-xl border border-line bg-paper-warm px-4 py-3 text-base outline-none transition-colors focus:border-brand"
                  >
                    {RICHIESTE.map((r) => (
                      <option key={r} value={r}>
                        {r}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="sm:col-span-2">
                  <label htmlFor="message" className="text-sm font-medium text-ink-soft">
                    Il tuo messaggio
                  </label>
                  <textarea
                    id="message"
                    required
                    rows={4}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="mt-2 w-full resize-none rounded-xl border border-line bg-paper-warm px-4 py-3 text-base outline-none transition-colors focus:border-brand"
                    placeholder="Raccontaci la tua situazione e i tuoi obiettivi..."
                  />
                </div>
              </div>

              <button
                type="submit"
                className="group mt-7 inline-flex w-full items-center justify-center gap-2 rounded-full bg-brand px-7 py-4 text-base font-semibold text-white transition-colors hover:bg-brand-dark sm:w-auto"
              >
                Invia richiesta
                <IconArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </button>
              <p className="mt-4 text-xs leading-relaxed text-muted">
                Invio tramite il tuo client email predefinito, verso {CONTACT_EMAIL}.
              </p>
            </form>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
