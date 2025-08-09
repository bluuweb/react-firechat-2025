import { cn } from "@/lib/utils";
import type { Message } from "@/schemas/room.schema";
import { Suspense } from "react";
import { useUser } from "reactfire";
import FriendEmail from "./friend-email";

interface Props {
  message: Message;
}

const MessageChat = ({ message }: Props) => {
  const { data: user } = useUser();

  const isOwn = user?.uid === message.senderId;

  return (
    <div
      className={cn(
        "flex w-full mb-4",
        isOwn ? "justify-end" : "justify-start"
      )}
    >
      <div
        className={cn(
          "flex max-w-[70%] gap-2",
          isOwn ? "flex-row-reverse" : "flex-row"
        )}
      >
        <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0 mt-auto">
          <span className="text-xs">👤</span>
        </div>
        <div className="flex flex-col">
          <div
            className={cn(
              "px-3 py-2 rounded-lg text-sm break-words",
              isOwn
                ? "bg-primary text-primary-foreground rounded-br-sm"
                : "bg-muted rounded-bl-sm"
            )}
          >
            {message.text}
          </div>
          <div
            className={cn(
              "text-xs text-muted-foreground mt-1 px-1",
              isOwn ? "text-right" : "text-left"
            )}
          >
            {isOwn ? (
              user.email
            ) : (
              <Suspense fallback="...">
                <FriendEmail friendUID={message.senderId} />
              </Suspense>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
export default MessageChat;
