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

export class Worker {
  private static serverInfo: IServerInfo;
  constructor(inServerInfo: IServerInfo) {
    Worker.serverInfo = inServerInfo;
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
