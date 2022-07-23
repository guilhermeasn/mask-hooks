import { useMask, applyMask, presets } from '../src';

describe('Presets test all', () => {

    console.log(applyMask('f34aa1', presets.COLOR_HEX));

    test('empty', () => {
        expect(true).toBe(true);
    });

});