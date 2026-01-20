import type { Room } from "@/schemas/room.schema";
import { collection, query, where } from "firebase/firestore";
import { useFirestore, useFirestoreCollectionData, useUser } from "reactfire";

export const useRoomActions = () => {
  const db = useFirestore();
  const { data: user } = useUser();

  if (!user) throw new Error("Usuario no autorizado");

  const roomRef = collection(db, "rooms");

  const roomQuery = query(
    roomRef,
    where("participants", "array-contains", user.uid)
  );

  const { data: rooms } = useFirestoreCollectionData(roomQuery, {
    suspense: true,
    idField: "id",
  });

  return {
    rooms: rooms as Room[],
  };
};
