export function SectionHeading({
  eyebrow, title, text, align = "left", id,
}: { eyebrow: string; title: React.ReactNode; text?: string; align?: "left" | "center"; id?: string }) {
  return (
    <div className={align === "center" ? "mx-auto max-w-2xl text-center" : "max-w-2xl"}>
      <p className="eyebrow">{eyebrow}</p>
      <h2 id={id} className="heading mt-4 text-[2.4rem] sm:text-5xl">{title}</h2>
      {text && <p className="mt-5 text-lg leading-relaxed text-ink-soft">{text}</p>}
    </div>
  );
}
