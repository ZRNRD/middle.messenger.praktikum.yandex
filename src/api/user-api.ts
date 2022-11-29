import { HTTPTransport } from '../utils/HTTPTransport';
import { ISignUpData, IPasswordData } from '../utils/interfaces';

const defaultUrl = 'https://ya-praktikum.tech/api/v2/user';

const userAPIInstance = new HTTPTransport(defaultUrl);

export class UserApi {
  changeUserProfile(data: ISignUpData) {
    return userAPIInstance.put('/profile', data);
  }

  changeUserAvatar(avatar: FormData) {
    return userAPIInstance.put('/profile/avatar', avatar);
  }

  changeUserPassword(data: IPasswordData) {
    return userAPIInstance.put('/password', data);
  }

  getUserByLogin(data: {login: string}) {
    return userAPIInstance.post('/search', data);
  }
}
