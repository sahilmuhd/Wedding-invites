"use client";

import { useState } from "react";
import { Play } from "lucide-react";
import { track } from "@vercel/analytics";
import type { DesignItem } from "@/types/invitation";
import { PreviewSheet } from "@/components/gallery/PreviewSheet";

/** Buttons that open real Signature invitations in the in-site preview. */
export function SignatureExamples({ title, examples }: { title: string; examples: readonly { id: string; name: string; url: string }[] }) {
  const [open, setOpen] = useState<DesignItem | null>(null);
  return (
    <div className="mt-7">
      <p className="text-sm font-medium text-maroon">{title}</p>
      <div className="mt-3 flex flex-wrap gap-2">
        {examples.map((e) => (
          <button
            key={e.id}
            type="button"
            onClick={() => {
              setOpen({ id: e.id, name: e.name, category: "Hindu", url: e.url, poster: null, signature: true });
              track("preview_open", { design: e.name, source: "signature-examples" });
            }}
            className="inline-flex min-h-11 items-center gap-2 rounded-full border border-maroon/30 bg-white px-4 text-sm text-maroon transition-colors hover:border-maroon hover:bg-maroon-tint"
          >
            <Play className="size-3.5" fill="currentColor" aria-hidden="true" /> {e.name}
          </button>
        ))}
      </div>
      {open && <PreviewSheet key={open.id} item={open} onClose={() => setOpen(null)} />}
    </div>
  );
}
