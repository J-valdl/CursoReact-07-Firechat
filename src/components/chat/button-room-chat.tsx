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

  const friendUID = room.participants.find((uid) => uid !== user?.uid) || "";

  return (
    <Button onClick={() => handleClickRoomId(room.id)}>
      <Suspense fallback="Cargando email...">
        {<FriendEmail friendUID={friendUID} />}
      </Suspense>
    </Button>
  );
};
export default RoomChat;
