import type { MaskProps } from "./mask.class";

export type PresetOption = (
    'ONLY_NUMBERS'            |
    'ONLY_LETTERS'            |
    'ONLY_CHARS'              |
    'DATE_STAMP'              |
    'DATE_PTBR'               |
    'DATETIME_STAMP'          |
    'DATETIME_PTBR'           |
    'DATE_STAMP_LIMITED'      |
    'DATE_PTBR_LIMITED'       |
    'DATETIME_STAMP_LIMITED'  |
    'DATETIME_PTBR_LIMITED'   |
    'PHONE_USA'               |
    'PHONE_BR'                |
    'CURRENCY_POINT'          |
    'CURRENCY_COMMA'          |
    'CURRENCY_DOLLAR'         |
    'CURRENCY_PTBR'           |
    'CURRENCY_DOLLAR_LIMITED' |
    'CURRENCY_PTBR_LIMITED'   |
    'DOCUMENT_CPF'            |
    'DOCUMENT_CNPJ'           |
    'DOCUMENT_CPF_CNPJ'       |
    'ZIPCODE_USA'             |
    'ZIPCODE_BR'              |
    'PRODUCT_KEY'             |
    'COLOR_HEX'               |
    'CAPITALIZE_ALL'
);

export function getPresetMask(preset : PresetOption, change : Partial<MaskProps> = {}) : MaskProps {
    return {
        ...presets[preset],
        ...change
    }
}

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

    DATE_STAMP_LIMITED: {
        masks: [ '[1800-2200]-[1-12]-[1-31]' ]
    },

    DATE_PTBR_LIMITED: {
        masks: [ '[1-31]/[1-12]/[1800-2200]' ]
    },

    DATETIME_STAMP_LIMITED: {
        masks: [ '[1800-2200]-[1-12]-[1-31] [0-23]:[0-59]:[0-59]' ]
    },

    DATETIME_PTBR_LIMITED: {
        masks: [ '[1-31]/[1-12]/[1800-2200] [0-23]:[0-59]' ]
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

    CURRENCY_DOLLAR_LIMITED: {
        masks: [ '$#.##' ],
        placeholder: '0',
        reverse: true,
        infinity: {
            add: ',',
            each: 3
        },
        maxentries: 8
    },

    CURRENCY_PTBR_LIMITED: {
        masks: [ 'R$ #,##' ],
        placeholder: '0',
        reverse: true,
        infinity: {
            add: '.',
            each: 3
        },
        maxentries: 8
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
        masks: [
            '#HHH',
            '#HHHHHH'
        ],
        patterns: { 'H': /[A-Fa-f0-9]/ },
        transform: 'uppercase'
    },

    CAPITALIZE_ALL: {
        masks: [ '.' ],
        patterns: { '.': /./ },
        infinity: true,
        transform: 'capitalizaAll'
    }

}

export default presets;