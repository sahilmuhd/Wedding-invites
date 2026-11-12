import { designs } from "@/config/content";
import { designCount, filterCounts, initialDesigns } from "@/lib/invitations";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Gallery } from "@/components/gallery/Gallery";

export function Designs() {
  const title = { ...designs.title, before: designs.title.before.replace("{count}", String(designCount)) };
  return (
    <section id="designs" aria-labelledby="designs-title" className="section">
      <div className="container-page">
        <div data-reveal>
          <SectionHeading id="designs-title" title={title} text={designs.text} />
        </div>
        <div className="mt-8 md:mt-12">
          <Gallery initial={initialDesigns} counts={filterCounts} />
        </div>
      </div>
    </section>
  );
}
