import * as Handlebars from "handlebars";
import buttonTemplate from "./button.tmpl.js";
import "./button.scss";

const template = Handlebars.compile(buttonTemplate);

export function Button({ title, className }) {
    const context = {
        title,
        className: `button ${className}`,
    }

    return template(context);
}