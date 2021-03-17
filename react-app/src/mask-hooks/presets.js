/* eslint-disable */
import { filters, modes } from './constants';


export default {

    ONLY_NUMBERS: {
        mask:        '*',
        filter:      filters.NUMBERS,
        mode:        modes.NORMAL,
        placeholder: null
    },

    DATE_STAMP: {
        mask:        '????-??-??',
        filter:      filters.NUMBERS,
        mode:        modes.AUTO,
        placeholder: '_'
    },

    DATE_PTBR: {
        mask:        '??/??/????',
        filter:      filters.NUMBERS,
        mode:        modes.AUTO,
        placeholder: '_'
    },

    DATETIME_STAMP: {
        mask:        '????-??-?? ??:??:??',
        filter:      filters.NUMBERS,
        mode:        modes.AUTO,
        placeholder: null
    },

    DATETIME_PTBR: {
        mask:        '??/??/???? ??:??',
        filter:      filters.NUMBERS,
        mode:        modes.AUTO,
        placeholder: null
    },

    PHONE_USA: {
        mask:        '(???) ???-????',
        filter:      filters.NUMBERS,
        mode:        modes.NORMAL,
        placeholder: null
    },

    PHONE_BR: {
        mask:        ['(??) ?????-????', '(??) ????-????'],
        filter:      filters.NUMBERS,
        mode:        modes.NORMAL,
        placeholder: null
    },

    CURRENCY_POINT: {
        mask:        '{3|,}.??',
        filter:      filters.NUMBERS,
        mode:        modes.REVERSE,
        placeholder: '0'
    },

    CURRENCY_COMMA: {
        mask:        '{3|.},??',
        filter:      filters.NUMBERS,
        mode:        modes.REVERSE,
        placeholder: '0'
    },

    CURRENCY_PTBR: {
        mask:        'R$ {3|.},??',
        filter:      filters.NUMBERS,
        mode:        modes.REVERSE,
        placeholder: '0'
    },

    DOCUMENT_CPF: {
        mask:        '???.???.???-??',
        filter:      filters.NUMBERS,
        mode:        modes.REVERSE,
        placeholder: '_'
    },

    DOCUMENT_CNPJ: {
        mask:        '??.???.???/????-??',
        filter:      filters.NUMBERS,
        mode:        modes.REVERSE,
        placeholder: '_'
    },

    DOCUMENT_CPF_CNPJ: {
        mask:        ['???.???.???-??', '??.???.???/????-??'],
        filter:      filters.NUMBERS,
        mode:        modes.NORMAL,
        placeholder: null
    },

    IP_V4: {
        mask:        '???.???.???.???',
        filter:      filters.NUMBERS,
        mode:        modes.NORMAL,
        placeholder: null
    }

}
