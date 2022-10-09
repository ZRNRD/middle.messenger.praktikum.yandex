import * as Handlebars from "handlebars";
import loginTemplate from "./login.tmpl.js";
import { Input } from "../../components/input";
import { Button } from "../../components/button";
import "./login.scss";

export function login() {
    const template = Handlebars.compile(loginTemplate);

    const context = {
        loginInput: Input({
            name: "login",
            placeholder: "Логин",
            type: "text",
            required: true,
            errorMessage: "Неверный логин"
        }),
        passwordInput: Input({
            name: "password",
            placeholder: "Пароль",
            type: "password",
            required: true,
            errorMessage: "Неверный пароль"
        }),
        button: Button({
            title: "Войти",
        }),
        linkTitle: "Нет профиля?"
    };

    return template(context);
}