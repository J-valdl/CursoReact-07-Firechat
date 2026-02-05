import type { Room } from "@/schemas/room.schema";
import {
  addDoc,
  collection,
  getDocs,
  query,
  serverTimestamp,
  where,
} from "firebase/firestore";
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

  const searchUserWithEmail = async (email: string) => {
    const usersRef = collection(db, "users");
    const q = query(usersRef, where("email", "==", email));

    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      return null;
    }

    const doc = querySnapshot.docs[0];

    return doc.data();
  };

  const findOrCreateRoom = async (friendEmail: string) => {
    if (!user)
      return {
        success: false,
        message: "Error 401",
        roomId: null,
      };

    if (user.email === friendEmail)
      return {
        success: false,
        message: "Error 400 - No te puedes buscar a ti mismo",
        roomId: null,
      };

    const friend = await searchUserWithEmail(friendEmail);

    if (!friend)
      return {
        success: false,
        message: "Error 404 - Friend no encontrado",
        roomId: null,
      };

    const existRoom = rooms.find((room) =>
      room.participants.find((u: string) => u === friend.uid)
    );

    if (existRoom)
      return {
        success: true,
        message: "Ya existe la sala",
        roomId: existRoom.id,
      };

    const newRoom: Omit<Room, "id"> = {
      createdAt: serverTimestamp(),
      lastMessage: null,
      participants: [friend.uid, user.uid],
    };

    const document = await addDoc(roomRef, newRoom);
    return {
      success: true,
      message: "Sala creada",
      roomId: document.id,
    };
  };

  return {
    rooms: rooms as Room[],
    findOrCreateRoom,
  };
};
