import Mask from './mask.class';
import type { MaskProps, Stringable } from './mask.class';
export declare type MaskApplicator<O = string> = <T extends Stringable>(target: T) => O;
export declare type CompleteMask = {
    result: string;
    completed: boolean;
    entries: number;
};
export declare function useMask(settings: MaskProps): MaskApplicator;
export declare function useCompleteMask(settings: MaskProps): MaskApplicator<CompleteMask>;
export declare function applyMask<T extends Stringable>(target: T, settings: MaskProps): string;
export { default as presets, getPresetMask } from './presets.const';
export type { PresetOption } from './presets.const';
export type { MaskProps, Stringable };
export { Mask };
