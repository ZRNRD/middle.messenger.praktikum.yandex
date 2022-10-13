import * as Handlebars from 'handlebars';
import pageNotFoundTemplate from './404.tmpl';
import './404.scss';

export function pageNotFound() {
  const template = Handlebars.compile(pageNotFoundTemplate);

  const context = {
    code: '404',
    title: 'Страница отсутствует',
    linkTitle: 'Вернуться назад',
  };

  return template(context);
}
