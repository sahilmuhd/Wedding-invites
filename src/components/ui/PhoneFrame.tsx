/** Lightweight phone mockup. `className` positions/sizes the outer box; children fill the screen. */
export function PhoneFrame({
  children, className = "", aspect = "aspect-[9/19]",
}: { children: React.ReactNode; className?: string; aspect?: string }) {
  return (
    <div className={className}>
      <div className="relative rounded-[2.1rem] bg-ink p-[6px] shadow-[0_30px_60px_-30px_rgba(90,20,36,0.45)]">
        <div className={`relative ${aspect} overflow-hidden rounded-[1.75rem] bg-maroon-tint`}>{children}</div>
        <span aria-hidden="true" className="absolute left-1/2 top-[12px] h-[5px] w-[22%] -translate-x-1/2 rounded-full bg-ink/90" />
      </div>
    </div>
  );
}
