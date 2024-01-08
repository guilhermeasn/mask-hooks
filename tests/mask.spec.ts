import Mask from "../src/mask.class";

describe('Mask class tests', () => {

    test('Default props and sort masks', () => {

        const mask = new Mask({
            masks: ['#.#', '--((@))--', '?@#']
        });

        expect(mask.props.masks[0]).toBe('--((@))--');
        expect(mask.props.masks[1]).toBe('#.#');
        expect(mask.props.masks[2]).toBe('?@#');

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
            // @ts-ignore
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
                '\\': /./ 
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

    test('Apply mask with char escape', () => {

        const mask = new Mask({
            masks: ['§ \\@???.\\?? §'],
            infinity: true,
            placeholder: '_',
        });

        expect(mask.apply('')).toBe('§ @___.?_ §');
        expect(mask.apply(2290)).toBe('§ @229.?0 §');
        expect(mask.apply('a1b2c3d4e5')).toBe('§ @a1b.?2c3d4e5 §');

        const mask2 = new Mask({
            masks: ['\\\\']
        });

        expect(mask2.apply('abc')).toBe('\\');

        const mask3 = new Mask({
            masks: ['\\']
        });

        expect(mask3.apply('abc')).toBe('');
        
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
        expect(mask.apply('11122233344asdasda')).toBe('111.222.333-44');
        expect(mask.apply('11122233344asdasda12')).toBe('11.122.233/3441-2');
        expect(mask.apply(11222333444455)).toBe('11.222.333/4444-55');
        expect(mask.apply('11.222.333/4444-55')).toBe('11.222.333/4444-55');
        expect(mask.apply('11.222.333/4')).toBe('112.223.334');

    });

    test('Apply mask and transform', () => {

        const masks = '=> @@@@@ @@@!';
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

    test('Capitalization of special characters', () => {

        const mask = new Mask({
            masks: ['*'],
            infinity: true,
            patterns: { '*': /./ },
            transform: "capitalizeAll"
        });

        expect(mask.apply('=> ç ã õ <=')).toBe('=> Ç Ã Õ <=');
        expect(mask.apply('=> a á â à ä <=')).toBe('=> A Á Â À Ä <=');
        expect(mask.apply('=> e é ê è ë <=')).toBe('=> E É Ê È Ë <=');
        expect(mask.apply('=> i í î ì ï <=')).toBe('=> I Í Î Ì Ï <=');
        expect(mask.apply('=> o ó ô ò ö <=')).toBe('=> O Ó Ô Ò Ö <=');
        expect(mask.apply('=> u ú û ù ü <=')).toBe('=> U Ú Û Ù Ü <=');

    });

    test('Mask entries', () => {

        const mask = new Mask({
            masks: [ '^?-?$' ],
            reverse: true,
            infinity: true,
            transform: 'uppercase'
        });

        expect(mask.apply('1q2w3e4')).toBe('^1Q2W3E-4$');
        expect(mask.completed).toBe(true);
        expect(mask.entries).toBe(7);
        expect(mask.cleaned).toBe('1Q2W3E4');

    });

    test('Max entries', () => {

        const mask1 = new Mask({
            masks: [ '>>>?<<<' ],
            infinity: true,
            maxentries: 10
        });

        expect(mask1.apply('1q2w3e4')).toBe('>>>1q2w3e4<<<');
        expect(mask1.apply('1q2w3e4e3w2q1')).toBe('>>>1q2w3e4e3w<<<');

        const mask2 = new Mask({
            masks: [ '??????????????????' ],
            maxentries: 10
        });
        
        expect(mask2.apply('1q2w3e4e3w2q1')).toBe('1q2w3e4e3w');

        const mask3 = new Mask({
            masks: [ '?-??' ],
            infinity: true,
            maxentries: 10,
            reverse: true
        });

        expect(mask3.apply('1q2w3e4')).toBe('1q2w3-e4');
        expect(mask3.apply('1q2w3e4e3w2q1')).toBe('1q2w3e4e-3w');

    });

    test('Mask strange types', () => {

        // @ts-ignore
        expect(new Mask({ masks: 12345 }).apply('')).toBe('12345');

        // @ts-ignore
        expect(new Mask({ masks: {k: 'v'} }).apply('')).toBe('[object Object]');

    });

    test('Mask numerical range in date', () => {

        const mask = new Mask({
            masks: '[1-31]/[1-12]/[1900-2100]'
        });

        expect(mask.apply('4302010')).toBe('04/03/2010');
        expect(mask.apply('432')).toBe('04/03/2');
        expect(mask.apply('121')).toBe('12/1');
        expect(mask.apply('1231')).toBe('12/03/1');

        expect(mask.apply('04032010')).toBe('04/03/2010');
        expect(mask.apply('04/03/2010')).toBe('04/03/2010');
        expect(mask.apply('a05b05c1995d')).toBe('05/05/1995');

        expect(mask.apply('000')).toBe('0');
        expect(mask.apply('01001')).toBe('01/01');

    });

    test('Mask numerical range misc', () => {

        const mask = new Mask({
            masks: '[50-2300]'
        });

        expect(mask.apply('4')).toBe('04');
        expect(mask.apply('19')).toBe('19');
        expect(mask.apply('a2b9c')).toBe('2');
        expect(mask.apply('a2b9c3')).toBe('23');

    });

    test('Mask numerical range escape', () => {

        const mask = new Mask({
            masks: 'a[0-3]b\\[0-3]c'
        });

        expect(mask.apply('000')).toBe('a0b[0-3]c');

        const mask2 = new Mask({
            masks: '[0-9] (\\[0-9]) - ###'
        });

        expect(mask2.apply('0123')).toBe('0 ([0-9]) - 123');

        const mask3 = new Mask({
            masks: '[0-99]\\[0-99] ?',
            infinity: true
        });

        expect(mask3.apply('35gasn')).toBe('35[0-99] gasn');
        expect(mask3.apply('34tgcn')).toBe('34[0-99] tgcn');

    });

});
