const ImapClient = require("emailjs-imap-client");
import { ParsedMail, simpleParser } from "mailparser";
import { IServerInfo } from "./serverInfo";

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

// Disable certification validation
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

export class Worker {
  private static serverInfo: IServerInfo;
  constructor(inServerInfo: IServerInfo) {
    Worker.serverInfo = inServerInfo;
  }

  private async connectToServer(): Promise<any> {
    const client: any = new ImapClient.default(
      Worker.serverInfo.imap.host,
      Worker.serverInfo.imap.port,
      { auth: Worker.serverInfo.imap.auth }
    );
    client.log_level = client.LOG_LEVEL_NONE;
    client.onerror = (inError: Error) => {
      console.log("IMAP.Worker.connectToServer(): Connection error", inError);
    };
    await client.connect();
    return client;
  }

  public listMailboxes() {
    throw new Error("Method not implemented.");
  }

  public listMessages(placeholder: ICallOptions) {
    throw new Error("Method not implemented.");
  }

  public getMessageBody(placeholder: ICallOptions) {
    throw new Error("Method not implemented.");
  }

  public deleteMessage(placeholder: ICallOptions) {
    throw new Error("Method not implemented.");
  }
}
