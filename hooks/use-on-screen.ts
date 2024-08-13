import { useState, useEffect, MutableRefObject } from 'react';

interface UseOnScreenOptions {
  rootMargin?: string;
}

interface VisibilityState {
  isIntersecting: boolean;
  hasBeenVisible: boolean;
}

// Type guard to check if refs is a Map
function isRefMap<T extends HTMLElement>(
  refs: MutableRefObject<T | null> | MutableRefObject<Map<string, T | null>>
): refs is MutableRefObject<Map<string, T | null>> {
  return (refs as MutableRefObject<Map<string, T | null>>).current instanceof Map;
}

function useOnScreen<T extends HTMLElement>(
  refs: MutableRefObject<T | null> | MutableRefObject<Map<string, T | null>>,
  options: UseOnScreenOptions = {}
): Map<string, VisibilityState> {
  const [visibilityStates, setVisibilityStates] = useState<Map<string, VisibilityState>>(new Map());

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const newStates = new Map(visibilityStates);
        entries.forEach((entry) => {
          const id = entry.target.getAttribute('data-id') || 'default';
          newStates.set(id, {
            isIntersecting: entry.isIntersecting,
            hasBeenVisible: entry.isIntersecting || newStates.get(id)?.hasBeenVisible || false,
          });
        });
        setVisibilityStates(newStates);
      },
      {
        rootMargin: options.rootMargin || '0px',
      }
    );

    if (isRefMap(refs)) {
      refs.current.forEach((ref) => {
        if (ref) {
          observer.observe(ref);
        }
      });
    } else {
      if (refs.current) {
        refs.current.setAttribute('data-id', 'default');
        observer.observe(refs.current);
      }
    }

    return () => {
      if (isRefMap(refs)) {
        refs.current.forEach((ref) => {
          if (ref) {
            observer.unobserve(ref);
          }
        });
      } else {
        if (refs.current) {
          observer.unobserve(refs.current);
        }
      }
    };
  }, [refs, options.rootMargin, visibilityStates]);

  return visibilityStates;
}

export default useOnScreen;
