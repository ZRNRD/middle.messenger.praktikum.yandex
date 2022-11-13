import * as Handlebars from 'handlebars';
import changeProfilePasswordTemplate from './changeProfilePassword.tmpl';
import { Input } from '../../../../components/input';
import { Button } from '../../../../components/button/button';
import { Block } from '../../../../utils/Block';
import { routes } from '../../../../utils';
import { Form } from '../../../../components/form/form';
import userAvatar from '../../../../../static/assets/icons/user-avatar.png';
import { checkValidation, checkAllForm } from '../../../../utils/checkValidation';
import './changeProfilePassword.scss';

const getTemplate = () => {
  const template = Handlebars.compile(changeProfilePasswordTemplate);

  const oldPasswordInput = new Input(
    {
      value: 'PAROL12345',
      name: 'oldPassword',
      label: 'Старый пароль',
      type: 'password',
      required: true,
      disabled: false,
      isProfileInput: true,
      inputContainerClassName: ['password__input-container'].join(' '),
      inputClassName: ['password__input'].join(' '),
      errorMessage: 'Введите старый пароль',
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

  const newPasswordInput = new Input(
    {
      value: '',
      name: 'newPassword',
      label: 'Новый пароль',
      type: 'password',
      required: true,
      disabled: false,
      isProfileInput: true,
      inputContainerClassName: ['password__input-container'].join(' '),
      inputClassName: ['password__input'].join(' '),
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

  const newPasswordAgainInput = new Input(
    {
      value: '',
      name: 'newPasswordAgain',
      label: 'Повторите новый пароль',
      type: 'password',
      required: true,
      disabled: false,
      isProfileInput: true,
      inputContainerClassName: ['password__input-container'].join(' '),
      inputClassName: ['password__input'].join(' '),
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

  const saveChanges = new Button({
    title: 'Сохранить',
    className: ['password__save'].join(' '),
  });

  const returnBtn = new Button({
    title: 'Назад',
    className: ['password__return'].join(' '),
  });

  const context = {
    profileName: 'Name',
    userAvatar,
    inputs: [
      oldPasswordInput.transformToString(),
      newPasswordInput.transformToString(),
      newPasswordAgainInput.transformToString(),
    ],
    saveChanges: saveChanges.transformToString(),
    return: returnBtn.transformToString(),
  };

  const form = new Form(
    {
      inputs: [
        oldPasswordInput,
        newPasswordInput,
        newPasswordAgainInput,
      ],
      saveChanges,
      returnBtn,
      content: template(context),
    },
    {
      submit: (e: CustomEvent) => {
        checkAllForm(e, routes.profile);
      },
    },
  );

  return form.transformToString();
};

export class ChangeProfilePassword extends Block {
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
