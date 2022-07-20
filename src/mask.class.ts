export type Target = string | number;

export type MaskProps<MaskType = string | string[]> = {
    mask         : MaskType;
    mode        ?: 'AUTO' | 'NORMAL' | 'REVERSE';
    placeholder ?: string | null;
}

export default class Mask {

    private _props : Required<MaskProps<string[]>>;

    constructor(props : MaskProps) {
        this._props = {
            mask: Array.isArray(props.mask) ? props.mask : [ props.mask ],
            mode: props.mode ?? 'AUTO',
            placeholder: props.placeholder ?? null
        }
    }



}
