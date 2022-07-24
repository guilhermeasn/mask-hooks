import Mask from './mask.class';
import type { MaskProps, Stringable } from './mask.class';
export declare function useMask(settings: MaskProps): <T extends Stringable>(target: T) => string;
export declare function applyMask<T extends Stringable>(target: T, settings: MaskProps): string;
export { default as presets } from './presets.const';
export type { PresetOption } from './presets.const';
export type { MaskProps, Stringable };
export { Mask };
