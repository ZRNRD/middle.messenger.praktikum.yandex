import 'mocha';
import { HTTPTransport } from './HTTPTransport';

describe('Проверяем HTTPTransport', () => {
  const http = new HTTPTransport('https://jsonplaceholder.typicode.com/comments');

  it('Проверка GET-запроса', async () => {
    await http.get();
  });
});
