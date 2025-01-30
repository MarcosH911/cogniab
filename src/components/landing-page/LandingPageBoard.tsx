"use client";

import { cn } from "@/lib/cn";
import sleep from "@/lib/sleep";
import { useEffect, useState } from "react";

export default function LandingPageBoard() {
  const [selectedSquare, setSelectedSquare] = useState<number | null>(null);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setSelectedSquare(null);

      setTimeout(() => {
        const newSelectedSquare = Math.floor(Math.random() * 8);
        setSelectedSquare(newSelectedSquare);
      }, 500);
    }, 1500);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="grid aspect-square w-full grid-cols-3 grid-rows-3 gap-1.5">
      {Array.from({ length: 9 }, (_, i) =>
        i === 4 ? (
          <div key={i} className="size-full bg-transparent"></div>
        ) : (
          <div key={i} className="size-full bg-background">
            <div
              className={cn(
                "size-full rounded-md border border-primary/70 bg-primary/50 shadow-sm transition duration-500",
                i - Number(i > 4) === selectedSquare && "bg-primary shadow-md",
              )}
            ></div>
          </div>
        ),
      )}
    </div>
  );
}
