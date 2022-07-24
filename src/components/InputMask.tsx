import { MaskProps, useMask } from "mask-hooks";
import { useEffect, useState } from "react";
import { Form } from "react-bootstrap";

export default function InputMask(props : MaskProps) {

    const mask = useMask(props);
    const [ value, setValue ] = useState<string>('');

    function setValueMask(value : string) {
        setValue(mask(value));
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(() => setValueMask(''), [ props ]);

    return (

        <Form.Group>
            <Form.Label>Result</Form.Label>
            <Form.Control
                title='Result'
                value={ value }
                onChange={ (input : any) => setValueMask(input.currentTarget.value) }
            />
        </Form.Group>

    );

}