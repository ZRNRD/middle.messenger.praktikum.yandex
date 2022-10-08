import { chatPage } from "./pages/chats";
import { pageNotFound } from "./pages/404";
import { serverError } from "./pages/500";
import { routes } from "./utils";
import "./main.scss";

const root = document.getElementById("root");

const content = {

    selectedChat: chatPage(routes.selectedChat),
    notSelectedChat: chatPage(routes.notSelectedChat),
    pageNotFound: pageNotFound(),
    serverError: serverError(),

}


root.innerHTML = content.serverError;

