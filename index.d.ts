import { ReactFragment } from "react";

declare const filters : {
    NUMBERS : RegExp,
    LETTERS : RegExp,
    CHARACTERS: RegExp,
    NONE : null
};

declare const modes   : {
    AUTO : string,
    NORMAL : string,
    REVERSE : string
};

declare const presets : {
    ONLY_NUMBERS : object,
    DATE_STAMP : object,
    DATE_PTBR : object,
    DATETIME_STAMP : object,
    DATETIME_PTBR : object,
    PHONE_USA : object,
    PHONE_BR : object,
    CURRENCY_POINT : object,
    CURRENCY_COMMA : object,
    CURRENCY_PTBR : object,
    DOCUMENT_CPF : object,
    DOCUMENT_CNPJ : object,
    DOCUMENT_CPF_CNPJ : object,
    IP_V4 : object
};

declare function setTarget(target : string) : void | string;

declare function mask(target : string, mask ?: string, filter ?: string, mode ?: string, placeholder ?: string ) : string;
declare function applyMask(target : string, config ?: object) : string;
declare function useMask(config ?: object) : typeof setTarget;
declare function useMaskState(initialState ?: string, config ?: object) : [ target : string, setTarget : typeof setTarget ];
declare function MaskInput(props : object) : ReactFragment;
declare function MaskOutput(props : object) : ReactFragment;

export {
    filters,
    modes,
    presets,
    mask,
    applyMask,
    useMask,
    useMaskState,
    MaskInput,
    MaskOutput
};
