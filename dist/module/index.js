import Mask from './mask.class';
export function useMask(settings) {
    const mask = new Mask(settings);
    return mask.apply.bind(mask);
}
export function useCompleteMask(settings) {
    const mask = new Mask(settings);
    function apply(target) {
        return ({
            result: mask.apply(target),
            completed: mask.completed,
            entries: mask.entries
        });
    }
    return apply.bind(mask);
}
export function applyMask(target, settings) {
    const mask = new Mask(settings);
    return mask.apply(target);
}
export { default as presets, getPresetMask } from './presets.const';
export { Mask };
