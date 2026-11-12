import { testimonials } from "@/config/testimonials";
import { testimonialsTitle } from "@/config/content";
import { SectionHeading } from "@/components/ui/SectionHeading";

/** Renders nothing until real, approved testimonials are added in src/config/testimonials.ts. */
export function Testimonials() {
  if (testimonials.length === 0) return null;
  return (
    <section id="couples" aria-labelledby="couples-title" className="section">
      <div className="container-page" data-reveal>
        <SectionHeading id="couples-title" align="center" title={testimonialsTitle} />
        <ul className="mt-10 grid gap-5 md:mt-14 md:grid-cols-3 md:gap-6">
          {testimonials.slice(0, 3).map((t) => (
            <li key={t.names + t.date}>
              <figure className="h-full rounded-2xl border border-line p-7">
                <blockquote className="font-serif text-lg italic leading-relaxed text-ink">“{t.quote}”</blockquote>
                <figcaption className="mt-5 text-sm text-ink-soft">
                  <span className="text-maroon">{t.names}</span> · {t.event} · {t.date}
                </figcaption>
              </figure>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
