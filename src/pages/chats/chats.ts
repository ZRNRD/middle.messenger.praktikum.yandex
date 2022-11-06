import * as Handlebars from 'handlebars';
import chatsTemplate from './chats.tmpl';
import { SelectedChat } from './modules/selectedChat/selectedChat';
import { NotSelectedChat } from './modules/notSelectedChat/notSelectedChat';
import { Input } from '../../components/input';
import userAvatar from '../../../static/assets/icons/user-avatar.png';
import { Block } from '../../utils/Block';
import { TChatPage } from '../../utils/types';
import './chats.scss';

const getTemplate = (isChatSelected?: boolean) => {
  const template = Handlebars.compile(chatsTemplate);

  const currentChat = isChatSelected ? new SelectedChat().transformToString() : new NotSelectedChat().transformToString();

  const context = {
    currentChat,
    profileTitle: 'Профиль',
    emptyChatTitle: 'Выберите чат чтобы отправить сообщение',
    searchInput: new Input({
      placeholder: 'Поиск',
      inputClassName: 'search__input',
      name: 'search',
      type: 'text',
    }).transformToString(),
    dialogs: [
      {
        name: 'Андрей', message: 'Изображение', id: '1', userAvatar,
      },
      {
        name: 'Киноклуб', message: 'Вы: стикер', id: '2', userAvatar,
      },
      {
        name: 'Илья', message: 'Друзья, у меня для вас особенный выпуск новостей!...', id: '3', userAvatar,
      },
      {
        name: 'Вадим', message: 'Вы: Круто!', id: '4', userAvatar,
      },
      {
        name: 'тет-а-теты', message: 'И Human Interface Guidelines и Material Design рекомендуют...', id: '5', userAvatar,
      },
    ],
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
