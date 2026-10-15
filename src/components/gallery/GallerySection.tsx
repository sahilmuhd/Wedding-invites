import { Gallery } from "./Gallery";
import { invitations } from "@/lib/invitations";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function GallerySection() {
  return (
    <section id="gallery" aria-labelledby="gallery-title" className="bg-beige/50 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-8">
        <SectionHeading
          id="gallery-title"
          eyebrow="The gallery"
          title={<>Every invitation, <em className="text-gold-deep">live</em>.</>}
          text="Tap any invitation to open the real thing in a new tab — exactly as your guests will see it on their phones."
        />
        <div className="mt-12">
          <Gallery items={invitations} />
        </div>
      </div>
    </section>
  );
}
