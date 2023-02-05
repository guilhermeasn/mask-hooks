import type { MaskProps } from "./mask.class";
export declare type PresetOption = ('ONLY_NUMBERS' | 'ONLY_LETTERS' | 'ONLY_CHARS' | 'DATE_STAMP' | 'DATE_PTBR' | 'DATETIME_STAMP' | 'DATETIME_PTBR' | 'PHONE_USA' | 'PHONE_BR' | 'CURRENCY_POINT' | 'CURRENCY_COMMA' | 'CURRENCY_DOLLAR' | 'CURRENCY_PTBR' | 'CURRENCY_DOLLAR_LIMITED' | 'CURRENCY_PTBR_LIMITED' | 'DOCUMENT_CPF' | 'DOCUMENT_CNPJ' | 'DOCUMENT_CPF_CNPJ' | 'ZIPCODE_USA' | 'ZIPCODE_BR' | 'PRODUCT_KEY' | 'COLOR_HEX');
export declare function getPresetMask(preset: PresetOption, change?: Partial<MaskProps>): MaskProps;
declare const presets: {
    [key in PresetOption]: MaskProps;
};
export default presets;
