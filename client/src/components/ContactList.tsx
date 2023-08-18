import { State } from "../utils/state";
import { List, Chip } from "@mui/material";

type Props = {
  state: State;
};

export default function ContactList({ state }: Props) {
  return (
    <List>
      {state.contacts.map((contact) => {
        return (
          <Chip
            label={`${contact.name}`}
            onClick={() => {
              // TODO: Implement me
              console.log("Not implemented");
            }}
            style={{ width: 128, marginBottom: 10 }}
            color="primary"
            key={contact._id}
          />
        );
      })}
    </List>
  );
}
