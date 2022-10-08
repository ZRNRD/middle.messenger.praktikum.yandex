import { chatPage } from "./pages/chats";
import { login } from "./pages/login";
import { pageNotFound } from "./pages/404";
import { serverError } from "./pages/500";
import { routes } from "./utils";
import "./main.scss";

const root = document.getElementById("root");

const content = {
    login: login(),
    selectedChat: chatPage(routes.selectedChat),
    notSelectedChat: chatPage(routes.notSelectedChat),
    pageNotFound: pageNotFound(),
    serverError: serverError(),

}


root.innerHTML = content.login;

switch (window.location.pathname) {
    case "/":
    case `/${routes.login}`:
        root.innerHTML = content.login;
        break;
    case `/${routes.selectedChat}`:
        root.innerHTML = content.selectedChat;
        break;
    case `/${routes.notSelectedChat}`:
        root.innerHTML = content.notSelectedChat;
        break;
    case `/${routes.serverError}`:
        root.innerHTML = content.serverError;
        break;
    case `/${routes.notFound}`:
    default:
        root.innerHTML = content.notFound;
        break;
}
