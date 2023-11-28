import { useMask, applyMask, presets, getPresetMask } from '../src';

describe('Presets test all', () => {

    test('Preset ONLY_NUMBERS', () => {
        expect(applyMask('a123b456c789d0e', presets.ONLY_NUMBERS)).toBe('1234567890');
    });

    test('Preset ONLY_LETTERS', () => {
        expect(applyMask('a123b456c789d0e', presets.ONLY_LETTERS)).toBe('abcde');
        expect(applyMask('a123b456c789d0e', getPresetMask('ONLY_LETTERS', { transform: 'uppercase' }))).toBe('ABCDE');
        expect(applyMask('a123b456c789d0e', getPresetMask('ONLY_LETTERS', { transform: 'capitalize' }))).toBe('Abcde');
    });

    test('Preset ONLY_CHARS', () => {
        expect(applyMask('a123 b 456c _ 789d0e!', presets.ONLY_CHARS)).toBe('a123b456c789d0e');
    });
    
    test('Preset DATE_STAMP', () => {
        
        const mask = useMask(presets.DATE_STAMP);

        expect(mask(20221)).toBe('2022-1');
        expect(mask(20220723)).toBe('2022-07-23');
        expect(mask('2022-07-23')).toBe('2022-07-23');

    });

    test('Preset DATE_PTBR', () => {
        expect(applyMask('a123b456c789d0', presets.DATE_PTBR)).toBe('12/34/5678');
    });

    test('Preset DATETIME_STAMP', () => {
        
        const mask = useMask(presets.DATETIME_STAMP);

        expect(mask(2022)).toBe('2022');
        expect(mask(20220723110331)).toBe('2022-07-23 11:03:31');
        expect(mask('2022-07-23 11:03:31')).toBe('2022-07-23 11:03:31');

    });

    test('Preset DATETIME_PTBR', () => {
        expect(applyMask('a123b456c789d000', presets.DATETIME_PTBR)).toBe('12/34/5678 90:00');
        expect(applyMask('a123b456c789d0', getPresetMask('DATETIME_PTBR', { reverse: true, placeholder: '_' }))).toBe('__/12/3456 78:90');
    });

    test('Preset PHONE_USA', () => {
        expect(applyMask(1234567890321, presets.PHONE_USA)).toBe('(123) 456-7890');
    });

    test('Preset PHONE_BR', () => {
        
        const mask = useMask(presets.PHONE_BR);

        expect(mask(24)).toBe('(24');
        expect(mask(1122223333)).toBe('(11) 2222-3333');
        expect(mask(11233334444)).toBe('(11) 23333-4444');
        expect(mask('(11) 2222-3333')).toBe('(11) 2222-3333');

    });

    test('Preset CURRENCY_POINT', () => {
        expect(applyMask(1234567890321, presets.CURRENCY_POINT)).toBe('12,345,678,903.21');
    });

    test('Preset CURRENCY_COMMA', () => {
        expect(applyMask('12,345,678,903.21', presets.CURRENCY_COMMA)).toBe('12.345.678.903,21');
    });

    test('Preset CURRENCY_DOLLAR', () => {
        expect(applyMask(1234567890321, presets.CURRENCY_DOLLAR)).toBe('$12,345,678,903.21');
    });

    test('Preset CURRENCY_PTBR', () => {
        
        const mask = useMask(presets.CURRENCY_PTBR);

        expect(mask('')).toBe('R$ 0,00');
        expect(mask(50)).toBe('R$ 0,50');
        expect(mask('1,50')).toBe('R$ 1,50');
        expect(mask(250.75)).toBe('R$ 250,75');
        expect(mask('R$ 30000,00')).toBe('R$ 30.000,00');

    });

    test('Preset DOCUMENT_CPF', () => {
        expect(applyMask('11122233344', presets.DOCUMENT_CPF)).toBe('111.222.333-44');
    });

    test('Preset DOCUMENT_CNPJ', () => {
        expect(applyMask(12345, presets.DOCUMENT_CNPJ)).toBe('12.345');
        expect(applyMask(12345, getPresetMask('DOCUMENT_CNPJ', { reverse: true }))).toBe('123-45');
    });

    test('Preset DOCUMENT_CPF_CNPJ', () => {
        
        const mask = useMask(presets.DOCUMENT_CPF_CNPJ);
        
        expect(mask(11122233344)).toBe('111.222.333-44');
        expect(mask('111.222.333-44')).toBe('111.222.333-44');
        expect(mask(11222333444455)).toBe('11.222.333/4444-55');
        expect(mask('11.222.333/4444-55')).toBe('11.222.333/4444-55');

    });

    test('Preset ZIPCODE_USA', () => {
        expect(applyMask(1234567890, presets.ZIPCODE_USA)).toBe('12345');
    });
        
    test('Preset ZIPCODE_BR', () => {
        expect(applyMask(25850000, presets.ZIPCODE_BR)).toBe('25.850-000');
    });

    test('Preset PRODUCT_KEY', () => {

        expect(applyMask('h3pbvfhb27rjtghx9ydcjddh6', presets.PRODUCT_KEY)).toBe('H3PBV-FHB27-RJTGH-X9YDC-JDDH6');

        expect(applyMask('h3pbvfhb27rjtgh', getPresetMask('PRODUCT_KEY', { placeholder: '_' }))).toBe('H3PBV-FHB27-RJTGH-_____-_____');
        expect(applyMask('h3pbvfhb27rjtgh', presets.PRODUCT_KEY)).toBe('H3PBV-FHB27-RJTGH');

    });

    test('Preset COLOR_HEX', () => {

        const mask = useMask(presets.COLOR_HEX);
        
        expect(mask(345)).toBe('#345');
        expect(mask('f34aa1')).toBe('#F34AA1');
        expect(mask('#zf34Aa1z')).toBe('#F34AA1');

    });

    test('Preset CAPITALIZE_ALL', () => {

        const mask = useMask(presets.CAPITALIZE_ALL);

        expect(mask('guilherme neves')).toBe('Guilherme Neves');
        expect(mask('ça áo ést')).toBe('Ça Áo Ést');
        expect(mask('MASK HOOKS')).toBe('Mask Hooks');

    });

});