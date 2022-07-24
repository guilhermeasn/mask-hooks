import type { MaskProps } from "./mask.class";
export declare type PresetOption = ('ONLY_NUMBERS' | 'DATE_STAMP' | 'DATE_PTBR' | 'DATETIME_STAMP' | 'DATETIME_PTBR' | 'PHONE_USA' | 'PHONE_BR' | 'CURRENCY_POINT' | 'CURRENCY_COMMA' | 'CURRENCY_PTBR' | 'DOCUMENT_CPF' | 'DOCUMENT_CNPJ' | 'DOCUMENT_CPF_CNPJ' | 'COLOR_HEX');
declare const presets: {
    [key in PresetOption]: MaskProps;
};
export default presets;
