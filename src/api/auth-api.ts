import { HTTPTransport } from '../utils/HTTPTransport';
import { ISignUpData, ILoginData } from '../utils/interfaces';

const defaultUrl = 'https://ya-praktikum.tech/api/v2/auth';

const authAPIInstance = new HTTPTransport(defaultUrl);

export class AuthApi {
  signUp(data: ISignUpData) {
    return authAPIInstance.post('/signup', data);
  }

  signIn(data: ILoginData) {
    return authAPIInstance.post('/signin', data);
  }

  getUser() {
    return authAPIInstance.get('/user');
  }

  logOut() {
    return authAPIInstance.post('/logout');
  }
}
