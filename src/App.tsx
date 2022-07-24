import { applyMask, MaskProps, presets } from "mask-hooks";
import { useState } from "react";
import { Col, Container, FormCheck, Row } from "react-bootstrap";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Input from "./components/Input";
import InputMask from "./components/InputMask";
import Links from "./components/Links";
import Select from "./components/Select";

export default function App() {

    // eslint-disable-next-line no-extend-native
    Object.defineProperty(RegExp.prototype, "toJSON", {
        value: RegExp.prototype.toString
    });

    const [ customMask, setCustomMask ] = useState<MaskProps>({
        masks: ['???']
    });

    return (
        
        <Container className="my-5">

            <Header />
            <Links />

            { Object.keys(presets).map(key => (

                <Row key={ key } className='m-3 p-2 bg-secondary rounded text-light align-items-center'>

                    <h3 className="py-3 mb-3 border-bottom" style={{ textTransform: 'capitalize' }}>
                        { key.replace(/_/g, ' ').toLowerCase() }
                    </h3>

                    <Col md={ 6 }>
                        <pre>{ JSON.stringify(presets[key as keyof typeof presets], undefined, 2) }</pre>
                    </Col>

                    <Col md={ 6 }>
                        <InputMask { ...presets[key as keyof typeof presets] } />
                    </Col>

                </Row>

            )) }

            <hr className="m-3" />

            <Row className='m-3 p-2 bg-secondary rounded text-light align-items-center'>

                <h3 className="py-3 mb-3 border-bottom">Custom Mask</h3>

                <Col md={ 6 } className='my-2 d-flex justify-content-around align-items-center'>

                    <div>

                        <FormCheck
                            className="mb-2"
                            type="switch"
                            label='Reverse'
                            checked={ customMask.reverse ?? false }
                            onChange={ (check : any) => setCustomMask({ ...customMask, reverse: check.target.checked }) }
                        />

                        <FormCheck
                            type="switch"
                            label='Infinity'
                            checked={ !!customMask.infinity }
                            onChange={ (check : any) => setCustomMask({ ...customMask, infinity: check.target.checked }) }
                        />

                    </div>

                    <div>

                        <Input
                            className={ customMask.infinity ? 'mb-2' : 'mb-2 bg-secondary' }
                            title="Each"
                            value={ typeof customMask.infinity === 'object' ? customMask.infinity.each : 0 }
                            onChange={ (input : any) => setCustomMask({ ...customMask, infinity: { each: input.currentTarget.value, add: typeof customMask.infinity === 'object' ? customMask.infinity.add : '' } }) }
                            disabled={ !customMask.infinity }
                        />

                        <Input
                            className={ customMask.infinity ? '' : 'bg-secondary' }
                            title="Add"
                            value={ typeof customMask.infinity === 'object' ? customMask.infinity.add : '' }
                            onChange={ (input : any) => setCustomMask({ ...customMask, infinity: { add: input.currentTarget.value, each: typeof customMask.infinity === 'object' ? customMask.infinity.each : 0 } }) }
                            disabled={ !customMask.infinity }
                        />

                    </div>

                </Col>

                <Col md={ 6 } className='my-2'>
                    <Select
                        title="Transform"
                        options={[
                            'none',
                            'uppercase',
                            'lowercase',
                            'capitalize',
                            'capitalizeAll'
                        ]}
                        value={ customMask.transform }
                        onChange={ (select : any) => setCustomMask({ ...customMask, transform: select.currentTarget.value }) }
                    />
                </Col>

                <Col md={ 6 } className='my-2'>
                    <Input
                        title="Placeholder"
                        value={ customMask.placeholder ?? '' }
                        onChange={ (input : any) => setCustomMask({ ...customMask, placeholder: applyMask(input.currentTarget.value, { masks: ['?'], patterns: { '?': /[^¬\\]/ } }) }) }
                    />
                </Col>

                <Col md={ 6 } className='my-2'>
                    <Input
                        title="Mask"
                        value={ customMask.masks[0] ?? '' }
                        onChange={ (input : any) => setCustomMask({ ...customMask, masks: [ input.currentTarget.value ] }) }
                    />
                </Col>

                <Col md={ 12 } className='my-2'>
                    <hr />
                    <InputMask { ...customMask } />
                </Col>

            </Row>

            <hr className="m-3 mb-1" />

            <Footer />

        </Container>

    );

}