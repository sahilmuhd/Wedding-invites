import Link from "next/link";

export default function NotFound() {
  return (
    <section className="mx-auto flex min-h-[60vh] max-w-xl flex-col items-center justify-center px-6 text-center">
      <p className="eyebrow">404</p>
      <h1 className="mt-4 text-4xl md:text-5xl">This page isn’t part of the story.</h1>
      <Link href="/" className="mt-8 inline-flex min-h-11 items-center text-maroon underline underline-offset-4">
        Back to home
      </Link>
    </section>
  );
}
