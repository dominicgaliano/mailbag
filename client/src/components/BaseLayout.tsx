import { useEffect } from "react";
import { createState, NewMailType } from "../utils/state";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
} from "@mui/material";
import Toolbar from "./Toolbar";
import MailboxList from "./MailboxList";

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
    </div>
  );
}
