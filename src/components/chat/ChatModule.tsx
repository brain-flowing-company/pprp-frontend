"use client";
import getCurrentUser from "@/services/users/getCurrentUser";
import { useContext, useEffect, useState } from "react";
import UserData from "@/models/UserData";
import ChatIcon from "./ChatIcon";
import ChatBox from "./ChatBox";
import MessageBox from "./MessageBox";
import { ChatContext } from "@/context/ChatContext";
import ChatNotification from "./ChatNotification";

export default function ChatModule() {
  const [user, setUser] = useState<UserData>();

  const ctx = useContext(ChatContext);

  useEffect(() => {
    async function getUser() {
      const user = await getCurrentUser();
      if (user) {
        setUser(user);
      }
    }
    getUser();
  }, []);

  return (
    <div className="fixed bottom-0 right-0 flex">
      {user && (
        <div className="flex flex-row items-end justify-end gap-x-6">
          {ctx.isChat && <MessageBox />}
          {ctx.isOpen && <ChatBox />}
          <div
            className="relative p-4"
            onClick={() => ctx.setOpen((prev) => !prev)}
          >
            <ChatNotification />
            <ChatIcon />
          </div>
        </div>
      )}
    </div>
  );
}
