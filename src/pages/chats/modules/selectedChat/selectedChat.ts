import * as Handlebars from 'handlebars';
import selectedTemplate from './selectedChat.tmpl';
import addUserTmpl from './add-user.tmpl';
import { Input } from '../../../../components/input/input';
import { Button } from '../../../../components/button/button';
import { Form } from '../../../../components/form/form';
import chatSettingsIcon from '../../../../../static/assets/icons/chat-settings.png';
import sendMessageIcon from '../../../../../static/assets/icons/send-message.png';
import addFileIcon from '../../../../../static/assets/icons/add-file.png';
import userAvatar from '../../../../../static/assets/icons/user-avatar.png';
import { ChatController } from '../../../../controllers/chat-controller';
import { IChatData } from '../../../../utils/interfaces';
import { Block } from '../../../../utils/Block';
import { showModal, closeModal, toggleModal } from '../../../../utils/helpers';
import { store } from '../../../../store/store';
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

const addUsersToChat = async (chatId: string) => {
  const input = document.querySelector('.new-user-input') as HTMLInputElement;
  const users = input.value.split(',');

  await chatController.addUser({ users, chatId: parseInt(chatId, 10) });
  store.setStateAndPersist({ usersInChats: [{ id: chatId, users }] });

  closeModal('add-user-form', '.new-user-input');
};

const getTemplate = () => {
  const template = Handlebars.compile(selectedTemplate);
  const addNewUserTmpl = Handlebars.compile(addUserTmpl);

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
      await showModal('add-user-form');
      toggleModal('.current-chat-settings__menu');
    },
  });

  const createUser = new Button({
    title: 'Добавить',
    className: 'create-user-button',
  });

  const addUserFormClose = new Button({
    title: 'Отмена',
    className: 'back-chat-button',
  }, {
    click: () => {
      closeModal('add-user-form', '.new-user-input');
    },
  });

  const chatUserInput = new Input({
    name: 'title',
    placeholder: 'Введите имя пользователя',
    type: 'text',
    required: true,
    dataType: 'text',
    inputClassName: 'new-user-input',
    inputContainerClassName: 'input__container',
  });

  const newUserContext = {
    input: chatUserInput.transformToString(),
    createUser: createUser.transformToString(),
    backButton: addUserFormClose.transformToString(),
  };

  const addUserForm = new Form(
    {
      inputs: [chatUserInput],
      button: addUser,
      content: addNewUserTmpl(newUserContext),
    }, {
      submit: async () => {
        await addUsersToChat(currentChatId || '');
      },
    },
  );

  const deleteUser = new Button({
    title: 'Удалить пользователя',
    className: 'delete-user-button',
  }, {
    click: async () => {
      await showModal('user-form');
    },
  });

  const deleteChat = new Button({
    title: 'Удалить чат',
    className: 'delete-chat-button',
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
    addUserForm: addUserForm.transformToString(),
    deleteUser: deleteUser.transformToString(),
    deleteChat: deleteChat.transformToString(),
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
