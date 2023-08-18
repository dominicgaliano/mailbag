import * as Contacts from "../utils/Contacts";
import * as IMAP from "../utils/IMAP";
import * as SMTP from "../utils/SMTP";

export type StateProperties = {
  pleaseWaitVisible: boolean;
  contacts: Contacts.IContact[];
  mailboxes: IMAP.IMailbox[];
  messages: IMAP.IMessage[];
  currentView: CurrentView;
  currentMailbox: IMAP.IMailbox | null;
  messageID: string | null;
  messageDate: string | null;
  messageFrom: string | null;
  messageTo: string | null;
  messageSubject: string | null;
  messageBody: string | null;
  contactID: string | null;
  contactName: string | null;
  contactEmail: string | null;
};

export type StateMethods = {
  showHidePleaseWait: (inVisible: boolean) => void;
  addMailboxToList: () => void;
  showMessage: (inMessage: IMAP.IMessage) => void;
  showComposeMessage: (inType: NewMailType) => void;
  showContact: (inId: string, inName: string, inEmail: string) => void;
  showAddContact: (inMailbox: IMAP.IMailbox) => void;
};

export enum CurrentView {
  welcome,
  message,
  compose,
  contacts,
  contactAdd,
}

export enum NewMailType {
  new,
  reply,
  contact,
}
