import type { Room } from "@/schemas/room.schema";
import { collection, query, where } from "firebase/firestore";
import { useFirestore, useFirestoreCollectionData, useUser } from "reactfire";

export const useRoomActions = () => {
  const db = useFirestore();
  const { data: user } = useUser();

  const roomRef = collection(db, "rooms");

  // user.uid
  const roomQuery = query(
    roomRef,
    where("participants", "array-contains", user?.uid)
  );

  const { data: rooms } = useFirestoreCollectionData(roomQuery, {
    suspense: true,
    idField: "id",
  });

  return {
    rooms: rooms as Room[],
  };
};
