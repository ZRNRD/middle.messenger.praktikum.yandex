import { expect } from 'chai';
import 'mocha';
import { JSDOM } from 'jsdom';
import { router } from './index';

declare global {
    namespace NodeJS {
        interface Global {
            document: Document;
            window: Window;
            navigator: Navigator;
        }
    }
}

const dom = new JSDOM('<!DOCTYPE html><div class="app"></div>', {
  url: 'http://localhost:3000',
});

global.document = dom.window.document;
// @ts-ignore
global.window = global.document.defaultView;
// @ts-ignore
global.window.router = router;

describe('Проверка переходов по роутам', () => {
  it('Проверка что все роуты добавлены', () => {
    expect(router.routes.length).to.eq(10);
  });

  it('Проверяем, что текущего роута нет до первого перехода', () => {
    expect(router.getCurrentRoute()).to.eq(undefined);
  });

  it('Проверяем, что происходят переходы по роутам', () => {
    expect(window.history.length).to.eq(1);

    window.history.pushState({}, '', '/notSelectedChat');
    expect(window.location.pathname).to.eq('/notSelectedChat');

    expect(window.history.length).to.eq(2);
  });
});
