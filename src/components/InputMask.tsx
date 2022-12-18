import { CompleteMask, MaskProps, useCompleteMask } from "mask-hooks";
import { useEffect, useState } from "react";
import { Form, FormText } from "react-bootstrap";

export default function InputMask(props : MaskProps) {

    const maskComplete = useCompleteMask(props);
    const [ maskData, setMaskData ] = useState<CompleteMask>(maskComplete(''));

    const [ cleaned, setCleaned ] = useState<boolean>(false);

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

            <Form.Text className="text-white-50 d-flex justify-content-between">

                <span>
                    { maskData.completed
                        ? '✓ completed mask'
                        : '✗ uncompleted mask'
                    }
                </span>

                <span onClick={ () => setCleaned(!cleaned) } style={ { cursor: 'pointer' } }>
                    { maskData.entries }
                    &nbsp;entries&nbsp;
                    <span className="text-light">
                        { cleaned ? '▲' : '▼' }
                    </span>
                </span>

            </Form.Text>

            { cleaned && (
                <FormText as='p' className="bg-dark text-light my-2 p-1 rounded text-nowrap flex-nowrap">
                    { maskData.cleaned || '(without entries)' }
                </FormText>
            ) }
            
        </Form.Group>

    );

}