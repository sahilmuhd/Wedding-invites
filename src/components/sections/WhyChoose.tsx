import { features } from "@/config/content";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function WhyChoose() {
  return (
    <section id="why-us" aria-labelledby="why-title" className="py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-8">
        <SectionHeading
          id="why-title"
          align="center"
          eyebrow="Why choose us"
          title={<>Everything a card can’t <em className="text-gold-deep">do</em>.</>}
          text="One simple package. Every invitation is designed around you."
        />
        <ul className="mt-16 grid gap-px overflow-hidden rounded-3xl border border-beige bg-beige sm:grid-cols-2 lg:grid-cols-4">
          {features.map(({ icon: Icon, title, text }) => (
            <li key={title} className="bg-ivory p-8">
              <Icon className="size-7 text-gold-deep" strokeWidth={1.4} aria-hidden="true" />
              <h3 className="mt-5 font-serif text-2xl">{title}</h3>
              <p className="mt-2 text-[0.95rem] leading-relaxed text-ink-soft">{text}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
