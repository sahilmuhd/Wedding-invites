import { features, featuresTitle } from "@/config/content";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function Features() {
  return (
    <section id="features" aria-labelledby="features-title" className="section bg-maroon-tint">
      <div className="container-page" data-reveal>
        <SectionHeading id="features-title" align="center" title={featuresTitle} />
        <ul className="mx-auto mt-10 grid max-w-3xl grid-cols-1 border-t border-line sm:grid-cols-2 sm:gap-x-12 md:mt-14">
          {features.map(({ icon: Icon, text, premium }) => (
            <li key={text} className="flex min-h-16 items-center gap-4 border-b border-line py-4">
              <Icon className="size-6 shrink-0 text-maroon" strokeWidth={1.25} aria-hidden="true" />
              <span className="text-ink">
                {text}
                {premium && <span className="ml-2 font-serif text-sm italic text-maroon">· Premium</span>}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
