import { steps, stepsTitle } from "@/config/content";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function HowItWorks() {
  return (
    <section id="how" aria-labelledby="how-title" className="section">
      <div className="container-page" data-reveal>
        <SectionHeading id="how-title" title={stepsTitle} />
        <ol className="mt-10 grid gap-8 md:mt-14 md:grid-cols-3 md:gap-12">
          {steps.map((s, i) => (
            <li key={s.title} className="border-t border-line pt-5">
              <span className="font-serif text-4xl italic text-maroon" aria-hidden="true">{i + 1}</span>
              <h3 className="mt-3 text-xl leading-snug">{s.title}</h3>
              <p className="mt-2 text-ink-soft">{s.text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
