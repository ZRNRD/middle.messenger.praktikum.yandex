import * as Handlebars from 'handlebars';
import signinTemplate from './signin.tmpl';
import { routes } from '../../utils';
import { Block } from '../../utils/Block';
import { Form } from '../../components/form/form';
import { Input } from '../../components/input';
import { Button } from '../../components/button';
import { checkValidation, checkAllForm } from '../../utils/checkValidation';
import './signin.scss';

const getTemplate = () => {
  const template = Handlebars.compile(signinTemplate);

  const mailInput = new Input(
    {
      name: 'signinMail',
      placeholder: 'Почта',
      type: 'text',
      inputContainerClassName: 'signin__input-container',
      inputClassName: 'signin__input',
      required: true,
      errorMessage: 'Неверная почта',
      dataType: 'email',
    },
    {
      focus: (event: Event) => {
        checkValidation({ event });
      },
      blur: (event: Event) => {
        checkValidation({ event });
      },
    },
  );

  const loginInput = new Input(
    {
      name: 'signinLogin',
      placeholder: 'Логин',
      type: 'text',
      inputContainerClassName: 'signin__input-container',
      inputClassName: 'signin__input',
      required: true,
      errorMessage: 'Неверный логин',
      dataType: 'login',
    },
    {
      focus: (event: Event) => {
        checkValidation({ event });
      },
      blur: (event: Event) => {
        checkValidation({ event });
      },
    },
  );

  const nameInput = new Input(
    {
      name: 'signinName',
      placeholder: 'Имя',
      type: 'text',
      inputContainerClassName: 'signin__input-container',
      inputClassName: 'signin__input',
      required: false,
      errorMessage: 'Неверное имя',
      dataType: 'name',
    },
    {
      focus: (event: Event) => {
        checkValidation({ event });
      },
      blur: (event: Event) => {
        checkValidation({ event });
      },
    },
  );

  const lastNameInput = new Input(
    {
      name: 'signinLastName',
      placeholder: 'Фамилия',
      type: 'text',
      inputContainerClassName: 'signin__input-container',
      inputClassName: 'signin__input',
      required: false,
      errorMessage: 'Неверная фамилия',
      dataType: 'name',
    },
    {
      focus: (event: Event) => {
        checkValidation({ event });
      },
      blur: (event: Event) => {
        checkValidation({ event });
      },
    },
  );

  const phoneInput = new Input(
    {
      name: 'signinPhone',
      placeholder: 'Телефон',
      type: 'text',
      inputContainerClassName: 'signin__input-container',
      inputClassName: 'signin__input',
      required: false,
      errorMessage: 'Неверный номер телефона',
      dataType: 'phone',
    },
    {
      focus: (event: Event) => {
        checkValidation({ event });
      },
      blur: (event: Event) => {
        checkValidation({ event });
      },
    },
  );

  const passwordInput = new Input(
    {
      name: 'signinPassword',
      placeholder: 'Пароль',
      type: 'password',
      inputContainerClassName: 'signin__input-container',
      inputClassName: 'signin__input',
      required: true,
      errorMessage: 'Неверный пароль',
      dataType: 'password',
    },
    {
      focus: (event: Event) => {
        checkValidation({ event });
      },
      blur: (event: Event) => {
        checkValidation({ event });
      },
    },
  );

  const secondPasswordInput = new Input(
    {
      name: 'signinSecondPassword',
      placeholder: 'Пароль (ещё раз)',
      type: 'password',
      required: true,
      inputContainerClassName: 'signin__input-container',
      inputClassName: 'signin__input',
      errorMessage: 'Пароли не совпадают',
      dataType: 'password',
    },
    {
      focus: (event: Event) => {
        checkValidation({ event });
      },
      blur: (event: Event) => {
        checkValidation({ event });
      },
    },
  );

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
        checkAllForm(e, routes.notSelectedChat);
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
