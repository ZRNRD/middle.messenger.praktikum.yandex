import { expect } from 'chai';
import 'mocha';
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

describe('Проверка переходов по роутам', () => {
  it('Проверка что все роуты добавлены', () => {
    expect(router.routes.length).to.eq(13);
  });

  it('Проверяем, что текущего роута нет до первого перехода', () => {
    expect(router.getCurrentRoute()).to.eq(undefined);
  });

  it('Проверяем, что происходят переходы по роутам', () => {
    expect(window.history.length).to.eq(1);

    window.history.pushState({}, '', '/sign-in');
    expect(window.location.pathname).to.eq('/sign-in');

    expect(window.history.length).to.eq(2);
  });
});
