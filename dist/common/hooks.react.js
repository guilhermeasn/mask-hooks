"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.useMaskState = exports.useMask = void 0;
var mask_class_1 = __importDefault(require("./mask.class"));
var react_1 = require("react");
function useMask(settings) {
    var instance = (0, react_1.useRef)(new mask_class_1.default(settings));
    return instance.current.apply;
}
exports.useMask = useMask;
function useMaskState(settings, initialState) {
    var _a;
    var mask = useMask(settings);
    var _b = (0, react_1.useState)((_a = initialState === null || initialState === void 0 ? void 0 : initialState.toString()) !== null && _a !== void 0 ? _a : ''), target = _b[0], setTarget = _b[1];
    return [target, function (newTarget) { return setTarget(mask(newTarget)); }];
}
exports.useMaskState = useMaskState;
