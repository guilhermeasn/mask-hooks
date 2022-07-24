"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Mask = exports.presets = exports.applyMask = exports.useMask = void 0;
var mask_class_1 = __importDefault(require("./mask.class"));
exports.Mask = mask_class_1.default;
function useMask(settings) {
    var mask = new mask_class_1.default(settings);
    return mask.apply.bind(mask);
}
exports.useMask = useMask;
function applyMask(target, settings) {
    var mask = new mask_class_1.default(settings);
    return mask.apply(target);
}
exports.applyMask = applyMask;
var presets_const_1 = require("./presets.const");
Object.defineProperty(exports, "presets", { enumerable: true, get: function () { return __importDefault(presets_const_1).default; } });
