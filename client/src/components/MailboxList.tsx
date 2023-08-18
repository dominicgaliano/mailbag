import { State } from "../utils/state";
import { List, Chip } from "@mui/material";

type Props = {
  state: State;
};

export default function MailboxList({ state }: Props) {
  return (
    <List>
      {state.mailboxes.map((mailbox) => {
        return (
          <Chip
            label={mailbox.name}
            onClick={() => {
              state.setCurrentMailbox(mailbox);
            }}
            style={{ width: 128, marginBottom: 10 }}
            color={state.currentMailbox === mailbox ? "secondary" : "primary"}
          />
        );
      })}
    </List>
  );
}
