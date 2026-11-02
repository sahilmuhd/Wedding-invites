/** Lightweight phone mockup. `className` positions/sizes the outer box; children fill the 9:19 screen. */
export function PhoneFrame({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={className}>
      <div className="relative rounded-[2.1rem] bg-charcoal p-[7px] shadow-[0_24px_60px_-20px_rgba(40,36,32,0.45)]">
        <div className="relative aspect-[9/19] overflow-hidden rounded-[1.65rem] bg-beige">{children}</div>
        <span aria-hidden="true" className="absolute left-1/2 top-[13px] h-[5px] w-[22%] -translate-x-1/2 rounded-full bg-charcoal/90" />
      </div>
    </div>
  );
}
