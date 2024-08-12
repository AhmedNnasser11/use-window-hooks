"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
function useIsFirstRender() {
    const isFirstRenderRef = (0, react_1.useRef)(true);
    (0, react_1.useEffect)(() => {
        isFirstRenderRef.current = false;
    }, []);
    return isFirstRenderRef.current;
}
exports.default = useIsFirstRender;
