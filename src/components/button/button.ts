import { v4 as id } from 'uuid';
import buttonTemplate from './button.tmpl';
import linkButtonTmpl from './link-button.tmpl';
import { Block } from '../../utils/Block';
import { TButton } from '../../utils/types';
import './button.scss';

export class Button extends Block {
  constructor(context: TButton, events = {}) {
    super('div', {
      context: {
        ...context,
        className: [
          'button',
          context.className].join(' '),
        id: id(),
      },
      template: context.isLink ? linkButtonTmpl : buttonTemplate,
      events,
    });
  }
}
