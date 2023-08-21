import { State, CurrentView, NewMailType } from "../utils/state";
import { InputBase, TextField, Button } from "@mui/material";

type Props = {
  state: State;
};

export default function MessageView({ state }: Props) {
  return (
    <form>
      {/* Reading message */}
      {state.currentView === CurrentView.message && (
        <>
          <InputBase
            defaultValue={`ID ${state.messageID}`}
            margin="dense"
            disabled={true}
            fullWidth={true}
          />
          <br />
          <InputBase
            defaultValue={state.messageDate}
            margin="dense"
            disabled={true}
            fullWidth={true}
          />
          <br />
          <TextField
            margin="dense"
            variant="outlined"
            fullWidth={true}
            label="From"
            value={state.messageFrom}
            disabled={true}
          />
        </>
      )}
      {/* Composing message */}
      {state.currentView === CurrentView.compose && (
        <>
          <TextField
            margin="dense"
            id="messageTo"
            variant="outlined"
            fullWidth={true}
            label="To"
            value={state.messageTo}
            onChange={state.handleFieldChange}
          />
          <br />
        </>
      )}
      {/* Both composing and reading*/}
      <TextField
        margin="dense"
        id="messageSubject"
        label="Subject"
        variant="outlined"
        fullWidth={true}
        value={state.messageSubject}
        disabled={state.currentView === CurrentView.message}
        InputProps={{ style: { color: "#000000" } }}
        onChange={state.handleFieldChange}
      />
      <br />
      <TextField
        margin="dense"
        id="messageBody"
        variant="outlined"
        fullWidth={true}
        multiline={true}
        rows={12}
        value={state.messageBody}
        disabled={state.currentView === CurrentView.message}
        InputProps={{ style: { color: "#000000" } }}
        onChange={state.handleFieldChange}
      />
      {/* Buttons */}
      {state.currentView === CurrentView.compose && (
        <Button
          variant="contained"
          color="primary"
          size="small"
          style={{ marginTop: 10 }}
          onClick={state.sendMessage}
        >
          Send
        </Button>
      )}
      {state.currentView === CurrentView.message && (
        <Button
          variant="contained"
          color="primary"
          size="small"
          style={{ marginTop: 10, marginRight: 10 }}
          onClick={() => state.showComposeMessage(NewMailType.reply)}
        >
          Reply
        </Button>
      )}
      {state.currentView === CurrentView.message && (
        <Button
          variant="contained"
          color="primary"
          size="small"
          style={{ marginTop: 10, marginRight: 10 }}
          onClick={state.deleteMessage}
        >
          Delete
        </Button>
      )}
    </form>
  );
}
