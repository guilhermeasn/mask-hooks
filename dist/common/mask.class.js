"use strict";
/*
 * @author Guilherme Neves <guilhermeasn@yahoo.com.br>
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.defaultPatterns = void 0;
exports.defaultPatterns = {
    // test only one char at a time
    '#': /[0-9]/,
    '@': /[A-Za-z]/,
    '?': /[A-Za-z0-9]/
};
var Mask = /** @class */ (function () {
    function Mask(props) {
        var _this = this;
        var _a, _b, _c, _d;
        this._escape = '\\'; // escape char, must be only one character
        this._reserved = '¬'; // reserved char, must be only one character
        this._props = {
            masks: props.masks.sort(function (a, b) { return a.length - b.length; }),
            patterns: (_a = props.patterns) !== null && _a !== void 0 ? _a : exports.defaultPatterns,
            placeholder: (_b = props.placeholder) !== null && _b !== void 0 ? _b : '',
            reverse: (_c = props.reverse) !== null && _c !== void 0 ? _c : false,
            infinity: (_d = props.infinity) !== null && _d !== void 0 ? _d : false
        };
        if (this.props.placeholder.length > 1) {
            throw new Error('The placeholder must be at most one character');
        }
        if (Object.keys(this.props.patterns).some(function (char) { return char.length !== 1; })) {
            throw new Error('Pattern keys must be only one character');
        }
        if (Object.keys(this.props.patterns).some(function (char) { return char === _this._escape || char === _this._reserved; })) {
            throw new Error("The characters ".concat(this._escape, " and ").concat(this._reserved, " are reserveds"));
        }
    }
    Object.defineProperty(Mask.prototype, "props", {
        get: function () {
            return this._props;
        },
        enumerable: false,
        configurable: true
    });
    Mask.prototype.apply = function (target) {
        return this._apply(target.toString(), 0);
    };
    Mask.prototype._apply = function (target, maskIndex) {
        var _this = this;
        var _a, _b;
        var result = '';
        var mask = this.props.masks[maskIndex].replace(this._reserved, '');
        var targetControl = target.length;
        var maskControl = mask.length;
        if (this.props.reverse) {
            target = target.split('').reverse().join('');
            mask = mask.split('').reverse().join('');
            mask = mask.replace(/(.)\\/g, '\\$1');
        }
        var infinityChar = '';
        if (this.props.infinity && (this.props.masks.length - 1) === maskIndex) {
            var lastCharPattern = Math.max.apply(Math, Object.keys(this.props.patterns).map(function (char) {
                return mask.lastIndexOf(char);
            }));
            infinityChar = mask[lastCharPattern];
            mask = mask.substring(0, lastCharPattern) + this._reserved + mask.substring(lastCharPattern + 1);
        }
        while (targetControl && maskControl) {
            var targetChar = target.charAt(target.length - targetControl);
            var maskChar = mask.charAt(mask.length - maskControl);
            if (maskChar === this._reserved) {
                var remaining = target.substring(target.length - targetControl).split('').filter(function (char) { return _this.props.patterns[infinityChar].test(char); }).join('');
                if (typeof this.props.infinity === 'object' && this.props.infinity.each > 0) {
                    remaining = (_b = (_a = remaining.match(new RegExp(".{1,".concat(this.props.infinity.each, "}"), 'g'))) === null || _a === void 0 ? void 0 : _a.join(this.props.infinity.add)) !== null && _b !== void 0 ? _b : remaining;
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
            var maskChar = mask.charAt(mask.length - maskControl);
            if (maskChar === this._escape)
                result += mask.charAt(mask.length - --maskControl);
            else
                result += (maskChar in this.props.patterns || maskChar === this._reserved) ? this.props.placeholder : maskChar;
            maskControl--;
        }
        return this.props.reverse ? result.split('').reverse().join('') : result;
    };
    return Mask;
}());
exports.default = Mask;
