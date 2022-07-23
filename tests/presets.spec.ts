import { useMask, applyMask, presets } from '../src';

describe('Presets test all', () => {

    test('Preset ONLY_NUMBERS', () => {
        expect(applyMask('a123b456c789d0', presets.ONLY_NUMBERS)).toBe('1234567890');
    });
    
    test('Preset DATE_STAMP', () => {
        
        const mask = useMask(presets.DATE_STAMP);

        expect(mask(2022)).toBe('2022-__-__');
        expect(mask(20220723)).toBe('2022-07-23');
        expect(mask('2022-07-23')).toBe('2022-07-23');

    });

    test('Preset DATE_PTBR', () => {
        expect(applyMask('a123b456c789d0', presets.DATE_PTBR)).toBe('12/34/5678');
    });

    test('Preset DATETIME_STAMP', () => {
        
        const mask = useMask(presets.DATETIME_STAMP);

        expect(mask(2022)).toBe('2022-__-__ __:__:__');
        expect(mask(20220723110331)).toBe('2022-07-23 11:03:31');
        expect(mask('2022-07-23 11:03:31')).toBe('2022-07-23 11:03:31');

    });

    test('Preset DATETIME_PTBR', () => {
        expect(true).toBe(true);
    });

    test('Preset PHONE_USA', () => {
        expect(true).toBe(true);
    });

    test('Preset PHONE_BR', () => {
        expect(true).toBe(true);
    });

    test('Preset CURRENCY_POINT', () => {
        expect(true).toBe(true);
    });

    test('Preset CURRENCY_COMMA', () => {
        expect(true).toBe(true);
    });

    test('Preset CURRENCY_PTBR', () => {
        expect(true).toBe(true);
    });

    test('Preset DOCUMENT_CPF', () => {
        expect(true).toBe(true);
    });

    test('Preset DOCUMENT_CNPJ', () => {
        expect(true).toBe(true);
    });

    test('Preset DOCUMENT_CPF_CNPJ', () => {
        expect(true).toBe(true);
    });

    test('Preset COLOR_HEX', () => {

        const mask = useMask(presets.COLOR_HEX);
        
        expect(mask(345)).toBe('#345');
        expect(mask('f34aa1')).toBe('#F34AA1');
        expect(mask('#f34Aa1')).toBe('#F34AA1');

    });

});