import { useRoomActions } from "@/hooks/use-room-actions";
import { Button } from "../ui/button";

interface Props {
  handleSelectedRoomId: (roomId: string) => void;
}

const ListRoomChat = ({ handleSelectedRoomId }: Props) => {
  const { rooms } = useRoomActions();

  return (
    <div>
      {rooms.map((room) => (
        <div key={room.id}>
          <Button onClick={() => handleSelectedRoomId(room.id)}>
            {room.id}
          </Button>
        </div>
      ))}
      <pre>{JSON.stringify(rooms, null, 2)}</pre>
    </div>
  );
};
export default ListRoomChat;
