import pageNotFoundTemplate from './404.tmpl';
import { Block } from '../../utils/Block';
import './404.scss';

export class PageNotFound extends Block {
  constructor() {
    super('div', {
      context: {
        code: '404',
        title: 'Страница отсутствует',
        linkTitle: 'Вернуться назад',
      },
      template: pageNotFoundTemplate,
    });
  }
}
