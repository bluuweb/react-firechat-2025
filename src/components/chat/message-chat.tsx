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

  const isFriend = user?.uid !== message.senderId;

  return (
    <div
      className={cn(
        "max-w-[150px] p-2 rounded",
        isFriend ? "bg-pink-200" : "bg-green-200 ml-auto"
      )}
    >
      <p>{message.text}</p>
      <p className="truncate text-xs">
        {isFriend ? (
          <Suspense fallback="cargando user info...">
            <FriendEmail friendUID={message.senderId} />
          </Suspense>
        ) : (
          user.email
        )}
      </p>
    </div>
  );
};
export default MessageChat;
