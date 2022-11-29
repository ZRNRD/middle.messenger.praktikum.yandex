import { Dictionary, TWebSocketParams } from './types';

const DEFAULT_URL = 'wss://ya-praktikum.tech/ws/';

export function createWebSocket(params: TWebSocketParams, onMessageFunc?: (data: Dictionary) => void) {
  const { userId, chatId, token } = params;

  const socket = new WebSocket(`${DEFAULT_URL}chats/${userId}/${chatId}/${token}`);

  socket.addEventListener('open', () => {
    console.log('Соединение установлено');
  });

  socket.addEventListener('close', (event) => {
    const { wasClean, code } = event;

    let { reason } = event;

    console.log(wasClean ? 'Соединение закрыто чисто' : 'Обрыв соединения');

    if (code === 1006) {
      reason = 'Соединение закрыто из-за отсутствия активности в сокете';
    }

    console.log(`Код: ${code} | Причина: ${reason}`);
  });

  socket.addEventListener('message', (event) => {
    const { data } = event;

    if (onMessageFunc && data) {
      try {
        onMessageFunc(JSON.parse(data));
      } catch (e) {
        return e.reason;
      }
    }
  });

  socket.addEventListener('error', (event: any) => {
    console.log('Ошибка', event.message);
  });

  return socket;
}
