"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
const useUrlHistory = () => {
    const [history, setHistory] = (0, react_1.useState)(() => {
        if (typeof window !== 'undefined' && typeof sessionStorage !== 'undefined') {
            return JSON.parse(sessionStorage.getItem('urlHistory') || '[]');
        }
        return [];
    });
    const subscribe = (callback) => {
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
    const historySnapshot = (0, react_1.useSyncExternalStore)(subscribe, getSnapshot, getServerSnapshot);
    const clearUrlHistory = () => {
        if (typeof window !== 'undefined' && typeof sessionStorage !== 'undefined') {
            sessionStorage.removeItem('urlHistory');
        }
        setHistory([]);
    };
    const getUrlHistory = () => {
        return historySnapshot;
    };
    return {
        getUrlHistory,
        clearUrlHistory,
        history: historySnapshot,
        previousPath: historySnapshot.length > 1 ? historySnapshot[historySnapshot.length - 2] : null,
    };
};
exports.default = useUrlHistory;
