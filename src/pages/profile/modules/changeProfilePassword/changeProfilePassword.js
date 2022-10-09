import * as Handlebars from "handlebars";
import changeProfilePasswordTemplate from "./changeProfilePassword.tmpl.js";
import { Input } from "../../../../components/input";
import { Button } from "../../../../components/button/button.js";
import userAvatar from "../../../../../static/assets/icons/user-avatar.png";
import "./changeProfilePassword.scss";

export function changeProfilePassword() {
    const template = Handlebars.compile(changeProfilePasswordTemplate);

    const context = {
        userAvatar,
        inputs: [
            Input({
                value: "PAROL12345",
                name: "oldPassword",
                label: "Старый пароль",
                type: "password",
                required: true,
                disabled: false,
                isProfileInput: true,
                inputContainerClassName:"password__input-container",
                inputClassName: "password__input"
            }),
            Input({
                value: "",
                name: "newPassword",
                label: "Новый пароль",
                type: "password",
                required: true,
                disabled: false,
                isProfileInput: true,
                inputContainerClassName:"password__input-container",
                inputClassName: "password__input"
            }),
            Input({
                value: "",
                name: "newPasswordAgain",
                label: "Повторите новый пароль",
                type: "password",
                required: true,
                disabled: false,
                isProfileInput: true,
                inputContainerClassName:"password__input-container",
                inputClassName: "password__input"
            })
        ],
        saveChanges: Button({
            title: "Сохранить",
        }),
        return: Button({
            title: "Назад",
        })
    };

    return template(context);
}