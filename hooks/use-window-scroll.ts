import { useSyncExternalStore } from 'react';
import { useRef } from 'react';

interface ScrollPosition {
  x: number;
  y: number;
}

function useWindowScroll(): ScrollPosition {
  const prevScrollPositionRef = useRef<ScrollPosition>({ x: 0, y: 0 });

  const getScrollPosition = (): ScrollPosition => {
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
    const handleScroll = () => {
      callback();
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  };

  return useSyncExternalStore(subscribe, getScrollPosition, getScrollPosition);
}

export default useWindowScroll;
