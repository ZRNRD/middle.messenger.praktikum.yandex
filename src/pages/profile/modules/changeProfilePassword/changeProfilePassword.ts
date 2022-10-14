import * as Handlebars from 'handlebars';
import changeProfilePasswordTemplate from './changeProfilePassword.tmpl';
import { Input } from '../../../../components/input';
import { Button } from '../../../../components/button/button';
import userAvatar from '../../../../../static/assets/icons/user-avatar.png';
import './changeProfilePassword.scss';

export function changeProfilePassword() {
  const template = Handlebars.compile(changeProfilePasswordTemplate);

  const context = {
    userAvatar,
    inputs: [
      new Input({
        value: 'PAROL12345',
        name: 'oldPassword',
        label: 'Старый пароль',
        type: 'password',
        required: true,
        disabled: false,
        isProfileInput: true,
        inputContainerClassName: 'password__input-container',
        inputClassName: 'password__input',
      }).transformToString(),
      new Input({
        value: '',
        name: 'newPassword',
        label: 'Новый пароль',
        type: 'password',
        required: true,
        disabled: false,
        isProfileInput: true,
        inputContainerClassName: 'password__input-container',
        inputClassName: 'password__input',
      }).transformToString(),
      new Input({
        value: '',
        name: 'newPasswordAgain',
        label: 'Повторите новый пароль',
        type: 'password',
        required: true,
        disabled: false,
        isProfileInput: true,
        inputContainerClassName: 'password__input-container',
        inputClassName: 'password__input',
      }).transformToString(),
    ],
    saveChanges: new Button({
      title: 'Сохранить',
    }).transformToString(),
    return: new Button({
      title: 'Назад',
    }).transformToString(),
  };

  return template(context);
}
