import { HTTPTransport } from '../utils/HTTPTransport';
import { IAddChatUser, ICreateChat } from '../utils/interfaces';

const defaultUrl = '/chats';

const chatAPIInstance = new HTTPTransport(defaultUrl);

export default class ChatApi {
  get() {
    return chatAPIInstance.get('/');
  }

  createChat(data: ICreateChat) {
    return chatAPIInstance.post('/', data);
  }

  addUser(data: IAddChatUser) {
    return chatAPIInstance.put('/users', data);
  }

  getChatUsers(chatId: number = 0) {
    return chatAPIInstance.post(`/token/${chatId}`);
  }
}
