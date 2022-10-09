import * as Handlebars from "handlebars";
import signinTemplate from "./signin.tmpl.js";
import { Input } from "../../components/input";
import { Button } from "../../components/button";
import "./signin.scss";

export function signin() {
    const template = Handlebars.compile(signinTemplate);

    const context = {
        inputs: [
            Input({
                name: "mail",
                placeholder: "Почта",
                type: "text",
                required: true,
            }),
            Input({
                name: "login",
                placeholder: "Логин",
                type: "text",
                required: true,
            }),
            Input({
                name: "name",
                placeholder: "Имя",
                type: "text",
                required: false,
            }),
            Input({
                name: "lastName",
                placeholder: "Фамилия",
                type: "text",
                required: false,
            }),
            Input({
                name: "phone",
                placeholder: "Телефон",
                type: "text",
                required: false,
            }),
            Input({
                name: "password",
                placeholder: "Пароль",
                type: "password",
                required: true
            }),
            Input({
                name: "secondPassword",
                placeholder: "Пароль (ещё раз)",
                type: "password",
                required: true,
                errorMessage: "Неверный пароль"
            })
        ],
        button: Button({
            title: "Создать профиль"
        }),
        linkTitle: "Войти"
    };

    return template(context);
}