import { HTTPTransport } from '../utils/HTTPTransport';
import { IAddChatUser, ICreateChat } from '../utils/interfaces';

const defaultUrl = '/chats';

const chatAPIInstance = new HTTPTransport(defaultUrl);

export class ChatApi {
  get() {
    return chatAPIInstance.get('/');
  }

  createChat(data: ICreateChat) {
    return chatAPIInstance.post('/', data);
  }

  addUser(data: IAddChatUser) {
    return chatAPIInstance.put('/users', data);
  }

  deleteUser(data: IAddChatUser) {
    return chatAPIInstance.delete('/users', data);
  }

  deleteChat(chatId: number) {
    return chatAPIInstance.delete('/', chatId);
  }

  getChatUsers(chatId: number = 0) {
    return chatAPIInstance.post(`/token/${chatId}`);
  }
}
