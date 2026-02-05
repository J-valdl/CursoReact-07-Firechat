import type { LastMessage, Message } from "@/schemas/room.schema";
import {
  addDoc,
  collection,
  doc,
  orderBy,
  query,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import { useFirestore, useFirestoreCollectionData, useUser } from "reactfire";

export const useMessagesActions = (roomId: string) => {
  const { data: user } = useUser();

  const db = useFirestore();

  const messageRef = collection(db, "rooms", roomId, "messages");

  const messageQuery = query(messageRef, orderBy("timestamp", "asc"));

  const { data: messages } = useFirestoreCollectionData(messageQuery, {
    suspense: true,
    idField: "id",
  });

  const sendMessage = async (text: string) => {
    if (!user) throw new Error("useMessageActions: No existe usuario");

    const timestamp = serverTimestamp();

    // crear mensaje
    // Usar Omit para excluir 'id' al crear el mensaje
    const messageData: Omit<Message, "id"> = {
      text: text.trim(),
      senderId: user.uid,
      timestamp,
    };

    // actualizar lastMessage en el room
    const roomDocumentRef = doc(db, "rooms", roomId);

    const lastMessage: LastMessage = {
      senderId: user.uid,
      text: text.trim(),
      timestamp,
    };

    await Promise.all([
      addDoc(messageRef, messageData),
      updateDoc(roomDocumentRef, { lastMessage }),
    ]);
  };

  return { messages: messages as Message[], sendMessage };
};
