import { v4 as uuidv4 } from 'uuid';
import formTemplate from './form.tmpl';
import { Block } from '../../utils/Block';
import { TForm } from '../../utils/types';

export class Form extends Block {
  constructor(context: TForm, events = {}) {
    super('div', {
      context: {
        ...context,
        id: uuidv4(),
      },
      template: formTemplate,
      events,
    });
  }
}
