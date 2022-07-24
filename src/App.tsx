import { presets } from "mask-hooks";
import { Col, Container, FormLabel, Row } from "react-bootstrap";
import { InputMask } from "./components/InputMask";

function App() {

    // eslint-disable-next-line no-extend-native
    Object.defineProperty(RegExp.prototype, "toJSON", {
        value: RegExp.prototype.toString
    });

    return (
        
        <Container className="my-5">

            { Object.keys(presets).map(key => (

                <Row key={ key } className='m-3 p-2 bg-secondary rounded text-light align-items-center'>

                    <Col md={ 6 }>
                        <FormLabel>{ key }</FormLabel>
                        <pre>{ JSON.stringify(presets[key as keyof typeof presets], undefined, 2) }</pre>
                    </Col>

                    <Col md={ 6 }>
                        <InputMask
                            name={ key.replace('_', ' ') }
                            settings={ { ...presets[key as keyof typeof presets] } }
                        />
                    </Col>

                </Row>

            )) }

        </Container>

    );

}

export default App;
