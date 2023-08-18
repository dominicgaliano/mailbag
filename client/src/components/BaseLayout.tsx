import { useEffect } from "react";
import { createState, CurrentView } from "../utils/state";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
} from "@mui/material";
import Toolbar from "./Toolbar";
import MailboxList from "./MailboxList";
import MessageList from "./MessageList";
import WelcomeView from "./WelcomeView";
import MessageView from "./MessageView";
import ContactView from "./ContactView";
import ContactList from "./ContactList";

import * as Contacts from "../utils/Contacts";
import * as IMAP from "../utils/IMAP";

let didInit = false;

export default function BaseLayout() {
  const state = createState();

  // Fetch user's mailboxes and contacts
  useEffect(() => {
    if (!didInit) {
      didInit = true;
      state.showHidePleaseWait(true);
      async function getMailboxes() {
        const imapWorker: IMAP.Worker = new IMAP.Worker();
        const mailboxes: IMAP.IMailbox[] = await imapWorker.listMailboxes();
        mailboxes.forEach((inMailbox) => {
          state.addMailboxToList(inMailbox);
        });
      }
      getMailboxes().then(function () {
        async function getContacts() {
          const contactsWorker: Contacts.Worker = new Contacts.Worker();
          const contacts: Contacts.IContact[] =
            await contactsWorker.listContacts();
          contacts.forEach((inContact) => {
            state.addContactToList(inContact);
          });
        }
        getContacts().then(() => state.showHidePleaseWait(false));
      });
    }
  }, []);

  return (
    <div className="app-container">
      <Dialog open={state.pleaseWaitVisible} transitionDuration={0}>
        <DialogTitle style={{ textAlign: "center" }}>Please Wait</DialogTitle>
        <DialogContent>
          <DialogContentText>...Contacting Server...</DialogContentText>
        </DialogContent>
      </Dialog>
      <div className="toolbar">
        <Toolbar state={state} />
      </div>
      <div className="mailbox-list">
        <MailboxList state={state} />
      </div>
      <div className="center-area">
        <div className="message-list">
          <MessageList state={state} />
        </div>
        <div className="center-area__view">
          {state.currentView === CurrentView.welcome && <WelcomeView />}
          {(state.currentView === CurrentView.message ||
            state.currentView === CurrentView.compose) && (
            <MessageView state={state} />
          )}
          {(state.currentView === CurrentView.contacts ||
            state.currentView === CurrentView.contactAdd) && (
            <ContactView state={state} />
          )}
          {}
        </div>
      </div>
      <div className="contacts-list">
        <ContactList state={state} />
      </div>
    </div>
  );
}
