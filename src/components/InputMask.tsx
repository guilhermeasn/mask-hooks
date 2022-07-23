import { MaskProps } from "mask-hooks";
import { useState } from "react";
import { Form, InputGroup } from "react-bootstrap";

type InputMaskProps = {
    name : string;
    mask : MaskProps
}

export function InputMask({ name, mask } : InputMaskProps) {

    const [ value, setValue ] = useState<string>('');

    return (

        <InputGroup className="mb-3">

            <InputGroup.Text>
                { name }
            </InputGroup.Text>

            <Form.Control
                value={ value }
                onChange={ (input : any) => setValue(input.currentTarget.value) }
            />

        </InputGroup>

    );

}