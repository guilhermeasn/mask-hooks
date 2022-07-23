import { MaskProps, Stringable } from './mask.class';
export declare function useMask(settings: MaskProps): <T extends Stringable>(target: T) => string;
export declare function useMaskState<T extends Stringable>(initialState: T, settings: MaskProps): (string | ((newTarget: T) => void))[];
