import MessagesChat from "@/components/chat/messages-chat";
import ListRoomChat from "@/components/chat/list-room-chat";
import { Suspense, useState } from "react";
import FormMessageChat from "@/components/chat/form-message-chat";

const ChatPage = () => {
  const [roomId, setRoomId] = useState("");

  const handleSelectedRoomId = (roomId: string) => {
    setRoomId(roomId);
  };

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2">
        <section>
          <Suspense fallback={<div>Cargando rooms...</div>}>
            <ListRoomChat handleSelectedRoomId={handleSelectedRoomId} />
          </Suspense>
        </section>
        <section>
          {roomId ? (
            <Suspense fallback={<div>Cargando mensajes...</div>}>
              <FormMessageChat roomId={roomId} />
              <MessagesChat roomId={roomId} />
            </Suspense>
          ) : (
            <div>Sin sala seleccionada</div>
          )}
        </section>
      </div>
    </div>
  );
};
export default ChatPage;
