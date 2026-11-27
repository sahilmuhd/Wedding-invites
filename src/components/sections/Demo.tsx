import { demo } from "@/config/content";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { PhoneFrame } from "@/components/ui/PhoneFrame";
import { DemoLive } from "./DemoLive";

/** One real invitation, live inside a phone (opens when tapped). */
export function Demo() {
  const d = demo.live;
  return (
    <section id="demo" aria-labelledby="demo-title" className="section bg-maroon-tint">
      <div className="container-page" data-reveal>
        <SectionHeading id="demo-title" align="center" title={demo.title} text={demo.text} />
        <div className="mx-auto mt-10 w-[min(82vw,21rem)] text-center md:mt-14">
          <PhoneFrame aspect="aspect-[390/844]">
            <DemoLive name={d.name} url={d.url} poster={d.poster} cta={d.cta} />
          </PhoneFrame>
          <h3 className="mt-5 text-xl">{d.name}</h3>
          <p className="mt-1 text-sm text-ink-soft">{d.caption}</p>
          <p className="mt-1 text-xs text-ink-soft">{d.hint}</p>
        </div>
      </div>
    </section>
  );
}
