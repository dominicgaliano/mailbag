import { State } from "../utils/state";
import { Button } from "@mui/material";

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
          // TODO: Implement, need to implement more state methods
        }}
      >
        New Message
      </Button>
      <Button
        variant="contained"
        color="primary"
        size="small"
        style={{ marginRight: 10 }}
        onClick={() => {
          // TODO: Implement, need to implement more state methods
        }}
      >
        New Contact
      </Button>
    </>
  );
}
