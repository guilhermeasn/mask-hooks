export declare type MaskProps = {
    masks: [string, ...string[]];
    patterns?: {
        [key in string]: RegExp;
    };
    placeholder?: string;
    reverse?: boolean;
    infinity?: boolean | Extra;
};
declare type Extra = {
    each: number;
    add: string;
};
export declare const defaultPatterns: {
    '#': RegExp;
    '@': RegExp;
    '?': RegExp;
};
export default class Mask {
    private readonly _escape;
    private readonly _reserved;
    private _props;
    constructor(props: MaskProps);
    get props(): Readonly<Required<MaskProps>>;
    apply<T extends {
        toString: () => string;
    }>(target: T): string;
    private _apply;
}
export {};
