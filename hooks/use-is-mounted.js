"use strict";
"use client";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = useIsMounted;
const react_1 = require("react");
function useIsMounted() {
    const [mounted, setMounted] = (0, react_1.useState)(false);
    (0, react_1.useEffect)(() => {
        setTimeout(() => setMounted(true), 100);
    }, []);
    return mounted;
}
