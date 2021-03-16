# mask-hooks

Functions and react hooks for applying masks to data inputs and outputs

Funções e react hooks para aplicar máscaras a variáveis de controle de inputs ou para exibição de dados

## 🚀 Começando

Execute no terminal o comando abaixo para instalar o **mask-hooks** no seu projeto
```
npm install mask-hooks --save
```

### 📋 Pré-requisitos

- node
- npm
- react

### 🛠️ Exemplos de Uso


- useMaskState: Um substituto do rect hook useState para o uso de mascaras

```
import { useMaskState } from 'mask-hooks';


export default function MaskPhone() {

    const [value, setValue] = useMaskState('', {
        mask: '(??) ????-????'
    });

    return (
        <>
            <input type='text' value={ value } onChange={ input =>setValue(input.currentTarget.value) } />
        </>
    );

}

```

- useMaskState com preset: para máscaras pré-configuradas

```
import { useMaskState, presets } from 'mask-hooks';


export default function MaskPhone() {

    const [value, setValue] = useMaskState('', presets.PHONE_BR);

    return (
        <>
            <input type='text' value={ value } onChange={ input =>setValue(input.currentTarget.value) } />
        </>
    );

}

```

- useMask: utilize este para aplicar mascaras em muitos contextos, por exemplo, com dispatches do redux ou simples exibição de uma informação

```
    import { useMask, presets } from 'mask-hooks';


    export default function MaskDocs() {

    const documentMask = useMask(presets.DOCUMENT_CPF_CNPJ); /* { mask: [ "???.???.???-??" , "??.???.???/????-??" ] } */

    return (
        <>
            <p>{ documentMask('11122233345')    /* print 111.222.333-45 */     }</p>
            <p>{ documentMask('11222333000145') /* print 11.222.333/0001-45 */ }</p>
        </>
    );

}
```

- Configure além das mascaras, placeholders, filtros, e direção de preenchimento

```
import { useMaskState, filters, modes } from 'mask-hooks';


export default function MaskBRL() {

    // Resultado ao começar a digitar R$ 0,00

    const [value, setValue] = useMaskState('', {
        mask:        'R$ *,??',
        mode:        modes.REVERSE,
        filter:      filters.NUMERICS,
        placeholder: '0'
    });

    return (
        <>
            <input type='text' value={ value } onChange={ input =>setValue(input.currentTarget.value) } />
        </>
    );

}
```

- Estabeleça uma padronização para entradas de dados ilimitadas

```
import { useMaskState, filters, modes } from 'mask-hooks';


export default function MaskBRL() {

    // Adicionara pontos para separar os milhares R$ 1.250.500,00

    const [value, setValue] = useMaskState('', {
        mask:        'R$ {3|.},??',
        mode:        modes.REVERSE,
        filter:      filters.NUMERICS,
        placeholder: '0'
    });

    return (
        <>
            <input type='text' value={ value } onChange={ input =>setValue(input.currentTarget.value) } />
        </>
    );

}
```
### 🛠️ Configurações

 - Criação de máscaras

 **Caracter: ?** - será substituido por um caracter do target.

 **Caracter: \*** - será substituido pelo restante do target.

 **Padrão: {\<numero\>|\<caracter\>}** - exemplo {3|,} funciona como o caracter **\***, porém adiciona um caracter entre o restante do target, de acordo com a quantidade de separação.

- Outras configurações

**Filtro:** retira determinados caracteres do target, você pode importar uma lista de filtros em *filters*

**Mode:** direção do preenchimento do targer, você pode importar as opções disponíveis em *modes*

**Placeholder:** enquanto a mascara não for toda preenchida os caracteres **\*** e **?** serão prenchidos com o placeholder

- Mascáras Pré-configuradas;

    Você poderá utilizar uma mascará pré-configurada importando *presets*, como estas:
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
    - IP_V4

## ✒️ Autor

* **Guilherme Neves** - [repositórios github](https://github.com/guilhermeasn/)

## 📄 Licença

Este projeto está sob a licença MIT - veja o arquivo [LICENSE.md](https://github.com/guilhermeasn/mask-hooks/blob/master/LICENSE) para detalhes.
