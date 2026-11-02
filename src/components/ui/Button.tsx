import type { AnchorHTMLAttributes } from "react";

type Variant = "solid" | "outline" | "whatsapp" | "light" | "link";

const styles: Record<Variant, string> = {
  solid: "bg-charcoal text-ivory hover:bg-black border border-charcoal",
  outline: "border border-charcoal/30 text-charcoal hover:border-charcoal hover:bg-charcoal hover:text-ivory",
  whatsapp: "bg-[#17794a] text-white hover:bg-[#0f5f39] border border-[#17794a] hover:border-[#0f5f39]",
  light: "bg-ivory text-charcoal hover:bg-beige border border-ivory",
  link: "border border-transparent text-ink-soft underline decoration-gold underline-offset-4 hover:text-charcoal",
};

interface Props extends AnchorHTMLAttributes<HTMLAnchorElement> {
  variant?: Variant;
  size?: "sm" | "md";
}

/** Anchor styled as a button. External links get safe rel/target automatically. */
export function ButtonLink({ variant = "solid", size = "md", className = "", href, children, ...rest }: Props) {
  const external = !!href && /^https?:/.test(href);
  return (
    <a
      href={href}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      className={`inline-flex min-h-11 items-center justify-center gap-2 rounded-full font-medium tracking-wide transition-colors duration-200 ${
        size === "sm" ? "px-4 text-sm" : "px-7 text-[0.95rem]"
      } ${styles[variant]} ${className}`}
      {...rest}
    >
      {children}
    </a>
  );
}
