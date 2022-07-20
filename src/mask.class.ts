/* Mask default special chars:
 *
 * # - one number
 * @ - one letter
 * ? - one number or letter
 *
 * \ - escape char
 *
 */

export type MaskProps = {
    masks        : [string, ...string[]];
    patterns    ?: { [key in `${string}`] : RegEx }
    infinity    ?: boolean
    mode        ?: 'AUTO' | 'NORMAL' | 'REVERSE';
    placeholder ?: `${string}`;
    extra       ?: Extra | null;
    filter      ?: RegEx;
}

type Extra = {
    each : number;
    add  : string;
}

const defaultPatterns = {
    '#': /[0-9]/,
    '@': /[A-Za-z]/,
    '?': /[A-Za-z0-9]/
};

export default class Mask {

    private _props : Required<MaskProps>;

    constructor(props : MaskProps) {
        this._props = {
            masks: props.mask.sort(),
            patterns: props.patterns ?? defaultPatterns,
            infinity: props.infinity ?? false,
            mode: props.mode ?? 'AUTO',
            placeholder: props.placeholder ?? null,
            extra: props.extra ?? null
        }
    }

    apply(target : string | number) : string {


        return '';

    }

}
