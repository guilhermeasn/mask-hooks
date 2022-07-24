export default class Mask {
    constructor(props) {
        var _a, _b, _c, _d, _e;
        this._escape = '\\';
        this._reserved = '¬';
        this._props = {
            masks: props.masks.sort((a, b) => a.length - b.length),
            patterns: (_a = props.patterns) !== null && _a !== void 0 ? _a : Mask.defaultPatterns,
            placeholder: (_b = props.placeholder) !== null && _b !== void 0 ? _b : '',
            reverse: (_c = props.reverse) !== null && _c !== void 0 ? _c : false,
            infinity: (_d = props.infinity) !== null && _d !== void 0 ? _d : false,
            transform: (_e = props.transform) !== null && _e !== void 0 ? _e : 'none'
        };
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
        this._remnant = this.apply('').split('');
    }
    static reverser(target) {
        return target.split('').reverse().join('');
    }
    static capitalize(target, all = false) {
        if (all)
            return target.split(' ').reduce((p, c) => p + ' ' + Mask.capitalize(c), '').trim();
        target = target.toLowerCase();
        const i = target.search(/[a-z]/);
        return target.substring(0, i) + target.charAt(i).toUpperCase() + target.substring(i + 1);
    }
    get props() {
        return this._props;
    }
    apply(target) {
        return this._apply(target.toString(), 0);
    }
    _addReservedChar(mask, index) {
        return mask.substring(0, index) + this._reserved + mask.substring(index + 1);
    }
    _apply(target, maskIndex) {
        var _a, _b;
        if (this._remnant && target) {
            let find = false;
            target = target.split('').filter((char, i) => {
                if (!find)
                    find = this._remnant[i] !== char;
                return find;
            }).join('');
        }
        let result = '';
        let mask = this.props.masks[maskIndex].replace(this._reserved, '');
        let targetControl = target.length;
        let maskControl = mask.length;
        let infinityPattern = /./;
        if (this.props.reverse) {
            target = Mask.reverser(target);
            mask = Mask.reverser(mask);
            mask = mask.replace(/(.)\\/g, '\\$1');
        }
        if (this.props.infinity && (this.props.masks.length - 1) === maskIndex) {
            let lastCharPattern = Math.max(...Object.keys(this.props.patterns).map(char => {
                return mask.lastIndexOf(char);
            }));
            infinityPattern = this.props.patterns[mask[lastCharPattern]];
            mask = this._addReservedChar(mask, lastCharPattern);
        }
        while (targetControl && maskControl) {
            let targetChar = target.charAt(target.length - targetControl);
            let maskChar = mask.charAt(mask.length - maskControl);
            if (maskChar === this._reserved) {
                let remaining = target.substring(target.length - targetControl).split('').filter(char => infinityPattern.test(char)).join('');
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
                    result += targetChar;
                    maskControl--;
                }
                targetControl--;
            }
            else if (targetChar === maskChar) {
                result += maskChar;
                targetControl--;
                maskControl--;
            }
            else {
                result += maskChar;
                maskControl--;
            }
        }
        if (targetControl && this.props.masks.length > ++maskIndex) {
            return this._apply(target, maskIndex);
        }
        while (maskControl && (this.props.placeholder || !mask.substring(mask.length - maskControl).split('').some(char => char in this.props.patterns))) {
            let maskChar = mask.charAt(mask.length - maskControl);
            if (maskChar === this._escape)
                result += mask.charAt(mask.length - --maskControl);
            else
                result += (maskChar in this.props.patterns || maskChar === this._reserved) ? this.props.placeholder : maskChar;
            maskControl--;
        }
        if (this.props.reverse)
            result = Mask.reverser(result);
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
