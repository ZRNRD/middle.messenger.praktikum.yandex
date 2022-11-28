import { HTTPTransport } from '../utils/HTTPTransport';
import { IAddChatUser, ICreateChat, IDeleteChat } from '../utils/interfaces';

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

  deleteChat(data: IDeleteChat) {
    return chatAPIInstance.delete('/', data);
  }

  getChatUsers(chatId: number = 0) {
    return chatAPIInstance.post(`/token/${chatId}`);
  }
}
