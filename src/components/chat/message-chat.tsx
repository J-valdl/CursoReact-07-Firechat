import { cn } from "@/lib/utils";
import type { Message } from "@/schemas/room.schema";
import { Suspense } from "react";
import { useUser } from "reactfire";
import FriendEmail from "@/components/chat/friend-email";

interface Props {
  message: Message;
}

const MessageChat = ({ message }: Props) => {
  const { data: user } = useUser();
  const isFriend = user?.uid !== message.senderId;

  return (
    <div
      className={cn(
        "max-w-[150px] p-2",
        isFriend ? "bg-pink-100" : "bg-green-100 ml-auto",
      )}
    >
      <p>{message.text}</p>
      <p className="truncate text-xs">
        {isFriend ? (
          <Suspense fallback="cargando email...">
            <FriendEmail friendUID={message.senderId} />
          </Suspense>
        ) : (
          user.email
        )}
      </p>
    </div>
  );
};
export default MessageChat;
