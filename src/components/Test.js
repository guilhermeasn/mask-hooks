import { useCompleteMask, presets } from "mask-hooks";
import { useState } from "react";

export function Test() {

    const maskComplete = useCompleteMask(presets.DATE_STAMP);
    const [ data, setData ] = useState(maskComplete(''));

    return (

        <input
            value={ data.result }
            onChange={ input => setData(maskComplete(input.currentTarget.value)) }
            style={ { color: data.completed ? "#000000" : "#ff0000" } }
            title={ `${ data.entries } entries: ${ data.cleaned }` }
        />

    );

}