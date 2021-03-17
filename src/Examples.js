import { useMaskState, presets } from 'mask-hooks';

// eslint-disable-next-line
export default () => {

    let values    = [];
    let setValues = [];

    // eslint-disable-next-line
    Object.keys(presets).map(key => {
        [values[key], setValues[key]] = useMaskState('', presets[key]);
    });

    // eslint-disable-next-line
    RegExp.prototype.toJSON = RegExp.prototype.toString;

    return (
        <div className='bg-dark text-light p-5'>

            <h3 className='text-right mb-5'>mask-hooks</h3>

            
            {
                Object.keys(presets).map((key, index) => (
                    <div className='row' key={index}>
                        <label className='col-6 text-light'>
                            { key }
                            <pre className='text-light'>
                                { JSON.stringify(presets[key], null, "\t") }
                            </pre>
                        </label>
                        <input className='col-6 form-control rounded' type='text' value={ values[key] } onChange={ input => setValues[key](input.currentTarget.value) } />
                    </div>
                ))
            }

        </div>
    );

}
