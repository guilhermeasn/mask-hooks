import Mask from './mask.class';
import type { MaskProps, Stringable } from './mask.class';

export function useMask(settings : MaskProps) : <T extends Stringable>(target : T) => string {

    const mask = new Mask(settings);
    return mask.apply.bind(mask);

}

export function useCompleteMask(settings : MaskProps) : <T extends Stringable>(target : T) => { result : string, completed : boolean } {

    const mask = new Mask(settings);
    function apply<T extends Stringable>(target : T) {
          return ({
              result: mask.apply(target),
              completed: mask.completed
          })
    }

    return apply.bind(mask);

}

export function applyMask<T extends Stringable>(target : T, settings : MaskProps) : string {

    const mask = new Mask(settings);
    return mask.apply(target);

}

export { default as presets, getPresetMask } from './presets.const';
export type { PresetOption } from './presets.const';
export type { MaskProps, Stringable };
export { Mask };
