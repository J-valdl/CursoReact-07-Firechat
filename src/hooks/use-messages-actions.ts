import type { Message } from "@/schemas/room.schema";
import { collection, orderBy, query } from "firebase/firestore";
import { useFirestore, useFirestoreCollectionData } from "reactfire";

export const useMessagesActions = (roomId: string) => {
  const db = useFirestore();

  const messageRef = collection(db, "rooms", roomId, "messages");

  const messageQuery = query(messageRef, orderBy("timestamp", "asc"));

  const { data: messages } = useFirestoreCollectionData(messageQuery, {
    suspense: true,
    idField: "id",
  });

  return { messages: messages as Message[] };
};
