import { Chat } from "@/models/Chat";
import UserCard from "./UserCard";

interface ChatListProps {
  chats: Chat[];
}

export default function ChatList({ chats }: ChatListProps) {
  return (
    <div className="flex h-full flex-col overflow-auto">
      {chats.length === 0 && (
        <div className="flex h-full select-none items-center justify-center font-semibold">
          No chats
        </div>
      )}
      {chats &&
        chats.map((item: Chat, index: number) => (
          <UserCard key={index} chat={item} />
        ))}
    </div>
  );
}
