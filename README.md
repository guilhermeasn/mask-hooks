# mask-hooks v2

[![tests](https://github.com/guilhermeasn/mask-hooks/actions/workflows/tests.yml/badge.svg)](https://github.com/guilhermeasn/mask-hooks/actions/workflows/tests.yml)
[![pages-build-deployment](https://github.com/guilhermeasn/mask-hooks/actions/workflows/pages/pages-build-deployment/badge.svg)](https://github.com/guilhermeasn/mask-hooks/actions/workflows/pages/pages-build-deployment)
[![npm](https://img.shields.io/npm/v/mask-hooks.svg)](https://www.npmjs.com/package/mask-hooks)
[![size](https://img.shields.io/bundlephobia/minzip/mask-hooks)](https://www.npmjs.com/package/mask-hooks)
[![downloads](https://img.shields.io/npm/dt/mask-hooks)](https://www.npmjs.com/package/mask-hooks)

Functions and hooks for applying masks to data inputs and outputs

[Examples page](https://guilhermeasn.github.io/mask-hooks/)

## Migrating

*The second version of mask-hooks is now independent of React and can be used in more different development contexts. That's why the React components and the useMaskState hook have been removed. Now fully supports typescript.*

## Installation

Run the command below in the terminal to install **mask-hooks** in your project

```
npm install mask-hooks
```

Or with Yarn

```
yarn add mask-hooks
```

## Examples

```
import { useMask } from "mask-hooks";

export function InputMask() {

    // these mask settings can also be imported from presets

    const mask = useMask({
        masks: [ 'R$ #,##' ],
        placeholder: '0',
        reverse: true,
        infinity: {
            add: '.',
            each: 3
        }
    });

    const [ value, setValue ] = useState('');

    function setValueMask(value : string) {
        setValue(mask(value));
    } 

    return (

        <input
            value={ value }
            onChange={ input => setValueMask(input.currentTarget.value) }
        />

    );

}
```

```
import { useMask, presets } from 'mask-hooks';

export default function MaskDocs() {

    const documentMask = useMask(presets.DOCUMENT_CPF_CNPJ);

    return (
        <>
            <p>{ documentMask('11122233345')    /* print 111.222.333-45 */     }</p>
            <p>{ documentMask('11222333000145') /* print 11.222.333/0001-45 */ }</p>
        </>
    );

}
```

## MaskProps

The useMask receives the settings parameter of type MaskProps. See available settings:

|Prop|Type|Default|Details|
|---|---|---|---|
|**masks**|`Array<string>`||The masks that will be applied to the target. By default the characters ?, #, @ will be replaced by letters or numbers, numbers, letters, respectively. This character pattern can be changed.|
|**placeholder**|`string`|`''`|Autofill of the mask to be filled|
|**reverse**|`boolean`|`false`|Mask fill in inverted mode|
|**transform**|`'uppercase'`<br />`'lowercase'`<br />`'capitalize'`<br />`'capitalizeAll'`<br />`'none'`|`'none'`|Apply a transformation to the result string|
|**infinity**|`boolean`<br />`{each:number;add:string;}`|`false`|Allows data entry indefinitely by the last mask replacement character|
|**patterns**|`{[key in string]: RegExp}`|`{'#': /[0-9]/,'@': /[A-Za-z]/,'?': /[A-Za-z0-9]/}`|Characters to be substituted in the mask if approved by the regular expression|

## Presets

You can import pre-established mask configurations. See the options:

 - ONLY_NUMBERS
 - DATE_STAMP
 - DATE_PTBR
 - DATETIME_STAMP
 - DATETIME_PTBR
 - PHONE_USA
 - PHONE_BR
 - CURRENCY_POINT
 - CURRENCY_COMMA
 - CURRENCY_PTBR
 - DOCUMENT_CPF
 - DOCUMENT_CNPJ
 - DOCUMENT_CPF_CNPJ
 - COLOR_HEX

## Author

* **Guilherme Neves** - [github repos](https://github.com/guilhermeasn/) - [website](https://gn.dev.br/)

## 📄 License

This project is under the MIT license - see file [LICENSE](https://github.com/guilhermeasn/mask-hooks/blob/master/LICENSE) for details.