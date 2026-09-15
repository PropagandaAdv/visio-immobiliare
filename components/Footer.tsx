import { Container } from "@/components/ui/Container";
import { Logo } from "@/components/Logo";
import { IconMail, IconPhone, IconPin } from "@/components/icons";

const NAV_COLUMNS = [
  {
    title: "Studio",
    links: [
      { label: "Chi siamo", href: "#approccio" },
      { label: "Aree di intervento", href: "#aree" },
      { label: "Perché Visio", href: "#perche" },
      { label: "Aggiornamenti", href: "#aggiornamenti" },
    ],
  },
  {
    title: "Assistenza",
    links: [
      { label: "FAQ", href: "#faq" },
      { label: "Contatti", href: "#contatti" },
      { label: "Prenota una consulenza", href: "#contatti" },
    ],
  },
];

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-ink text-white">
      <Container className="py-16 lg:py-20">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Logo variant="white" />
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-white/60">
              Consulenza immobiliare per privati e investitori: trasformiamo la vostra visione in
              operazioni sicure, innovative e sostenibili.
            </p>
            <ul className="mt-6 space-y-3 text-sm text-white/70">
              <li className="flex items-start gap-2">
                <IconMail className="mt-0.5 h-4 w-4 shrink-0 text-gold-light" />
                <a href="mailto:info@visioimmobiliare.it" className="hover:text-white">
                  info@visioimmobiliare.it
                </a>
              </li>
              <li className="flex items-start gap-2">
                <IconPin className="mt-0.5 h-4 w-4 shrink-0 text-gold-light" />
                <span>Via Ugo Tognazzi 1/B, Ferrara (FE)</span>
              </li>
            </ul>
          </div>

          <div className="grid grid-cols-2 gap-8 lg:col-span-5 lg:grid-cols-2">
            {NAV_COLUMNS.map((col) => (
              <div key={col.title}>
                <p className="text-sm font-semibold uppercase tracking-[0.14em] text-white/40">{col.title}</p>
                <ul className="mt-5 space-y-3">
                  {col.links.map((link) => (
                    <li key={link.label}>
                      <a href={link.href} className="text-sm text-white/70 transition-colors hover:text-white">
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="lg:col-span-3">
            <p className="text-sm font-semibold uppercase tracking-[0.14em] text-white/40">Dati legali</p>
            <ul className="mt-5 space-y-2 text-xs leading-relaxed text-white/60">
              <li>Visio S.r.l.</li>
              <li>P.IVA / C.F. 02181550381</li>
              <li>REA FE-258336</li>
              <li>Registro Imprese di Ferrara</li>
              <li>Capitale sociale €10.000,00 i.v.</li>
              <li>PEC: visioimmobiliare@pec.it</li>
            </ul>
            <a
              href="#contatti"
              className="mt-6 inline-flex items-center rounded-full border border-white/25 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:border-white"
            >
              Prenota una consulenza
            </a>
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-3 border-t border-line-dark pt-8 text-xs text-white/40 sm:flex-row sm:items-center sm:justify-between">
          <p>© {year} Visio S.r.l. — Tutti i diritti riservati</p>
          <p>Ferrara (FE), Italia</p>
        </div>
      </Container>
    </footer>
  );
}
