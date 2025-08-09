import { useMessagesActions } from "@/hooks/user-messages-actions";
import { useEffect, useRef } from "react";
import MessageChat from "./message-chat";

interface Props {
  roomId: string;
}

const MessagesChat = ({ roomId }: Props) => {
  const { messages } = useMessagesActions(roomId);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  if (messages.length === 0) {
    return (
      <div className="flex-1 flex items-center justify-center text-muted-foreground">
        <div className="text-center">
          <div className="text-4xl mb-2">💬</div>
          <p className="text-sm">No hay mensajes aún</p>
          <p className="text-xs">¡Envía el primer mensaje!</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col space-y-1 h-full">
      <div className="flex-1">
        {messages.map((message) => (
          <MessageChat
            key={message.id}
            message={message}
          />
        ))}
      </div>
      <div ref={messagesEndRef} />
    </div>
  );
};
export default MessagesChat;
