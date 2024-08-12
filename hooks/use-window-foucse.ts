import { useEffect, useSyncExternalStore } from 'react';

// Store to manage subscription callbacks
const listeners = new Set<() => void>();

const subscribe = (listener: () => void) => {
  listeners.add(listener);
  return () => listeners.delete(listener);
};

const notify = () => {
  listeners.forEach((listener) => listener());
};

// External store value getter
const getSnapshot = () => !document.hidden;

const getServerSnapshot = () => true; // Assume visible/focused by default


const useWindowFocus = () => {
  useEffect(() => {
    // Event handler to notify subscribers about visibility changes
    const onVisibilityChange = () => notify();

    document.addEventListener('visibilitychange', onVisibilityChange);

    // Cleanup
    return () => {
      document.removeEventListener('visibilitychange', onVisibilityChange);
    };
  }, []);

  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
};

export default useWindowFocus;