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
        const i = target.search(/[a-zçáéíóúàèìòùâêîôûäëïöüãõ]/);
        
        return target.substring(0, i) + target.charAt(i).toUpperCase() + target.substring(i + 1);
    }

    /* ATTRIBUTES */

    private readonly _escape   : string = '\\';  // escape char, must be only one character
    private readonly _reserved : string = '¬';   // reserved char, must be only one character
    
    private _completed : boolean = false;
    private _entries   : number  = 0;
    private _remnant   : string[][];

    private _props : Required<MaskProps>;

    /* PUBLIC METHODS */

    public constructor(props : MaskProps) {

        // fill props needed

        this._props = {
            masks:       props.masks,
            patterns:    props.patterns    ?? Mask.defaultPatterns,
            placeholder: props.placeholder ?? '',
            reverse:     props.reverse     ?? false,
            infinity:    props.infinity    ?? false,
            transform:   props.transform   ?? 'none'
        }

        // sort masks by pattern chars

        this._props.masks = this.props.masks.sort((a, b) =>
            a.split('').filter(i => i in this.props.patterns).length -
            b.split('').filter(i => i in this.props.patterns).length
        );

        // throw errors

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

        // data that is auto-populated

        this._remnant = this.props.masks.map((_, i) => this._apply('', i).split(''));

    }

    public get props() : Readonly<Required<MaskProps>> {
        return this._props;
    }

    public get completed() : boolean {
        return this._completed;
    }

    public get entries() : number {
        return this._entries;
    }

    public apply<T extends Stringable>(target : T) : string {
        return this._apply(target.toString(), 0);
    }

    /* PRIVATE METHODS */

    private _apply(target : string, maskIndex : number) : string {

        // erase the remnant mask and placeholer

        if(target && this._remnant[maskIndex]) {

            let find : boolean = false;

            target = target.split('').filter((char, i) => {
                if(!find) find = this._remnant[maskIndex][i] !== char;
                return find;
            }).join('');

        }

        this._entries = 0;

        // control variables

        let result : string = '';
        
        let mask : string = this.props.masks[maskIndex].replace(this._reserved, '');

        let targetControl : number = target.length;
        let maskControl   : number = mask.length;

        let infinityPattern : RegExp = /./;

        // reverse fill preparation

        if(this.props.reverse) {
            target = Mask.reverser(target);
            mask   = Mask.reverser(mask).replace(/(.)\\/g, '\\$1');
        }

        // marks the location in the mask with the reserved char for infinity data
        
        if(this.props.infinity && (this.props.masks.length - 1) === maskIndex) {

            let lastCharPattern = Math.max(...Object.keys(this.props.patterns).map<number>(char => {
                return mask.lastIndexOf(char);
            }));

            infinityPattern = this.props.patterns[mask[lastCharPattern]];

            mask = mask.substring(0, lastCharPattern) + this._reserved + mask.substring(lastCharPattern + 1);

        }

        // fill the mask with the target
        
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

                this._entries++;

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
                    this._entries++;
                }
                
                targetControl--;

            } else {

                if(targetChar === maskChar) {
                    targetControl--;
                }

                result += maskChar;
                maskControl--;

            }

        }

        // if there is more target, move to a bigger mask if available

        if(targetControl && this.props.masks.length > ++maskIndex) {
            const lastEntries : number = this.entries;
            const nextResult  : string = this._apply(target, maskIndex);
            if(this.entries > lastEntries) return nextResult;
            this._entries = lastEntries;
        }

        // fills the rest of the mask with a placeholder or just completes the mask that there are no more characters to replace
        
        while(maskControl && (this.props.placeholder || !mask.substring(mask.length - maskControl).split('').some(char => char in this.props.patterns))) {

            let maskChar = mask.charAt(mask.length - maskControl);

            if(maskChar === this._escape) result += mask.charAt(mask.length - --maskControl);
            else result += (maskChar in this.props.patterns || maskChar === this._reserved) ? this.props.placeholder : maskChar;

            maskControl--;

        }

        // save status

        this._completed = maskControl === 0 && result !== '';

        // reverse the reverse data

        if(this.props.reverse) result = Mask.reverser(result);

        // returns result with optional transformation

        switch(this.props.transform) {
            case 'lowercase':     return result.toLowerCase();
            case 'uppercase':     return result.toUpperCase();
            case 'capitalize':    return Mask.capitalize(result, false);
            case 'capitalizeAll': return Mask.capitalize(result, true);
            default:              return result;
        }

    }

}
