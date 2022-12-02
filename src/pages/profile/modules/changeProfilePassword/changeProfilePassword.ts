import * as Handlebars from 'handlebars';
import changeProfilePasswordFormTemplate from './changeProfilePasswordForm.tmpl';
import changeProfileTmpl from '../../changeProfile.tmpl';
import Input from '../../../../components/input/input';
import Button from '../../../../components/button/button';
import { Block } from '../../../../utils/Block';
import { routes } from '../../../../utils';
import Form from '../../../../components/form/form';
import { userAvatar } from '../../../../utils/user-avatar';
import { checkValidation, checkAllForm } from '../../../../utils/checkValidation';
import { UserController } from '../../../../controllers/user-controller';
import { router } from '../../../../router/index';
import { getAvatar } from '../../../../utils/helpers';
import './changeProfilePassword.scss';

const getTemplate = () => {
  const template = Handlebars.compile(changeProfileTmpl);
  const formTemplate = Handlebars.compile(changeProfilePasswordFormTemplate);

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

  const oldPasswordInput = new Input(
    {
      value: '',
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

  const formContext = {
    userAvatar: getAvatar(user?.avatar) || userAvatar,
    inputs: [
      oldPasswordInput.transformToString(),
      newPasswordInput.transformToString(),
      newPasswordAgainInput.transformToString(),
    ],
    saveChanges: saveChanges.transformToString(),
  };

  const form = new Form(
    {
      inputs: [
        oldPasswordInput,
        newPasswordInput,
        newPasswordAgainInput,
      ],
      buttons: { saveChanges },
      content: formTemplate(formContext),
    },
    {
      submit: async (e: CustomEvent) => {
        checkAllForm(e, routes.profile);
        const isError = await checkAllForm(e, userController, 'changeUserPassword');
        if (!isError) {
          router.go('/profile');
        }
      },
    },
  );

  const returnButton = new Button(
    {
      title: 'Назад',
      className: ['change-profile-password__return'].join(' '),
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
