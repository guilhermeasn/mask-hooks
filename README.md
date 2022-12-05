# mask-hooks v2

[![tests](https://github.com/guilhermeasn/mask-hooks/actions/workflows/tests.yml/badge.svg)](https://github.com/guilhermeasn/mask-hooks/actions/workflows/tests.yml)
[![pages-build-deployment](https://github.com/guilhermeasn/mask-hooks/actions/workflows/pages/pages-build-deployment/badge.svg)](https://github.com/guilhermeasn/mask-hooks/actions/workflows/pages/pages-build-deployment)
[![npm](https://img.shields.io/npm/v/mask-hooks.svg)](https://www.npmjs.com/package/mask-hooks/v/latest)
[![size](https://img.shields.io/bundlephobia/minzip/mask-hooks)](https://bundlephobia.com/package/mask-hooks)
[![downloads](https://img.shields.io/npm/dt/mask-hooks)](https://www.npmjs.com/package/mask-hooks/)

Lightweight package with functions and hooks for masking data inputs and outputs for Node.JS projects.

[![Demonstration](https://raw.githubusercontent.com/guilhermeasn/mask-hooks/master/mask-hooks.gif)](https://guilhermeasn.github.io/mask-hooks/)

[Examples page](https://guilhermeasn.github.io/mask-hooks/)

## Installation

Run the command below in the terminal to install **mask-hooks** in your project

```
npm install mask-hooks
```

Or with Yarn

```
yarn add mask-hooks
```

## Examples with React

 - Custom Mask

```
import { useMask } from "mask-hooks";
import { useState } from "react";

export function InputMask() {

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

    function setValueMask(value) {
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

 - Preset Mask

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

 - Changed Preset Mask

```
import { useMask, getPresetMask } from 'mask-hooks';

export default function MaskProduct() {

    const productKeyMask = useMask(getPresetMask('PRODUCT_KEY', { placeholder: '_' }));

    return (
        <div>
            {
                productKeyMask('h3pbvfhb27rjtgh')
                /* print H3PBV-FHB27-RJTGH-_____-_____ */
            }
        <div>
    );

}
```

 - Mask verification completed

```
import { useCompleteMask, presets } from "mask-hooks";
import { useState } from "react";

export function InputMask() {

    const maskComplete = useCompleteMask(presets.DATE_STAMP);

    const [ value, setValue ] = useState('');
    const [ completed, setCompleted ] = useState(false);

    function setValueMask(value) {
        const { result, completed } = maskComplete(value);
        setValue(result);
        setCompleted(completed);
    }

    return (

        <input
            value={ value }
            onChange={ input => setValueMask(input.currentTarget.value) }
            style={ { color: completed ? "#000000" : "#ff0000" } }
        />

    );

}
```

- use mask directly

```
import { applyMask, presets } from 'mask-hooks';

export default function maskColor(target) {
    return applyMask(target, presets.COLOR_HEX);
}

```

## Resources

Resources exported by the **mask-hooks** package:

 - **Function `useMask`**: main resource to use package. Returns a function to use the preconfigured mask.

```
function useMask(settings: MaskProps): <T extends Stringable>(target: T) => string
```

 - **Function `useCompleteMask`**: Returns a function to use the preconfigured mask with additional information in the result.

```
function useCompleteMask(settings: MaskProps): <T extends Stringable>(target: T) => { result: string, completed: boolean; entries: number; }
```

 - **Function `applyMask`**: use a mask directly on the target

```
function applyMask<T extends Stringable>(target: T, settings: MaskProps): string
```

 - **Class `Mask`**: application mask core

```
class Mask {

    static defaultPatterns: {
        '#': RegExp;
        '@': RegExp;
        '?': RegExp;
    };
    static reverser(target: string): string;
    static capitalize(target: string, all?: boolean): string;

    constructor(props: MaskProps);

    get props(): Readonly<Required<MaskProps>>;
    get completed(): boolean;
    get entries(): number;

    apply<T extends Stringable>(target: T): string;

}
```

 - **Constant `presets`**: preconfigured masks

```
const presets: { [key in PresetOption]: MaskProps; }
```

 - **Function `getPresetMask`**: get a preset, optionally being able to change its settings

```
function getPresetMask(preset: PresetOption, change: Partial<MaskProps> = {}): MaskProps
```

## MaskProps

The useMask receives the settings parameter of type MaskProps. See available settings:

|Prop|Type|Default|Details|
|---|---|---|---|
|**masks**|`Array<string>`||The masks that will be applied to the target. By default the characters `?`, `#`, `@` will be replaced by letters or numbers, numbers, letters, respectively. This character pattern can be changed. To escape a replacement character use `\` before it.|
|**placeholder**|`string`|`''`|Autofill of the mask to be filled|
|**reverse**|`boolean`|`false`|Mask fill in inverted mode|
|**transform**|`'uppercase'`<br />`'lowercase'`<br />`'capitalize'`<br />`'capitalizeAll'`<br />`'none'`|`'none'`|Apply a transformation to the result string|
|**infinity**|`boolean`<br />`{each:number;add:string;}`|`false`|Allows data entry indefinitely by the last mask replacement character|
|**patterns**|`{[key in string]: RegExp}`|`{'#': /[0-9]/,'@': /[A-Za-z]/,'?': /[A-Za-z0-9]/}`|Characters to be substituted in the mask if approved by the regular expression|

## Presets

You can import pre-established mask configurations. See the options:

 - ONLY_NUMBERS
 - ONLY_LETTERS
 - ONLY_CHARS
 - DATE_STAMP
 - DATE_PTBR
 - DATETIME_STAMP
 - DATETIME_PTBR
 - PHONE_USA
 - PHONE_BR
 - CURRENCY_POINT
 - CURRENCY_COMMA
 - CURRENCY_DOLLAR
 - CURRENCY_PTBR
 - DOCUMENT_CPF
 - DOCUMENT_CNPJ
 - DOCUMENT_CPF_CNPJ
 - ZIPCODE_USA
 - ZIPCODE_BR
 - PRODUCT_KEY
 - COLOR_HEX

## Migrating v1 to v2

*The second version of mask-hooks is now independent of React and can be used in more different development contexts. That's why the React components and the useMaskState hook have been removed. Now fully supports typescript.*

## Author

* **Guilherme Neves** - [github](https://github.com/guilhermeasn/) - [website](https://gn.dev.br/)

## License

This project is under the MIT license - see file [LICENSE](https://github.com/guilhermeasn/mask-hooks/blob/master/LICENSE) for details.
