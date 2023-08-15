import { useState } from "react";

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

  const showHidePleaseWait = (inVisible: boolean) => {
    setState((prevState) => ({
      ...prevState,
      pleaseWaitVisible: inVisible,
    }));
  };

  return { ...state, showHidePleaseWait };
}
