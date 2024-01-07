import type { MaskProps, Stringable } from './mask.class';
import Mask from './mask.class';

export type MaskApplicator<O = string> = <T extends Stringable>(target : T) => O;

export type CompleteMask = {
    result    : string;
    completed : boolean;
    entries   : number;
    cleaned   : string;
    passing   : boolean | null;
}

export function useMask(settings : MaskProps) : MaskApplicator {

    const mask = new Mask(settings);
    return mask.apply.bind(mask);

}

export function useCompleteMask(settings : MaskProps, onComplete ?: (result : string, cleaned: string) => boolean) : MaskApplicator<CompleteMask> {

    const mask = new Mask(settings);

    function apply<T extends Stringable>(target : T) : CompleteMask {

        const result : string = mask.apply(target);

        return ({
            result,
            completed: mask.completed,
            entries:   mask.entries,
            cleaned:   mask.cleaned,
            passing:   (typeof onComplete === 'function' && mask.completed) ? onComplete(result, mask.cleaned) : null
        });

    }

    return apply.bind(mask);

}

export function applyMask<T extends Stringable>(target : T, settingsOrMasks : MaskProps | string | string[]) : string {

    const mask = new Mask(typeof settingsOrMasks === 'object' && !Array.isArray(settingsOrMasks) ? settingsOrMasks : { masks: settingsOrMasks });
    return mask.apply(target);

}

export { getPresetMask, default as presets } from './presets.const';
export type { PresetOption } from './presets.const';
export { Mask };
export type { MaskProps, Stringable };

