import { useRoomActions } from "@/hooks/use-room-actions";
import RoomChat from "./button-room-chat";

interface Props {
  handleClickRoomId: (id: string) => void;
}

const ListRoomChat = ({ handleClickRoomId }: Props) => {
  const { rooms } = useRoomActions();

  if (rooms.length === 0) {
    return (
      <div className="p-4 text-center text-sm text-muted-foreground">
        No hay conversaciones aún
      </div>
    );
  }

  return (
    <div className="divide-y">
      {rooms.map((room) => (
        <RoomChat
          key={room.id}
          room={room}
          handleClickRoomId={handleClickRoomId}
        />
      ))}
    </div>
  );
};
export default ListRoomChat;
