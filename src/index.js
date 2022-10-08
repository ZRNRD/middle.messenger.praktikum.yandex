import { chatPage } from "./pages/chats";
import { pageNotFound } from "./pages/404";
import { routes } from "./utils";
import "./main.scss";

const root = document.getElementById("root");

const content = {

    selectedChat: chatPage(routes.selectedChat),
    notSelectedChat: chatPage(routes.notSelectedChat),
    pageNotFound: pageNotFound(),

}


root.innerHTML = content.pageNotFound;

