import * as Handlebars from "handlebars";
import notSelectedTemplate from "./notSelectedChat.tmpl";
import "./notSelectedChat.scss";

export function notSelectedChat() {
    const template = Handlebars.compile(notSelectedTemplate);

    const context = {
        title: "Выберите чат чтобы отправить сообщение",
    };

    return template(context);
}