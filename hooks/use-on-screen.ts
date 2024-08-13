import { useState, useEffect, MutableRefObject } from 'react';

interface UseOnScreenOptions {
  rootMargin?: string;
}

interface VisibilityState {
  isIntersecting: boolean;
  hasBeenVisible: boolean;
}

function useOnScreen<T extends HTMLElement>(
  refs: MutableRefObject<Map<string, T | null>>,
  options: UseOnScreenOptions = {}
): Map<string, VisibilityState> {
  const [visibilityStates, setVisibilityStates] = useState<Map<string, VisibilityState>>(
    new Map()
  );

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const newStates = new Map(visibilityStates);
        entries.forEach((entry) => {
          const id = entry.target.getAttribute('data-id');
          if (id) {
            newStates.set(id, {
              isIntersecting: entry.isIntersecting,
              hasBeenVisible: entry.isIntersecting || newStates.get(id)?.hasBeenVisible || false,
            });
          }
        });
        setVisibilityStates(newStates);
      },
      {
        rootMargin: options.rootMargin || '0px',
      }
    );

    refs.current.forEach((ref) => {
      if (ref) {
        observer.observe(ref);
      }
    });

    return () => {
      // eslint-disable-next-line react-hooks/exhaustive-deps
      refs.current.forEach((ref) => {
        if (ref) {
          observer.unobserve(ref);
        }
      });
    };
  }, [refs, options.rootMargin, visibilityStates]);

  return visibilityStates;
}

export default useOnScreen;
