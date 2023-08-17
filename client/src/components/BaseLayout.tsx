import { useEffect } from "react";
import { createState, NewMailType } from "../utils/state";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
} from "@mui/material";

export default function BaseLayout() {
  const state = createState();

  // useEffect(() => {
  //   state.showHidePleaseWait(true);
  // }, []);

  return (
    <div className="appContainer">
      <Dialog open={state.pleaseWaitVisible} transitionDuration={0}>
        <DialogTitle style={{ textAlign: "center" }}>Please Wait</DialogTitle>
        <DialogContent>
          <DialogContentText>...Contacting Server...</DialogContentText>
        </DialogContent>
      </Dialog>
    </div>
  );
}
