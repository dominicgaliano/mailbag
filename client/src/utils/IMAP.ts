import axios, { AxiosResponse } from "axios";
import { config } from "./config";

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
  /**
   * List mailboxes
   *
   * @returns A promise that resolves to an array of mailboxes
   */
  public async listMailboxes(): Promise<IMailbox[]> {
    const response: AxiosResponse = await axios.get(
      `${config.serverAddress}/mailboxes`
    );
    return response.data;
  }

  /**
   * List messages
   *
   * @param inMailbox mailbox path to list messages from
   * @returns a promise that resolves to an array of messages
   */
  public async listMessages(inMailbox: string): Promise<IMessage[]> {
    const response: AxiosResponse = await axios.get(
      `${config.serverAddress}/mailboxes/${inMailbox}`
    );
    return response.data;
  }

  /**
   * Get message body
   *
   * @param inId message id to get body from
   * @param inMailbox mailbox path to get message body from
   * @returns a promise that resolves to a string of the message body
   */
  public async getMessageBody(
    inId: string,
    inMailbox: string
  ): Promise<string> {
    const response: AxiosResponse = await axios.get(
      `${config.serverAddress}/messages/${inId}/${inMailbox}`
    );
    return response.data;
  }

  /**
   * Delete message
   *
   * @param inId message id to delete
   * @param inMailbox mailbox path to get message body from
   * @returns a promise that resolves to void
   */
  public async deleteMessage(inId: string, inMailbox: string): Promise<void> {
    await axios.delete(`${config.serverAddress}/messages/${inMailbox}/${inId}`);
  }
}
