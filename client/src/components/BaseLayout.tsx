import { useEffect } from "react";
import { createState, NewMailType, CurrentView } from "../utils/state";
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

export default function BaseLayout() {
  const state = createState();

  // useEffect(() => {
  //   state.showHidePleaseWait(true);
  // }, []);

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
    </div>
  );
}
