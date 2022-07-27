import Mask from './mask.class';
import type { MaskProps, Stringable } from './mask.class';

export type MaskApplicator = <T extends Stringable>(target : T) => string;

export function useMask(settings : MaskProps) : MaskApplicator {

    const mask = new Mask(settings);
    return mask.apply.bind(mask);

}

export function useCompleteMask(settings : MaskProps) : [ MaskApplicator, () => boolean ] {

    const mask = new Mask(settings);
    return [ mask.apply.bind(mask), mask.isCompleted.bind(mask) ];

}

export function applyMask<T extends Stringable>(target : T, settings : MaskProps) : string {

    const mask = new Mask(settings);
    return mask.apply(target);

}

export { default as presets, getPresetMask } from './presets.const';
export type { PresetOption } from './presets.const';
export type { MaskProps, Stringable };
export { Mask };