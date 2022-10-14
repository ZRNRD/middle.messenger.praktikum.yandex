import * as Handlebars from 'handlebars';
import loginTemplate from './login.tmpl';
import { Input } from '../../components/input';
import { Button } from '../../components/button';
import './login.scss';

export function login() {
  const template = Handlebars.compile(loginTemplate);

  const context = {
    loginInput: new Input({
      name: 'login',
      placeholder: 'Логин',
      type: 'text',
      required: true,
      errorMessage: 'Неверный логин',
      inputContainerClassName: 'lognin__input-container',
      inputClassName: 'lognin__input',
    }).transformToString(),
    passwordInput: new Input({
      name: 'password',
      placeholder: 'Пароль',
      type: 'password',
      required: true,
      errorMessage: 'Неверный пароль',
      inputContainerClassName: 'lognin__input-container',
      inputClassName: 'lognin__input',
    }).transformToString(),
    button: new Button({
      title: 'Войти',
    }).transformToString(),
    linkTitle: 'Нет профиля?',
  };

  return template(context);
}
