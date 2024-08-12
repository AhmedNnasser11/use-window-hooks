"use client";

import { useEffect, useState } from "react";

export default function useIsMounted() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setTimeout(() => setMounted(true), 100);
  }, []);
  return mounted;
}
