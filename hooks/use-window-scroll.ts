import { useSyncExternalStore } from 'react';
import { useRef, useEffect } from 'react';

interface ScrollPosition {
  x: number;
  y: number;
}

function useWindowScroll(): ScrollPosition {
  const prevScrollPositionRef = useRef<ScrollPosition>({ x: 0, y: 0 });

  const getScrollPosition = (): ScrollPosition => {
    if (typeof window === 'undefined') {
      // Return default values when running on the server
      return { x: 0, y: 0 };
    }

    const newScrollPosition = {
      x: window.scrollX,
      y: window.scrollY,
    };

    if (
      newScrollPosition.x !== prevScrollPositionRef.current.x ||
      newScrollPosition.y !== prevScrollPositionRef.current.y
    ) {
      prevScrollPositionRef.current = newScrollPosition;
    }

    return prevScrollPositionRef.current;
  };

  const subscribe = (callback: () => void): (() => void) => {
    if (typeof window === 'undefined') {
      return () => {}; // No-op for SSR
    }

    const handleScroll = () => {
      callback();
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  };

  // Ensure this only runs on the client
  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }
  }, []);

  return useSyncExternalStore(subscribe, getScrollPosition, getScrollPosition);
}

export default useWindowScroll;
