import { ChatApi } from '../api/chat-api';
import { IAddChatUser, ICreateChat, IChatData } from '../utils/interfaces';
import { store } from '../store/store';

const chatAPIInstance = new ChatApi();

export class ChatController {
  public async getChats() {
    try {
      await chatAPIInstance.get();
    } catch (e) {
      return e.reason;
    }
  }

  public async createChat(data: ICreateChat) {
    try {
      const chatData = await chatAPIInstance.createChat(data);
      if (chatData) {
        store.setStateAndPersist({ currentChat: (chatData as IChatData).id });
      }
      await this.getAllChats();
    } catch (e) {
      return e.reason;
    }
  }

  public async getAllChats() {
    let res;
    try {
      res = await chatAPIInstance.get();
    } catch (e) {
      res = e.reason;
    }
    if (res !== 'Not found') {
      store.setStateAndPersist({ chats: res });
    }
    return res;
  }

  public async addUser(data: IAddChatUser) {
    try {
      await chatAPIInstance.addUser(data);
    } catch (e) {
      return e.reason;
    }
  }

  public async deleteUser(data: IAddChatUser) {
    try {
      await chatAPIInstance.deleteUser(data);
    } catch (e) {
      return e.reason;
    }
  }

  public async getChatToken(id?: number) {
    let res;
    try {
      res = await chatAPIInstance.getChatUsers(id);
    } catch (e) {
      res = e.reason;
    }
    if (res !== 'Not found') {
      store.setStateAndPersist({ savedToken: res });
    }
    return res;
  }

  public async getChatUsers(id: number) {
    try {
      return await this.getChatToken(id);
    } catch (e) {
      return e.reason;
    }
  }

  public async connectToChat(userId: number, chatId: number) {
    try {
      const tokenData = await this.getChatUsers(chatId);
      const { token } = tokenData || {};
      const params = { userId, chatId, token };

      store.setStateAndPersist({ wsParams: params });
    } catch (e) {
      console.log(e);
    }
  }
}
