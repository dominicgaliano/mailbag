import path from "path";
import express, { Express, NextFunction, Request, Response } from "express";
import { serverInfo } from "./serverInfo";
import * as IMAP from "./IMAP";
import * as SMTP from "./SMTP";
import * as Contacts from "./Contacts";
import { IContact } from "./Contacts";

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

// List mailboxes
app.get("/mailboxes", async (inRequest: Request, inResponse: Response) => {
  try {
    const imapWorker: IMAP.Worker = new IMAP.Worker(serverInfo);
    const mailboxes: IMAP.IMailbox[] = await imapWorker.listMailboxes();
    inResponse.status(200).json(mailboxes);
  } catch (inError) {
    inResponse.status(400).send("Server could not retrieve mailboxes");
  }
});

// List messages
app.get(
  "/mailboxes/:mailbox",
  async (inRequest: Request, inResponse: Response) => {
    try {
      const imapWorker: IMAP.Worker = new IMAP.Worker(serverInfo);
      const messages: IMAP.IMessage[] = await imapWorker.listMessages({
        mailbox: inRequest.params.mailbox,
      });
      inResponse.status(200).json(messages);
    } catch (inError) {
      inResponse.status(400).json("error");
    }
  }
);

// Get a message
app.get(
  "/messages/:mailbox/:id",
  async (inRequest: Request, inResponse: Response) => {
    try {
      const imapWorker: IMAP.Worker = new IMAP.Worker(serverInfo);
      const messageBody: string = await imapWorker.getMessageBody({
        mailbox: inRequest.params.mailbox,
        id: parseInt(inRequest.params.id, 10),
      });
      inResponse.status(200).send(messageBody);
    } catch (inError) {
      inResponse.status(400).json("error");
    }
  }
);

// Delete a message
app.delete(
  "/messages/:mailbox/:id",
  async (inRequest: Request, inResponse: Response) => {
    try {
      const imapWorker: IMAP.Worker = new IMAP.Worker(serverInfo);
      await imapWorker.deleteMessage({
        mailbox: inRequest.params.mailbox,
        id: parseInt(inRequest.params.id, 10),
      });
      inResponse.status(200).send("ok");
    } catch (inError) {
      inResponse.status(400).json("error");
    }
  }
);

// Send a message
app.post("/messages", async (inRequest: Request, inResponse: Response) => {
  try {
    const smtpWorker: SMTP.Worker = new SMTP.Worker(serverInfo);
    await smtpWorker.sendMessage(inRequest.body);
    inResponse.status(201).send("ok");
  } catch (inError) {
    inResponse.json("error");
  }
});

// List contacts
app.get("/contacts", async (inRequest: Request, inResponse: Response) => {
  try {
    const contactsWorker: Contacts.Worker = new Contacts.Worker();
    const contacts: IContact[] = await contactsWorker.listContacts();
    inResponse.status(200).json(contacts);
  } catch (inError) {
    inResponse.status(400).send("error");
  }
});

// Create contact
app.post("/contacts", async (inRequest: Request, inResponse: Response) => {
  try {
    const contactsWorker: Contacts.Worker = new Contacts.Worker();
    const contact: IContact = await contactsWorker.addContact(inRequest.body);
    inResponse.status(201).json(contact);
  } catch (inError) {
    inResponse.status(400).json("error");
  }
});

// Delete contact
app.delete(
  "/contacts/:id",
  async (inRequest: Request, inResponse: Response) => {
    try {
      const contactsWorker: Contacts.Worker = new Contacts.Worker();
      await contactsWorker.deleteContact(inRequest.params.id);
      inResponse.status(200).send("ok");
    } catch (inError) {
      inResponse.status(400).send("error");
    }
  }
);

// Update contact
app.put("/contacts/:id", async (inRequest: Request, inResponse: Response) => {
  try {
    const contactsWorker: Contacts.Worker = new Contacts.Worker();
    await contactsWorker.updateContact(inRequest.params.id, inRequest.body);
    inResponse.status(200).send("updated");
  } catch (inError) {
    inResponse.status(400).send("error");
  }
});

require("dotenv").config();

// start app listening
app.listen(process.env.SERVER_PORT, () => {
  console.log(
    `MailBag server open for requests on port ${process.env.SERVER_PORT}`
  );
});
