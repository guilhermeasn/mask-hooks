/*
 * @author Guilherme Neves <guilhermeasn@yahoo.com.br>
 */

/* Mask default chars:
 *
 * # - one number, can be changed
 * @ - one letter, can be changed
 * ? - one number or letter, can be changed
 *
 * [min-max] - numerical range
 * 
 * \ - escape char
 * 
 * ▌ - reserved char
 * ▐ - reserved char
 *
 */

export type MaskProps = {
    masks        : string[];
    patterns    ?: { [key in string] : RegExp };
    placeholder ?: string;
    reverse     ?: boolean;
    infinity    ?: boolean | Extra;
    transform   ?: 'uppercase' | 'lowercase' | 'capitalize' | 'capitalizeAll' | 'none';
    maxentries  ?: number | null;
}

type Extra = {
    each : number;
    add  : string;
}

export type Stringable = {
    toString : () => string;
}

export default class Mask {

    /* STATIC RESOURCES */

    public static defaultPatterns = {
        // test only one char at a time
        '#': /[0-9]/,
        '@': /[A-Za-z]/,
        '?': /[A-Za-z0-9]/
    };

    public static reverser(target : string) : string {
        return target.split('').reverse().join('');
    }

    public static transform(target : string, type : Required<MaskProps>['transform']) : string {

        function capitalize(target : string, all: boolean = false) : string {
            if(all) return target.split(' ').reduce((p, c) => p + ' ' + capitalize(c), '').trim();
    
            target = target.toLowerCase();
            const i = target.search(/[a-zçáéíóúàèìòùâêîôûäëïöüãõ]/);
            
            return target.substring(0, i) + target.charAt(i).toUpperCase() + target.substring(i + 1);
        }

        switch(type) {
            case 'lowercase':     return target.toLowerCase();
            case 'uppercase':     return target.toUpperCase();
            case 'capitalize':    return capitalize(target, false);
            case 'capitalizeAll': return capitalize(target, true);
            default:              return target;
        }

    }

    public static padding(target : string, length : number, mode : 'LEFT' | 'RIGHT', char : string = '0') {

        let pad : string = '';

        for(let c = 0; c < length; c++) pad += char;

        return mode === 'LEFT'  ? (pad + target).slice(target.length) :
               mode === 'RIGHT' ? (target + pad).slice(0, length)     :
               target;

    }

    /* ATTRIBUTES */

    private readonly _reserveds = {
        escape:    '\\',
        infinity:  '▌',
        numerical: '▐'
    };
    
    private _completed : boolean = false;
    private _cleaned   : string  = '';
    private _remnant   : string[][];

    private _props : Required<MaskProps>;

    /* PUBLIC METHODS */

