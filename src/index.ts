import { ChatPage } from './pages/chats/chats';
import { Login } from './pages/login/login';
import { Signin } from './pages/signin/signin';
import { Profile } from './pages/profile/profile';
import { ChangeProfileData } from './pages/profile/modules/changeProfileData/changeProfileData';
import { changeProfilePassword } from './pages/profile/modules/changeProfilePassword';
import { PageNotFound } from './pages/404/404';
import { ServerError } from './pages/500/500';
import { routes } from './utils';
import './main.scss';

const root: HTMLElement | null = document.getElementById('root');

const content = {
  login: new Login(),
  signin: new Signin(),
  selectedChat: new ChatPage({
    isChatSelected: true,
  }),
  notSelectedChat: new ChatPage({
    isChatSelected: false,
  }),
  profile: new Profile(),
  changeProfileData: new ChangeProfileData(),
  changeProfilePassword: changeProfilePassword(),
  pageNotFound: new PageNotFound(),
  serverError: new ServerError(),

};

root.innerHTML = content.login.transformToString();

switch (window.location.pathname) {
  case '/':
  case `/${routes.login}`:
    root.innerHTML = content.login.transformToString();
    break;
  case `/${routes.signin}`:
    root.innerHTML = content.signin.transformToString();
    break;
  case `/${routes.selectedChat}`:
    root.innerHTML = content.selectedChat.transformToString();
    break;
  case `/${routes.notSelectedChat}`:
    root.innerHTML = content.notSelectedChat.transformToString();
    break;
  case `/${routes.profile}`:
    root.innerHTML = content.profile.transformToString();
    break;
  case `/${routes.changeProfileData}`:
    root.innerHTML = content.changeProfileData.transformToString();
    break;
  case `/${routes.changeProfilePassword}`:
    root.innerHTML = content.changeProfilePassword;
    break;
  case `/${routes.serverError}`:
    root.innerHTML = content.serverError.transformToString();
    break;
  case `/${routes.pageNotFound}`:
  default:
    root.innerHTML = content.pageNotFound.transformToString();
    break;
}
