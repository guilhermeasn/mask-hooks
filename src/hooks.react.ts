import Mask, { MaskProps, Stringable }  from './mask.class';
import { useRef, useState } from 'react';

export function useMask(settings : MaskProps) {

    const instance = useRef<Mask>(new Mask(settings));
    return instance.current.apply;

}

export function useMaskState<T extends Stringable>(initialState : T , settings : MaskProps) {

    const mask = useMask(settings);
    const [ target, setTarget ] = useState<string>(initialState.toString());

    return [ target, (newTarget : T) => setTarget(mask(newTarget)) ];

}