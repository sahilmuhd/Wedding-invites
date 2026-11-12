import { demo } from "@/config/content";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { PhoneFrame } from "@/components/ui/PhoneFrame";
import { DemoVideo } from "./DemoVideo";

/** Two real screen recordings. Swipeable one-at-a-time on phones, side by side on desktop. */
export function Demo() {
  return (
    <section id="demo" aria-labelledby="demo-title" className="section bg-maroon-tint">
      <div className="container-page" data-reveal>
        <SectionHeading id="demo-title" align="center" title={demo.title} text={demo.text} />
      </div>
      <ul
        aria-label="Demo videos"
        className="no-scrollbar mt-10 flex snap-x snap-mandatory gap-6 overflow-x-auto px-[calc((100vw-min(78vw,20rem))/2)] md:mt-14 md:justify-center md:gap-16 md:overflow-visible md:px-0"
        data-reveal
      >
        {demo.videos.map((d) => (
          <li key={d.src} className="w-[min(78vw,20rem)] shrink-0 snap-center text-center">
            <PhoneFrame aspect="aspect-[390/844]">
              <DemoVideo src={d.src} poster={d.poster} title={d.title} />
            </PhoneFrame>
            <h3 className="mt-5 text-xl">{d.title}</h3>
            <p className="mt-1 text-sm text-ink-soft">{d.text}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
