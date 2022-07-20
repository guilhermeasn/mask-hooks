/* Mask special chars:
 *
 * # - one number
 * @ - one letter
 * ? - one filtered
 * 
 * *# - residual numbers
 * *@ - residual letters
 * *? - residual filtereds
 *
 * \ - escape char
 *
 */

export type MaskProps = {
    mask         : [string, ...string[]];
    mode        ?: 'AUTO' | 'NORMAL' | 'REVERSE';
    placeholder ?: `${string}` | null;
    extra       ?: Extra | null;
    filter      ?: RegEx;
}

type Extra = {
    each : number;
    add  : string;
}

export default class Mask {

    private _props : Required<MaskProps>;

    constructor(props : MaskProps) {
        this._props = {
            mask: props.mask,
            mode: props.mode ?? 'AUTO',
            placeholder: props.placeholder ?? null,
            extra: props.extra ?? null,
            filter: props.filter ?? /A-Za-z0-9/
        }
    }

    apply(target : string | number) : string {


        return '';

    }

}
