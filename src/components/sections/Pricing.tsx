import { Check } from "lucide-react";
import { pricingCopy } from "@/config/content";
import { formatPrice, pricing } from "@/config/pricing";
import { planEnquiryLink } from "@/lib/whatsapp";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { buttonClass } from "@/components/ui/Button";
import { WhatsAppIcon } from "@/components/ui/WhatsAppIcon";
import { WhatsAppLink } from "@/components/ui/WhatsAppLink";

export function Pricing() {
  return (
    <section id="pricing" aria-labelledby="pricing-title" className="section bg-maroon-tint">
      <div className="container-page">
        <div data-reveal>
          <SectionHeading id="pricing-title" align="center" title={pricingCopy.title} />
        </div>
        <div className="mx-auto mt-10 grid max-w-3xl gap-5 md:mt-14 md:grid-cols-2 md:gap-6" data-reveal>
          {pricing.plans.map((plan) => (
            <div
              key={plan.id}
              className={`flex flex-col rounded-2xl bg-white p-7 md:p-8 ${plan.popular ? "border-2 border-maroon" : "border border-line"}`}
            >
              <h3 className="text-2xl">{plan.name}</h3>
              <p className="mt-3 flex items-baseline gap-2">
                <span className="font-serif text-5xl text-maroon">{formatPrice(plan.price)}</span>
                <span className="text-sm text-ink-soft">one-time</span>
              </p>
              <ul className="mt-6 flex-1 space-y-3 border-t border-line pt-6">
                {plan.features.map((f) =>
                  f.endsWith(":") ? (
                    <li key={f} className="text-ink-soft">{f}</li>
                  ) : (
                    <li key={f} className="flex items-start gap-3">
                      <Check className="mt-1 size-4 shrink-0 text-maroon" aria-hidden="true" />
                      <span>{f}</span>
                    </li>
                  ),
                )}
              </ul>
              <WhatsAppLink
                href={planEnquiryLink(plan.name, plan.price)}
                location={plan.id === "premium" ? "pricing-premium" : "pricing-classic"}
                plan={plan.name}
                className={`${buttonClass(plan.popular ? "whatsapp" : "outline")} mt-8 w-full`}
              >
                <WhatsAppIcon className="size-4" /> Choose {plan.name}
              </WhatsAppLink>
            </div>
          ))}
        </div>
        <ul className="mx-auto mt-8 flex max-w-3xl flex-col items-center gap-1 text-center text-sm text-ink-soft md:flex-row md:justify-center">
          {pricingCopy.terms.map((t, i) => (
            <li key={t}>
              {i > 0 && <span aria-hidden="true" className="mx-2 hidden text-maroon/40 md:inline">·</span>}
              {t}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
