import * as Handlebars from 'handlebars';
import loginTemplate from './login.tmpl';
import { Input } from '../../components/input/input';
import { Button } from '../../components/button/button';
import { Block } from '../../utils/Block';
import { Form } from '../../components/form/form';
import { AuthController } from '../../controllers/auth-controller';
import { ChatController } from '../../controllers/chat-controller';
import { router } from '../../router/index';
import { checkValidation, checkAllForm } from '../../utils/checkValidation';
import './login.scss';

const authController = new AuthController();
const chatController = new ChatController();

const autoLogin = async () => {
  const user = await authController.getUser();
  if (user.login) {
    router.go('/notSelectedChat');
  }
};

autoLogin();

const getTemplate = () => {
  const template = Handlebars.compile(loginTemplate);

  const loginInput = new Input(
    {
      name: 'login',
      placeholder: 'Логин',
      type: 'text',
      required: true,
      errorMessage: 'Неверный логин',
      inputContainerClassName: ['login__input-container'].join(' '),
      inputClassName: ['login__input'].join(' '),
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

  const passwordInput = new Input(
    {
      name: 'password',
      placeholder: 'Пароль',
      type: 'password',
      required: true,
      errorMessage: 'Неверный пароль',
      inputContainerClassName: ['login__input-container'].join(' '),
      inputClassName: ['login__input'].join(' '),
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
    title: 'Войти',
  });

  const context = {
    inputs: [loginInput.transformToString(), passwordInput.transformToString()],
    button: button.transformToString(),
    linkTitle: 'Нет профиля?',
  };

  const form = new Form(
    {
      inputs: [loginInput, passwordInput],
      button,
      content: template(context),
    },
    {
      submit: async (e: CustomEvent) => {
        const isError = await checkAllForm(e, authController, 'login');
        if (!isError) {
          await chatController.getAllChats();
          router.go('/notSelectedChat');
        }
      },
    },
  );

  return form.transformToString();
};

export class Login extends Block {
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
