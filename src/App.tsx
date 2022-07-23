import { presets } from "mask-hooks";
import { Container } from "react-bootstrap";
import { InputMask } from "./components/InputMask";


function App() {

    return (
        
        <Container className="my-5">

            <InputMask name='Only Numbers' mask={ presets.ONLY_NUMBERS } />

        </Container>

    );

}

export default App;
