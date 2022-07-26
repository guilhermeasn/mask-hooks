import Mask from './mask.class';
import type { MaskProps, Stringable } from './mask.class';

import presets from './presets.const';
import type { PresetOption } from './presets.const';

export type ApplyMask =  <T extends Stringable>(target : T) => string;

export function useMask(settings : MaskProps) : ApplyMask {

    const mask = new Mask(settings);
    return mask.apply.bind(mask);

}

export function usePresetMask(preset : PresetOption, change : Partial<MaskProps> = {}) : ApplyMask {

    const mask = new Mask(getPresetMask(preset, change));
    return mask.apply.bind(mask);

}

export function applyMask<T extends Stringable>(target : T, settings : MaskProps) : string {

    const mask = new Mask(settings);
    return mask.apply(target);

}

export function getPresetMask(preset : PresetOption, change : Partial<MaskProps> = {}) : MaskProps {
    return {
        ...presets[preset],
        ...change
    }
}


export type {
    MaskProps,
    Stringable,
    PresetOption
};

export {
    Mask,
    presets
};