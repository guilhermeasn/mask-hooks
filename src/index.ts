import Mask from './mask.class';
import type { MaskProps, Stringable } from './mask.class';

export function useMask(settings : MaskProps) : <T extends Stringable>(target : T) => string {

    const mask = new Mask(settings);
    return mask.apply;

}

export function applyMask<T extends Stringable>(target : T, settings : MaskProps) : string {

    return new Mask(settings).apply(target);

}

export { default as presets } from './presets.const';
export type { MaskProps, Stringable };
export { Mask };
