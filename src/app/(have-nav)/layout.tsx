"use client";

import ChatModule from "@/components/chat/ChatModule";
import PropertyNavigationBar from "@/components/property-description/PropertyNavigationBar";
import { ChatContextProvider } from "@/context/ChatContext";

import { SearchContextProvider } from "@/context/SearchContext";
import { AuthContextProvider } from "@/context/AuthContext";

export default function Suechaokhai({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <AuthContextProvider>
        <ChatContextProvider>
          <PropertyNavigationBar />
          <div>
            <div className="">
              <SearchContextProvider>{children}</SearchContextProvider>
            </div>
          </div>
          <ChatModule />
        </ChatContextProvider>
      </AuthContextProvider>
    </div>
  );
}
