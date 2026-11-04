import { SectionHeading } from "@/components/ui/SectionHeading";
import { PhoneFrame } from "@/components/ui/PhoneFrame";

const demos = [
  {
    src: "/videos/demo-nikah-1.mp4",
    poster: "/videos/demo-nikah-1-poster.jpg",
    title: "Wax-seal opening",
    text: "A sealed envelope unfolds into the invitation, with the date and venue.",
  },
  {
    src: "/videos/demo-nikah-2.mp4",
    poster: "/videos/demo-nikah-2-poster.jpg",
    title: "Arched doors and save the date",
    text: "Doors open onto the couple, music and a smooth scroll through the details.",
  },
] as const;

export function Demo() {
  return (
    <section id="demo" aria-labelledby="demo-title" className="bg-beige/50 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-8">
        <SectionHeading
          id="demo-title"
          align="center"
          eyebrow="See it in action"
          title={<>This is what your guests <em className="text-gold-deep">see</em>.</>}
          text="Real invitations, recorded on a phone. Tap play, and turn the sound on for the music."
        />
        <ul className="mt-14 flex flex-col items-center justify-center gap-12 sm:flex-row sm:items-start sm:gap-16">
          {demos.map((d) => (
            <li key={d.src} className="w-[min(70vw,15rem)] text-center">
              <PhoneFrame aspect="aspect-[9/16]">
                <video
                  className="h-full w-full object-cover"
                  src={d.src}
                  poster={d.poster}
                  controls
                  playsInline
                  preload="none"
                  aria-label={d.title}
                />
              </PhoneFrame>
              <h3 className="mt-6 text-lg">{d.title}</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-ink-soft">{d.text}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
