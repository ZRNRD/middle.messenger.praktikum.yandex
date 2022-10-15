import * as Handlebars from 'handlebars';
import changeProfileDataTemplate from './changeProfileData.tmpl';
import { Input } from '../../../../components/input';
import { Button } from '../../../../components/button/button';
import { Block } from '../../../../utils/Block';
import { Form } from '../../../../components/form/form';
import { routes } from '../../../../utils';
import userAvatar from '../../../../../static/assets/icons/user-avatar.png';
import './changeProfileData.scss';

/* export function changeProfileData() {
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
} */

const getTemplate = () => {
  const template = Handlebars.compile(changeProfileDataTemplate);

  const mailInput = new Input({
    value: 'mail@yandex.ru',
    name: 'profileMail',
    label: 'Почта',
    type: 'text',
    required: true,
    disabled: false,
    isProfileInput: true,
    inputContainerClassName: 'profile__input-container',
    inputClassName: 'profile__input',
  });

  const loginInput = new Input({
    value: 'login',
    name: 'profileLogin',
    label: 'Логин',
    type: 'text',
    required: true,
    disabled: false,
    isProfileInput: true,
    inputContainerClassName: 'profile__input-container',
    inputClassName: 'profile__input',
  });

  const nameInput = new Input({
    value: 'profileName',
    name: 'profileName',
    label: 'Имя',
    type: 'text',
    required: false,
    disabled: false,
    isProfileInput: true,
    inputContainerClassName: 'profile__input-container',
    inputClassName: 'profile__input',
  });

  const surnameInput = new Input({
    value: 'surname',
    name: 'profileSurname',
    label: 'Фамилия',
    type: 'text',
    required: false,
    disabled: false,
    isProfileInput: true,
    inputContainerClassName: 'profile__input-container',
    inputClassName: 'profile__input',
  });

  const nicknameInput = new Input({
    value: 'nickname',
    name: 'profileNickname',
    label: 'Имя в чате',
    type: 'text',
    disabled: false,
    required: false,
    isProfileInput: true,
    inputContainerClassName: 'profile__input-container',
    inputClassName: 'profile__input',
  });

  const phoneInput = new Input({
    value: '8 (800) 555-35-35',
    name: 'profilePhone',
    label: 'Телефон',
    type: 'text',
    required: false,
    disabled: false,
    isProfileInput: true,
    inputContainerClassName: 'profile__input-container',
    inputClassName: 'profile__input',
  });

  const saveChanges = new Button({
    title: 'Сохранить',
    className: 'change-profile-data__save',
  });

  const returnBtn = new Button({
    title: 'Назад',
    className: 'change-profile-data__return',
  });

  const context = {
    profileName: 'Name',
    userAvatar,
    inputs: [
      mailInput.transformToString(),
      loginInput.transformToString(),
      nameInput.transformToString(),
      surnameInput.transformToString(),
      nicknameInput.transformToString(),
      phoneInput.transformToString(),
    ],
    saveChanges: saveChanges.transformToString(),
    return: returnBtn.transformToString(),
  };

  const form = new Form(
    {
      inputs: [
        mailInput,
        loginInput,
        nameInput,
        surnameInput,
        nicknameInput,
        phoneInput,
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
          mailInput: formData.get('profileMail'),
          loginInput: formData.get('profileLogin'),
          nameInput: formData.get('profileName'),
          surnameInput: formData.get('profileSurname'),
          nicknameInput: formData.get('profileNickname'),
          phoneInput: formData.get('profilePhone'),
        });
      },
    },
  );

  return form.transformToString();
};

export class ChangeProfileData extends Block {
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
