declare module "mask.class" {
    export type MaskProps = {
        masks: [string, ...string[]];
        patterns?: {
            [key in string]: RegExp;
        };
        placeholder?: string;
        reverse?: boolean;
        infinity?: boolean | Extra;
    };
    type Extra = {
        each: number;
        add: string;
    };
    export const defaultPatterns: {
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
}
declare module "presets.const" {
    import type { MaskProps } from "mask.class";
    const presets: {
        [key: string]: MaskProps;
    };
    export default presets;
}
declare module "index" {
    export { default as presets } from "presets.const";
}
