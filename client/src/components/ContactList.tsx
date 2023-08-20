import { State } from "../utils/state";
import {
  List,
  ListItemButton,
  ListItemAvatar,
  Avatar,
  ListItemText,
} from "@mui/material";

type Props = {
  state: State;
};

export default function ContactList({ state }: Props) {
  return (
    <List>
      {state.contacts.map((contact) => {
        return (
          <ListItemButton
            key={`${contact}`}
            onClick={() => {
              state.showContact(contact._id!, contact.name, contact.email);
            }}
          >
            <ListItemAvatar>
              <Avatar />
            </ListItemAvatar>
            <ListItemText primary={contact.name} />
          </ListItemButton>
        );
      })}
    </List>
  );
}
