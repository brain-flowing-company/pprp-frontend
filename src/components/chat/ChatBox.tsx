"use client";

import Image from "next/image";
import ChatList from "./ChatList";
import SearchBar from "./SearchBar";
import { useContext, useEffect, useState } from "react";
import { ChatContext } from "@/context/ChatContext";

export default function ChatBox() {
  const [searchValue, setSearchValue] = useState<string>("");
  const ctx = useContext(ChatContext);
  const chats = Object.values(ctx.chats);

  useEffect(() => {
    ctx.fetchChats(searchValue);
  }, [searchValue]);

  return (
    <div className="flex h-[528px] w-96 flex-col gap-y-4 rounded-t-xl bg-white px-6 py-5 shadow-xl shadow-slate-500">
      <div className="flex flex-row justify-between">
        <div className="text-xl font-bold">Chat</div>
        <div className="flex flex-row gap-x-4 text-lg">
          <button className="rounded-md hover:bg-slate-300">
            <Image
              src="/img/chat/create-message-icon.svg"
              width={24}
              height={24}
              alt="create message"
            />
          </button>
          <button
            className="rounded-md hover:bg-slate-300"
            onClick={() => {
              ctx.setOpen(false);
            }}
          >
            <Image
              src="/img/chat/close-icon.svg"
              width={24}
              height={24}
              alt="close button"
            />
          </button>
        </div>
      </div>
      <SearchBar setSearchValue={setSearchValue} searchAfterMS={400} />
      <ChatList chats={chats} />
    </div>
  );
}
