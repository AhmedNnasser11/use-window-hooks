"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
// Store to manage subscription callbacks
const listeners = new Set();
const subscribe = (listener) => {
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
    (0, react_1.useEffect)(() => {
        // Event handler to notify subscribers about visibility changes
        const onVisibilityChange = () => notify();
        document.addEventListener('visibilitychange', onVisibilityChange);
        // Cleanup
        return () => {
            document.removeEventListener('visibilitychange', onVisibilityChange);
        };
    }, []);
    return (0, react_1.useSyncExternalStore)(subscribe, getSnapshot, getServerSnapshot);
};
exports.default = useWindowFocus;
