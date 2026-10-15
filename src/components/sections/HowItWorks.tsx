import { steps } from "@/config/content";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function HowItWorks() {
  return (
    <section id="how" aria-labelledby="how-title" className="bg-charcoal py-24 text-ivory sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-8">
        <div className="[&_h2]:!text-ivory [&_p]:!text-ivory/70 [&_.eyebrow]:!text-gold">
          <SectionHeading id="how-title" eyebrow="How it works" title={<>Three simple <em className="text-gold">steps</em>.</>} />
        </div>
        <ol className="mt-14 grid gap-10 md:grid-cols-3">
          {steps.map((s, i) => (
            <li key={s.title} className="border-t border-gold/50 pt-6">
              <span className="font-serif text-5xl italic text-gold">{String(i + 1).padStart(2, "0")}</span>
              <h3 className="mt-4 font-serif text-3xl">{s.title}</h3>
              <p className="mt-3 leading-relaxed text-ivory/70">{s.text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
