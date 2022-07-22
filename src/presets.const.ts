import type { MaskProps } from "./mask.class";

const presets : { [key : string] : MaskProps } = {

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