import { Plus } from "lucide-react";
import { faqTitle, faqs } from "@/config/content";
import { SectionHeading } from "@/components/ui/SectionHeading";

/** Native <details> accordion: keyboard and screen-reader accessible, zero JavaScript. */
export function Faq() {
  return (
    <section id="faq" aria-labelledby="faq-title" className="section">
      <div className="mx-auto max-w-3xl px-5 sm:px-8" data-reveal>
        <SectionHeading id="faq-title" align="center" title={faqTitle} />
        <div className="mt-10 divide-y divide-line border-y border-line md:mt-12">
          {faqs.map((f) => (
            <details key={f.q}>
              <summary className="flex min-h-14 cursor-pointer items-center justify-between gap-6 py-4 font-serif text-lg text-maroon md:text-xl">
                {f.q}
                <Plus className="faq-plus size-5 shrink-0 transition-transform" aria-hidden="true" />
              </summary>
              <p className="pb-5 pr-10 text-ink-soft">{f.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
