import * as Handlebars from 'handlebars';
import signinTemplate from './signin.tmpl';
import { routes } from '../../utils';
import { Block } from '../../utils/Block';
import { Form } from '../../components/form/form';
import { Input } from '../../components/input';
import { Button } from '../../components/button';
import { checkValidation, checkAllForm } from '../../utils/checkValidation';
import { AuthController } from '../../controllers/auth-controller';
import { router } from '../../router/index';
import './signin.scss';

const controller = new AuthController();

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
      errorMessage: 'Недопустимая почта',
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
      errorMessage: 'Недопустимый логин',
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
      errorMessage: 'Недопустимое имя',
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
      errorMessage: 'Недопустимая фамилия',
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
      errorMessage: 'Недопустимый номер телефона',
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
      inputClassName: ['signin__input'].join(' '),
      required: true,
      errorMessage: 'Недопустимый пароль',
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
      submit: async (e: CustomEvent) => {
        const isError = await checkAllForm(e, controller, 'signUp');
        if (!isError) {
          router.go('/notSelectedChat');
        } else {
          console.warn(isError);
        }
        /* const formData = new FormData(e.target);
        console.log({
          mailInput: formData.get('email'),
          loginInput: formData.get('login'),
          nameInput: formData.get('first_name'),
          lastNameInput: formData.get('second_name'),
          phoneInput: formData.get('phone'),
          passwordInput: formData.get('password'),
          secondPasswordInput: formData.get('password'),
        }); */
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
