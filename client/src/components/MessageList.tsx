import { State } from "../utils/state";
import {
  Table,
  TableHead,
  TableCell,
  TableRow,
  TableBody,
} from "@mui/material";

type Props = {
  state: State;
};

export default function MessageList({ state }: Props) {
  // return (
  //   <ul>
  //     {state.messages.map((message) => {
  //       return (
  //         <li key={message.id} onClick={() => state.showMessage(message)}>
  //           {message.subject} From: {message.from}
  //         </li>
  //       );
  //     })}
  //   </ul>
  // );
  return (
    <Table stickyHeader padding="none">
      <TableHead>
        <TableRow>
          <TableCell style={{ width: 120 }}>Date</TableCell>
          <TableCell style={{ width: 300 }}>From</TableCell>
          <TableCell>Subject</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {state.messages.map((message) => (
          <TableRow key={message.id} onClick={() => state.showMessage(message)}>
            <TableCell>{new Date(message.date).toLocaleDateString()}</TableCell>
            <TableCell>{message.from}</TableCell>
            <TableCell>{message.subject}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
