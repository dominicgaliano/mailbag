import { useState } from "react";

import * as Contacts from "./Contacts";
import { config } from "./config";
import * as IMAP from "./IMAP";
import * as SMTP from "./SMTP";

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

export type State = {
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

export function createState() {
  const [state, setState] = useState<State>({
    pleaseWaitVisible: false,
    contacts: [],
    mailboxes: [],
    messages: [],
    currentView: CurrentView.welcome,
    currentMailbox: null,
    messageID: null,
    messageDate: null,
    messageFrom: null,
    messageTo: null,
    messageSubject: null,
    messageBody: null,
    contactID: null,
    contactName: null,
    contactEmail: null,
  });

  /*
   * Toggle the please wait modal
   * @param inVisible boolean true to show, false to hide
   */
  const showHidePleaseWait = function (inVisible: boolean): void {
    setState((prevState) => ({
      ...prevState,
      pleaseWaitVisible: inVisible,
    }));
  };

  /* VIEW AREA SETTER FUNCTIONS */

  /**
   * Show message modal
   * @param inMessage
   * @returns
   */
  const showMessage = async function (inMessage: IMAP.IMessage): Promise<void> {
    // show please wait modal
    showHidePleaseWait(true);

    // get message content
    const imapWorker: IMAP.Worker = new IMAP.Worker();
    const messageBody: string = await imapWorker.getMessageBody(
      inMessage.id,
      state.currentMailbox!.path
    );

    // hide please wait modal
    showHidePleaseWait(false);

    // add message content to state
    setState((prevState) => ({
      ...prevState,
      currentView: CurrentView.message,
      messageID: inMessage.id,
      messageDate: inMessage.date,
      messageFrom: inMessage.from,
      messageTo: "",
      messageSubject: inMessage.subject,
      messageBody: messageBody,
    }));
  };

  const showComposeMessage = function (inType: NewMailType) {
    setState((prevState) => {
      switch (inType) {
        case NewMailType.new:
          return {
            ...prevState,
            currentView: CurrentView.compose,
            messageTo: "",
            messageSubject: "",
            messageBody: "",
            messageFrom: config.userEmail,
          };

        case NewMailType.reply:
          return {
            ...prevState,
            currentView: CurrentView.compose,
            messageTo: prevState.messageFrom,
            messageSubject: `RE: ${prevState.messageSubject}`,
            messageBody: `\n\n---- Original Message ----\n\n${prevState.messageBody}`,
            messageFrom: config.userEmail,
          };

        case NewMailType.contact:
          return {
            ...prevState,
            currentView: CurrentView.compose,
            messageTo: prevState.contactEmail,
            messageSubject: "",
            messageBody: "",
            messageFrom: config.userEmail,
          };
      }
    });
  };

  /**
   * Show contact modal
   * @param inId contact id
   * @param inName contact name
   * @param inEmail contact email
   */
  const showContact = function (
    inId: string,
    inName: string,
    inEmail: string
  ): void {
    setState((prevState) => ({
      ...prevState,
      currentView: CurrentView.contacts,
      contactID: inId,
      contactName: inName,
      contactEmail: inEmail,
    }));
  };

  /**
   * Show add contact modal
   */
  const showAddContact = function (): void {
    setState((prevState) => ({
      ...prevState,
      currentView: CurrentView.contactAdd,
    }));
  };

  /**
   * Add mailbox to list
   * @param inMailbox mailbox to add
   */
  const addMailboxToList = function (inMailbox: IMAP.IMailbox): void {
    setState((prevState) => ({
      ...prevState,
      mailboxes: [...prevState.mailboxes, inMailbox],
    }));
  };

  return { ...state, showHidePleaseWait, addMailboxToList };
}
