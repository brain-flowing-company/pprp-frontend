import { Chat } from "@/models/Chat";

export default async function getAllChats(query?: string): Promise<Chat[]> {
  try {
    const url = `${process.env.NEXT_PUBLIC_HTTP_BACKEND_HOST!}/api/v1/chats?query=${query || ""}`;
    let response = await fetch(url, {
      method: "GET",
      credentials: "include",
    });

    let chats = (await response.json()) || [];

    return Promise.resolve(chats);
  } catch (err) {
    return Promise.reject(err);
  }
}