    public constructor(props : MaskProps) {

        // fill props needed

        this._props = {
            masks:       Array.isArray(props.masks) ? props.masks.map(m => m.toString()) : [ (props.masks as any)?.toString() ],
            patterns:    props.patterns    ?? Mask.defaultPatterns,
            placeholder: props.placeholder ?? '',
            reverse:     props.reverse     ?? false,
            infinity:    props.infinity    ?? false,
            transform:   props.transform   ?? 'none',
            maxentries:  props.maxentries  ?? null
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

        if(Object.keys(this.props.patterns).some(char => Object.values(this._reserveds).some(reserved => reserved === char))) {
            throw new Error(`The characters ${ Object.values(this._reserveds).join(', ') } are reserveds`)
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

    public get cleaned() : string {
        return Mask.transform(this._cleaned, this.props.transform);
    }

    public get entries() : number {
        return this._cleaned.length;
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

        this._cleaned = '';

        // control variables

        let result : string = '';
        
        let mask = this.props.masks[maskIndex];

        mask = mask.replace(this._reserveds.infinity, '');
        mask = mask.replace(this._reserveds.numerical, '');

        let rangeIndex : number = 0;
        let range = (mask.match(/\[\d+-\d+\]/gim) ?? []).map(r => r.replace(/[\[\]]/gim, ''));
        if(range.length) mask = mask.replace(/\[\d+-\d+\]/gim, this._reserveds.numerical);
        
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

            mask = mask.substring(0, lastCharPattern) + this._reserveds.infinity + mask.substring(lastCharPattern + 1);

        }

        // fill the mask with the target
        
        while(targetControl && maskControl) {

            let targetChar = target.charAt(target.length - targetControl);
            let maskChar = mask.charAt(mask.length - maskControl);

            if(maskChar === this._reserveds.escape) {

                result += mask.charAt(mask.length - --maskControl);
                maskControl--;

            } else if(maskChar === this._reserveds.infinity) {
                
                let remaining : string = target.substring(target.length - targetControl).split('').filter(char => infinityPattern.test(char)).join('');
                this._cleaned += remaining;

                if(typeof this.props.infinity === 'object' && this.props.infinity.each > 0) {
                    remaining = remaining.match(new RegExp(`.{1,${ this.props.infinity.each }}`, 'g'))?.join(this.props.infinity.add) ?? remaining;
                }

                result += remaining;
                result += mask.substring(mask.length - --maskControl);

                targetControl = 0;
                maskControl = 0;

                break;

            } else if(maskChar === this._reserveds.numerical) {

                /**
                 * # Algoritmo para o numerical range:
                 * 
                 * 1 - declarar as variáveis de controle: minimo, maximo, comprimento, numeroAtual, numeroTotal;
                 *      1.1 - verificar se o próximo caracter do target é numero e substituir no numeroAtual
                 *      1.2 - adicionar no numeroTotal
                 * 2 - verificar comprimento do numeroTotal:
                 *      2.1 - se comprimento menor: verificar se com zeros a direita até o comprimento permanece sendo menor ou igual ao máximo e maior ou igual ao minimo
                 *          2.1.1 - se sim: permitir a entrada do numeroAtual, sem os zeros que foram adicionados a direita, voltar para 1.1
                 *          2.1.2 - se não: colocar um zero a esquerda no numeroAtual e numeroTotal, voltar para 2
                 *      2.2 - se comprimento igual: verificar se numeroTotal continua maior ou igual que o minimo e menor e igual que o minimo para permitir a entrada do numeroAtual
                 * 
                 */

                /**
// algoritimo para usar no console

let result = '';

let min = 2000;
let max = 3001;

let len = max.toString().length;

function reset(_min = 2000, _max = 3001) {
    min = _min;
    max = _max;
    len = max.toString().length
    result = '';
}

function padding(num = '', size = 2, right = true) {

    let complement = '';

    for(let c = 0; c < size; c++) {
        complement += '0';
    }

    return right
        ? (num + complement).slice(0, size)
        : (complement + num).slice(num.length);

}

function input(num = '') {

    num = num.toString();
    if(isNaN(parseInt(num))) return;

    let acc = result + num;

    if(acc.length < len) {
        let test = parseInt(padding(acc, len, true))
        console.log('testando opcao', test);
        if(test >= min && test <= max) {
            result += num;
        } else {
            input('0' + num);
        }
    } else if(parseInt(acc) >= min && parseInt(acc) <= max) result += num;

    return result;

}
                 */

                // let [min, max] = range[rangeIndex++].split('-').map(n => parseInt(n));

                // const numTest = (num : string, minTest : boolean = false) : boolean => {
                //     let int : number = parseInt(num);
                //     return !isNaN(int) &&
                //             int <= max &&
                //             (minTest ? int >= min : true)
                // }

                // let num : string = '';

                // while(numTest(num + targetChar) && targetControl) {
                //     num += targetChar;
                //     targetChar = target.charAt(target.length - --targetControl);
                // }

                // /* UNDER CONSTRUCTION */

                // num = parseInt(num).toString();

                // let maxlength = max.toString().length;

                // if(maxlength != num.length) {

                //     let complement : string = '';

                //     for(let c = 0; c < maxlength; c++) {
                //         complement += '0';
                //     }

                //     const avail = parseInt((num + complement).slice(0, maxlength)) <= max;

                //     if(avail)  {
                //         this._cleaned += num;
                //         result += num;
                //     } else {
                //         num = (complement + num).slice(num.length);
                //         this._cleaned += num;
                //         result += num;
                //         maskControl--;
                //     }
                        
                // } else if(numTest(num, true)) {

                //     this._cleaned += num;
                //     result += num;
                //     maskControl--;

                // }

            } else if(maskChar in this.props.patterns) {

                if(this.props.patterns[maskChar].test(targetChar)) {
                    
                    this._cleaned += targetChar;
                    result += targetChar;

                    maskControl--;

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

        if(targetControl && this.props.masks.length > maskIndex + 1) {
            const lastEntries : number = this.entries;
            const lastCleaned : string = this.cleaned;
            const nextResult  : string = this._apply(target, maskIndex + 1);
            if(this.entries > lastEntries) return nextResult;
            this._cleaned = lastCleaned;
        }

        // if there is more target and the dice are reversed, try to advance the target

        if(targetControl && this.props.reverse) {
            const lastEntries : number = this.entries;
            const lastCleaned : string = this.cleaned;
            const nextResult  : string = this._apply(Mask.reverser(target.substring(1)), maskIndex);
            if(this.entries >= lastEntries) return nextResult;
            this._cleaned = lastCleaned;
        }

        // fills the rest of the mask with a placeholder or just completes the mask that there are no more characters to replace
        
        while(maskControl && (this.props.placeholder || !mask.substring(mask.length - maskControl).split('').some(char => char in this.props.patterns || char === this._reserveds.numerical))) {

            let maskChar = mask.charAt(mask.length - maskControl);

            if(maskChar === this._reserveds.escape) result += mask.charAt(mask.length - --maskControl);
            else result += (
                maskChar in this.props.patterns       ||
                maskChar === this._reserveds.infinity ||
                maskChar === this._reserveds.numerical
            ) ? this.props.placeholder : maskChar;

            maskControl--;

        }

        // save status

        this._completed = maskControl === 0 && result !== '';

        // reverse the reverse data

        if(this.props.reverse) {
            this._cleaned = Mask.reverser(this._cleaned);
            result = Mask.reverser(result);
        }

        // if there is limitation in data entry

        if(this.props.maxentries !== null && this.entries > this.props.maxentries) {
            return this._apply(this.cleaned.substring(0, this.props.maxentries), maskIndex);
        }

        // returns result with optional transformation
        return Mask.transform(result, this.props.transform);

    }

}
