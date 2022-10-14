import * as Handlebars from 'handlebars';
import changeProfileDataTemplate from './changeProfileData.tmpl';
import { Input } from '../../../../components/input';
import { Button } from '../../../../components/button/button';
import userAvatar from '../../../../../static/assets/icons/user-avatar.png';
import './changeProfileData.scss';

export function changeProfileData() {
  const template = Handlebars.compile(changeProfileDataTemplate);

  const context = {
    userAvatar,
    inputs: [
      new Input({
        value: 'mail@yandex.ru',
        name: 'mail',
        label: 'Почта',
        type: 'text',
        required: true,
        disabled: false,
        isProfileInput: true,
        inputContainerClassName: 'change-profile-data__input-container',
        inputClassName: 'change-profile-data__input',
      }).transformToString(),
      new Input({
        value: 'login',
        name: 'login',
        label: 'Логин',
        type: 'text',
        required: true,
        disabled: false,
        isProfileInput: true,
        inputContainerClassName: 'change-profile-data__input-container',
        inputClassName: 'change-profile-data__input',
      }).transformToString(),
      new Input({
        value: 'name',
        name: 'name',
        label: 'Имя',
        type: 'text',
        required: false,
        disabled: false,
        isProfileInput: true,
        inputContainerClassName: 'change-profile-data__input-container',
        inputClassName: 'change-profile-data__input',
      }).transformToString(),
      new Input({
        value: 'surname',
        name: 'surname',
        label: 'Фамилия',
        type: 'text',
        required: false,
        disabled: false,
        isProfileInput: true,
        inputContainerClassName: 'change-profile-data__input-container',
        inputClassName: 'change-profile-data__input',
      }).transformToString(),
      new Input({
        value: 'nickname',
        name: 'nickname',
        label: 'Имя в чате',
        type: 'text',
        disabled: false,
        isProfileInput: true,
        inputContainerClassName: 'change-profile-data__input-container',
        inputClassName: 'change-profile-data__input',
      }).transformToString(),
      new Input({
        value: '8 (800) 555-35-35',
        name: 'phone',
        label: 'Телефон',
        type: 'text',
        required: false,
        disabled: false,
        isProfileInput: true,
        inputContainerClassName: 'change-profile-data__input-container',
        inputClassName: 'change-profile-data__input',
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
