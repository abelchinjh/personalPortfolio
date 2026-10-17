import { useEffect, useState } from "react";

type Connection = { saveData?: boolean; addEventListener?: (name: string, fn: () => void) => void; removeEventListener?: (name: string, fn: () => void) => void };
export function useMotionAllowed() {
  const [allowed, setAllowed] = useState(false);
  useEffect(() => {
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const connection = (navigator as Navigator & { connection?: Connection }).connection;
    const update = () => setAllowed(!preference.matches && !connection?.saveData);
    update();
    preference.addEventListener("change", update);
    connection?.addEventListener?.("change", update);
    return () => {
      preference.removeEventListener("change", update);
      connection?.removeEventListener?.("change", update);
    };
  }, []);
  return allowed;
}
