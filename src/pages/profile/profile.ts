import * as Handlebars from 'handlebars';
import profileTemplate from './profile.tmpl';
import { Input } from '../../components/input';
import userAvatar from '../../../static/assets/icons/user-avatar.png';
import { Form } from '../../components/form/form';
import { Block } from '../../utils/Block';
import './profile.scss';

/* export function profile() {
  const template = Handlebars.compile(profileTemplate);

  const context = {
    profileName: 'Name',
    userAvatar,
    inputs: [
      new Input({
        value: 'mail@yandex.ru',
        name: 'mail',
        label: 'Почта',
        type: 'text',
        required: true,
        disabled: true,
        isProfileInput: true,
        inputContainerClassName: 'profile__input-container',
        inputClassName: 'profile__input',
      }).transformToString(),
      new Input({
        value: 'login',
        name: 'login',
        label: 'Логин',
        type: 'text',
        required: true,
        disabled: true,
        isProfileInput: true,
        inputContainerClassName: 'profile__input-container',
        inputClassName: 'profile__input',
      }).transformToString(),
      new Input({
        value: 'name',
        name: 'name',
        label: 'Имя',
        type: 'text',
        required: false,
        disabled: true,
        isProfileInput: true,
        inputContainerClassName: 'profile__input-container',
        inputClassName: 'profile__input',
      }).transformToString(),
      new Input({
        value: 'surname',
        name: 'surname',
        label: 'Фамилия',
        type: 'text',
        required: false,
        disabled: true,
        isProfileInput: true,
        inputContainerClassName: 'profile__input-container',
        inputClassName: 'profile__input',
      }).transformToString(),
      new Input({
        value: 'nickname',
        name: 'nickname',
        label: 'Имя в чате',
        type: 'text',
        disabled: true,
        required: false,
        isProfileInput: true,
        inputContainerClassName: 'profile__input-container',
        inputClassName: 'profile__input',
      }).transformToString(),
      new Input({
        value: '8 (800) 555-35-35',
        name: 'phone',
        label: 'Телефон',
        type: 'text',
        required: false,
        disabled: true,
        isProfileInput: true,
        inputContainerClassName: 'profile__input-container',
        inputClassName: 'profile__input',
      }).transformToString(),

    ],
    changeData: 'Изменить данные',
    changePassword: 'Изменить пароль',
    exit: 'Выйти',
  };

  return template(context);
} */

const getTemplate = () => {
  const template = Handlebars.compile(profileTemplate);

  const mailInput = new Input({
    value: 'mail@yandex.ru',
    name: 'profileMail',
    label: 'Почта',
    type: 'text',
    required: true,
    disabled: true,
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
    disabled: true,
    isProfileInput: true,
    inputContainerClassName: 'profile__input-container',
    inputClassName: 'profile__input',
  });

  const nameInput = new Input({
    value: 'profileName',
    name: 'name',
    label: 'Имя',
    type: 'text',
    required: false,
    disabled: true,
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
    disabled: true,
    isProfileInput: true,
    inputContainerClassName: 'profile__input-container',
    inputClassName: 'profile__input',
  });

  const nicknameInput = new Input({
    value: 'nickname',
    name: 'profileNickname',
    label: 'Имя в чате',
    type: 'text',
    disabled: true,
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
    disabled: true,
    isProfileInput: true,
    inputContainerClassName: 'profile__input-container',
    inputClassName: 'profile__input',
  });

  const context = {
    inputs: [
      mailInput.transformToString(),
      loginInput.transformToString(),
      nameInput.transformToString(),
      surnameInput.transformToString(),
      nicknameInput.transformToString(),
      phoneInput.transformToString(),
    ],
    changeData: 'Изменить данные',
    changePassword: 'Изменить пароль',
    exit: 'Выйти',
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
      content: template(context),
    },
  );

  return form.transformToString();
};

export class Profile extends Block {
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
