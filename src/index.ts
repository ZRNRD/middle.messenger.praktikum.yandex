import { chatPage } from './pages/chats';
import { login } from './pages/login';
import { signin } from './pages/signin';
import { profile } from './pages/profile';
import { changeProfileData } from './pages/profile/modules/changeProfileData';
import { changeProfilePassword } from './pages/profile/modules/changeProfilePassword';
import { pageNotFound } from './pages/404';
import { serverError } from './pages/500';
import { routes } from './utils';
import './main.scss';

const root = document.getElementById('root');

const content = {
  login: login(),
  signin: signin(),
  selectedChat: chatPage(routes.selectedChat),
  notSelectedChat: chatPage(routes.notSelectedChat),
  profile: profile(),
  changeProfileData: changeProfileData(),
  changeProfilePassword: changeProfilePassword(),
  pageNotFound: pageNotFound(),
  serverError: serverError(),

};

root.innerHTML = content.login;

switch (window.location.pathname) {
  case '/':
  case `/${routes.login}`:
    root.innerHTML = content.login;
    break;
  case `/${routes.signin}`:
    root.innerHTML = content.signin;
    break;
  case `/${routes.selectedChat}`:
    root.innerHTML = content.selectedChat;
    break;
  case `/${routes.notSelectedChat}`:
    root.innerHTML = content.notSelectedChat;
    break;
  case `/${routes.profile}`:
    root.innerHTML = content.profile;
    break;
  case `/${routes.changeProfileData}`:
    root.innerHTML = content.changeProfileData;
    break;
  case `/${routes.changeProfilePassword}`:
    root.innerHTML = content.changeProfilePassword;
    break;
  case `/${routes.serverError}`:
    root.innerHTML = content.serverError;
    break;
  case `/${routes.pageNotFound}`:
  default:
    root.innerHTML = content.pageNotFound;
    break;
}
