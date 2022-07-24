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