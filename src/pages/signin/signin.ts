import * as Handlebars from 'handlebars';
import signinTemplate from './signin.tmpl';
import { Block } from '../../utils/Block';
import Form from '../../components/form/form';
import Input from '../../components/input/input';
import Button from '../../components/button/button';
import { checkValidation, checkAllForm } from '../../utils/checkValidation';
import { AuthController } from '../../controllers/auth-controller';
import { ChatController } from '../../controllers/chat-controller';
import { router } from '../../router/index';
import './signin.scss';

const authController = new AuthController();
const chatController = new ChatController();

const getTemplate = () => {
  const template = Handlebars.compile(signinTemplate);

  const mailInput = new Input(
    {
      name: 'email',
      placeholder: 'Почта',
      type: 'text',
      inputContainerClassName: ['signin__input-container'].join(' '),
      inputClassName: ['signin__input'].join(' '),
      required: true,
      errorMessage: 'Латиница, может включать цифры и спецсимволы вроде дефиса, обязательно должна быть «собака» (@) и точка после неё, но перед точкой обязательно должны быть буквы',
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
      name: 'login',
      placeholder: 'Логин',
      type: 'text',
      inputContainerClassName: ['signin__input-container'].join(' '),
      inputClassName: ['signin__input'].join(' '),
      required: true,
      errorMessage: 'от 3 до 20 символов, латиница, может содержать цифры, но не состоять из них, без пробелов, без спецсимволов (допустимы дефис и нижнее подчёркивание).',
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
      name: 'first_name',
      placeholder: 'Имя',
      type: 'text',
      inputContainerClassName: ['signin__input-container'].join(' '),
      inputClassName: ['signin__input'].join(' '),
      required: false,
      errorMessage: 'Латиница или кириллица, первая буква должна быть заглавной, без пробелов и без цифр, нет спецсимволов (допустим только дефис).',
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
      name: 'second_name',
      placeholder: 'Фамилия',
      type: 'text',
      inputContainerClassName: ['signin__input-container'].join(' '),
      inputClassName: ['signin__input'].join(' '),
      required: false,
      errorMessage: 'латиница или кириллица, первая буква должна быть заглавной, без пробелов и без цифр, нет спецсимволов (допустим только дефис).',
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
      name: 'phone',
      placeholder: 'Телефон',
      type: 'text',
      inputContainerClassName: ['signin__input-container'].join(' '),
      inputClassName: ['signin__input'].join(' '),
      required: false,
      errorMessage: 'От 10 до 15 символов, состоит из цифр, ',
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
      name: 'password',
      placeholder: 'Пароль',
      type: 'password',
      inputContainerClassName: ['signin__input-container'].join(' '),
      inputClassName: ['signin__input', 'signin__password'].join(' '),
      required: true,
      errorMessage: 'От 8 до 40 символов, обязательно хотя бы одна заглавная буква и цифра',
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
      name: 'password',
      placeholder: 'Пароль (ещё раз)',
      type: 'password',
      required: true,
      inputContainerClassName: ['signin__input-container'].join(' '),
      inputClassName: ['signin__input'].join(' '),
      errorMessage: 'Пароли должны совпадать',
      dataType: 'secondPassword',
    },
    {
      focus: (event: Event) => {
        checkValidation({ event }, 'signin__password');
      },
      blur: (event: Event) => {
        checkValidation({ event }, 'signin__password');
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
      buttons: { button },
      content: template(context),
    },
    {
      submit: async (e: CustomEvent) => {
        const isError = await checkAllForm(e, authController, 'signUp');
        if (!isError) {
          await chatController.getAllChats();
          router.go('/notSelectedChat');
        }
        await chatController.getAllChats();
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
