import * as Contacts from "./Contacts";
import { config } from "./config";
import * as IMAP from "./IMAP";
import * as SMTP from "./SMTP";

// Contacts tests
console.log("get contacts:");
const contactsWorker: Contacts.Worker = new Contacts.Worker();
