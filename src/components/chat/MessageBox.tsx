"use client";

import Image from "next/image";
import TextFieldSection from "./TextFieldSection";
import ProfileImage from "./ProfileImage";
import { useContext, useEffect, useRef, useState } from "react";
import MessageSection, { MessageSectionHandler } from "./MessageSection";
import { ChatContext } from "@/context/ChatContext";

export default function MessageBox() {
  const ctx = useContext(ChatContext);
  const chat = ctx.chats[ctx.chatUserId];
  const messages = ctx.messages[ctx.chatUserId];

  const [isVisible, setVisible] = useState<boolean>(false);
  const [isFetching, setFetching] = useState<boolean>(false);

  const [autoScrolling, setAutoScrolling] = useState<boolean>(true);
  const contentRef = useRef<MessageSectionHandler>(null);

  useEffect(() => {
    if (isVisible && !isFetching) {
      setFetching(true);
      ctx.fetchMessages().then(() => setFetching(false));
    }
  }, [isVisible, ctx.chatUserId]);

  const sendMessage = (msg: string) => {
    ctx.sendMessage(msg);
  };

  return (
    <div className="relative flex h-[528px] w-96 flex-col rounded-t-xl bg-white pb-2 shadow-xl shadow-slate-500">
      <div className="mb-4 flex flex-row items-center justify-start gap-4 px-6 py-4 shadow-lg shadow-slate-300">
        <div className="flex size-12 shrink-0 items-center justify-center overflow-hidden rounded-full">
          <ProfileImage src={chat.profile_image_url} />
        </div>
        <div className="w-full truncate text-xl font-bold">{`${chat.first_name} ${chat.last_name}`}</div>
        <div className="flex shrink-0 flex-row gap-x-4 text-lg">
          <button className="rounded-md hover:bg-slate-300">
            <Image
              src="/img/chat/agreement.svg"
              width={24}
              height={24}
              alt="agreement"
            />
          </button>
          <button
            className="rounded-md hover:bg-slate-300"
            onClick={() => {
              ctx.closeChat();
              ctx.setChat(false);
            }}
          >
            <Image
              src="/img/chat/close-icon.svg"
              width={24}
              height={24}
              alt="close"
            />
          </button>
        </div>
      </div>
      <MessageSection
        messages={messages}
        setVisible={setVisible}
        autoScrolling={autoScrolling}
        setAutoScrolling={setAutoScrolling}
        ref={contentRef}
      />
      <TextFieldSection sendMessage={sendMessage} />
      {!autoScrolling && (
        <div className="absolute bottom-20 flex w-full justify-center">
          <button
            className="aspect-square w-10 cursor-pointer rounded-full bg-ci-light-gray/40 text-ci-dark-gray"
            onClick={() => contentRef.current?.scrollToBottom(false)}
          >
            <span className="flex size-full select-none items-center justify-center">
              v
            </span>
          </button>
        </div>
      )}
    </div>
  );
}
