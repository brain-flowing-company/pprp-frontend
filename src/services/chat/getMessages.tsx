import { ChatMessage } from "@/models/Chat";

export default async function getMessages(
  userId: string,
  offset: number,
  limit: number = 10
): Promise<ChatMessage[]> {
  try {
    const url = `${process.env.NEXT_PUBLIC_HTTP_BACKEND_HOST!}/api/v1/chats/${userId}?offset=${offset}&limit=${limit}`;
    let response = await fetch(url, {
      method: "GET",
      credentials: "include",
    });

    let messages: ChatMessage[] = (await response.json()) || [];

    return Promise.resolve(messages);
  } catch (err) {
    return Promise.reject(err);
  }
}
