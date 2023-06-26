"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Mask = (function () {
    function Mask(props) {
        var _this = this;
        var _a, _b, _c, _d, _e, _f, _g;
        this._escape = '\\';
        this._reserved = '¬';
        this._completed = false;
        this._cleaned = '';
        this._props = {
            masks: Array.isArray(props.masks) ? props.masks : [(_a = props.masks) === null || _a === void 0 ? void 0 : _a.toString()],
            patterns: (_b = props.patterns) !== null && _b !== void 0 ? _b : Mask.defaultPatterns,
            placeholder: (_c = props.placeholder) !== null && _c !== void 0 ? _c : '',
            reverse: (_d = props.reverse) !== null && _d !== void 0 ? _d : false,
            infinity: (_e = props.infinity) !== null && _e !== void 0 ? _e : false,
            transform: (_f = props.transform) !== null && _f !== void 0 ? _f : 'none',
            maxentries: (_g = props.maxentries) !== null && _g !== void 0 ? _g : null
        };
        this._props.masks = this.props.masks.sort(function (a, b) {
            return a.split('').filter(function (i) { return i in _this.props.patterns; }).length -
                b.split('').filter(function (i) { return i in _this.props.patterns; }).length;
        });
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
        var i = target.search(/[a-zçáéíóúàèìòùâêîôûäëïöüãõ]/);
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
    Object.defineProperty(Mask.prototype, "cleaned", {
        get: function () {
            switch (this.props.transform) {
                case 'lowercase': return this._cleaned.toLowerCase();
                case 'uppercase': return this._cleaned.toUpperCase();
                case 'capitalize': return Mask.capitalize(this._cleaned, false);
                case 'capitalizeAll': return Mask.capitalize(this._cleaned, true);
                default: return this._cleaned;
            }
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Mask.prototype, "entries", {
        get: function () {
            return this._cleaned.length;
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
        if (target && this._remnant[maskIndex]) {
            var find_1 = false;
            target = target.split('').filter(function (char, i) {
                if (!find_1)
                    find_1 = _this._remnant[maskIndex][i] !== char;
                return find_1;
            }).join('');
        }
        this._cleaned = '';
        var result = '';
        var mask = this.props.masks[maskIndex].replace(this._reserved, '');
        var targetControl = target.length;
        var maskControl = mask.length;
        var infinityPattern = /./;
        if (this.props.reverse) {
            target = Mask.reverser(target);
            mask = Mask.reverser(mask).replace(/(.)\\/g, '\\$1');
        }
        if (this.props.infinity && (this.props.masks.length - 1) === maskIndex) {
            var lastCharPattern = Math.max.apply(Math, Object.keys(this.props.patterns).map(function (char) {
                return mask.lastIndexOf(char);
            }));
            infinityPattern = this.props.patterns[mask[lastCharPattern]];
            mask = mask.substring(0, lastCharPattern) + this._reserved + mask.substring(lastCharPattern + 1);
        }
        while (targetControl && maskControl) {
            var targetChar = target.charAt(target.length - targetControl);
            var maskChar = mask.charAt(mask.length - maskControl);
            if (maskChar === this._reserved) {
                var remaining = target.substring(target.length - targetControl).split('').filter(function (char) { return infinityPattern.test(char); }).join('');
                this._cleaned += remaining;
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
            var lastEntries = this.entries;
            var lastCleaned = this.cleaned;
            var nextResult = this._apply(target, maskIndex + 1);
            if (this.entries > lastEntries)
                return nextResult;
            this._cleaned = lastCleaned;
        }
        if (targetControl && this.props.reverse) {
            var lastEntries = this.entries;
            var lastCleaned = this.cleaned;
            var nextResult = this._apply(Mask.reverser(target.substring(1)), maskIndex);
            if (this.entries >= lastEntries)
                return nextResult;
            this._cleaned = lastCleaned;
        }
        while (maskControl && (this.props.placeholder || !mask.substring(mask.length - maskControl).split('').some(function (char) { return char in _this.props.patterns; }))) {
            var maskChar = mask.charAt(mask.length - maskControl);
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
    };
    Mask.defaultPatterns = {
        '#': /[0-9]/,
        '@': /[A-Za-z]/,
        '?': /[A-Za-z0-9]/
    };
    return Mask;
}());
exports.default = Mask;
