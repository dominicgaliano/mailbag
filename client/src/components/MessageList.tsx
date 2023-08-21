import { State } from "../utils/state";

type Props = {
  state: State;
};

export default function MessageList({ state }: Props) {
  return (
    <ul>
      {state.messages.map((message) => {
        return (
          <li key={message.id} onClick={() => state.showMessage(message)}>
            {message.subject} From: {message.from}
          </li>
        );
      })}
    </ul>
  );
}
