import * as Handlebars from 'handlebars';
import selectedTemplate from './selectedChat.tmpl';
import { Input } from '../../../../components/input/input';
import chatSettingsIcon from '../../../../../static/assets/icons/chat-settings.png';
import sendMessageIcon from '../../../../../static/assets/icons/send-message.png';
import addFileIcon from '../../../../../static/assets/icons/add-file.png';
import userAvatar from '../../../../../static/assets/icons/user-avatar.png';
import { Block } from '../../../../utils/Block';
import './selectedChat.scss';

const getTemplate = () => {
  const template = Handlebars.compile(selectedTemplate);

  const context = {
    userAvatar,
    sendMessageIcon,
    chatSettingsIcon,
    addFileIcon,
    chatTitle: 'Выбранный чат',
    message: new Input({
      placeholder: 'Сообщение',
      inputClassName: 'message__input',
      name: 'message',
      type: 'text',
    }).transformToString(),
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
