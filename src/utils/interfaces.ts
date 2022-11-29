import { Dictionary } from './types';

export interface IRoute {
    navigate(pathname: string): void;
    leave(): void;
    match(pathname: string): boolean;
    render(): void;
  }

export interface IRouter {
    use(pathname: string, block: Dictionary, context: Dictionary): IRouter;
    start(): void;
    go(pathname?: string): void;
    getCurrentRoute(): void;
    back(): void;
    back(): void;
    forward(): void;
    routes(): IRoute[];
}

export interface ISignUpData {
  first_name: string;
  second_name: string;
  login: string;
  email: string;
  password: string;
  phone: string;
}

export interface ILoginData {
  login: string;
  password: string;
}

export interface IPasswordData {
  oldPassword: string;
  newPassword: string;
}

export interface IAddChatUser {
  users: string[];
  chatId: number;
}

export interface ICreateChat {
  title: string;
}
export interface IChatData {
  avatar: string;
  created_by: number;
  id: number;
  last_message: Dictionary;
  title: string;
  unread_count: number;
}