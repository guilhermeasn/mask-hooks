import { Form, FormSelectProps } from "react-bootstrap";

export default function Select({ options, ...props } : FormSelectProps & { options : string[] }) {

    return (

        <Form.Group>
            <Form.Label>{ props.title }</Form.Label>
            <Form.Select { ...props }>
                { options.map(option => (
                    <option key={ option } value={ option }>
                        { option }
                    </option>
                )) }
            </Form.Select>
        </Form.Group>

    );

}