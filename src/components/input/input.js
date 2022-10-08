import Handlebars from "handlebars";
import inputTemplate from "./input.tmpl.js";

import "./input.scss";
//import "./inputProfile.scss";

export function Input(props) {
    const { 
        required = false, 
        value = null, 
        disabled = false, 
        inputContainerClassName, 
        inputClassName 
    } = props;

    const template = Handlebars.compile(inputTemplate);

    const baseContainerClassName = "input__container" ;
    const baseInputClassName = "input";

    const context = { 
        ...props, 
        required, 
        value, 
        disabledInput: disabled,
        inputContainerClassName: `${baseContainerClassName} ${inputContainerClassName}`,
        inputClassName: `${baseInputClassName} ${inputClassName}`,
    };

    return template(context);
}