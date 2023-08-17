import { useEffect } from "react";
import { createState, NewMailType } from "../utils/state";
import { Dialog, DialogTitle } from "@mui/material";

export default function BaseLayout() {
  const state = createState();

  return (
    <div className="appContainer">
      <Dialog open={state.pleaseWaitVisible} transitionDuration={0}>
        <DialogTitle style={{ textAlign: "center" }}>Please Wait</DialogTitle>
      </Dialog>
    </div>
  );
}
