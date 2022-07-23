import { useState }  from 'react';
import { applyMask } from './mask';


export function useMask(config) {

    return target => applyMask(target, config);

}

export const useMaskState = (initialState, config) => {

    const [target, setTarget] = useState(initialState);
    const mask = useMask(config);

    return [ target, newTarget => setTarget(mask(newTarget)) ];

}
