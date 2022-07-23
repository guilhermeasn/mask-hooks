export declare type MaskProps = {
    masks: string[];
    patterns?: {
        [key in string]: RegExp;
    };
    placeholder?: string;
    reverse?: boolean;
    infinity?: boolean | Extra;
    transform?: 'uppercase' | 'lowercase' | 'capitalize' | 'capitalizeAll' | 'none';
};
declare type Extra = {
    each: number;
    add: string;
};
export declare type Stringable = {
    toString: () => string;
};
export default class Mask {
    static defaultPatterns: {
        '#': RegExp;
        '@': RegExp;
        '?': RegExp;
    };
    static reverser(target: string): string;
    static capitalize(target: string, all?: boolean): string;
    private readonly _escape;
    private readonly _reserved;
    private _props;
    constructor(props: MaskProps);
    get props(): Readonly<Required<MaskProps>>;
    apply<T extends Stringable>(target: T): string;
    private _addReservedChar;
    private _apply;
}
export {};
