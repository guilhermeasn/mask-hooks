import { Form, FormControlProps } from "react-bootstrap";

export default function Input(props : FormControlProps) {

    return (

        <Form.Group>
            <Form.Label>{ props.title }</Form.Label>
            <Form.Control { ...props } />
        </Form.Group>

    );

}