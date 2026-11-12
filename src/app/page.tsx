import { Hero } from "@/components/sections/Hero";
import { Demo } from "@/components/sections/Demo";
import { Designs } from "@/components/sections/Designs";
import { Features } from "@/components/sections/Features";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { GuestDesk } from "@/components/sections/GuestDesk";
import { Pricing } from "@/components/sections/Pricing";
import { Testimonials } from "@/components/sections/Testimonials";
import { Faq } from "@/components/sections/Faq";
import { FinalCta } from "@/components/sections/FinalCta";
import { faqs } from "@/config/content";
import { brand } from "@/config/brand";

export default function Home() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        name: brand.name,
        url: brand.siteUrl,
        logo: `${brand.siteUrl}/brand/icon-maroon.svg`,
        telephone: brand.phoneDisplay,
        slogan: brand.tagline,
        sameAs: [brand.instagramUrl],
      },
      {
        "@type": "FAQPage",
        mainEntity: faqs.map((f) => ({
          "@type": "Question",
          name: f.q,
          acceptedAnswer: { "@type": "Answer", text: f.a },
        })),
      },
    ],
  };
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }} />
      <Hero />
      <Demo />
      <Designs />
      <Features />
      <GuestDesk />
      <HowItWorks />
      <Pricing />
      <Testimonials />
      <Faq />
      <FinalCta />
    </>
  );
}
