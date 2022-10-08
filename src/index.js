import { chatPage } from "./pages/chats";
import { routes } from "./utils";
import "./main.scss";

const root = document.getElementById("root");

const content = {

    selectedChat: chatPage(routes.selectedChat),
    notSelectedChat: chatPage(routes.notSelectedChat),

}


root.innerHTML = content.notSelectedChat;

