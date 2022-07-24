import { MaskProps, useMask } from "mask-hooks";
import { useState } from "react";
import { Form } from "react-bootstrap";

export function InputMask({ eraseOnBlur = false, ...props } : MaskProps & { eraseOnBlur ?: boolean }) {

    const mask = useMask(props);
    const [ value, setValueRoot ] = useState<string>('');

    function setValue(value : string) {
        setValueRoot(mask(value));
    } 

    return (

        <Form.Group>
            <Form.Label>Result</Form.Label>
            <Form.Control
                title='Result'
                value={ value }
                onChange={ (input : any) => setValue(input.currentTarget.value) }
                onBlur={ () => eraseOnBlur && setTimeout(() => setValue(''), 1000) }
            />
        </Form.Group>

    );

}