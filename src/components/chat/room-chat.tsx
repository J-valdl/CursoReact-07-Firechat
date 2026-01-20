import { useRoomActions } from "@/hooks/use-room-actions";
import { Button } from "../ui/button";

interface Props {
  handleSelectedRoomId: (roomId: string) => void;
}

const RoomChat = ({ handleSelectedRoomId }: Props) => {
  const { rooms } = useRoomActions();

  return (
    <div>
      {rooms.map((item) => (
        <div key={item.id}>
          <Button onClick={() => handleSelectedRoomId(item.id)}>
            {item.id}
          </Button>
        </div>
      ))}
      <pre>{JSON.stringify(rooms, null, 2)}</pre>
    </div>
  );
};
export default RoomChat;
