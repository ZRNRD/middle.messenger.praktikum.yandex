import { ChatPage } from '../pages/chats/chats';
import { Login } from '../pages/login/login';
import { Signin } from '../pages/signin/signin';
import { Profile } from '../pages/profile/profile';
import { ChangeProfileData } from '../pages/profile/modules/changeProfileData/changeProfileData';
import { ChangeProfilePassword } from '../pages/profile/modules/changeProfilePassword/changeProfilePassword';
import { PageNotFound } from '../pages/404/404';
import { ServerError } from '../pages/500/500';
import { routes } from '../utils/routes';

import { Router } from './Router';

export const router = new Router('.root');

router
  .use('/', Login)
  .use(`/${routes.login}`, Login)
  .use(`/${routes.signin}`, Signin)
  .use(`/${routes.selectedChat}`, ChatPage, { isChatSelected: true })
  .use(`/${routes.notSelectedChat}`, ChatPage, { isChatSelected: false })
  .use(`/${routes.profile}`, Profile)
  .use(`/${routes.changeProfileData}`, ChangeProfileData)
  .use(`/${routes.changeProfilePassword}`, ChangeProfilePassword)
  .use(`/${routes.serverError}`, ServerError)
  .use(`/${routes.pageNotFound}`, PageNotFound)
  .notFound(PageNotFound);
