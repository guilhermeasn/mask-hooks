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
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPresetMask = void 0;
function getPresetMask(preset, change) {
    if (change === void 0) { change = {}; }
    return __assign(__assign({}, presets[preset]), change);
}
exports.getPresetMask = getPresetMask;
var presets = {
    ONLY_NUMBERS: {
        masks: ['#'],
        infinity: true
    },
    ONLY_LETTERS: {
        masks: ['@'],
        infinity: true
    },
    ONLY_CHARS: {
        masks: ['?'],
        infinity: true
    },
    DATE_STAMP: {
        masks: ['####-##-##']
    },
    DATE_PTBR: {
        masks: ['##/##/####']
    },
    DATETIME_STAMP: {
        masks: ['####-##-## ##:##:##']
    },
    DATETIME_PTBR: {
        masks: ['##/##/#### ##:##']
    },
    PHONE_USA: {
        masks: ['(###) ###-####']
    },
    PHONE_BR: {
        masks: [
            '(##) #####-####',
            '(##) ####-####'
        ]
    },
    CURRENCY_POINT: {
        masks: ['#.##'],
        placeholder: '0',
        reverse: true,
        infinity: {
            add: ',',
            each: 3
        }
    },
    CURRENCY_COMMA: {
        masks: ['#,##'],
        placeholder: '0',
        reverse: true,
        infinity: {
            add: '.',
            each: 3
        }
    },
    CURRENCY_PTBR: {
        masks: ['R$ #,##'],
        placeholder: '0',
        reverse: true,
        infinity: {
            add: '.',
            each: 3
        }
    },
    DOCUMENT_CPF: {
        masks: ['###.###.###-##']
    },
    DOCUMENT_CNPJ: {
        masks: ['##.###.###/####-##']
    },
    DOCUMENT_CPF_CNPJ: {
        masks: [
            '###.###.###-##',
            '##.###.###/####-##'
        ]
    },
    COLOR_HEX: {
        masks: ['#HHHHHH'],
        patterns: { 'H': /[A-Fa-f0-9]/ },
        transform: 'uppercase'
    }
};
exports.default = presets;
