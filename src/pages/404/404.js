import {pageNotFound} from "./404.tmpl"

let source = pageNotFound;
let template = Handlebars.compile(source);
let context = { errorTitle: "404", errorSubtitle: "СТРАНИЦА НЕ НАЙДЕНА" };
let html = template(context);

export default html;