"use client";
import { useEffect, useState } from "react";

export function useDeckMode(): boolean {
  const [isDeck, setIsDeck] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    const update = () => setIsDeck(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  return isDeck;
}
