"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Mask = exports.presets = exports.applyMask = exports.useMask = void 0;
var mask_class_1 = __importDefault(require("./mask.class"));
exports.Mask = mask_class_1.default;
function useMask(settings) {
    var mask = new mask_class_1.default(settings);
    return mask.apply;
}
exports.useMask = useMask;
function applyMask(target, masks, options) {
    if (options === void 0) { options = {}; }
    return new mask_class_1.default(__assign(__assign({}, options), { masks: Array.isArray(masks) ? masks : [masks] })).apply(target);
}
exports.applyMask = applyMask;
var presets_const_1 = require("./presets.const");
Object.defineProperty(exports, "presets", { enumerable: true, get: function () { return __importDefault(presets_const_1).default; } });
