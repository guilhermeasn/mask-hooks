import Mask from './mask.class';
import type { MaskProps, Stringable } from './mask.class';

export type MaskApplicator<O = string> = <T extends Stringable>(target : T) => O;

export type CompleteMask = {
    result    : string;
    completed : boolean;
    entries   : number;
}

export function useMask(settings : MaskProps) : MaskApplicator {

    const mask = new Mask(settings);
    return mask.apply.bind(mask);

}

export function useCompleteMask(settings : MaskProps) : MaskApplicator<CompleteMask> {

    const mask = new Mask(settings);

    function apply<T extends Stringable>(target : T) : CompleteMask {
        return ({
            result: mask.apply(target),
            completed: mask.completed,
            entries: mask.entries
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