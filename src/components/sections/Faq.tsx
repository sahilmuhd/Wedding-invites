import { Plus } from "lucide-react";
import { faqs } from "@/config/content";
import { SectionHeading } from "@/components/ui/SectionHeading";

/** Native <details> accordion: keyboard and screen-reader accessible, zero JavaScript. */
export function Faq() {
  return (
    <section id="faq" aria-labelledby="faq-title" className="bg-beige/50 py-24 sm:py-32">
      <div className="mx-auto max-w-3xl px-4 sm:px-8">
        <SectionHeading id="faq-title" align="center" eyebrow="FAQ" title={<>Good <em className="text-gold-deep">questions</em>.</>} />
        <div className="mt-12 divide-y divide-charcoal/15 border-y border-charcoal/15">
          {faqs.map((f) => (
            <details key={f.q} className="group">
              <summary className="flex min-h-14 cursor-pointer items-center justify-between gap-6 py-5 font-serif text-xl sm:text-2xl">
                {f.q}
                <Plus className="faq-plus size-5 shrink-0 text-gold-deep transition-transform" aria-hidden="true" />
              </summary>
              <p className="pb-6 pr-10 leading-relaxed text-ink-soft">{f.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
