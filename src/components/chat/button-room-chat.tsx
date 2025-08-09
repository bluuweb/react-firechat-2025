import type { Room } from "@/schemas/room.schema";
import { User } from "lucide-react";
import { Suspense } from "react";
import { useUser } from "reactfire";
import { Button } from "../ui/button";
import FriendEmail from "./friend-email";

interface Props {
  room: Room;
  handleClickRoomId: (id: string) => void;
}

const RoomChat = ({ room, handleClickRoomId }: Props) => {
  const { data: user } = useUser();

  const friendUID = room.participants.find((id) => id !== user?.uid) || "";

  return (
    <Button
      variant="ghost"
      className="w-full justify-start p-4 h-auto hover:bg-slate-50 rounded-none border-b border-slate-100 last:border-b-0 transition-colors"
      onClick={() => handleClickRoomId(room.id)}
    >
      <div className="flex items-center gap-3 w-full">
        <div className="w-10 h-10 bg-blue-50 rounded-full flex items-center justify-center flex-shrink-0">
          <User className="w-5 h-5 text-blue-500" />
        </div>
        <div className="flex-1 text-left min-w-0">
          <div className="font-medium text-sm text-slate-900 truncate">
            <Suspense fallback="Cargando...">
              <FriendEmail friendUID={friendUID} />
            </Suspense>
          </div>
          <div className="text-xs text-slate-500 truncate">
            {room.lastMessage?.text || "Sin mensajes"}
          </div>
        </div>
        <div className="w-2 h-2 bg-green-400 rounded-full flex-shrink-0"></div>
      </div>
    </Button>
  );
};
export default RoomChat;
