export type MaskProps = {
    masks        : [ string, ...string[] ];
    patterns    ?: { [key in string] : RegExp };
    placeholder ?: string;
    reverse     ?: boolean;
    infinity    ?: boolean | Extra;
}

type Extra = {
    each : number;
    add  : string;
}

/* Mask default patterns:
 *
 * # - one number
 * @ - one letter
 * ? - one number or letter
 *
 * \ - escape char
 *
 */
const defaultPatterns = {
    '#': /[0-9]/,
    '@': /[A-Za-z]/,
    '?': /[A-Za-z0-9]/
};

export default class Mask {

    private _props : Required<MaskProps>;

    constructor(props : MaskProps) {

        this._props = {
            masks:       props.masks.sort((a, b) => a.length - b.length),
            patterns:    props.patterns    ?? defaultPatterns,
            placeholder: props.placeholder ?? '',
            reverse:     props.reverse     ?? false,
            infinity:    props.infinity    ?? false
        }

        if(this.props.placeholder.length > 1) {
            throw new Error('The placeholder must be at most one character');
        }

        if(Object.keys(this.props.patterns).some(char => char.length !== 1)) {
            throw new Error('Pattern keys must be only one character');
        }

    }

    public get props() : Readonly<Required<MaskProps>> {
        return this._props;
    }

    apply(target : string | number) : string {

        if(!target) return '';

        const t : string = target.toString();
        const m : string = this.props.masks.find(m => m.length > t.length) ?? this.props.masks[this.props.masks.length-1];

        return m.split('').map((c, i) => {

            if(c in this.props.patterns) {
                if(this.props.patterns[c].test(t.charAt(i))) return t.charAt(i);
            } else return c;

        }).join('');

    }

}
