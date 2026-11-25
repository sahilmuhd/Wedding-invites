import { Check, ChevronDown, Minus, Sparkles } from "lucide-react";
import { pricingCopy } from "@/config/content";
import { formatPrice, pricing } from "@/config/pricing";
import { customDesignLink, planEnquiryLink, type CtaLocation } from "@/lib/whatsapp";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { buttonClass } from "@/components/ui/Button";
import { WhatsAppIcon } from "@/components/ui/WhatsAppIcon";
import { WhatsAppLink } from "@/components/ui/WhatsAppLink";

function Cell({ value }: { value: boolean | string }) {
  if (value === true) return <Check className="mx-auto size-4 text-maroon" aria-label="Included" />;
  if (value === false) return <Minus className="mx-auto size-4 text-ink-soft/50" aria-label="Not included" />;
  return <span className="block text-center text-[12px] leading-snug text-ink md:text-[13px]">{value}</span>;
}

export function Pricing() {
  return (
    <section id="pricing" aria-labelledby="pricing-title" className="section bg-maroon-tint">
      <div className="container-page">
        <div data-reveal>
          <SectionHeading id="pricing-title" align="center" title={pricingCopy.title} />
        </div>
        <div className="mx-auto mt-10 grid max-w-3xl gap-5 md:mt-14 md:grid-cols-2 md:gap-6 lg:max-w-none lg:grid-cols-3" data-reveal>
          {pricing.plans.map((plan) => {
            const dark = plan.id === "signature";
            return (
              <div
                key={plan.id}
                id={dark ? "signature" : undefined}
                className={`flex flex-col rounded-2xl p-7 md:p-8 ${
                  dark
                    ? "bg-maroon text-white md:col-span-2 lg:col-span-1"
                    : `bg-white ${plan.popular ? "border-2 border-maroon" : "border border-line"}`
                }`}
              >
                <h3 className={`text-2xl ${dark ? "text-white" : ""}`}>{plan.name}</h3>
                <p className={`mt-1 text-sm italic ${dark ? "text-white/85" : "text-ink-soft"}`}>Best for: {plan.bestFor}</p>
                <p className="mt-3">
                  <span className={`font-serif ${plan.price === null ? "text-4xl" : "text-5xl"} ${dark ? "text-white" : "text-maroon"}`}>
                    {formatPrice(plan.price)}
                  </span>
                </p>
                <ul className={`mt-6 flex-1 space-y-3 border-t pt-6 ${dark ? "border-white/20" : "border-line"}`}>
                  {plan.features.map((f) =>
                    f.endsWith(":") ? (
                      <li key={f} className={dark ? "text-white/80" : "text-ink-soft"}>{f}</li>
                    ) : (
                      <li key={f} className="flex items-start gap-3">
                        <Check className={`mt-1 size-4 shrink-0 ${dark ? "text-white" : "text-maroon"}`} aria-hidden="true" />
                        <span>{f}</span>
                      </li>
                    ),
                  )}
                </ul>
                <WhatsAppLink
                  href={planEnquiryLink(plan.name, plan.price)}
                  location={`pricing-${plan.id}` as CtaLocation}
                  plan={plan.name}
                  className={`${buttonClass(dark ? "light" : plan.popular ? "whatsapp" : "outline")} mt-8 w-full`}
                >
                  <WhatsAppIcon className="size-4" /> Choose {plan.name}
                </WhatsAppLink>
              </div>
            );
          })}
        </div>

        {/* Side-by-side comparison, collapsed so the cards stay the first thing people see. */}
        <details className="group mx-auto mt-8 max-w-4xl rounded-2xl border border-line bg-white" data-reveal>
          <summary className="flex min-h-12 cursor-pointer items-center justify-center gap-2 px-5 text-sm font-medium text-maroon">
            Compare plans side by side
            <ChevronDown className="size-4 transition-transform group-open:rotate-180" aria-hidden="true" />
          </summary>
          <div className="overflow-x-auto px-3 pb-5 md:px-6">
            <table className="w-full table-fixed border-collapse text-left text-[13px] md:text-sm">
              <caption className="sr-only">What each plan includes</caption>
              <thead>
                <tr className="border-b border-line">
                  <th scope="col" className="w-[34%] py-3 pr-2 font-normal text-ink-soft">Feature</th>
                  {pricing.plans.map((p) => (
                    <th key={p.id} scope="col" className="px-1 py-3 text-center">
                      <span className="block font-serif text-[13px] leading-tight text-maroon sm:text-base md:text-lg">{p.name}</span>
                      <span className="block text-xs font-normal text-ink-soft">{formatPrice(p.price)}</span>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {pricing.compare.map((row) => (
                  <tr key={row.label} className="border-b border-line/70 last:border-0">
                    <th scope="row" className="py-3 pr-2 align-middle font-normal text-ink">{row.label}</th>
                    {row.values.map((v, i) => (
                      <td key={i} className="px-1 py-3 align-middle">
                        <Cell value={v} />
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </details>

        <ul className="mx-auto mt-6 flex max-w-3xl flex-col items-center gap-1 text-center text-sm text-ink-soft md:flex-row md:justify-center">
          {pricingCopy.terms.map((t, i) => (
            <li key={t}>
              {i > 0 && <span aria-hidden="true" className="mx-2 hidden text-maroon/40 md:inline">·</span>}
              {t}
            </li>
          ))}
        </ul>
        {pricing.addons.map((a) => (
          <p key={a.name} className="mt-2 text-center text-sm text-ink-soft">
            Add-on: {a.name}, from {formatPrice(a.from)}
          </p>
        ))}

        {/* Custom design */}
        <div className="mx-auto mt-10 flex max-w-3xl flex-col items-center gap-4 rounded-2xl border border-maroon/25 bg-white px-6 py-8 text-center md:flex-row md:text-left" data-reveal>
          <Sparkles className="size-8 shrink-0 text-maroon" strokeWidth={1.25} aria-hidden="true" />
          <div className="flex-1">
            <h3 className="text-xl">
              {pricing.custom.title} <span className="whitespace-nowrap font-sans text-base text-ink-soft">From {formatPrice(pricing.custom.from)}</span>
            </h3>
            <p className="mt-1 text-ink-soft">{pricing.custom.text}</p>
          </div>
          <WhatsAppLink href={customDesignLink()} location="custom-design" className={`${buttonClass("outline", "sm")} shrink-0`}>
            <WhatsAppIcon className="size-4" /> {pricing.custom.cta}
          </WhatsAppLink>
        </div>
      </div>
    </section>
  );
}
