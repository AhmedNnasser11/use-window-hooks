import { useSyncExternalStore, useState } from "react";

interface MousePosition {
  x: number;
  y: number;
}

function useMousePosition() {
  const [mousePosition] = useState<MousePosition>({ x: 0, y: 0 });

  const getSnapshot = () => mousePosition;

  const subscribe = (setSnapshot: (arg0: { x: number; y: number }) => void) => {
    const handleMouseMove = (event: MouseEvent) => {
      console.log("Mouse moved:", event.clientX, event.clientY); // Log for debugging
      setSnapshot({ x: event.clientX, y: event.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => window.removeEventListener("mousemove", handleMouseMove);
  };

  const position = useSyncExternalStore(subscribe, getSnapshot);

  return position;
}

export default useMousePosition;
