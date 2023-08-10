import { IServerInfo } from "./serverInfo";

export class Worker {
  private static serverInfo: IServerInfo;
  constructor(inServerInfo: IServerInfo) {
    Worker.serverInfo = inServerInfo;
  }

  public listMailboxes() {
    throw new Error("Method not implemented.");
  }

  public listMessages() {
    throw new Error("Method not implemented.");
  }

  public getMessageBody() {
    throw new Error("Method not implemented.");
  }

  public deleteMessage() {
    throw new Error("Method not implemented.");
  }
}
