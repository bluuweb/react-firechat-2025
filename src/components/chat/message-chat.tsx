import { cn } from "@/lib/utils";
import type { Message } from "@/schemas/room.schema";
import { User } from "lucide-react";
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
          "flex max-w-[70%] gap-3",
          isOwn ? "flex-row-reverse" : "flex-row"
        )}
      >
        <div
          className={cn(
            "w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 mt-auto",
            isOwn ? "bg-blue-500" : "bg-slate-200"
          )}
        >
          <User
            className={cn("w-4 h-4", isOwn ? "text-white" : "text-slate-600")}
          />
        </div>
        <div className="flex flex-col">
          <div
            className={cn(
              "px-4 py-2 rounded-2xl text-sm break-words max-w-full",
              isOwn
                ? "bg-blue-500 text-white rounded-br-md"
                : "bg-slate-100 text-slate-900 rounded-bl-md"
            )}
          >
            <p className="leading-relaxed">{message.text}</p>
          </div>
          <div
            className={cn(
              "text-xs text-slate-500 mt-1 px-2",
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
