import { useState } from 'react';
import { applyMask } from './mask';


export function useMask(config) {

    return target => applyMask(target, config);

}

export const useMaskState = (initialState, config) => {

    const [target, setTarget] = useState(initialState);
    return [ target, newTarget => setTarget(() => applyMask(newTarget, config)) ];

}
