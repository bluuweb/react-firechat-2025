import { useMessagesActions } from "@/hooks/user-messages-actions";
import MessageChat from "./message-chat";

interface Props {
  roomId: string;
}

const MessagesChat = ({ roomId }: Props) => {
  const { messages } = useMessagesActions(roomId);

  return (
    <div className="space-y-2">
      {messages.map((message) => (
        <MessageChat
          key={message.id}
          message={message}
        />
      ))}
      {/* <pre>{JSON.stringify(messages, null, 2)}</pre> */}
    </div>
  );
};
export default MessagesChat;
