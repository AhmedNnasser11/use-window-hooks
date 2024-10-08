"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
function useMousePosition() {
    const [mousePosition] = (0, react_1.useState)({ x: 0, y: 0 });
    if (typeof window === "undefined")
        return;
    const getSnapshot = () => mousePosition;
    const subscribe = (setSnapshot) => {
        const handleMouseMove = (event) => {
            setSnapshot({ x: event.clientX, y: event.clientY });
        };
        window.addEventListener("mousemove", handleMouseMove);
        return () => window.removeEventListener("mousemove", handleMouseMove);
    };
    const position = (0, react_1.useSyncExternalStore)(subscribe, getSnapshot);
    return position;
}
exports.default = useMousePosition;
