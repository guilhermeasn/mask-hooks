import Mask from "../src/mask.class";

describe('Mask class tests', () => {

    test('Default props and sort masks', () => {

        const mask = new Mask({
            masks: ['abcde', 'a', 'abc']
        });

        expect(mask.props.masks[0]).toBe('a');
        expect(mask.props.masks[1]).toBe('abc');
        expect(mask.props.masks[2]).toBe('abcde');

        expect(mask.props.patterns).toStrictEqual({
            '#': /[0-9]/,
            '@': /[A-Za-z]/,
            '?': /[A-Za-z0-9]/
        })

        expect(mask.props.placeholder).toBe('');
        expect(mask.props.reverse).toBe(false);
        expect(mask.props.infinity).toBe(false);

    });

    test('Mask aplly', () => {

        const mask = new Mask({
            masks: ['R$ #,##'],
            reverse: true,
            infinity: true,
            placeholder: '0',
        });

        console.log(mask.apply('01234567890123456789'));

    });

});