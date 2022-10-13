import * as Handlebars from 'handlebars';
import selectedTemplate from './selectedChat.tmpl';
import { Input } from '../../../../components/input/input';
import chatSettingsIcon from '../../../../../static/assets/icons/chat-settings.png';
import sendMessageIcon from '../../../../../static/assets/icons/send-message.png';
import addFileIcon from '../../../../../static/assets/icons/add-file.png';
import userAvatar from '../../../../../static/assets/icons/user-avatar.png';
import './selectedChat.scss';

export function selectedChat() {
  const template = Handlebars.compile(selectedTemplate);

  const context = {
    userAvatar,
    sendMessageIcon,
    chatSettingsIcon,
    addFileIcon,
    chatTitle: 'Выбранный чат',
    message: Input({
      placeholder: 'Сообщение',
      inputClassName: 'message__input',
      name: 'message',
      type: 'text',
    }),
  };

  return template(context);
}
