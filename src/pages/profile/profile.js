import * as Handlebars from "handlebars";
import profileTemplate from "./profile.tmpl.js";
import { Input } from "../../components/input";
import userAvatar from "../../../static/assets/icons/user-avatar.png";
import "./profile.scss";

export function profile() {
    const template = Handlebars.compile(profileTemplate);

    const context = {
        profileName: "Name",
        userAvatar,
        inputs: [
            Input({
                value: "mail@yandex.ru",
                name: "mail",
                label: "Почта",
                type: "text",
                required: true,
                disabled: true,
                isProfileInput: true,
                inputContainerClassName:"profile__input-container",
                inputClassName: "profile__input"
            }),
            Input({
                value: "login",
                name: "login",
                label: "Логин",
                type: "text",
                required: true,
                disabled: true,
                isProfileInput: true,
                inputContainerClassName:"profile__input-container",
                inputClassName: "profile__input"
            }),
            Input({
                value: "name",
                name: "name",
                label: "Имя",
                type: "text",
                required: false,
                disabled: true,
                isProfileInput: true,
                inputContainerClassName:"profile__input-container",
                inputClassName: "profile__input"
            }),
            Input({
                value: "surname",
                name: "surname",
                label: "Фамилия",
                type: "text",
                required: false,
                disabled: true,
                isProfileInput: true,
                inputContainerClassName:"profile__input-container",
                inputClassName: "profile__input"
            }),
            Input({
                value: "nickname",
                name: "nickname",
                label: "Имя в чате",
                type: "text",
                disabled: true,
                isProfileInput: true,
                inputContainerClassName:"profile__input-container",
                inputClassName: "profile__input"
            }),
            Input({
                value: "8 (800) 555-35-35",
                name: "phone",
                label: "Телефон",
                type: "text",
                required: false,
                disabled: true,
                isProfileInput: true,
                inputContainerClassName:"profile__input-container",
                inputClassName: "profile__input"
            })
            
        ],
        changeData: "Изменить данные",
        changePassword: "Изменить пароль",
        back: "Выйти"
    };

    return template(context);
}