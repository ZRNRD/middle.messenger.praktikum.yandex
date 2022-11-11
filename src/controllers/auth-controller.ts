import { AuthApi } from '../api/auth-api';
import { ILoginData, ISignUpData } from '../utils/interfaces';
import store from '../store/store';

const authInstance = new AuthApi();

export class AuthController {
  public async login(data: ILoginData) {
    try {
      await authInstance.signIn(data);
      await this.getUser();
    } catch (e) {
      return e.reason;
    }
  }

  public async signUp(data: ISignUpData) {
    try {
      await authInstance.signUp(data);
      await this.getUser();
    } catch (e) {
      return e.reason;
    }
  }

  public async logOut() {
    try {
      await authInstance.logOut();
    } catch (e) {
      return e.reason;
    }
  }

  public async getUser() {
    let res;
    try {
      res = await authInstance.getUser();
    } catch (e) {
      res = e.reason;
    }
    if (res !== 'Not found') {
      store.setState({ user: res });
    }
    return res;
  }
}
