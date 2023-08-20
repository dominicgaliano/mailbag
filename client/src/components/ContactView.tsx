import { State, CurrentView } from "../utils/state";
import { TextField, Button } from "@mui/material";

type Props = {
  state: State;
};

export default function ContactView({ state }: Props) {
  return (
    <form>
      <TextField
        margin="dense"
        id="contactName"
        label="Name"
        value={state.contactName || ""}
        variant="outlined"
        InputLabelProps={{ style: { color: "#000000" } }}
        disabled={state.currentView === CurrentView.contacts}
        style={{ width: 260 }}
        onChange={state.handleFieldChange}
      />
      <br />
      <TextField
        margin="dense"
        id="contactEmail"
        label="Email"
        value={state.contactEmail || ""}
        variant="outlined"
        InputLabelProps={{ style: { color: "#000000" } }}
        disabled={state.currentView === CurrentView.contacts}
        style={{ width: 260 }}
        onChange={state.handleFieldChange}
      />
      <br />
      {state.currentView === CurrentView.contactAdd && (
        <Button
          variant="contained"
          color="primary"
          size="small"
          style={{ marginTop: 10 }}
          onClick={state.saveContact}
        >
          Save
        </Button>
      )}
    </form>
  );
}
