import { useSyncExternalStore, useRef } from 'react';

type MediaQueryList = {
  [key: string]: string;
};

interface MediaQueryMatchResult {
  [key: string]: boolean;
}

interface UseMediaQueryResult {
  results: MediaQueryMatchResult;
  matchQuery: (newQueries: MediaQueryList) => MediaQueryMatchResult;
}

function useMediaQuery(queries: MediaQueryList): UseMediaQueryResult {
  const lastResultsRef = useRef<MediaQueryMatchResult>({});

  const getSnapshot = () => {
    const matchResults: MediaQueryMatchResult = {};
    let hasChanged = false;

    for (const key in queries) {
      if (queries.hasOwnProperty(key)) {
        const matches = window.matchMedia(queries[key]).matches;
        matchResults[key] = matches;
        if (lastResultsRef.current[key] !== matches) {
          hasChanged = true;
        }
      }
    }

    if (hasChanged) {
      lastResultsRef.current = matchResults;
    }

    return lastResultsRef.current;
  };

  const subscribe = (callback: () => void) => {
    const mediaQueryLists = Object.keys(queries).map((key) =>
      window.matchMedia(queries[key])
    );

    mediaQueryLists.forEach((mediaQueryList) =>
      mediaQueryList.addEventListener('change', callback)
    );

    return () => {
      mediaQueryLists.forEach((mediaQueryList) =>
        mediaQueryList.removeEventListener('change', callback)
      );
    };
  };

  const matchResult = useSyncExternalStore(subscribe, getSnapshot, getSnapshot);

  const matchQuery = (newQueries: MediaQueryList): MediaQueryMatchResult => {
    const newMatchResults: MediaQueryMatchResult = {};
    for (const key in newQueries) {
      if (newQueries.hasOwnProperty(key)) {
        newMatchResults[key] = window.matchMedia(newQueries[key]).matches;
      }
    }
    return newMatchResults;
  };

  return { results: matchResult, matchQuery };
}

export default useMediaQuery;
