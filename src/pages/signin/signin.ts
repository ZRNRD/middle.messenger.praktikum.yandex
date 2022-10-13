import * as Handlebars from 'handlebars';
import signinTemplate from './signin.tmpl';
import { Input } from '../../components/input';
import { Button } from '../../components/button';
import './signin.scss';

export function signin() {
  const template = Handlebars.compile(signinTemplate);

  const context = {
    inputs: [
      Input({
        name: 'mail',
        placeholder: 'Почта',
        type: 'text',
        inputContainerClassName: 'signin__input-container',
        inputClassName: 'signin__input',
        required: true,
      }),
      Input({
        name: 'login',
        placeholder: 'Логин',
        type: 'text',
        inputContainerClassName: 'signin__input-container',
        inputClassName: 'signin__input',
        required: true,
      }),
      Input({
        name: 'name',
        placeholder: 'Имя',
        type: 'text',
        inputContainerClassName: 'signin__input-container',
        inputClassName: 'signin__input',
        required: false,
      }),
      Input({
        name: 'lastName',
        placeholder: 'Фамилия',
        type: 'text',
        inputContainerClassName: 'signin__input-container',
        inputClassName: 'signin__input',
        required: false,
      }),
      Input({
        name: 'phone',
        placeholder: 'Телефон',
        type: 'text',
        inputContainerClassName: 'signin__input-container',
        inputClassName: 'signin__input',
        required: false,
      }),
      Input({
        name: 'password',
        placeholder: 'Пароль',
        type: 'password',
        inputContainerClassName: 'signin__input-container',
        inputClassName: 'signin__input',
        required: true,
      }),
      Input({
        name: 'secondPassword',
        placeholder: 'Пароль (ещё раз)',
        type: 'password',
        required: true,
        inputContainerClassName: 'signin__input-container',
        inputClassName: 'signin__input',
        errorMessage: 'Неверный пароль',
      }),
    ],
    button: Button({
      title: 'Создать профиль',
    }),
    linkTitle: 'Войти',
  };

  return template(context);
}
