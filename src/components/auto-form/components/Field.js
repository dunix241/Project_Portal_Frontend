import {autoFieldComponents} from "../auto-fields";

export default function Field({component, ...other}) {
    const Component = autoFieldComponents[component];
    return Component ? <Component {...other}/> : null;
}