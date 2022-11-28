import { v4 as id } from 'uuid';
import formTemplate from './form.tmpl';
import { Block } from '../../utils/Block';
import { TForm } from '../../utils/types';

export default class Form extends Block {
  constructor(context: TForm, events = {}) {
    super('div', {
      context: {
        ...context,
        className: [
          'form',
          context.className].join(' '),
        id: id(),
      },
      template: formTemplate,
      events,
    });
  }
}
