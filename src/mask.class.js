"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/* Mask default patterns:
 *
 * # - one number
 * @ - one letter
 * ? - one number or letter
 *
 * \ - escape char
 *
 */
var defaultPatterns = {
    '#': /[0-9]/,
    '@': /[A-Za-z]/,
    '?': /[A-Za-z0-9]/
};
var Mask = /** @class */ (function () {
    function Mask(props) {
        var _a, _b, _c, _d;
        this._props = {
            masks: props.masks.sort(function (a, b) { return a.length - b.length; }),
            patterns: (_a = props.patterns) !== null && _a !== void 0 ? _a : defaultPatterns,
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
    }
    Object.defineProperty(Mask.prototype, "props", {
        get: function () {
            return this._props;
        },
        enumerable: false,
        configurable: true
    });
    Mask.prototype.apply = function (target) {
        var _this = this;
        var _a;
        if (!target)
            return '';
        var t = target.toString();
        var m = (_a = this.props.masks.find(function (m) { return m.length > t.length; })) !== null && _a !== void 0 ? _a : this.props.masks[this.props.masks.length - 1];
        return m.split('').map(function (c, i) {
            if (c in _this.props.patterns) {
                if (_this.props.patterns[c].test(t.charAt(i)))
                    return t.charAt(i);
            }
            else
                return c;
        }).join('');
    };
    return Mask;
}());
exports.default = Mask;
