import type { MaskProps } from "./mask.class";

export type PresetOption = (
    'ONLY_NUMBERS'      |
    'ONLY_LETTERS'      |
    'ONLY_CHARS'        |
    'DATE_STAMP'        |
    'DATE_PTBR'         |
    'DATETIME_STAMP'    |
    'DATETIME_PTBR'     |
    'PHONE_USA'         |
    'PHONE_BR'          |
    'CURRENCY_POINT'    |
    'CURRENCY_COMMA'    |
    'CURRENCY_DOLLAR'   |
    'CURRENCY_PTBR'     |
    'DOCUMENT_CPF'      |
    'DOCUMENT_CNPJ'     |
    'DOCUMENT_CPF_CNPJ' |
    'ZIPCODE_USA'       |
    'ZIPCODE_BR'        |
    'PRODUCT_KEY'       |
    'COLOR_HEX'
);

const presets : { [key in PresetOption] : MaskProps } = {

    ONLY_NUMBERS: {
        masks: [ '#' ],
        infinity: true
    },

    ONLY_LETTERS: {
        masks: [ '@' ],
        infinity: true
    },

    ONLY_CHARS: {
        masks: [ '?' ],
        infinity: true
    },

    DATE_STAMP: {
        masks: [ '####-##-##' ]
    },

    DATE_PTBR: {
        masks: [ '##/##/####' ]
    },

    DATETIME_STAMP: {
        masks: [ '####-##-## ##:##:##' ]
    },

    DATETIME_PTBR: {
        masks: [ '##/##/#### ##:##' ]
    },

    PHONE_USA: {
        masks: [ '(###) ###-####' ]
    },

    PHONE_BR: {
        masks: [
            '(##) #####-####',
            '(##) ####-####'
        ]
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

    CURRENCY_DOLLAR: {
        masks: [ '$#.##' ],
        placeholder: '0',
        reverse: true,
        infinity: {
            add: ',',
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
        masks: [ '###.###.###-##' ]
    },

    DOCUMENT_CNPJ: {
        masks: [ '##.###.###/####-##' ]
    },

    DOCUMENT_CPF_CNPJ: {
        masks: [
            '###.###.###-##',
            '##.###.###/####-##'
        ]
    },

    ZIPCODE_USA: {
        masks: [ '#####' ]
    },

    ZIPCODE_BR: {
        masks: [ '##.###-###' ]
    },

    PRODUCT_KEY: {
        masks: [ '?????-?????-?????-?????-?????' ],
        transform: 'uppercase'
    },

    COLOR_HEX: {
        masks: [ '#HHHHHH' ],
        patterns: { 'H': /[A-Fa-f0-9]/ },
        transform: 'uppercase'
    }

}

export default presets;