"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.presets = exports.useMaskState = exports.useMask = void 0;
var hooks_react_1 = require("./hooks.react");
Object.defineProperty(exports, "useMask", { enumerable: true, get: function () { return hooks_react_1.useMask; } });
Object.defineProperty(exports, "useMaskState", { enumerable: true, get: function () { return hooks_react_1.useMaskState; } });
var presets_const_1 = require("./presets.const");
Object.defineProperty(exports, "presets", { enumerable: true, get: function () { return __importDefault(presets_const_1).default; } });
