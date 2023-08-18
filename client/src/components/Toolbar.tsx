import { State } from "../utils/state";
import { Button } from "@mui/material";
import { NewMailType } from "../utils/state";
import EmailIcon from "@mui/icons-material/Email";
import PersonAddIcon from "@mui/icons-material/PersonAdd";

type Props = {
  state: State;
};

export default function Toolbar({ state }: Props) {
  return (
    <>
      <Button
        variant="contained"
        color="primary"
        size="small"
        style={{ marginRight: 10 }}
        onClick={() => {
          state.showComposeMessage(NewMailType.new);
        }}
      >
        <EmailIcon style={{ marginRight: 10 }} />
        New Message
      </Button>
      <Button
        variant="contained"
        color="primary"
        size="small"
        style={{ marginRight: 10 }}
        onClick={() => {
          state.showAddContact();
        }}
      >
        <PersonAddIcon style={{ marginRight: 10 }} />
        New Contact
      </Button>
    </>
  );
}
