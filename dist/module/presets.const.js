const presets = {
    ONLY_NUMBERS: {
        masks: ['#'],
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
export default presets;