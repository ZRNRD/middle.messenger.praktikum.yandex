import * as Handlebars from 'handlebars';
import changeProfilePasswordTemplate from './changeProfilePassword.tmpl';
import { Input } from '../../../../components/input';
import { Button } from '../../../../components/button/button';
import { Block } from '../../../../utils/Block';
import { routes } from '../../../../utils';
import { Form } from '../../../../components/form/form';
import userAvatar from '../../../../../static/assets/icons/user-avatar.png';
import './changeProfilePassword.scss';

const getTemplate = () => {
  const template = Handlebars.compile(changeProfilePasswordTemplate);

  const oldPasswordInput = new Input({
    value: 'PAROL12345',
    name: 'oldPassword',
    label: 'Старый пароль',
    type: 'password',
    required: true,
    disabled: false,
    isProfileInput: true,
    inputContainerClassName: 'password__input-container',
    inputClassName: 'password__input',
  });
  const newPasswordInput = new Input({
    value: '',
    name: 'newPassword',
    label: 'Новый пароль',
    type: 'password',
    required: true,
    disabled: false,
    isProfileInput: true,
    inputContainerClassName: 'password__input-container',
    inputClassName: 'password__input',
  });

  const newPasswordAgainInput = new Input({
    value: '',
    name: 'newPasswordAgain',
    label: 'Повторите новый пароль',
    type: 'password',
    required: true,
    disabled: false,
    isProfileInput: true,
    inputContainerClassName: 'password__input-container',
    inputClassName: 'password__input',
  });

  const saveChanges = new Button({
    title: 'Сохранить',
    className: 'password__save',
  });

  const returnBtn = new Button({
    title: 'Назад',
    className: 'password__return',
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
        window.location = routes.notSelectedChat;
        const formData = new FormData(e.target);
        console.log({
          oldPasswordInput: formData.get('oldPassword'),
          newPasswordInput: formData.get('newPassword'),
          newPasswordAgainInput: formData.get('newPasswordAgain'),
        });
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
