import { MaskProps, Stringable } from './mask.class';
export declare function useMask(settings: MaskProps): <T extends Stringable>(target: T) => string;
export declare function useMaskState<T extends Stringable>(settings: MaskProps, initialState?: T): [string, (target: T) => void];
