import { CompleteMask, MaskProps, useCompleteMask } from "mask-hooks";
import { useEffect, useRef, useState } from "react";
import { Form } from "react-bootstrap";

export default function InputMask(props : MaskProps) {

    const inputElement = useRef<HTMLInputElement>(null);

    const maskComplete = useCompleteMask(props);
    const [ maskData, setMaskData ] = useState<CompleteMask>(maskComplete(''));

    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(() => setMaskData(maskComplete('')), [ props ]);

    return (

        <Form.Group>

            <Form.Label>Result</Form.Label>

            <Form.Control
                ref={ inputElement }
                title='Result'
                value={ maskData.result }
                onChange={ (input : any) =>  {
                    setMaskData(maskComplete(input.currentTarget.value));
                    if(props.infinity) {
                        inputElement.current?.setSelectionRange(maskData.result.length + 1, maskData.result.length + 1);
                        inputElement.current?.focus();
                    }
                } }
            />

            <Form.Text className="text-white-50">
                { Object.values(maskData).every(v => !!v)
                    ? '✓ completed mask'
                    : '✗ uncompleted mask'
                }
            </Form.Text>
            
        </Form.Group>

    );

}