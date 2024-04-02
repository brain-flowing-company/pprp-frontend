"use client";

import React, {
  Dispatch,
  SetStateAction,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import Message from "./Message";
import { ChatMessage } from "@/models/Chat";
import { useIntersectionObserver } from "@/hook/IntersectionObserver";

interface MessageSectionProps {
  messages: ChatMessage[];
  setVisible: Dispatch<SetStateAction<boolean>>;
  autoScrolling: boolean;
  setAutoScrolling: Dispatch<SetStateAction<boolean>>;
}

export interface MessageSectionHandler {
  scrollToBottom: (instant?: boolean) => void;
}

function MessageSection(
  props: MessageSectionProps,
  ref: React.Ref<MessageSectionHandler>
) {
  const { messages, setVisible, autoScrolling, setAutoScrolling } = props;
  const topRef = useRef<HTMLDivElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const [bottomOffset, setBottomOffset] = useState<number>(0);

  const scrollToBottom = (instant: boolean = true) => {
    setAutoScrolling(true);
    bottomRef.current?.scrollIntoView({
      behavior: instant ? "instant" : "smooth",
    });
  };

  const scrollToLastPosition = () => {
    contentRef.current?.scrollTo(
      0,
      contentRef.current!.scrollHeight - bottomOffset
    );
  };

  useImperativeHandle(ref, () => ({
    scrollToBottom,
  }));

  useEffect(() => {
    if (autoScrolling) scrollToBottom();
    else scrollToLastPosition();
  }, [messages]);

  useEffect(() => {
    if (contentRef.current) {
      contentRef.current.addEventListener("scroll", (e: Event) => {
        setBottomOffset(
          contentRef.current!.scrollHeight - contentRef.current!.scrollTop
        );
      });
    }
  }, [contentRef]);

  const splitMessages = (): { sent: ChatMessage[]; sending: ChatMessage[] } => {
    let idx;
    for (idx = 0; idx < messages.length; idx++)
      if (messages[idx].read_at === "sending") break;

    return {
      sent: messages.slice(0, idx),
      sending: messages.slice(idx),
    };
  };

  const { sent, sending } = splitMessages();

  useIntersectionObserver(bottomRef, 0.0, (isIntersecting: boolean) =>
    setAutoScrolling(isIntersecting)
  );

  useIntersectionObserver(topRef, 1.0, (isIntersecting: boolean) => {
    setVisible(isIntersecting);
  });

  return (
    <div className="flex h-full flex-col overflow-y-auto px-6" ref={contentRef}>
      <div ref={topRef}></div>
      <div className="flex flex-col gap-4">
        {sent.map((item: ChatMessage) => (
          <Message key={item.message_id} message={item} />
        ))}
      </div>
      <div className="mt-4 flex flex-col gap-4 text-ci-dark-gray">
        {sending.map((item: ChatMessage) => (
          <Message key={item.message_id} message={item} />
        ))}
      </div>
      <div ref={bottomRef}></div>
    </div>
  );
}

export default React.forwardRef<MessageSectionHandler, MessageSectionProps>(
  MessageSection
);
