import axios, { AxiosResponse } from "axios";
import { config } from "./config";

interface IMessage {
  id: string;
  date: string;
  from: string;
  to: string;
  body?: string;
}

interface IMailbox {
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

  public async listMessages(inMailbox: string): Promise<IMessage[]> {
    const response: AxiosResponse = await axios.get(
      `${config.serverAddress}/mailboxes/${inMailbox}`
    );
    return response.data;
  }

  public async getMessageBody(
    inId: string,
    inMailbox: string
  ): Promise<string> {
    const response: AxiosResponse = await axios.get(
      `${config.serverAddress}/messages/${inId}/${inMailbox}`
    );
    return response.data;
  }

  public async deleteMessage(inId: string, inMailbox: string): Promise<void> {
    const response: AxiosResponse = await axios.delete(
      `${config.serverAddress}/messages/${inMailbox}/${inId}`
    );
    return response.data;
  }
}
