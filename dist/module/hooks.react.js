import Mask from './mask.class';
import { useRef, useState } from 'react';
export function useMask(settings) {
    const instance = useRef(new Mask(settings));
    return instance.current.apply;
}
export function useMaskState(settings, initialState) {
    var _a;
    const mask = useMask(settings);
    const [target, setTarget] = useState((_a = initialState === null || initialState === void 0 ? void 0 : initialState.toString()) !== null && _a !== void 0 ? _a : '');
    return [target, (newTarget) => setTarget(mask(newTarget))];
}
