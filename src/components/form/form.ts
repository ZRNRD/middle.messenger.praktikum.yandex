import formTemplate from './form.tmpl';
import { Block } from '../../utils/Block';
import { TForm } from '../../utils/types';

export class Form extends Block {
  constructor(context: TForm, events = {}) {
    super('div', {
      context: {
        ...context,
      },
      template: formTemplate,
      events,
    });
  }
}