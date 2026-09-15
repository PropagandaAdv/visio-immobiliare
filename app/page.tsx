import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { Approccio } from "@/components/Approccio";
import { AreeIntervento } from "@/components/AreeIntervento";
import { PercheVisio } from "@/components/PercheVisio";
import { Faq } from "@/components/Faq";
import { Aggiornamenti } from "@/components/Aggiornamenti";
import { CtaChiusura } from "@/components/CtaChiusura";
import { Contatti } from "@/components/Contatti";
import { Footer } from "@/components/Footer";

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "RealEstateAgent",
  name: "Visio Immobiliare",
  legalName: "Visio S.r.l.",
  url: "https://visioimmobiliare.it",
  email: "info@visioimmobiliare.it",
  image: "https://visioimmobiliare.it/generated/hero-villa.jpg",
  logo: "https://visioimmobiliare.it/icon.svg",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Via Ugo Tognazzi 1/B",
    addressLocality: "Ferrara",
    addressRegion: "FE",
    addressCountry: "IT",
  },
  areaServed: ["Ferrara", "Bologna", "Ravenna", "Emilia-Romagna", "IT"],
  founder: [
    { "@type": "Person", name: "Luca Luciani" },
    { "@type": "Person", name: "Riccardo Farina Foschi" },
  ],
  sameAs: [],
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Header />
      <main>
        <Hero />
        <Approccio />
        <AreeIntervento />
        <PercheVisio />
        <Faq />
        <Aggiornamenti />
        <CtaChiusura />
        <Contatti />
      </main>
      <Footer />
    </>
  );
}
