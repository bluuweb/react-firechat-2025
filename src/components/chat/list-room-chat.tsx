import { useRoomActions } from "@/hooks/use-room-actions";
import RoomChat from "./button-room-chat";

interface Props {
  handleClickRoomId: (id: string) => void;
}

const ListRoomChat = ({ handleClickRoomId }: Props) => {
  const { rooms } = useRoomActions();

  return (
    <div>
      {rooms.map((room) => (
        <RoomChat
          key={room.id}
          room={room}
          handleClickRoomId={handleClickRoomId}
        />
      ))}
      {/* <pre>{JSON.stringify(rooms, null, 2)}</pre> */}
    </div>
  );
};
export default ListRoomChat;
