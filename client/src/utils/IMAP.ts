import axios, { AxiosResponse } from "axios";
import { config } from "./config";

export interface ICallOptions {
  mailbox: string;
  id?: number;
}

export interface IMessage {
  id: string;
  date: string;
  from: string;
  to: string;
  body?: string;
}

export interface IMailbox {
  name: string;
  path: string;
}

export class Worker {
  public async listMailboxes(): Promise<IMailbox[]> {
    const response: AxiosResponse = await axios.get(
      `${config.serverAddress}/mailboxes`
    );
    return response.data;
  }

  public async listMessages(inMailbox: IMailbox): Promise<IMessage[]> {
    const response: AxiosResponse = await axios.get(
      `${config.serverAddress}/mailboxes/${inMailbox}`
    );
  }

  public async getMessageBody(inCallOptions: ICallOptions): Promise<string> {
    throw new Error("Not Implemented");
  }

  public async deleteMessage(inCallOptions: ICallOptions): Promise<void> {
    throw new Error("Not Implemented");
  }
}
