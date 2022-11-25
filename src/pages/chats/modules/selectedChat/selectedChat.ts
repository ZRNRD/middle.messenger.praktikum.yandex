import * as Handlebars from 'handlebars';
import selectedTemplate from './selectedChat.tmpl';
import chatFormTmpl from './chat-form.tmpl';
import sendMessageFormTmpl from './sendMessageForm.tmpl';
import Input from '../../../../components/input/input';
import Button from '../../../../components/button/button';
import Form from '../../../../components/form/form';
import chatSettingsIcon from '../../../../../static/assets/icons/chat-settings.png';
import sendMessageIcon from '../../../../../static/assets/icons/send-message.png';
import addFileIcon from '../../../../../static/assets/icons/add-file.png';
import userAvatar from '../../../../../static/assets/icons/user-avatar.png';
import { ChatController } from '../../../../controllers/chat-controller';
import { UserController } from '../../../../controllers/user-controller';
import { IChatData } from '../../../../utils/interfaces';
import { Dictionary } from '../../../../utils/types';
import { Block } from '../../../../utils/Block';
import { showModal, closeModal, toggleModal } from '../../../../utils/helpers';
import { store } from '../../../../store/store';
import './selectedChat.scss';
import { createWebSocket } from '../../../../utils/websocket';
import { router } from '../../../../router';

const chatController = new ChatController();
const userController = new UserController();

const getChatData = (currentChatId: string, localStorageKey: string, valueKey: string) => {
  let value: string | string[] = valueKey === 'users' ? [] : '';
  const item = localStorage.getItem(localStorageKey);
  let chats;
  if (item) {
    try {
      chats = JSON.parse(item);
    } catch (e) {
      return e.reason;
    }
  }

  if (currentChatId && chats) {
    const chat = chats.filter((el: IChatData) => (el.id).toString() === currentChatId);
    if (chat.length > 0) {
      value = chat[0][valueKey];
    }
  }

  return value;
};
const getUserByLogin = async (login: string) => {
  const user = await userController.getUserByLogin({ login: login });
  return user;
};

const addUsersToChat = async (chatId: string) => {
  const input = document.querySelector('.new-user-input') as HTMLInputElement;
  const user = await getUserByLogin(input.value);
  const userId = user[0].id;

  console.log(userId);

  await chatController.addUser({ users: [userId], chatId: parseInt(chatId, 10) });
  store.setStateAndPersist({ usersInChats: [{ id: chatId, users: [user[0].login] }] });

  closeModal('add-user-form', '.new-user-input');
};

const deleteUsersFromChat = async (chatId: string) => {
  const input = document.querySelector('.delete-user-input') as HTMLInputElement;
  const user = await getUserByLogin(input.value);
  const userId = user[0].id;

  console.log(userId);

  await chatController.deleteUser({ users: [userId], chatId: parseInt(chatId, 10) });
  store.setStateAndPersist({ usersInChats: [{ id: chatId, users: [] }] });

  closeModal('delete-user-form', '.delete-user-input');
};

const deleteChat = async (chatId: string) => {
  await chatController.deleteChat({ chatId: parseInt(chatId, 10) });
  store.setStateAndPersist({ chatId: parseInt(chatId, 10) });

  closeModal('delete-chat-form', '');
};

const sendMessage = (socket: WebSocket) => {
  const messageInput = document.querySelector('.message__input') as HTMLInputElement;
  const message = {
    content: messageInput.value,
    type: 'message',
  };
  socket.send(JSON.stringify(message));
  messageInput.value = '';
};

const getOldMessages = (socket: WebSocket) => {
  socket.addEventListener('open', () => {
    socket.send(JSON.stringify({
      content: '0',
      type: 'get old',
    }));
  });
};

const handleMessages = (message: Dictionary | Dictionary []) => {
  const addMessage = (elem: Dictionary) => {
    if (elem?.content) {
      const userId = store.getState().user?.id;
      const messagesContainer = document.querySelector('.messages__container');
      const node = document.createElement('div');
      if (userId === elem.user_id) {
        node.className = 'message message_right';
      } else {
        node.className = 'message';
      }
      node.textContent = elem.content;
      messagesContainer!.appendChild(node);
    }
  };

  if (message instanceof Array) {
    message.reduceRight((_, elem) => addMessage(elem), null);
  } else {
    addMessage(message);
  }
};

