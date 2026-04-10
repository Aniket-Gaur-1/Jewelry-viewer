"use client";
import { ReactNode } from "react";

export default function Animate({ children }: { children: ReactNode }) {
  return (
    <>
      {children}
      <style jsx global>{`
        @keyframes subtleReveal {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .reveal {
          animation: subtleReveal 1s cubic-bezier(0.2, 0, 0.2, 1) forwards;
        }
        .delay-1 { animation-delay: 0.1s; }
        .delay-2 { animation-delay: 0.2s; }
      `}</style>
    </>
  );
}