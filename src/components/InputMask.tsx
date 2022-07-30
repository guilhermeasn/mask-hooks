import { CompleteMask, MaskProps, useCompleteMask } from "mask-hooks";
import { useEffect, useState } from "react";
import { Form } from "react-bootstrap";

export default function InputMask(props : MaskProps) {

    const maskComplete = useCompleteMask(props);
    const [ maskData, setMaskData ] = useState<CompleteMask>(maskComplete(''));

    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(() => setMaskData(maskComplete('')), [ props ]);

    return (

        <Form.Group>

            <Form.Label>Result</Form.Label>

            <Form.Control
                title='Result'
                value={ maskData.result }
                onChange={ (input : any) => setMaskData(maskComplete(input.currentTarget.value)) }
            />

            <Form.Text className="text-white-50">
                { maskData.completed
                    ? '✓ completed mask'
                    : '✗ uncompleted mask'
                }
            </Form.Text>
            
        </Form.Group>

    );

}