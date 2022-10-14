import * as Handlebars from 'handlebars';
import notSelectedTemplate from './notSelectedChat.tmpl';
import { Block } from '../../../../utils/Block';
import './notSelectedChat.scss';

const getTemplate = () => {
  const template = Handlebars.compile(notSelectedTemplate);

  const context = {
    title: 'Выберите чат чтобы отправить сообщение',
  };

  return template(context);
};

export class NotSelectedChat extends Block {
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
