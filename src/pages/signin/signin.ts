import * as Handlebars from 'handlebars';
import signinTemplate from './signin.tmpl';
import { routes } from '../../utils';
import { Block } from '../../utils/Block';
import { Form } from '../../components/form/form';
import { Input } from '../../components/input';
import { Button } from '../../components/button';
import './signin.scss';

/* export function signin() {
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
} */

const getTemplate = () => {
  const template = Handlebars.compile(signinTemplate);

  const mailInput = new Input({
    name: 'signinMail',
    placeholder: 'Почта',
    type: 'text',
    inputContainerClassName: 'signin__input-container',
    inputClassName: 'signin__input',
    required: true,
  });

  const loginInput = new Input({
    name: 'signinLogin',
    placeholder: 'Логин',
    type: 'text',
    inputContainerClassName: 'signin__input-container',
    inputClassName: 'signin__input',
    required: true,
  });

  const nameInput = new Input({
    name: 'signinName',
    placeholder: 'Имя',
    type: 'text',
    inputContainerClassName: 'signin__input-container',
    inputClassName: 'signin__input',
    required: false,
  });

  const lastNameInput = new Input({
    name: 'signinLastName',
    placeholder: 'Фамилия',
    type: 'text',
    inputContainerClassName: 'signin__input-container',
    inputClassName: 'signin__input',
    required: false,
  });

  const phoneInput = new Input({
    name: 'signinPhone',
    placeholder: 'Телефон',
    type: 'text',
    inputContainerClassName: 'signin__input-container',
    inputClassName: 'signin__input',
    required: false,
  });

  const passwordInput = new Input({
    name: 'signinPassword',
    placeholder: 'Пароль',
    type: 'password',
    inputContainerClassName: 'signin__input-container',
    inputClassName: 'signin__input',
    required: true,
  });

  const secondPasswordInput = new Input({
    name: 'signinSecondPassword',
    placeholder: 'Пароль (ещё раз)',
    type: 'password',
    required: true,
    inputContainerClassName: 'signin__input-container',
    inputClassName: 'signin__input',
    errorMessage: 'Неверный пароль',
  });

  const button = new Button({
    title: 'Создать профиль',
  });

  const context = {
    inputs: [
      mailInput.transformToString(),
      loginInput.transformToString(),
      nameInput.transformToString(),
      lastNameInput.transformToString(),
      phoneInput.transformToString(),
      passwordInput.transformToString(),
      secondPasswordInput.transformToString(),
    ],
    button: button.transformToString(),
    linkTitle: 'Войти',
  };

  const form = new Form(
    {
      inputs: [
        mailInput,
        loginInput,
        nameInput,
        lastNameInput,
        phoneInput,
        passwordInput,
        secondPasswordInput,
      ],
      button,
      content: template(context),
    },
    {
      submit: (e: CustomEvent) => {
        window.location = routes.notSelectedChat;
        const formData = new FormData(e.target);
        console.log({
          mailInput: formData.get('signinMail'),
          loginInput: formData.get('signinLogin'),
          nameInput: formData.get('signinName'),
          lastNameInput: formData.get('signinLastName'),
          phoneInput: formData.get('signinPhone'),
          passwordInput: formData.get('signinPassword'),
          secondPasswordInput: formData.get('signinSecondPassword'),
        });
      },
    },
  );

  return form.transformToString();
};

export class Signin extends Block {
  constructor(context = {}, events = {}) {
    super('div', {
      context: {
        ...context,
      },
      template: getTemplate(),
      events,
    });
  }
}
