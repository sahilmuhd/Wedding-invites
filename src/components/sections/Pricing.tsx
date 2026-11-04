import { Check, Sparkles } from "lucide-react";
import { formatPrice, pricing } from "@/config/pricing";
import { customEnquiryLink, packageEnquiryLink } from "@/lib/whatsapp";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ButtonLink } from "@/components/ui/Button";
import { WhatsAppIcon } from "@/components/ui/WhatsAppIcon";

export function Pricing() {
  return (
    <section id="pricing" aria-labelledby="pricing-title" className="py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-8">
        <SectionHeading
          id="pricing-title"
          align="center"
          eyebrow="Pricing Packages"
          title={<>Simple, transparent <em className="text-gold-deep">pricing</em>.</>}
          text="One-time investment. Free hosting, no monthly fees, and no surprise add-ons."
        />

        <div className="mx-auto mt-16 grid max-w-4xl grid-cols-1 gap-8 md:grid-cols-2 md:items-stretch">
          {pricing.plans.map((plan) => (
            <div
              key={plan.id}
              className={`relative flex flex-col justify-between rounded-[2rem] p-8 sm:p-9 transition-all duration-300 ${
                plan.popular
                  ? "border-2 border-gold bg-white shadow-[0_20px_60px_-15px_rgba(118,91,50,0.18)] lg:-translate-y-2"
                  : "border border-beige bg-white/70 hover:shadow-lg"
              }`}
            >
              {plan.badge && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 rounded-full bg-charcoal px-4 py-1 text-[0.7rem] font-medium tracking-wider uppercase text-ivory flex items-center gap-1.5 shadow-sm">
                  <Sparkles className="size-3 text-gold" />
                  {plan.badge}
                </div>
              )}

              <div>
                <p className="eyebrow text-xs">{plan.name}</p>
                <div className="mt-4 flex items-baseline gap-1">
                  <span className="font-serif text-5xl font-medium tracking-tight text-charcoal">
                    {formatPrice(plan.price)}
                  </span>
                  <span className="text-xs uppercase tracking-wider text-ink-soft">/ one-time</span>
                </div>
                <p className="mt-3 text-sm text-ink-soft leading-relaxed min-h-[2.5rem]">
                  {plan.tagline}
                </p>

                <div className="mt-6 flex items-center gap-2 rounded-xl bg-ivory px-3.5 py-2 text-xs font-medium text-gold-deep border border-beige/60">
                  <span>⚡ Delivery within {plan.deliveryTime}</span>
                </div>

                <div className="gold-rule my-6 opacity-60" />

                <ul className="space-y-3.5 text-sm text-charcoal/90">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-3 leading-snug">
                      <Check className="mt-0.5 size-4.5 shrink-0 text-gold-deep" aria-hidden="true" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-8 pt-4">
                <ButtonLink
                  href={packageEnquiryLink(plan.name, plan.price)}
                  variant={plan.popular ? "solid" : "outline"}
                  className="w-full justify-center"
                >
                  <WhatsAppIcon className="size-4" /> Choose {plan.name}
                </ButtonLink>
              </div>
            </div>
          ))}
        </div>

        <p className="mx-auto mt-10 max-w-2xl text-center text-sm leading-relaxed text-ink-soft">
          <b className="font-medium text-charcoal">How payment works:</b> a ₹200 advance reserves your slot and is
          adjusted in your total. The balance is paid after you approve the preview. Delivery is within 24 hours of
          receiving your details and the advance.
        </p>

        <p className="mt-6 text-center text-sm text-ink-soft">
          Need a completely custom concept?{" "}
          <a
            href={customEnquiryLink()}
            className="font-medium text-charcoal underline underline-offset-4 hover:text-gold-deep"
          >
            Chat with our design team on WhatsApp
          </a>
        </p>
      </div>
    </section>
  );
}

