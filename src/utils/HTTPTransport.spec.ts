import 'mocha';
import { HTTPTransport } from './HTTPTransport';

describe('Проверяем HTTPTransport', () => {
  const http = new HTTPTransport('/chats');

  it('Проверка GET-запроса', (done) => {
    http
      .get('/')
      .then((response: string) => {
        const { reason } = JSON.parse(response);
        if (reason === 'Cookie is not valid') {
          done();
        } else {
          done(new Error('Ошибка GET-запроса'));
        }
      })
      .catch(done);
  });
});
