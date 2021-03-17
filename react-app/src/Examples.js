import { useState } from 'react';
import { useMaskState, presets } from 'mask-hooks';

// eslint-disable-next-line
export default () => {

    let values    = [];
    let setValues = [];

    const [cMask, setCMask] = useState('R$ *,??');
    const [cPlhd, setCPlhd] = useState('');
    const [cVal, setCVal]   = useMaskState('', {
        mask: cMask,
        placeholder: cPlhd
    });

    // eslint-disable-next-line
    Object.keys(presets).map(key => {
        [values[key], setValues[key]] = useMaskState('', presets[key]);
    });

    // eslint-disable-next-line
    RegExp.prototype.toJSON = RegExp.prototype.toString;

    return (
        <div className='bg-dark text-light py-5 px-3'>

            <div className='container'>

                <div className='text-right mb-5 d-flex flex-row-reverse'>
                    <a href='https://github.com/guilhermeasn/mask-hooks' target='_blank' rel="noreferrer" class='mx-3 mt-1'>
                        <svg xmlns="http://www.w3.org/2000/svg" fill='#fff' width="48" height="48" viewBox="0 0 24 24">
                            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                        </svg>
                    </a>
                    <div>
                        <h3 class='m-0 p-0'>mask-hooks</h3>
                        <spam class='small m-0 p-0'>By Neves, Guilherme</spam>    
                    </div>
                </div>
                
                {
                    Object.keys(presets).map((key, index) => (
                        <div className='row my-5' key={index}>
                            <label className='col-12 col-md-6 text-light'>
                                { key }
                                <pre className='text-light'>
                                    { JSON.stringify(presets[key], null, "\t") }
                                </pre>
                            </label>
                            <input className='col-12 col-md-6 form-control rounded' type='text' value={ values[key] } onChange={ input => setValues[key](input.currentTarget.value) } />
                        </div>
                    ))
                }

                <hr class='bg-light'/>

                <div class='row'>
                    <h4 class='col-12'>Exemplo Personalizavel</h4>
                    <p class='col-6'>Mask:<br/><input className='form-control rounded' type='text' value={ cMask } onChange={ input => { setCMask(input.currentTarget.value); setCVal(''); } } /></p>
                    <p class='col-6'>Placeholder:<br/><input className='form-control rounded' type='text' value={ cPlhd } onChange={ input => { setCPlhd(input.currentTarget.value); setCVal(''); } } /></p>
                    <p class='col-12'>Target: <br/><input className='form-control rounded' type='text' value={ cVal } onChange={ input => setCVal(input.currentTarget.value) } /></p>
                </div>

            </div>

        </div>
    );

}
