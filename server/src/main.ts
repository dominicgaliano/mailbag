import path from "path";
import express, { Express, NextFunction, Request, Response } from "express";
import e from "express";
import { serverInfo } from "./serverInfo";
import * as IMAP from "./IMAP";
// import * as SMTP from "./SMTP";
// import * as Contacts from "./Contacts";
// import { IContact } from "./Contacts";

const app: Express = express();

app.use(express.json());
app.use("/", express.static(path.join(__dirname, "../client/dist")));
app.use(function (
  inRequest: Request,
  inResponse: Response,
  inNext: NextFunction
) {
  inResponse.header("Access-Control-Allow-Origin", "*");
  inResponse.header(
    "Access-Control-Allow-Methods",
    "GET,PUT,POST,DELETE,OPTIONS"
  );
  inResponse.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  inNext();
});

app.get("/mailboxes", async (inRequest: Request, inResponse: Response) => {
  try {
    const imapWorker: IMAP.Worker = new IMAP.Worker(serverInfo);
    const mailboxes: IMAP.IMailbox[] = await imapWorker.listMailboxes();
    inResponse.json(mailboxes);
  } catch (inError) {
    inResponse.send("error");
  }
});
