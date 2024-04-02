"use client";

import ProfileImage from "./ProfileImage";
import { Chat } from "@/models/Chat";
import { useContext } from "react";
import { ChatContext } from "@/context/ChatContext";

interface UserCardProps {
  chat: Chat;
}

export default function UserCard({ chat }: UserCardProps) {
  const ctx = useContext(ChatContext);
  return (
    <div
      className="flex h-20 w-full cursor-pointer flex-row items-center justify-start gap-2 rounded-xl p-2 hover:bg-ci-light-gray"
      onClick={() => {
        ctx.openChat(chat.user_id);
      }}
    >
      <div className="aspect-square min-w-16 overflow-hidden rounded-full">
        <ProfileImage src={chat.profile_image_url} />
      </div>
      <div className="w-full overflow-hidden">
        <div className="truncate text-xl font-bold">{`${chat.first_name} ${chat.last_name}`}</div>
        <div className="truncate">{chat.content}</div>
      </div>
      {chat.unread_messages > 0 && (
        <div className="flex aspect-square size-6 items-center justify-center rounded-full bg-ci-red text-white">
          {chat.unread_messages}
        </div>
      )}
    </div>
  );
}
