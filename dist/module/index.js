import Mask from './mask.class';
import presets from './presets.const';
export function useMask(settings) {
    const mask = new Mask(settings);
    return mask.apply.bind(mask);
}
export function usePresetMask(preset, change = {}) {
    const mask = new Mask(getPresetMask(preset, change));
    return mask.apply.bind(mask);
}
export function applyMask(target, settings) {
    const mask = new Mask(settings);
    return mask.apply(target);
}
export function getPresetMask(preset, change = {}) {
    return Object.assign(Object.assign({}, presets[preset]), change);
}
export { Mask, presets };
