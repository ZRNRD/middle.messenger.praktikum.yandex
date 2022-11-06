import * as Handlebars from 'handlebars';
import changeProfileDataTemplate from './changeProfileData.tmpl';
import { Input } from '../../../../components/input';
import { Button } from '../../../../components/button/button';
import { Block } from '../../../../utils/Block';
import { Form } from '../../../../components/form/form';
import { routes } from '../../../../utils';
import userAvatar from '../../../../../static/assets/icons/user-avatar.png';
import { checkValidation, checkAllForm } from '../../../../utils/checkValidation';
import './changeProfileData.scss';

const getTemplate = () => {
  const template = Handlebars.compile(changeProfileDataTemplate);

  const mailInput = new Input(
    {
      value: 'mail@yandex.ru',
      name: 'profileMail',
      label: 'Почта',
      type: 'text',
      required: true,
      disabled: false,
      isProfileInput: true,
      inputContainerClassName: 'profile__input-container',
      inputClassName: 'profile__input',
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
      value: 'login123',
      name: 'profileLogin',
      label: 'Логин',
      type: 'text',
      required: true,
      disabled: false,
      isProfileInput: true,
      inputContainerClassName: 'profile__input-container',
      inputClassName: 'profile__input',
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
      value: 'ProfileName',
      name: 'profileName',
      label: 'Имя',
      type: 'text',
      required: false,
      disabled: false,
      isProfileInput: true,
      inputContainerClassName: 'profile__input-container',
      inputClassName: 'profile__input',
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

  const surnameInput = new Input(
    {
      value: 'Surname',
      name: 'profileSurname',
      label: 'Фамилия',
      type: 'text',
      required: false,
      disabled: false,
      isProfileInput: true,
      inputContainerClassName: 'profile__input-container',
      inputClassName: 'profile__input',
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

  const nicknameInput = new Input(
    {
      value: 'Nickname',
      name: 'profileNickname',
      label: 'Имя в чате',
      type: 'text',
      disabled: false,
      required: false,
      isProfileInput: true,
      inputContainerClassName: 'profile__input-container',
      inputClassName: 'profile__input',
      errorMessage: 'Недопустимый никнейм',
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

  const phoneInput = new Input(
    {
      value: '88005553535',
      name: 'profilePhone',
      label: 'Телефон',
      type: 'text',
      required: false,
      disabled: false,
      isProfileInput: true,
      inputContainerClassName: 'profile__input-container',
      inputClassName: 'profile__input',
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
        checkAllForm(e, routes.profile);
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
