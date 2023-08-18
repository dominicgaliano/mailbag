import * as Contacts from "../utils/Contacts";
import * as IMAP from "../utils/IMAP";
import * as SMTP from "../utils/SMTP";
import { CurrentView, NewMailType } from "../utils/state";

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
  addMailboxToList: (inMailbox: IMAP.IMailbox) => void;
  addContactToList: (inContact: Contacts.IContact) => void;
  showMessage: (inMessage: IMAP.IMessage) => void;
  showComposeMessage: (inType: NewMailType) => void;
  showContact: (inId: string, inName: string, inEmail: string) => void;
  showAddContact: () => void;
  setCurrentMailbox: (inMailbox: IMAP.IMailbox) => void;
};
