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
exports.presets = exports.Mask = exports.getPresetMask = exports.applyMask = exports.usePresetMask = exports.useMask = void 0;
var mask_class_1 = __importDefault(require("./mask.class"));
exports.Mask = mask_class_1.default;
var presets_const_1 = __importDefault(require("./presets.const"));
exports.presets = presets_const_1.default;
function useMask(settings) {
    var mask = new mask_class_1.default(settings);
    return mask.apply.bind(mask);
}
exports.useMask = useMask;
function usePresetMask(preset, change) {
    if (change === void 0) { change = {}; }
    var mask = new mask_class_1.default(getPresetMask(preset, change));
    return mask.apply.bind(mask);
}
exports.usePresetMask = usePresetMask;
function applyMask(target, settings) {
    var mask = new mask_class_1.default(settings);
    return mask.apply(target);
}
exports.applyMask = applyMask;
function getPresetMask(preset, change) {
    if (change === void 0) { change = {}; }
    return __assign(__assign({}, presets_const_1.default[preset]), change);
}
exports.getPresetMask = getPresetMask;
