import serverErrorTemplate from './500.tmpl';
import { Block } from '../../utils/Block';
import './500.scss';

export class ServerError extends Block {
  constructor() {
    super('div', {
      context: {
        code: '500',
        title: 'Мы уже решаем проблему',
        linkTitle: 'Вернуться назад',
      },
      template: serverErrorTemplate,
    });
  }
}
