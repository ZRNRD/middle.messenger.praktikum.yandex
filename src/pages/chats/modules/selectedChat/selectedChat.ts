import * as Handlebars from 'handlebars';
import selectedTemplate from './selectedChat.tmpl';
import addUserTmpl from './add-user.tmpl';
import { Input } from '../../../../components/input/input';
import chatSettingsIcon from '../../../../../static/assets/icons/chat-settings.png';
import sendMessageIcon from '../../../../../static/assets/icons/send-message.png';
import addFileIcon from '../../../../../static/assets/icons/add-file.png';
import userAvatar from '../../../../../static/assets/icons/user-avatar.png';
import { ChatController } from '../../../../controllers/chat-controller';
import { IChatData } from '../../../../utils/interfaces';
import { Block } from '../../../../utils/Block';
import { showModal, closeModal, toggleModal } from '../../../../utils/helpers';
import { Button } from '../../../../components/button/button';
import './selectedChat.scss';

const chatController = new ChatController();

const getChatData = (currentChatId: string, localStorageKey: string, valueKey: string) => {
  let value: string | string[] = valueKey === 'users' ? [] : '';
  const item = localStorage.getItem(localStorageKey);
  let chats;
  if (item) {
    chats = JSON.parse(item);
  }

  if (currentChatId && chats) {
    const chat = chats.filter((el: IChatData) => (el.id).toString() === currentChatId);
    if (chat.length > 0) {
      value = chat[0][valueKey];
    }
  }

  return value;
};

const getTemplate = () => {
  const template = Handlebars.compile(selectedTemplate);

  const currentChatId = localStorage.getItem('currentChat');

  const messageInput = new Input({
    placeholder: 'Сообщение',
    inputClassName: ['message__input'].join(' '),
    name: 'message',
    type: 'text',
    errorMessage: 'Поле не должно быть пустым',
    dataType: 'message',
  });

  const showMenu = new Button({
    title: '',
    className: '',
  }, {
    click: async () => {
      await toggleModal('.current-chat-settings__menu');
    },
  });

  const addUser = new Button({
    title: 'Добавить пользователя',
    className: 'add-user-button',
  }, {
    click: async () => {
      await showModal('user-form');
    },
  });

  const deleteUser = new Button({
    title: 'Удалить пользователя',
    className: 'delete-user-button',
  }, {
    click: async () => {
      await showModal('user-form');
    },
  });

  const context = {
    userAvatar,
    sendMessageIcon,
    chatSettingsIcon,
    addFileIcon,
    showMenu: showMenu.transformToString(),
    addNewUser: addUser.transformToString(),
    deleteUser: deleteUser.transformToString(),
    chatTitle: getChatData(currentChatId || '', 'chats', 'title'),
    message: messageInput.transformToString(),
  };

  return template(context);
};

export class SelectedChat extends Block {
  constructor(context = {}, events = {}) {
    super(
      'div',
      {
        context: {
          ...context,
        },
        template: getTemplate(),
        events,
      },
      'current-chat-container',
    );
  }
}
