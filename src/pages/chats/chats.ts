import * as Handlebars from 'handlebars';
import chatsTemplate from './chats.tmpl';
import newChatTmpl from './new-chat.tmpl';
import chatElemTmpl from './chat-elem.tmpl';
import { SelectedChat } from './modules/selectedChat/selectedChat';
import { NotSelectedChat } from './modules/notSelectedChat/notSelectedChat';
import { Input } from '../../components/input';
import userAvatar from '../../../static/assets/icons/user-avatar.png';
import { Block } from '../../utils/Block';
import { ChatController } from '../../controllers/chat-controller';
import { TChatPage } from '../../utils/types';
import { showModal, closeModal, getAvatar } from '../../utils/helpers';
import { Button } from '../../components/button/button';
import { Form } from '../../components/form/form';
import { router } from '../../router/index';
import { store } from '../../store/store';
import { IChatData } from '../../utils/interfaces';
import './chats.scss';

const chatController = new ChatController();

const getChats = async () => {
  await chatController.getAllChats();
};

getChats();

const createNewChat = async () => {
  const input = document.querySelector('.new-chat-input') as HTMLInputElement;
  const title = input.value;
  await chatController.createChat({ title });
  closeModal('chat-form', '.new-chat-input');
  router.go('/notSelectedChat');
};

const getTemplate = (isChatSelected?: boolean) => {
  const template = Handlebars.compile(chatsTemplate);
  const newChatTemplate = Handlebars.compile(newChatTmpl);
  const chatElemTemplate = Handlebars.compile(chatElemTmpl);

  const currentChat = isChatSelected ? new SelectedChat().transformToString() : new NotSelectedChat().transformToString();

  const searchInput = new Input({
    placeholder: 'Поиск',
    inputClassName: ['search__input'].join(' '),
    name: 'search',
    type: 'text',
  });

  const chatTitleInput = new Input({
    name: 'title',
    placeholder: 'Название нового чата',
    type: 'text',
    required: true,
    dataType: 'text',
    inputClassName: ['new-chat-input'].join(' '),
    inputContainerClassName: ['input__container'].join(' '),
  });

  const createChat = new Button({
    title: 'Создать чат',
    className: ['create-chat'].join(' '),
  });

  const backButton = new Button({
    title: 'Отмена',
    className: ['cancel'].join(' '),
  }, {
    click: () => {
      closeModal('chat-form', '.new-chat-input');
    },
  });

  const newChatContext = {
    input: chatTitleInput.transformToString(),
    createChat: createChat.transformToString(),
    backButton: backButton.transformToString(),
  };

  const chatForm = new Form({
    inputs: [chatTitleInput],
    button: createChat,
    content: newChatTemplate(newChatContext),
  }, {
    submit: async () => {
      await createNewChat();
    },
  });

  const newChat = new Button({
    title: 'Новый чат',
    className: ['new-chat-button'].join(' '),
  }, {
    click: async () => {
      await showModal('chat-form');
    },
  });

  const item = localStorage.getItem('chats');
  let chatsData;
  if (item) {
    chatsData = JSON.parse(item);
    chatsData = chatsData.map((element: IChatData) => {
      const { content } = element.last_message || {};
      const elemContext = {
        ...element,
        avatar: getAvatar(element.avatar) || userAvatar,
        last_message: content,
      };

      const openSelectedChat = async () => {
        const { id } = elemContext;
        store.setStateAndPersist({ currentChat: id });

        const userData = localStorage.getItem('user');
        let user;
        if (userData) {
          user = JSON.parse(userData);
        }

        if (user) {
          await chatController.connectToChat(user.id, id);
        }
        router.go('/selectedChat');
      };

      const elem = new Button({
        isLink: true,
        className: ['new-chat-link'].join(' '),
        content: chatElemTemplate(elemContext),
      }, {
        click: async () => {
          await openSelectedChat();
        },
      });

      return elem.transformToString();
    });
  }

  const context = {
    currentChat,
    profileTitle: 'Профиль',
    emptyChatTitle: 'Выберите чат чтобы отправить сообщение',
    searchInput: searchInput.transformToString(),
    createChat: newChat.transformToString(),
    chatForm: chatForm.transformToString(),
    newChatTitle: 'Создание нового чата',
    dialogs: chatsData || [],
  };

  return template(context);
};

export class ChatPage extends Block {
  constructor(context: TChatPage, events = {}) {
    super('div', {
      context: {
        ...context,
      },
      template: getTemplate(context.isChatSelected),
      events,
    });
  }
}
