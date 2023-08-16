import axios from "axios";
import { config } from "./config";

export class Worker {
  /**
   * Send message
   *
   * @param inTo message recipient
   * @param inFrom message sender
   * @param inSubject message subject
   * @param inMessage message body
   * @returns a promise that resolves to void
   */
  public async sendMessage(
    inTo: string,
    inFrom: string,
    inSubject: string,
    inMessage: string
  ): Promise<void> {
    await axios.post(`${config.serverAddress}/messages`, {
      to: inTo,
      from: inFrom,
      subject: inSubject,
      text: inMessage,
    });
  }
}
