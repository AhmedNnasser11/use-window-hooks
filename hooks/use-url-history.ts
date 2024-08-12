import { useSyncExternalStore, useState } from 'react';

interface UseUrlHistory {
  getUrlHistory: () => string[];
  clearUrlHistory: () => void;
  history: string[];
  previousPath: string | null;
}

const useUrlHistory = (): UseUrlHistory => {
  const [history, setHistory] = useState<string[]>(() => {
    if (typeof window !== 'undefined' && typeof sessionStorage !== 'undefined') {
      return JSON.parse(sessionStorage.getItem('urlHistory') || '[]');
    }
    return [];
  });

  const subscribe = (callback: () => void) => {
    const handlePopState = () => {
      callback();
    };

    window.addEventListener('popstate', handlePopState);
    window.addEventListener('hashchange', handlePopState);

    return () => {
      window.removeEventListener('popstate', handlePopState);
      window.removeEventListener('hashchange', handlePopState);
    };
  };

  const getSnapshot = () => {
    const currentPath = window.location.pathname;

    if (history[history.length - 1] !== currentPath) {
      const newHistory = [...history, currentPath];
      setHistory(newHistory);
      if (typeof window !== 'undefined' && typeof sessionStorage !== 'undefined') {
        sessionStorage.setItem('urlHistory', JSON.stringify(newHistory));
      }
    }

    return history;
  };

  const getServerSnapshot = () => {
    return [];
  };

  const historySnapshot = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  const clearUrlHistory = (): void => {
    if (typeof window !== 'undefined' && typeof sessionStorage !== 'undefined') {
      sessionStorage.removeItem('urlHistory');
    }
    setHistory([]);
  };

  const getUrlHistory = (): string[] => {
    return historySnapshot;
  };

  return {
    getUrlHistory,
    clearUrlHistory,
    history: historySnapshot,
    previousPath: historySnapshot.length > 1 ? historySnapshot[historySnapshot.length - 2] : null,
  };
};

export default useUrlHistory;
