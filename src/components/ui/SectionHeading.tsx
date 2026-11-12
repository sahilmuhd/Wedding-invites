export type Rich = { before: string; em: string; after: string };

/** Renders "before <em>em</em> after" — one emphasised (italic) word per heading. */
export function RichTitle({ t }: { t: Rich }) {
  return (
    <>
      {t.before}
      <em>{t.em}</em>
      {t.after}
    </>
  );
}

export function SectionHeading({
  title, text, align = "left", id, eyebrow,
}: { title: Rich; text?: string; align?: "left" | "center"; id: string; eyebrow?: string }) {
  return (
    <div className={align === "center" ? "mx-auto max-w-2xl text-center" : "max-w-2xl"}>
      {eyebrow && <p className="eyebrow mb-3">{eyebrow}</p>}
      <h2 id={id} className="h2 text-balance">
        <RichTitle t={title} />
      </h2>
      {text && <p className="mt-4 text-ink-soft md:text-[17px] md:leading-7">{text}</p>}
    </div>
  );
}
