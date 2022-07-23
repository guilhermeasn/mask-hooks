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
    masks        : string[];
    patterns    ?: { [key in string] : RegExp };
    placeholder ?: string;
    reverse     ?: boolean;
    infinity    ?: boolean | Extra;
    transform   ?: 'uppercase' | 'lowercase' | 'capitalize' | 'capitalizeAll' | 'none';
}

type Extra = {
    each : number;
    add  : string;
}

export type Stringable = {
    toString : () => string;
}

export default class Mask {

    /* STATIC METHODS */

    public static defaultPatterns = {
        // test only one char at a time
        '#': /[0-9]/,
        '@': /[A-Za-z]/,
        '?': /[A-Za-z0-9]/
    };

    public static reverser(target : string) : string {
        return target.split('').reverse().join('');
    }

    public static capitalize(target : string, all: boolean = false) : string {
        if(all) return target.split(' ').reduce((p, c) => p + ' ' + Mask.capitalize(c), '').trim();

        target = target.toLowerCase();
        const i = target.search(/[a-z]/);
        
        return target.substring(0, i) + target.charAt(i).toUpperCase() + target.substring(i + 1);
    }

    /* ATTRIBUTES */

    private readonly _escape : string = '\\';    // escape char, must be only one character
    private readonly _reserved : string = '¬';   // reserved char, must be only one character

    private _props : Required<MaskProps>;

    private _lastTargetLength : number = 0;

    /* PUBLIC METHODS */

    public constructor(props : MaskProps) {

        this._props = {
            masks:       props.masks.sort((a, b) => a.length - b.length),
            patterns:    props.patterns    ?? Mask.defaultPatterns,
            placeholder: props.placeholder ?? '',
            reverse:     props.reverse     ?? false,
            infinity:    props.infinity    ?? false,
            transform:   props.transform   ?? 'none'
        }

        if(this.props.masks.length < 1) {
            throw new Error('At least one mask must be informed');
        }

        if(this.props.placeholder.length > 1) {
            throw new Error('The placeholder must be at most one character');
        }

        if(Object.keys(this.props.patterns).some(char => char.length !== 1)) {
            throw new Error('Pattern keys must be only one character');
        }

        if(Object.keys(this.props.patterns).some(char => char === this._escape || char === this._reserved)) {
            throw new Error(`The characters ${ this._escape } and ${ this._reserved } are reserveds`)
        }

    }

    public get props() : Readonly<Required<MaskProps>> {
        return this._props;
    }

    public apply<T extends Stringable>(target : T) : string {
        return this._apply(target.toString(), 0);
    }

    /* PRIVATE METHODS */

    private _addReservedChar(mask : string, index : number) : string {
        return mask.substring(0, index) + this._reserved + mask.substring(index + 1);
    }

    private _apply(target : string, maskIndex : number) : string {

        let result = '';
        
        let mask : string = this.props.masks[maskIndex].replace(this._reserved, '');

        let targetControl = target.length;
        let maskControl = mask.length;

        if(this.props.placeholder) {
            target = target.replace(new RegExp('[\\' + this.props.placeholder + ']+$','gim'), '');
        }

        if(this.props.reverse) {
            target = Mask.reverser(target);
            mask = Mask.reverser(mask);
            mask = mask.replace(/(.)\\/g, '\\$1');
        }

        let infinityPattern : RegExp = /./;
        
        if(this.props.infinity && (this.props.masks.length - 1) === maskIndex) {

            let lastCharPattern = Math.max(...Object.keys(this.props.patterns).map<number>(char => {
                return mask.lastIndexOf(char);
            }));

            infinityPattern = this.props.patterns[mask[lastCharPattern]];

            mask = this._addReservedChar(mask, lastCharPattern);

        }
        
        while(targetControl && maskControl) {

            let targetChar = target.charAt(target.length - targetControl);
            let maskChar = mask.charAt(mask.length - maskControl);

            if(maskChar === this._reserved) {
                
                let remaining : string = target.substring(target.length - targetControl).split('').filter(char => infinityPattern.test(char)).join('');

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
                    maskControl--;
                }
                
                targetControl--;

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
        
        while(maskControl && this._lastTargetLength <= target.length && (this.props.placeholder || !mask.substring(mask.length - maskControl).split('').some(char => char in this.props.patterns))) {

            let maskChar = mask.charAt(mask.length - maskControl);

            if(maskChar === this._escape) result += mask.charAt(mask.length - --maskControl);
            else result += (maskChar in this.props.patterns || maskChar === this._reserved) ? this.props.placeholder : maskChar;

            maskControl--;

        }

        this._lastTargetLength = target.length;

        if(this.props.reverse) result = Mask.reverser(result);

        switch(this.props.transform) {
            case 'lowercase':     return result.toLowerCase();
            case 'uppercase':     return result.toUpperCase();
            case 'capitalize':    return Mask.capitalize(result, false);
            case 'capitalizeAll': return Mask.capitalize(result, true);
            default:              return result;
        }

    }

}