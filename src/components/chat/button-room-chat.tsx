import type { Room } from "@/schemas/room.schema";
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
      className="w-full justify-start p-4 h-auto hover:bg-accent/50 rounded-none"
      onClick={() => handleClickRoomId(room.id)}
    >
      <div className="flex items-center gap-3 w-full">
        <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
          <span className="text-sm font-medium">👤</span>
        </div>
        <div className="flex-1 text-left">
          <div className="font-medium text-sm">
            <Suspense fallback="Cargando...">
              <FriendEmail friendUID={friendUID} />
            </Suspense>
          </div>
          <div className="text-xs text-muted-foreground">
            {room.lastMessage?.text || "Sin mensajes"}
          </div>
        </div>
      </div>
    </Button>
  );
};
export default RoomChat;
