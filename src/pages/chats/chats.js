import * as Handlebars from "handlebars";
import chats from "./chats.tmpl";
import { selectedChat } from "./modules/selectedChat";
import { notSelectedChat } from "./modules/noteSelectedChat";
import { routes } from "../../utils";

import { Input } from "../../components/input";
//import avatarIcon from "../../../static/assets/avatar-icon.svg";
import "./chats.scss";

export function chatPage(route) {
    const template = Handlebars.compile(chats);
    const currentChat = route == routes.selectedChat ? selectedChat : notSelectedChat;

    const context = {
        currentChat, 
        profileTitle: "Профиль",
        emptyChatTitle: "Выберите чат чтобы отправить сообщение",
        searchInput: Input({
            label: "Поиск",
            inputClassName: "search__input",
            name: "search",
            type: "text",
            inputContainerClassName: "input__container-gray"
        }),
        dialogs: [
            {name: "Андрей", message: "Изображение", id: "1"} , 
            {name: "Киноклуб", message: "Вы: стикер", id: "2"} , 
            {name: "Илья", message: "Друзья, у меня для вас особенный выпуск новостей!...", id: "3"},
            {name: "Вадим", message: "Вы: Круто!", id: "4"},
            {name: "тет-а-теты", message: "И Human Interface Guidelines и Material Design рекомендуют...", id: "5"},
        ],
    };

    return template(context);
}