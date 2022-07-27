import { applyMask, getPresetMask, useCompleteMask, useMask } from '../src';

describe('Functions and hooks tests', () => {

    test('Hook useMask', () => {

        const mask = useMask(getPresetMask('CURRENCY_PTBR'));
        expect(mask('')).toBe('R$ 0,00');

    });

    test('Hook useCompleteMask', () => {

        const [ mask, isCompleted ] = useCompleteMask(getPresetMask('COLOR_HEX'));
        
        expect(isCompleted()).toBe(false);

        mask('c3c3c3');
        expect(isCompleted()).toBe(true);

        mask('c3');
        expect(isCompleted()).toBe(false);

    });

    test('Function applyMask', () => {

        expect(applyMask('1a2b3c', getPresetMask('ONLY_LETTERS', { transform: 'uppercase' }))).toBe('ABC');

    });

});