"use client";

import ChatModule from "@/components/chat/ChatModule";
import PropertyNavigationBar from "@/components/property-description/PropertyNavigationBar";
import { ChatContextProvider } from "@/context/ChatContext";

import { SearchContextProvider } from "@/context/SearchContext";

export default function Suechaokhai({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <ChatContextProvider>
        <PropertyNavigationBar />
        <div>
          <div className="">
            <SearchContextProvider>{children}</SearchContextProvider>
          </div>
        </div>
        <ChatModule />
      </ChatContextProvider>
    </div>
  );
}
