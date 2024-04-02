import {
  Chat,
  ChatMessage,
  ReadMessage,
  WSInEvent,
  WSOutEvent,
  WSOutEventType,
} from "@/models/Chat";
import getMessages from "@/services/chat/getMessages";
import getUserById from "@/services/users/getUserById";
import React, {
  createContext,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";

interface ChatContextType {
  chatUserId: string;
  chats: { [key: string]: Chat };
  messages: { [key: string]: ChatMessage[] };
  isOpen: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isChat: boolean;
  setChat: React.Dispatch<React.SetStateAction<boolean>>;
  fetchChats: (query?: string) => Promise<Chat[]>;
  fetchMessages: (offset?: number) => Promise<void>;
  sendMessage: (message: string) => void;
  openChat: (chatId: string) => Promise<void>;
  closeChat: () => void;
}

const ChatContext = createContext<ChatContextType>({} as ChatContextType);

interface ChatContextProviderProps {
  children: React.ReactNode;
}

const ChatContextProvider = ({ children }: ChatContextProviderProps) => {
  const connRef = useRef<WebSocket>();
  const [isConnected, setConnected] = useState<boolean>(false);

  const [isOpen, setOpen] = useState<boolean>(false);
  const [isChat, setChat] = useState<boolean>(false);

  const [chatUserId, setChatUserId] = useState<string>("");
  const [chats, setChats] = useState<{
    [key: string]: Chat;
  }>({});

  const [messages, setMessages] = useState<{
    [key: string]: ChatMessage[];
  }>({});

  const appendMessage = useCallback((chatId: string, msg: ChatMessage) => {
    setMessages((prev) => {
      return {
        ...prev,
        [chatId]: [...prev[chatId], msg],
      };
    });
  }, []);

  const replaceMessage = useCallback(
    (chatId: string, index: number, msg: ChatMessage) => {
      setMessages((prev) => {
        let msgs = [...prev[chatId]];
        msgs[index] = msg;
        return {
          ...prev,
          [chatId]: msgs,
        };
      });
    },
    []
  );

  const send = useCallback(
    (event: WSOutEventType, content: string, sentAt: Date): string => {
      if (!connRef.current) return "";

      let tag: string = Math.random().toString(16).substring(2);
      let msg: WSOutEvent = {
        event,
        content,
        sent_at: sentAt.toISOString(),
        tag,
      };

      connRef.current.send(JSON.stringify(msg));

      return tag;
    },
    []
  );

  const sendMessage = useCallback(
    (message: string) => {
      let sentAt = new Date(Date.now());
      let tag = send("MSG", message, sentAt);

      setMessages((prev) => {
        return {
          ...prev,
          [chatUserId]: [
            ...prev[chatUserId],
            {
              message_id: tag,
              sent_at: sentAt.toISOString(),
              chat_id: chatUserId,
              author: true,
              content: message,
              read_at: "sending",
            },
          ],
        };
      });
    },
    [chatUserId, send]
  );

  const fetchChats = useCallback(async (query?: string): Promise<Chat[]> => {
    try {
      const url = `${process.env.NEXT_PUBLIC_HTTP_BACKEND_HOST!}/api/v1/chats?query=${query || ""}`;
      let response = await fetch(url, {
        method: "GET",
        credentials: "include",
      });

      let chats: Chat[] = (await response.json()) || [];

      setChats(() => {
        return Object.fromEntries(chats.map((chat) => [chat.user_id, chat]));
      });

      setMessages((prev) => {
        let cpy = { ...prev };
        for (let chat of chats) cpy[chat.user_id] = cpy[chat.user_id] || [];
        return cpy;
      });

      return Promise.resolve(chats);
    } catch (err) {
      return Promise.reject(err);
    }
  }, []);

  const fetchMessages = useCallback(
    async (offset: number = messages[chatUserId].length) => {
      const limit = 10;
      let msgs = await getMessages(chatUserId, offset, limit);
      setMessages((prev) => {
        return { ...prev, [chatUserId]: msgs.concat(prev[chatUserId]) };
      });
    },
    [chatUserId, messages]
  );

  const initChat = useCallback(
    async (userId: string): Promise<void> => {
      if (chats[userId]) return Promise.resolve();
      try {
        let user = await getUserById(userId);
        setChats((prev) => {
          return {
            ...prev,
            [userId]: {
              content: "",
              first_name: user.first_name,
              last_name: user.last_name,
              profile_image_url: user.profile_image_url,
              unread_messages: 0,
              user_id: user.user_id,
            },
          };
        });

        setMessages((prev) => {
          return {
            ...prev,
            [userId]: [] as ChatMessage[],
          };
        });
      } catch (err) {
        Promise.reject(err);
      }
    },
    [chats]
  );

  const openChat = useCallback(
    async (chatId: string): Promise<void> => {
      await initChat(chatId);

      send("JOIN", chatId, new Date(Date.now()));
      setChatUserId(chatId);
      setChat(true);
      setChats((prev) => {
        return {
          ...prev,
          [chatId]: {
            ...prev[chatId],
            unread_messages: 0,
          },
        };
      });
    },
    [send, initChat]
  );

  const closeChat = useCallback(() => {
    setChatUserId("");
    send("LEFT", "", new Date(Date.now()));
  }, [send]);

  const onMessage = useCallback(
    async (e: MessageEvent<string>) => {
      let msg = JSON.parse(e.data) as WSInEvent;

      console.log(msg);

      switch (msg.event) {
        case "MSG":
          {
            let payload = msg.payload as ChatMessage;

            await initChat(payload.chat_id);

            setChats((prev) => {
              return {
                ...prev,
                [payload.chat_id]: {
                  ...prev[payload.chat_id],
                  content: payload.content,
                  unread_messages:
                    payload.chat_id === chatUserId
                      ? 0
                      : prev[payload.chat_id].unread_messages + 1,
                },
              };
            });

            let msgs = messages[payload.chat_id] || [];
            let idx = msgs.findIndex((m) => m.message_id === msg.tag);

            // other message
            if (idx == -1) appendMessage(payload.chat_id, payload);
            // my message
            else replaceMessage(payload.chat_id, idx, payload);
          }
          break;

        case "READ":
          {
            let payload = msg.payload as ReadMessage;

            setMessages((prev) => {
              return {
                ...prev,
                [payload.chat_id]: prev[payload.chat_id].map((m) =>
                  m.read_at === null ? { ...m, read_at: payload.read_at } : m
                ),
              };
            });
          }
          break;

        case "OK":
          {
            setConnected(true);
            fetchChats();
            console.log("Connected");
          }
          break;
      }
    },
    [chatUserId, messages, appendMessage, replaceMessage, fetchChats]
  );

  useEffect(() => {
    if (!connRef.current) {
      let conn = new WebSocket(
        `${process.env.NEXT_PUBLIC_WS_BACKEND_HOST!}/ws/chats`
      );

      connRef.current = conn;
    }

    connRef.current.onclose = (e: CloseEvent) => {
      console.log("Disconnected", e.reason);
      setConnected(false);
    };

    connRef.current.onmessage = (e: MessageEvent<string>) => {
      onMessage(e);
    };
  }, [onMessage, fetchChats]);

  return (
    <ChatContext.Provider
      value={{
        chatUserId,
        chats,
        messages,
        isChat,
        setChat,
        isOpen,
        setOpen,
        fetchChats,
        fetchMessages,
        sendMessage,
        openChat,
        closeChat,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};

export { ChatContextProvider, ChatContext };
