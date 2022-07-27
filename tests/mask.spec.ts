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

    test('Throw errors', () => {

        expect(() => new Mask({
            masks: []
        })).toThrow(/mask/gim);
        
        expect(() => new Mask({
            masks: [ '?' ],
            placeholder: 'abc'
        })).toThrow(/placeholder/gim);

        expect(() => new Mask({
            masks: [ '?' ],
            patterns: {
                'err': /./ 
            }
        })).toThrow(/pattern/gim);

        expect(() => new Mask({
            masks: [ '?' ],
            patterns: {
                '¬': /./ 
            }
        })).toThrow(/reserveds/gim);

    });

    test('Apply mask infinity reverse', () => {

        const mask = new Mask({
            masks: ['R$ #,##'],
            placeholder: '0',
            reverse: true,
            infinity: {
                add: '.',
                each: 3
            }
        });

        expect(mask.apply(229)).toBe('R$ 2,29');
        expect(mask.apply(2290)).toBe('R$ 22,90');
        expect(mask.apply('$ 22,90')).toBe('R$ 22,90');
        expect(mask.apply('R$ 22,90')).toBe('R$ 22,90');
        expect(mask.apply('a123,45')).toBe('R$ 123,45');

        expect(mask.apply(1234567890)).toBe('R$ 12.345.678,90');
        expect(mask.apply('abcde1234567890123')).toBe('R$ 12.345.678.901,23');

    });

    test('Apply mask with char scape', () => {

        const mask = new Mask({
            masks: ['§ \\@???.\\?? §'],
            infinity: true,
            placeholder: '_',
        });

        expect(mask.apply('')).toBe('§ @___.?_ §');
        expect(mask.apply(2290)).toBe('§ @229.?0 §');
        expect(mask.apply('a1b2c3d4e5')).toBe('§ @a1b.?2c3d4e5 §');

    });

    test('Apply mask multiple', () => {

        const mask = new Mask({
            masks: [
                '###.###.###-##',
                '##.###.###/####-##'
            ]
        });

        expect(mask.apply(11122233344)).toBe('111.222.333-44');
        expect(mask.apply('111.222.333-44')).toBe('111.222.333-44');
        expect(mask.apply(11222333444455)).toBe('11.222.333/4444-55');
        expect(mask.apply('11.222.333/4444-55')).toBe('11.222.333/4444-55');

    });

    test('Apply mask and transform', () => {

        const masks = [ '=> @@@@@ @@@!' ];
        const target = 'aBcDefGh';

        expect(new Mask({ masks, transform: 'none' }).apply(target)).toBe('=> aBcDe fGh!');
        expect(new Mask({ masks, transform: 'lowercase' }).apply(target)).toBe('=> abcde fgh!');
        expect(new Mask({ masks, transform: 'uppercase' }).apply(target)).toBe('=> ABCDE FGH!');
        expect(new Mask({ masks, transform: 'capitalize' }).apply(target)).toBe('=> Abcde fgh!');
        expect(new Mask({ masks, transform: 'capitalizeAll' }).apply(target)).toBe('=> Abcde Fgh!');

    });

    test('Mask verification completed', () => {

        const mask = new Mask({
            masks: [ '???' ]
        });

        expect(mask.completed).toBe(false);

        mask.apply('abc');
        expect(mask.completed).toBe(true);

        mask.apply('ab');
        expect(mask.completed).toBe(false);

    });

});
