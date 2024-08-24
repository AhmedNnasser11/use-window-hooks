"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
function useMediaQuery(queries) {
    const lastResultsRef = (0, react_1.useRef)({});
    const getSnapshot = (0, react_1.useCallback)(() => {
        if (typeof window === 'undefined') {
            return lastResultsRef.current;
        }
        const matchResults = {};
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
    }, [queries]);
    const subscribe = (0, react_1.useCallback)((callback) => {
        if (typeof window === 'undefined') {
            return () => { };
        }
        const mediaQueryLists = Object.keys(queries).map((key) => window.matchMedia(queries[key]));
        mediaQueryLists.forEach((mediaQueryList) => mediaQueryList.addEventListener('change', callback));
        return () => {
            mediaQueryLists.forEach((mediaQueryList) => mediaQueryList.removeEventListener('change', callback));
        };
    }, [queries]);
    const matchResult = (0, react_1.useSyncExternalStore)(subscribe, getSnapshot, getSnapshot);
    const matchQuery = (0, react_1.useCallback)((newQueries) => {
        if (typeof window === 'undefined') {
            return {};
        }
        const newMatchResults = {};
        for (const key in newQueries) {
            if (newQueries.hasOwnProperty(key)) {
                newMatchResults[key] = window.matchMedia(newQueries[key]).matches;
            }
        }
        return newMatchResults;
    }, []);
    return { results: matchResult, matchQuery };
}
exports.default = useMediaQuery;
