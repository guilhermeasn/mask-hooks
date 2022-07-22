/*
 * @author Guilherme Neves <guilhermeasn@yahoo.com.br>
 */

/* Mask default chars:
 *
 * # - one number, can be changed
 * @ - one letter, can be changed
 * ? - one number or letter, can be changed
 *
 * \ - escape char
 * ¬ - reserved char
 *
 */

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

export const defaultPatterns = {
    // test only one char at a time
    '#': /[0-9]/,
    '@': /[A-Za-z]/,
    '?': /[A-Za-z0-9]/
};

export default class Mask {

    private readonly _escape : string = '\\';    // escape char, must be only one character
    private readonly _reserved : string = '¬';   // reserved char, must be only one character

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

        if(Object.keys(this.props.patterns).some(char => char === this._escape || char === this._reserved)) {
            throw new Error(`The chars ${ this._escape } and ${ this._reserved } are reserveds`)
        }

    }

    public get props() : Readonly<Required<MaskProps>> {
        return this._props;
    }

    public apply<T extends { toString : () => string }>(target : T) : string {
        return this._apply(target.toString(), 0);
    }

    private _apply(target : string, maskIndex : number) : string {

        let result = '';
        
        let mask : string = this.props.masks[maskIndex];

        let targetControl = target.length;
        let maskControl = mask.length;

        if(this.props.reverse) {
            target = target.split('').reverse().join('');
            mask = mask.split('').reverse().join('');
            mask = mask.replace(/(.)\\/, '\\$1');
        }

        let infinityChar : string = '';
        
        if(this.props.infinity && (this.props.masks.length - 1) === maskIndex) {

            mask = mask.replace(this._reserved, '');

            let lastCharPattern = Math.max.apply(null, Object.keys(this.props.patterns).map<number>(char => {
                return mask.lastIndexOf(char);
            }));

            infinityChar = mask[lastCharPattern];

            mask = mask.substring(0, lastCharPattern) + this._reserved + mask.substring(lastCharPattern + 1);

        }
        
        while(targetControl && maskControl) {

            let targetChar = target.charAt(target.length - targetControl);
            let maskChar = mask.charAt(mask.length - maskControl);

            if(maskChar === this._reserved) {
                
                let remaining : string = target.substring(target.length - targetControl).split('').filter(char => this.props.patterns[infinityChar].test(char)).join('');

                if(typeof this.props.infinity === 'object' && this.props.infinity.each > 0) {
                    remaining = remaining.match(new RegExp(`.{1,${ this.props.infinity.each }}`, 'g'))?.join(this.props.infinity.add) ?? remaining;
                }

                result += remaining;
                result += mask.substring(mask.length - --maskControl);

                targetControl = 0;
                maskControl = 0;

                break;

            } else if(maskChar === this._escape) {

                result += mask.charAt(mask.length - --maskControl);
                maskControl--;

            } else if(maskChar in this.props.patterns) {

                if(this.props.patterns[maskChar].test(targetChar)) {
                    result += targetChar;
                    targetControl--;
                    maskControl--;
                } else {
                    targetControl--;
                }

            } else if(targetChar === maskChar) {

                result += maskChar;
                targetControl--;
                maskControl--;

            } else {

                result += maskChar;
                maskControl--;
                
            }

        }

        if(targetControl && this.props.masks.length > ++maskIndex) {
            return this._apply(target, maskIndex);
        }

        while(this.props.placeholder && maskControl) {

            let maskChar = mask.charAt(mask.length - maskControl);

            if(maskChar === this._escape) result += mask.charAt(mask.length - --maskControl);
            else result += (maskChar in this.props.patterns || maskChar === this._reserved) ? this.props.placeholder : maskChar;

            maskControl--;

        }

        return this.props.reverse ? result.split('').reverse().join('') : result;

    }

}