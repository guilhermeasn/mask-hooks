import Mask from './mask.class';
import { useRef, useState } from 'react';
export function useMask(settings) {
    const instance = useRef(new Mask(settings));
    return instance.current.apply;
}
export function useMaskState(initialState, settings) {
    const mask = useMask(settings);
    const [target, setTarget] = useState(initialState.toString());
    return [target, (newTarget) => setTarget(mask(newTarget))];
}
