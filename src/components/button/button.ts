import buttonTemplate from './button.tmpl';
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
      },
      template: buttonTemplate,
      events,
    });
  }
}
