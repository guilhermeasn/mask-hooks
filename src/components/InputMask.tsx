import { MaskProps, useMask } from "mask-hooks";
import { useState } from "react";
import { Form, InputGroup } from "react-bootstrap";

type InputMaskProps = {
    name : string;
    settings : MaskProps
}

export function InputMask({ name, settings } : InputMaskProps) {

    const mask = useMask(settings);
    const [ value, setValueRoot ] = useState<string>('');

    function setValue(value : string) {
        setValueRoot(mask(value));
    } 

    return (

        <InputGroup className="mb-3">

            <InputGroup.Text className="text-success">
                { name }
            </InputGroup.Text>

            <Form.Control
                value={ value }
                onChange={ (input : any) => setValue(input.currentTarget.value) }
            />

        </InputGroup>

    );

}