const getTemplate = () => {
  const template = Handlebars.compile(selectedTemplate);
  const userFormTmpl = Handlebars.compile(chatFormTmpl);
  const sendMessageFormTmplate = Handlebars.compile(sendMessageFormTmpl);

  const wsParamsString = localStorage.getItem('wsParams');
  let wsParams;
  if (wsParamsString) {
    try {
      wsParams = JSON.parse(wsParamsString);
    } catch (e) {
      return e.reason;
    }
  }

  const socket = createWebSocket(wsParams, handleMessages);
  getOldMessages(socket);

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
    userButton: createUser.transformToString(),
    backButton: addUserFormClose.transformToString(),
  };

  const addUserForm = new Form({
    content: userFormTmpl(newUserContext),
  }, {
    submit: async () => {
      await addUsersToChat(currentChatId || '');
    },
  });

  const deleteUserInput = new Input({
    name: 'title',
    placeholder: 'Введите имя пользователя',
    type: 'text',
    required: true,
    dataType: 'text',
    inputClassName: 'delete-user-input',
    inputContainerClassName: 'input__container',
  });

  const deleteUser = new Button({
    title: 'Удалить пользователя',
    className: 'delete-user-button',
  }, {
    click: async () => {
      await showModal('delete-user-form');
      toggleModal('.current-chat-settings__menu');
    },
  });

  const deleteUserConfirm = new Button({
    title: 'Удалить пользователя',
    className: 'delete-user-button',
  });

  const deleteUserFormClose = new Button({
    title: 'Отмена',
    className: 'back-chat-button',
  }, {
    click: () => {
      closeModal('delete-user-form', '.delete-user-input');
    },
  });

  const deleteUserContext = {
    input: deleteUserInput.transformToString(),
    userButton: deleteUserConfirm.transformToString(),
    backButton: deleteUserFormClose.transformToString(),
  };

  const deleteUserForm = new Form({
    content: userFormTmpl(deleteUserContext),
  }, {
    submit: async () => {
      await deleteUsersFromChat(currentChatId || '');
    },
  });

  const deleteChatButton = new Button({
    title: 'Удалить чат',
    className: 'delete-chat-button',
  }, {
    click: async () => {
      await showModal('delete-chat-form');
      toggleModal('.current-chat-settings__menu');
    },
  });

  const deleteChatConfirm = new Button({
    title: 'Удалить чат',
    className: 'delete-chat-button',
  });

  const deleteChatFormClose = new Button({
    title: 'Отмена',
    className: 'back-chat-button',
  }, {
    click: () => {
      closeModal('delete-chat-form');
    },
  });

  const deleteChatContext = {
    userButton: deleteChatConfirm.transformToString(),
    backButton: deleteChatFormClose.transformToString(),
  };

  const deleteChatForm = new Form({
    content: userFormTmpl(deleteChatContext),
  }, {
    submit: async () => {
      await deleteChat(currentChatId || '');
      router.go('/notSelectedChat');
    },
  });

  const sendMessageButton = new Button({
    isLink: true,
    className: 'send-message-button',
  });

  const sendMessageFormContext = {
    addFileIcon,
    sendMessageIcon,
    messageInput: messageInput.transformToString(),
    sendMessageButton: sendMessageButton.transformToString(),
  };
  const sendMessageForm = new Form({
    inputs: [messageInput],
    buttons: { sendMessageButton },
    className: ['send-message-form'].join(''),
    content: sendMessageFormTmplate(sendMessageFormContext),
  }, {
    submit: () => {
      sendMessage(socket);
    },
  });

  const context = {
    userAvatar,
    chatSettingsIcon,
    sendMessageForm: sendMessageForm.transformToString(),
    showMenu: showMenu.transformToString(),
    addNewUser: addUser.transformToString(),
    addUserForm: addUserForm.transformToString(),
    deleteUser: deleteUser.transformToString(),
    deleteUserForm: deleteUserForm.transformToString(),
    deleteChatButton: deleteChatButton.transformToString(),
    deleteChatForm: deleteChatForm.transformToString(),
    chatTitle: getChatData(currentChatId || '', 'chats', 'title'),
    users: getChatData(currentChatId || '', 'usersInChats', 'users'),
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
