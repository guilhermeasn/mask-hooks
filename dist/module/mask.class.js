/*
 * @author Guilherme Neves <guilhermeasn@yahoo.com.br>
 */
export const defaultPatterns = {
    // test only one char at a time
    '#': /[0-9]/,
    '@': /[A-Za-z]/,
    '?': /[A-Za-z0-9]/
};
export default class Mask {
    constructor(props) {
        var _a, _b, _c, _d;
        this._escape = '\\'; // escape char, must be only one character
        this._reserved = '¬'; // reserved char, must be only one character
        this._props = {
            masks: props.masks.sort((a, b) => a.length - b.length),
            patterns: (_a = props.patterns) !== null && _a !== void 0 ? _a : defaultPatterns,
            placeholder: (_b = props.placeholder) !== null && _b !== void 0 ? _b : '',
            reverse: (_c = props.reverse) !== null && _c !== void 0 ? _c : false,
            infinity: (_d = props.infinity) !== null && _d !== void 0 ? _d : false
        };
        if (this.props.placeholder.length > 1) {
            throw new Error('The placeholder must be at most one character');
        }
        if (Object.keys(this.props.patterns).some(char => char.length !== 1)) {
            throw new Error('Pattern keys must be only one character');
        }
        if (Object.keys(this.props.patterns).some(char => char === this._escape || char === this._reserved)) {
            throw new Error(`The characters ${this._escape} and ${this._reserved} are reserveds`);
        }
    }
    get props() {
        return this._props;
    }
    apply(target) {
        return this._apply(target.toString(), 0);
    }
    _apply(target, maskIndex) {
        var _a, _b;
        let result = '';
        let mask = this.props.masks[maskIndex].replace(this._reserved, '');
        let targetControl = target.length;
        let maskControl = mask.length;
        if (this.props.reverse) {
            target = target.split('').reverse().join('');
            mask = mask.split('').reverse().join('');
            mask = mask.replace(/(.)\\/g, '\\$1');
        }
        let infinityChar = '';
        if (this.props.infinity && (this.props.masks.length - 1) === maskIndex) {
            let lastCharPattern = Math.max(...Object.keys(this.props.patterns).map(char => {
                return mask.lastIndexOf(char);
            }));
            infinityChar = mask[lastCharPattern];
            mask = mask.substring(0, lastCharPattern) + this._reserved + mask.substring(lastCharPattern + 1);
        }
        while (targetControl && maskControl) {
            let targetChar = target.charAt(target.length - targetControl);
            let maskChar = mask.charAt(mask.length - maskControl);
            if (maskChar === this._reserved) {
                let remaining = target.substring(target.length - targetControl).split('').filter(char => this.props.patterns[infinityChar].test(char)).join('');
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
                    targetControl--;
                    maskControl--;
                }
                else {
                    targetControl--;
                }
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
        while (maskControl && this.props.placeholder) {
            let maskChar = mask.charAt(mask.length - maskControl);
            if (maskChar === this._escape)
                result += mask.charAt(mask.length - --maskControl);
            else
                result += (maskChar in this.props.patterns || maskChar === this._reserved) ? this.props.placeholder : maskChar;
            maskControl--;
        }
        return this.props.reverse ? result.split('').reverse().join('') : result;
    }
}
