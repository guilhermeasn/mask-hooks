export default class Mask {
    constructor(props) {
        var _a, _b, _c, _d, _e, _f;
        this._escape = '\\';
        this._reserved = '¬';
        this._completed = false;
        this._cleaned = '';
        this._props = {
            masks: props.masks,
            patterns: (_a = props.patterns) !== null && _a !== void 0 ? _a : Mask.defaultPatterns,
            placeholder: (_b = props.placeholder) !== null && _b !== void 0 ? _b : '',
            reverse: (_c = props.reverse) !== null && _c !== void 0 ? _c : false,
            infinity: (_d = props.infinity) !== null && _d !== void 0 ? _d : false,
            transform: (_e = props.transform) !== null && _e !== void 0 ? _e : 'none',
            maxentries: (_f = props.maxentries) !== null && _f !== void 0 ? _f : null
        };
        this._props.masks = this.props.masks.sort((a, b) => a.split('').filter(i => i in this.props.patterns).length -
            b.split('').filter(i => i in this.props.patterns).length);
        if (this.props.masks.length < 1) {
            throw new Error('At least one mask must be informed');
        }
        if (this.props.placeholder.length > 1) {
            throw new Error('The placeholder must be at most one character');
        }
        if (Object.keys(this.props.patterns).some(char => char.length !== 1)) {
            throw new Error('Pattern keys must be only one character');
        }
        if (Object.keys(this.props.patterns).some(char => char === this._escape || char === this._reserved)) {
            throw new Error(`The characters ${this._escape} and ${this._reserved} are reserveds`);
        }
        this._remnant = this.props.masks.map((_, i) => this._apply('', i).split(''));
    }
    static reverser(target) {
        return target.split('').reverse().join('');
    }
    static capitalize(target, all = false) {
        if (all)
            return target.split(' ').reduce((p, c) => p + ' ' + Mask.capitalize(c), '').trim();
        target = target.toLowerCase();
        const i = target.search(/[a-zçáéíóúàèìòùâêîôûäëïöüãõ]/);
        return target.substring(0, i) + target.charAt(i).toUpperCase() + target.substring(i + 1);
    }
    get props() {
        return this._props;
    }
    get completed() {
        return this._completed;
    }
    get cleaned() {
        switch (this.props.transform) {
            case 'lowercase': return this._cleaned.toLowerCase();
            case 'uppercase': return this._cleaned.toUpperCase();
            case 'capitalize': return Mask.capitalize(this._cleaned, false);
            case 'capitalizeAll': return Mask.capitalize(this._cleaned, true);
            default: return this._cleaned;
        }
    }
    get entries() {
        return this._cleaned.length;
    }
    apply(target) {
        return this._apply(target.toString(), 0);
    }
    _apply(target, maskIndex) {
        var _a, _b;
        if (target && this._remnant[maskIndex]) {
            let find = false;
            target = target.split('').filter((char, i) => {
                if (!find)
                    find = this._remnant[maskIndex][i] !== char;
                return find;
            }).join('');
        }
        this._cleaned = '';
        let result = '';
        let mask = this.props.masks[maskIndex].replace(this._reserved, '');
        let targetControl = target.length;
        let maskControl = mask.length;
        let infinityPattern = /./;
        if (this.props.reverse) {
            target = Mask.reverser(target);
            mask = Mask.reverser(mask).replace(/(.)\\/g, '\\$1');
        }
        if (this.props.infinity && (this.props.masks.length - 1) === maskIndex) {
            let lastCharPattern = Math.max(...Object.keys(this.props.patterns).map(char => {
                return mask.lastIndexOf(char);
            }));
            infinityPattern = this.props.patterns[mask[lastCharPattern]];
            mask = mask.substring(0, lastCharPattern) + this._reserved + mask.substring(lastCharPattern + 1);
        }
        while (targetControl && maskControl) {
            let targetChar = target.charAt(target.length - targetControl);
            let maskChar = mask.charAt(mask.length - maskControl);
            if (maskChar === this._reserved) {
                let remaining = target.substring(target.length - targetControl).split('').filter(char => infinityPattern.test(char)).join('');
                this._cleaned += remaining;
                if (typeof this.props.infinity === 'object' && this.props.infinity.each > 0) {
                    remaining = (_b = (_a = remaining.match(new RegExp(`.{1,${this.props.infinity.each}}`, 'g'))) === null || _a === void 0 ? void 0 : _a.join(this.props.infinity.add)) !== null && _b !== void 0 ? _b : remaining;
                }
                result += remaining;
                result += mask.substring(mask.length - --maskControl);
                targetControl = 0;
                maskControl = 0;
                break;
            }
            else if (maskChar === this._escape) {
                result += mask.charAt(mask.length - --maskControl);
                maskControl--;
            }
            else if (maskChar in this.props.patterns) {
                if (this.props.patterns[maskChar].test(targetChar)) {
                    this._cleaned += targetChar;
                    result += targetChar;
                    maskControl--;
                }
                targetControl--;
            }
            else {
                if (targetChar === maskChar) {
                    targetControl--;
                }
                result += maskChar;
                maskControl--;
            }
        }
        if (targetControl && this.props.masks.length > maskIndex + 1) {
            const lastEntries = this.entries;
            const lastCleaned = this.cleaned;
            const nextResult = this._apply(target, maskIndex + 1);
            if (this.entries > lastEntries)
                return nextResult;
            this._cleaned = lastCleaned;
        }
        if (targetControl && this.props.reverse) {
            const lastEntries = this.entries;
            const lastCleaned = this.cleaned;
            const nextResult = this._apply(Mask.reverser(target.substring(1)), maskIndex);
            if (this.entries >= lastEntries)
                return nextResult;
            this._cleaned = lastCleaned;
        }
        while (maskControl && (this.props.placeholder || !mask.substring(mask.length - maskControl).split('').some(char => char in this.props.patterns))) {
            let maskChar = mask.charAt(mask.length - maskControl);
            if (maskChar === this._escape)
                result += mask.charAt(mask.length - --maskControl);
            else
                result += (maskChar in this.props.patterns || maskChar === this._reserved) ? this.props.placeholder : maskChar;
            maskControl--;
        }
        this._completed = maskControl === 0 && result !== '';
        if (this.props.reverse) {
            this._cleaned = Mask.reverser(this._cleaned);
            result = Mask.reverser(result);
        }
        if (this.props.maxentries !== null && this.entries > this.props.maxentries) {
            return this._apply(this.cleaned.substring(0, this.props.maxentries), maskIndex);
        }
        switch (this.props.transform) {
            case 'lowercase': return result.toLowerCase();
            case 'uppercase': return result.toUpperCase();
            case 'capitalize': return Mask.capitalize(result, false);
            case 'capitalizeAll': return Mask.capitalize(result, true);
            default: return result;
        }
    }
}
Mask.defaultPatterns = {
    '#': /[0-9]/,
    '@': /[A-Za-z]/,
    '?': /[A-Za-z0-9]/
};
