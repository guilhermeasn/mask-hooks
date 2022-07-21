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
export const defaultPatterns = {
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

        let result = '';
        
        let tval : string = target.toString();
        let mask : string = this.props.masks.find(mask => mask.length > tval.length)
                           ?? this.props.masks[this.props.masks.length - 1];

        let tvalControl = tval.length;
        let maskControl = mask.length;

        if(this.props.reverse) {
            tval = tval.split('').reverse().join('');
            mask = mask.split('').reverse().join('');
            mask = mask.replace(/(.)\\/, '\\$1');
        }
        
        while(tvalControl) {

            if(maskControl) {

                let tvalChar = tval.charAt(tval.length - tvalControl);
                let maskChar = mask.charAt(mask.length - maskControl);

                if(maskChar === '\\') {
                    maskControl--;
                    result += mask.charAt(mask.length - maskControl);
                    maskControl--;
                } else if(maskChar in this.props.patterns) {
                    if(this.props.patterns[maskChar].test(tvalChar)) {
                        result += tvalChar;
                        tvalControl--;
                        maskControl--;
                    } else {
                        tvalControl--;
                    }
                } else if(tvalChar === maskChar) {
                    result += maskChar;
                    tvalControl--;
                    maskControl--;
                } else {
                    result += maskChar;
                    maskControl--;
                }

            } else if(this.props.infinity) {

                const lastCharPatternIndex : number = mask.length - mask.split('').reverse().findIndex(char => char in this.props.patterns) - 1;
                let maskChar = mask[lastCharPatternIndex];

                console.log(lastCharPatternIndex, maskChar);

                if(maskChar) {

                    const remaining = tval.substring(tvalControl).split('').filter(char => {
                        return this.props.patterns[maskChar].test(char)
                    }).join('');

                    result = result.substring(0, lastCharPatternIndex + 1) + remaining + result.substring(lastCharPatternIndex + 1);

                }

                break;

            } else break;

        }

        while(this.props.placeholder && maskControl) {
            let maskChar = mask.charAt(mask.length - maskControl);
            result += (maskChar in this.props.patterns) ? this.props.placeholder : maskChar;
            maskControl--;
        }

        return this.props.reverse ? result.split('').reverse().join('') : result;

    }

}
