import Mask from './mask.class';
export function useMask(settings) {
    const mask = new Mask(settings);
    return mask.apply;
}
export function applyMask(target, masks, options = {}) {
    return new Mask(Object.assign(Object.assign({}, options), { masks: Array.isArray(masks) ? masks : [masks] })).apply(target);
}
export { default as presets } from './presets.const';
export { Mask };
