"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
// Type guard to check if refs is a Map
function isRefMap(refs) {
    return refs.current instanceof Map;
}
function useOnScreen(refs, options = {}) {
    const [visibilityStates, setVisibilityStates] = (0, react_1.useState)(new Map());
    (0, react_1.useEffect)(() => {
        const observer = new IntersectionObserver((entries) => {
            const newStates = new Map(visibilityStates);
            entries.forEach((entry) => {
                var _a;
                const id = entry.target.getAttribute('data-id') || 'default';
                newStates.set(id, {
                    isIntersecting: entry.isIntersecting,
                    hasBeenVisible: entry.isIntersecting || ((_a = newStates.get(id)) === null || _a === void 0 ? void 0 : _a.hasBeenVisible) || false,
                });
            });
            setVisibilityStates(newStates);
        }, {
            rootMargin: options.rootMargin || '0px',
        });
        if (isRefMap(refs)) {
            refs.current.forEach((ref) => {
                if (ref) {
                    observer.observe(ref);
                }
            });
        }
        else {
            if (refs.current) {
                refs.current.setAttribute('data-id', 'default');
                observer.observe(refs.current);
            }
        }
        return () => {
            if (isRefMap(refs)) {
                refs.current.forEach((ref) => {
                    if (ref) {
                        observer.unobserve(ref);
                    }
                });
            }
            else {
                if (refs.current) {
                    observer.unobserve(refs.current);
                }
            }
        };
    }, [refs, options.rootMargin, visibilityStates]);
    return visibilityStates;
}
exports.default = useOnScreen;
