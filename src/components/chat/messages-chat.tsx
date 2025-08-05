import { useMessagesActions } from "@/hooks/user-messages-actions";

interface Props {
  roomId: string;
}

const MessagesChat = ({ roomId }: Props) => {
  const { messages } = useMessagesActions(roomId);

  return (
    <div>
      <pre>{JSON.stringify(messages, null, 2)}</pre>
    </div>
  );
};
export default MessagesChat;
