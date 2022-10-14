import * as Handlebars from 'handlebars';
import signinTemplate from './signin.tmpl';
import { Input } from '../../components/input';
import { Button } from '../../components/button';
import './signin.scss';

export function signin() {
  const template = Handlebars.compile(signinTemplate);

  const context = {
    inputs: [
      new Input({
        name: 'mail',
        placeholder: 'Почта',
        type: 'text',
        inputContainerClassName: 'signin__input-container',
        inputClassName: 'signin__input',
        required: true,
      }).transformToString(),
      new Input({
        name: 'login',
        placeholder: 'Логин',
        type: 'text',
        inputContainerClassName: 'signin__input-container',
        inputClassName: 'signin__input',
        required: true,
      }).transformToString(),
      new Input({
        name: 'name',
        placeholder: 'Имя',
        type: 'text',
        inputContainerClassName: 'signin__input-container',
        inputClassName: 'signin__input',
        required: false,
      }).transformToString(),
      new Input({
        name: 'lastName',
        placeholder: 'Фамилия',
        type: 'text',
        inputContainerClassName: 'signin__input-container',
        inputClassName: 'signin__input',
        required: false,
      }).transformToString(),
      new Input({
        name: 'phone',
        placeholder: 'Телефон',
        type: 'text',
        inputContainerClassName: 'signin__input-container',
        inputClassName: 'signin__input',
        required: false,
      }).transformToString(),
      new Input({
        name: 'password',
        placeholder: 'Пароль',
        type: 'password',
        inputContainerClassName: 'signin__input-container',
        inputClassName: 'signin__input',
        required: true,
      }).transformToString(),
      new Input({
        name: 'secondPassword',
        placeholder: 'Пароль (ещё раз)',
        type: 'password',
        required: true,
        inputContainerClassName: 'signin__input-container',
        inputClassName: 'signin__input',
        errorMessage: 'Неверный пароль',
      }).transformToString(),
    ],
    button: new Button({
      title: 'Создать профиль',
    }).transformToString(),
    linkTitle: 'Войти',
  };

  return template(context);
}
