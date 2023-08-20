import { State, CurrentView } from "../utils/state";
import { InputBase } from "@mui/material";

type Props = {
  state: State;
};

export default function MessageView({ state }: Props) {
  return (
    <form>
      {/* Reading message */}
      {state.currentView === CurrentView.message && (
        <InputBase
          defaultValue={`ID ${state.messageID}`}
          margin="dense"
          disabled={true}
          fullWidth={true}
          className="message-info-field"
        />
      )}
    </form>
  );
}
