import { applyMask, getPresetMask, useCompleteMask, useMask } from '../src';

describe('Functions and hooks tests', () => {

    test('Hook useMask', () => {

        const mask = useMask(getPresetMask('CURRENCY_PTBR'));
        expect(mask('')).toBe('R$ 0,00');

    });

    test('Hook useCompleteMask', () => {

        const maskComplete = useCompleteMask(getPresetMask('COLOR_HEX'));
        
        expect(maskComplete('').completed).toBe(false);
        expect(maskComplete('c3c3c3').completed).toBe(true);
        expect(maskComplete('c3').completed).toBe(false);

    });

    test('Function applyMask', () => {

        expect(applyMask('1a2b3c', getPresetMask('ONLY_LETTERS', { transform: 'uppercase' }))).toBe('ABC');

    });

});
