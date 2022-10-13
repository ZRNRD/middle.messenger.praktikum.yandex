import * as Handlebars from 'handlebars';
import serverErrorTemplate from './500.tmpl';
import './500.scss';

export function serverError() {
  const template = Handlebars.compile(serverErrorTemplate);

  const context = {
    code: '500',
    title: 'Мы уже решаем проблему',
    linkTitle: 'Вернуться назад',
  };

  return template(context);
}
