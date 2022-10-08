import * as Handlebars from "handlebars";
import chats from "./chats.tmpl";
import { selectedChat } from "./modules/selectedChat";
import { notSelectedChat } from "./modules/notSelectedChat";
import { routes } from "../../utils";
import { Input } from "../../components/input";
import userAvatar from "../../../static/assets/icons/user-avatar.png";
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
        }),
        dialogs: [
            {name: "Андрей", message: "Изображение", id: "1", userAvatar} , 
            {name: "Киноклуб", message: "Вы: стикер", id: "2", userAvatar} , 
            {name: "Илья", message: "Друзья, у меня для вас особенный выпуск новостей!...", id: "3", userAvatar},
            {name: "Вадим", message: "Вы: Круто!", id: "4", userAvatar},
            {name: "тет-а-теты", message: "И Human Interface Guidelines и Material Design рекомендуют...", id: "5", userAvatar},
        ]
    };

    return template(context);
}