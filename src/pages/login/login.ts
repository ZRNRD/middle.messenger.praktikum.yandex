import * as Handlebars from 'handlebars';
import loginTemplate from './login.tmpl';
import { Input } from '../../components/input/input';
import { Button } from '../../components/button/button';
import { Block } from '../../utils/Block';
import { Form } from '../../components/form/form';
import './login.scss';

const getTemplate = () => {
  const template = Handlebars.compile(loginTemplate);

  const loginInput = new Input({
    name: 'login',
    placeholder: 'Логин',
    type: 'text',
    required: true,
    errorMessage: 'Неверный логин',
    inputContainerClassName: 'login__input-container',
    inputClassName: 'login__input',
  });

  const passwordInput = new Input({
    name: 'password',
    placeholder: 'Пароль',
    type: 'password',
    required: true,
    errorMessage: 'Неверный пароль',
    inputContainerClassName: 'login__input-container',
    inputClassName: 'login__input',
  });

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
      submit: (e: CustomEvent) => {
        console.log(e);
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
