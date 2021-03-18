import { useMask, filters, modes } from './index';


export const MaskInput = props => {

    const mask = useMask(props.config || props.preset || {
        mask:        props.mask        || '*',
        filter:      props.filter      || filters.NUMBERS,
        mode:        props.mode        || modes.NORMAL,
        placeholder: props.placeholder || null
    } || {});

    return (<input { ...props } value={ mask(props.value) }/>);

}

export const MaskOutput = props => {

    const mask = useMask(props.config || props.preset || {
        mask:        props.mask        || '*',
        filter:      props.filter      || filters.NUMBERS,
        mode:        props.mode        || modes.NORMAL,
        placeholder: props.placeholder || null
    } || {});

    return (<>{ mask(props.children || '') }</>);

}
