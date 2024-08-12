"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
const use_is_mounted_1 = __importDefault(require("./use-is-mounted"));
const useWindowUrl = () => {
    const isMounted = (0, use_is_mounted_1.default)();
    const [getUrl, setUrl] = (0, react_1.useState)(null);
    (0, react_1.useEffect)(() => {
        if (isMounted) {
            setUrl(window.location);
        }
    }, [isMounted]);
    return getUrl;
};
exports.default = useWindowUrl;
