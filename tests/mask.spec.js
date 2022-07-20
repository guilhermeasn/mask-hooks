"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mask_class_1 = __importDefault(require("../src/mask.class"));
describe('Mask class tests', function () {
    test('Default props and sort masks', function () {
        var mask = new mask_class_1.default({
            masks: ['abcde', 'a', 'abc']
        });
        expect(mask.props.masks[0]).toBe('a');
        expect(mask.props.masks[1]).toBe('abc');
        expect(mask.props.masks[2]).toBe('abcde');
        expect(mask.props.patterns).toStrictEqual({
            '#': /[0-9]/,
            '@': /[A-Za-z]/,
            '?': /[A-Za-z0-9]/
        });
        expect(mask.props.placeholder).toBe('');
        expect(mask.props.reverse).toBe(false);
        expect(mask.props.infinity).toBe(false);
    });
});
