import Mail from "nodemailer/lib/mailer";
import * as nodemailer from "nodemailer";
import { SendMailOptions, SentMessageInfo } from "nodemailer";
import { IServerInfo } from "./serverInfo";

export class Worker {
  private static serverInfo: IServerInfo;
  constructor(inServerInfo: IServerInfo) {
    Worker.serverInfo = inServerInfo;
  }

  /**
   * Send a message
   *
   * @param inOptions An object containing to, from, subject, and text properties
   * @returns A promise that eventually resolves to a string
   */
  public sendMessage(inOptions: SendMailOptions): Promise<string> {
    return new Promise((inResolve, inReject) => {
      const transport: Mail = nodemailer.createTransport(
        Worker.serverInfo.smtp
      );
      transport.sendMail(
        inOptions,
        (inError: Error | null, inInfo: SentMessageInfo) => {
          if (inError) {
            console.log("SMTP.Worker.sendMessage(): Error", inError);
            inReject(inError);
          } else {
            console.log("SMTP.Worker.sendMessage(): Ok", inInfo);
            inResolve("sent");
          }
        }
      );
    });
  }
}
