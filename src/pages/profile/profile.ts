import * as Handlebars from 'handlebars';
import profileTemplate from './profile.tmpl';
import { Input } from '../../components/input';
import { Button } from '../../components/button/button';
import userAvatar from '../../../static/assets/icons/user-avatar.png';
import { Block } from '../../utils/Block';
import { AuthController } from '../../controllers/auth-controller';
import { router } from '../../router/index';
import { getAvatar } from '../../utils/helpers';
import './profile.scss';

const authController = new AuthController();

const getTemplate = () => {
  const template = Handlebars.compile(profileTemplate);

  const item = localStorage.getItem('user');
  let user;
  if (item) {
    try {
      user = JSON.parse(item);
    } catch (e) {
      return e.reason;
    }
  }

  const mailInput = new Input({
    value: user?.email || '',
    name: 'email',
    label: 'Почта',
    type: 'text',
    required: true,
    disabled: true,
    isProfileInput: true,
    inputContainerClassName: ['profile__input-container'].join(' '),
    inputClassName: ['profile__input'].join(' '),
  });

  const loginInput = new Input({
    value: user?.login || '',
    name: 'login',
    label: 'Логин',
    type: 'text',
    required: true,
    disabled: true,
    isProfileInput: true,
    inputContainerClassName: ['profile__input-container'].join(' '),
    inputClassName: ['profile__input'].join(' '),
  });

  const nameInput = new Input({
    value: user?.first_name || '',
    name: 'name',
    label: 'Имя',
    type: 'text',
    required: false,
    disabled: true,
    isProfileInput: true,
    inputContainerClassName: ['profile__input-container'].join(' '),
    inputClassName: ['profile__input'].join(' '),
  });

  const surnameInput = new Input({
    value: user?.second_name || '',
    name: 'second_name',
    label: 'Фамилия',
    type: 'text',
    required: false,
    disabled: true,
    isProfileInput: true,
    inputContainerClassName: ['profile__input-container'].join(' '),
    inputClassName: ['profile__input'].join(' '),
  });

  const nicknameInput = new Input({
    value: user?.display_name || '',
    name: 'display_name',
    label: 'Имя в чате',
    type: 'text',
    disabled: true,
    required: false,
    isProfileInput: true,
    inputContainerClassName: ['profile__input-container'].join(' '),
    inputClassName: ['profile__input'].join(' '),
  });

  const phoneInput = new Input({
    value: user?.phone || '',
    name: 'phone',
    label: 'Телефон',
    type: 'text',
    required: false,
    disabled: true,
    isProfileInput: true,
    inputContainerClassName: ['profile__input-container'].join(' '),
    inputClassName: ['profile__input'].join(' '),
  });

  const returnButton = new Button(
    {
      title: 'Назад к чатам',
      className: ['return-to-chats'].join(' '),
    },
    {
      click: () => {
        router.go('/notSelectedChat');
      },
    },
  );

  const logoutButton = new Button(
    {
      title: 'Выйти из аккаунта',
      className: ['logout-button'].join(' '),
    },
    {
      click: async () => {
        await authController.logOut();
        router.go('/');
      },
    },
  );

  const context = {
    profileName: user?.display_name || '',
    userAvatar: getAvatar(user?.avatar) || userAvatar,
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
    returnButton: returnButton.transformToString(),
    logout: logoutButton.transformToString(),
  };

  return template(context);
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
