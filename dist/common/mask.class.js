"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Mask = (function () {
    function Mask(props) {
        var _this = this;
        var _a, _b, _c, _d, _e;
        this._escape = '\\';
        this._reserved = '¬';
        this._completed = false;
        this._props = {
            masks: props.masks.sort(function (a, b) { return a.length - b.length; }),
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
        if (Object.keys(this.props.patterns).some(function (char) { return char.length !== 1; })) {
            throw new Error('Pattern keys must be only one character');
        }
        if (Object.keys(this.props.patterns).some(function (char) { return char === _this._escape || char === _this._reserved; })) {
            throw new Error("The characters ".concat(this._escape, " and ").concat(this._reserved, " are reserveds"));
        }
        this._remnant = this.props.masks.map(function (_, i) { return _this._apply('', i).split(''); });
    }
    Mask.reverser = function (target) {
        return target.split('').reverse().join('');
    };
    Mask.capitalize = function (target, all) {
        if (all === void 0) { all = false; }
        if (all)
            return target.split(' ').reduce(function (p, c) { return p + ' ' + Mask.capitalize(c); }, '').trim();
        target = target.toLowerCase();
        var i = target.search(/[a-z]/);
        return target.substring(0, i) + target.charAt(i).toUpperCase() + target.substring(i + 1);
    };
    Object.defineProperty(Mask.prototype, "props", {
        get: function () {
            return this._props;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Mask.prototype, "completed", {
        get: function () {
            return this._completed;
        },
        enumerable: false,
        configurable: true
    });
    Mask.prototype.apply = function (target) {
        return this._apply(target.toString(), 0);
    };
    Mask.prototype._addReservedChar = function (mask, index) {
        return mask.substring(0, index) + this._reserved + mask.substring(index + 1);
    };
    Mask.prototype._apply = function (target, maskIndex) {
        var _this = this;
        var _a, _b;
        if (target && this._remnant[maskIndex]) {
            var find_1 = false;
            target = target.split('').filter(function (char, i) {
                if (!find_1)
                    find_1 = _this._remnant[maskIndex][i] !== char;
                return find_1;
            }).join('');
        }
        var result = '';
        var mask = this.props.masks[maskIndex].replace(this._reserved, '');
        var targetControl = target.length;
        var maskControl = mask.length;
        var infinityPattern = /./;
        if (this.props.reverse) {
            target = Mask.reverser(target);
            mask = Mask.reverser(mask);
            mask = mask.replace(/(.)\\/g, '\\$1');
        }
        if (this.props.infinity && (this.props.masks.length - 1) === maskIndex) {
            var lastCharPattern = Math.max.apply(Math, Object.keys(this.props.patterns).map(function (char) {
                return mask.lastIndexOf(char);
            }));
            infinityPattern = this.props.patterns[mask[lastCharPattern]];
            mask = this._addReservedChar(mask, lastCharPattern);
        }
        while (targetControl && maskControl) {
            var targetChar = target.charAt(target.length - targetControl);
            var maskChar = mask.charAt(mask.length - maskControl);
            if (maskChar === this._reserved) {
                var remaining = target.substring(target.length - targetControl).split('').filter(function (char) { return infinityPattern.test(char); }).join('');
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
        while (maskControl && (this.props.placeholder || !mask.substring(mask.length - maskControl).split('').some(function (char) { return char in _this.props.patterns; }))) {
            var maskChar = mask.charAt(mask.length - maskControl);
            if (maskChar === this._escape)
                result += mask.charAt(mask.length - --maskControl);
            else
                result += (maskChar in this.props.patterns || maskChar === this._reserved) ? this.props.placeholder : maskChar;
            maskControl--;
        }
        this._completed = maskControl === 0;
        if (this.props.reverse)
            result = Mask.reverser(result);
        switch (this.props.transform) {
            case 'lowercase': return result.toLowerCase();
            case 'uppercase': return result.toUpperCase();
            case 'capitalize': return Mask.capitalize(result, false);
            case 'capitalizeAll': return Mask.capitalize(result, true);
            default: return result;
        }
    };
    Mask.defaultPatterns = {
        '#': /[0-9]/,
        '@': /[A-Za-z]/,
        '?': /[A-Za-z0-9]/
    };
    return Mask;
}());
exports.default = Mask;
