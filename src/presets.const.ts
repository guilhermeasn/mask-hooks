import type { MaskProps } from "./mask.class";

export type PresetOption = (
    'ONLY_NUMBERS'      |
    'DATE_STAMP'        |
    'DATE_PTBR'         |
    'DATETIME_STAMP'    |
    'DATETIME_PTBR'     |
    'PHONE_USA'         |
    'PHONE_BR'          |
    'CURRENCY_POINT'    |
    'CURRENCY_COMMA'    |
    'CURRENCY_PTBR'     |
    'DOCUMENT_CPF'      |
    'DOCUMENT_CNPJ'     |
    'DOCUMENT_CPF_CNPJ' |
    'COLOR_HEX'
);

const presets : { [key in PresetOption] : MaskProps } = {

    ONLY_NUMBERS: {
        masks: [ '#' ],
        infinity: true
    },

    DATE_STAMP: {
        masks: [ '####-##-##' ],
        placeholder: '_'
    },

    DATE_PTBR: {
        masks: [ '##/##/####' ],
        placeholder: '_'
    },

    DATETIME_STAMP: {
        masks: [ '####-##-## ##:##:##' ],
        placeholder: '_'
    },

    DATETIME_PTBR: {
        masks: [ '##/##/#### ##:##' ],
        placeholder: '_'
    },

    PHONE_USA: {
        masks: [ '(###) ###-####' ],
        placeholder: '_'
    },

    PHONE_BR: {
        masks: [
            '(##) #####-####',
            '(##) ####-####'
        ],
        placeholder: '_'
    },

    CURRENCY_POINT: {
        masks: [ '#.##' ],
        placeholder: '0',
        reverse: true,
        infinity: {
            add: ',',
            each: 3
        }
    },

    CURRENCY_COMMA: {
        masks: [ '#,##' ],
        placeholder: '0',
        reverse: true,
        infinity: {
            add: '.',
            each: 3
        }
    },

    CURRENCY_PTBR: {
        masks: [ 'R$ #,##' ],
        placeholder: '0',
        reverse: true,
        infinity: {
            add: '.',
            each: 3
        }
    },

    DOCUMENT_CPF: {
        masks: [ '###.###.###-##' ],
        placeholder: '_'
    },

    DOCUMENT_CNPJ: {
        masks: [ '##.###.###/####-##' ],
        placeholder: '_'
    },

    DOCUMENT_CPF_CNPJ: {
        masks: [
            '###.###.###-##',
            '##.###.###/####-##'
        ],
        placeholder: '_'
    },

    COLOR_HEX: {
        masks: [ '#HHHHHH' ],
        patterns: { 'H': /[A-Fa-f0-9]/ }
    }

}

export default presets;