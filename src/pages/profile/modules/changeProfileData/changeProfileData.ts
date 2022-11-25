import * as Handlebars from 'handlebars';
import changeProfileDataFormTemplate from './changeProfileDataForm.tmpl';
import changeProfileTmpl from '../../changeProfile.tmpl';
import Input from '../../../../components/input/input';
import Button from '../../../../components/button/button';
import { Block } from '../../../../utils/Block';
import Form from '../../../../components/form/form';
import { routes } from '../../../../utils';
import userAvatar from '../../../../../static/assets/icons/user-avatar.png';
import { UserController } from '../../../../controllers/user-controller';
import { checkValidation, checkAllForm } from '../../../../utils/checkValidation';
import { router } from '../../../../router/index';
import { getAvatar } from '../../../../utils/helpers';
import './changeProfileData.scss';

const getTemplate = () => {
  const template = Handlebars.compile(changeProfileTmpl);
  const formTemplate = Handlebars.compile(changeProfileDataFormTemplate);

  const userController = new UserController();

  const item = localStorage.getItem('user');
  let user;
  if (item) {
    try {
      user = JSON.parse(item);
    } catch (e) {
      return e.reason;
    }
  }

  const avatartInput = new Input(
    {
      value: user?.avatar || '',
      name: 'avatar',
      label: '',
      type: 'file',
      required: false,
      disabled: false,
      isProfileInput: true,
      inputContainerClassName: ['profile__input-container', 'avatar-input'].join(' '),
      inputClassName: ['profile__input'].join(' '),
      errorMessage: 'Ошибка, попробуйте ещё раз',
      dataType: 'avatar',
    },
    {
      change: async (e: CustomEvent) => {
        const input = e.target as HTMLInputElement;

        if (input) {
          const image = document.getElementById('avatar') as HTMLImageElement;
          const file = input.files?.[0];
          if (file && image) {
            await userController.changeUserAvatar(file, image);
          }
        }
      }
    },
  );

  const mailInput = new Input(
    {
      value: user?.email || '',
      name: 'email',
      label: 'Почта',
      type: 'text',
      required: true,
      disabled: false,
      isProfileInput: true,
      inputContainerClassName: ['profile__input-container'].join(' '),
      inputClassName: ['profile__input'].join(' '),
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
      value: user?.login || '',
      name: 'login',
      label: 'Логин',
      type: 'text',
      required: true,
      disabled: false,
      isProfileInput: true,
      inputContainerClassName: ['profile__input-container'].join(' '),
      inputClassName: ['profile__input'].join(' '),
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
      value: user?.first_name || '',
      name: 'first_name',
      label: 'Имя',
      type: 'text',
      required: false,
      disabled: false,
      isProfileInput: true,
      inputContainerClassName: ['profile__input-container'].join(' '),
      inputClassName: ['profile__input'].join(' '),
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
      value: user?.second_name || '',
      name: 'second_name',
      label: 'Фамилия',
      type: 'text',
      required: false,
      disabled: false,
      isProfileInput: true,
      inputContainerClassName: ['profile__input-container'].join(' '),
      inputClassName: ['profile__input'].join(' '),
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
      value: user?.display_name || '',
      name: 'display_name',
      label: 'Имя в чате',
      type: 'text',
      disabled: false,
      required: false,
      isProfileInput: true,
      inputContainerClassName: ['profile__input-container'].join(' '),
      inputClassName: ['profile__input'].join(' '),
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
      value: user?.phone || '',
      name: 'phone',
      label: 'Телефон',
      type: 'text',
      required: false,
      disabled: false,
      isProfileInput: true,
      inputContainerClassName: ['profile__input-container'].join(' '),
      inputClassName: ['profile__input'].join(' '),
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
    className: ['change-profile-data__save'].join(' '),
  });

  const formContext = {
    profileName: 'Name',
    userAvatar: getAvatar(user?.avatar) || userAvatar,
    avatartInput: avatartInput.transformToString(),
    inputs: [
      mailInput.transformToString(),
      loginInput.transformToString(),
      nameInput.transformToString(),
      surnameInput.transformToString(),
      nicknameInput.transformToString(),
      phoneInput.transformToString(),
    ],
    saveChanges: saveChanges.transformToString(),
  };
  const form = new Form(
    {
      inputs: [
        avatartInput,
        mailInput,
        loginInput,
        nameInput,
        surnameInput,
        nicknameInput,
        phoneInput,
      ],
      buttons: { saveChanges },
      content: formTemplate(formContext),
    },
    {
      submit: async (e: CustomEvent) => {
        checkAllForm(e, routes.profile);
        const isError = await checkAllForm(e, userController, 'changeUserProfile');
        if (!isError) {
          router.go('/profile');
        }
      },
    },
  );

  const returnButton = new Button(
    {
      title: 'Назад',
      className: ['change-profile-data__return'].join(' '),
    },
    {
      click: () => {
        router.go('/profile');
      },
    },
  );

  const context = {
    form: form.transformToString(),
    returnButton: returnButton.transformToString(),
  };

  return template(context);
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
