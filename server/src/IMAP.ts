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

  /**
   * Connects to the IMAP server
   *
   * @returns A promise that eventually resolves to an ImapClient instance
   */
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

  /**
   * Lists mailboxes
   *
   * @returns A promise that eventually resolves to an array of mailboxes
   */
  public async listMailboxes(): Promise<IMailbox[]> {
    const client: any = await this.connectToServer();
    const mailboxes: any = await client.listMailboxes();
    await client.close();

    const finalMailboxes: IMailbox[] = [];
    const iterateChildren: Function = (inArray: any[]): void => {
      inArray.forEach((inValue: any) => {
        finalMailboxes.push({
          name: inValue.name,
          path: inValue.path,
        });
        iterateChildren(inValue.children);
      });
    };
    iterateChildren(mailboxes.children);

    return finalMailboxes;
  }

  /**
   * Lists messages in a mailbox
   *
   * @param inCallOptions An object containing a mailbox property
   * @returns A promise that eventually resolves to an array of messages
   */
  public async listMessages(inCallOptions: ICallOptions): Promise<IMessage[]> {
    const client: any = await this.connectToServer();
    const mailbox: any = await client.selectMailbox(inCallOptions.mailbox);
    if (mailbox.exists === 0) {
      await client.close();
      return [];
    }
    const messages: any[] = await client.listMessages(
      inCallOptions.mailbox,
      "1:*",
      ["uid", "envelope"]
    );
    await client.close();
    const finalMessages: IMessage[] = messages.map((inValue: any) => {
      return {
        id: inValue.uid,
        date: inValue.envelope.date,
        to: inValue.envelope.to[0].address,
        from: inValue.envelope.from[0].address,
        subject: inValue.envelope.subject,
      };
    });
    return finalMessages;
  }

  /**
   * Gets the plaintext body of a message
   *
   * @param inCallOptions An object containing a mailbox and id property
   * @returns A promise that eventually resolves to a string
   */
  public async getMessageBody(inCallOptions: ICallOptions): Promise<string> {
    const client: any = await this.connectToServer();
    const messages: any[] = await client.listMessages(
      inCallOptions.mailbox,
      inCallOptions.id,
      ["body[]"],
      { byUid: true }
    );
    const parsed: ParsedMail = await simpleParser(messages[0]["body[]"]);
    await client.close();
    return parsed.text || "";
  }

  /**
   * Deletes a message from IMAP server
   *
   * @param inCallOptions An object containing a mailbox and id property
   * @returns A promise that eventually resolves to void
   */
  public async deleteMessage(inCallOptions: ICallOptions): Promise<void> {
    const client: any = await this.connectToServer();
    await client.deleteMessages(inCallOptions.mailbox, inCallOptions.id, {
      byUid: true,
    });
    await client.close();
  }
}
