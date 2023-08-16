import { useState } from "react";

import * as Contacts from "./Contacts";
import { config } from "./config";
import * as IMAP from "./IMAP";
import * as SMTP from "./SMTP";

export default function createState() {
  const [state, setState] = useState({
    pleaseWaitVisible: false,
    contacts: [],
    mailboxes: [],
    messages: [],
    currentView: "welcome",
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

  /**
   * Toggle the please wait modal
   * @param inVisible boolean true to show, false to hide
   */
  const showHidePleaseWait = function (inVisible: boolean): void {
    setState((prevState) => ({
      ...prevState,
      pleaseWaitVisible: inVisible,
    }));
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
      currentView: "addContact",
    }));
  };

  /**
   * Show message modal
   * @param inMessage
   * @returns
   */
  const showMessage = function (inMessage: IMAP.IMessage): Promise<void> {
    // show please wait modal
    showHidePleaseWait(true);

    // get message content
    const imapWorker: IMAP.Worker = new IMAP.Worker();
    const messageBody: string = imapWorker
      .getBody
      // TODO: fill function body
      ();

    // hide please wait modal
    setState((prevState) => ({
      ...prevState,
      messageID: inMessage.id,
      messageDate: inMessage.date,
      messageFrom: inMessage.from,
      messageTo: inMessage.to,
      messageSubject: inMessage.subject,
      messageBody: messageBody,
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
