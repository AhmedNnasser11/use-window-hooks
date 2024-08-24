import { useSyncExternalStore, useState } from "react";

interface MousePosition {
  x: number;
  y: number;
}

function useMousePosition() {
  const [mousePosition] = useState<MousePosition>({ x: 0, y: 0 });
  if (typeof window === "undefined") return;
  const getSnapshot = () => mousePosition;

  const subscribe = (setSnapshot: (arg0: { x: number; y: number }) => void) => {
    const handleMouseMove = (event: MouseEvent) => {
      setSnapshot({ x: event.clientX, y: event.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => window.removeEventListener("mousemove", handleMouseMove);
  };

  const position = useSyncExternalStore(subscribe, getSnapshot);

  return position;
}

export default useMousePosition;
