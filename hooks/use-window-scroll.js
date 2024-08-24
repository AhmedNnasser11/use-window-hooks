"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
const react_2 = require("react");
function useWindowScroll() {
    const prevScrollPositionRef = (0, react_2.useRef)({ x: 0, y: 0 });
    const getScrollPosition = () => {
        if (typeof window === 'undefined') {
            // Return default values when running on the server
            return { x: 0, y: 0 };
        }
        const newScrollPosition = {
            x: window.scrollX,
            y: window.scrollY,
        };
        if (newScrollPosition.x !== prevScrollPositionRef.current.x ||
            newScrollPosition.y !== prevScrollPositionRef.current.y) {
            prevScrollPositionRef.current = newScrollPosition;
        }
        return prevScrollPositionRef.current;
    };
    const subscribe = (callback) => {
        if (typeof window === 'undefined') {
            return () => { }; // No-op for SSR
        }
        const handleScroll = () => {
            callback();
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    };
    // Ensure this only runs on the client
    (0, react_2.useEffect)(() => {
        if (typeof window === 'undefined') {
            return;
        }
    }, []);
    return (0, react_1.useSyncExternalStore)(subscribe, getScrollPosition, getScrollPosition);
}
exports.default = useWindowScroll;
