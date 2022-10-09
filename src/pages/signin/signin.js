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
                label: "Почта",
                type: "text",
                required: true,
            }),
            Input({
                name: "login",
                label: "Логин",
                type: "text",
                required: true,
            }),
            Input({
                name: "name",
                label: "Имя",
                type: "text",
                required: false,
            }),
            Input({
                name: "lastName",
                label: "Фамилия",
                type: "text",
                required: false,
            }),
            Input({
                name: "phone",
                label: "Телефон",
                type: "text",
                required: false,
            }),
            Input({
                name: "password",
                label: "Пароль",
                type: "password",
                required: true
            }),
            Input({
                name: "secondPassword",
                label: "Пароль (ещё раз)",
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