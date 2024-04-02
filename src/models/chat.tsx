export type WSOutEventType = "MSG" | "JOIN" | "LEFT";
export interface WSOutEvent {
  event: WSOutEventType;
  content: string;
  sent_at: string;
  tag: string;
}

export type WSInEventType = "MSG" | "READ" | "OK";
export interface WSInEvent {
  event: WSInEventType;
  tag: string;
  payload: any;
}

export interface ChatMessage {
  message_id: string;
  chat_id: string;
  content: string;
  read_at: string;
  sent_at: string;
  author: boolean;
  attatchment: {
    property_id: string
    agreement_id: string
    appointment_id: string
  };
}

export interface Chat {
  user_id: string;
  first_name: string;
  last_name: string;
  profile_image_url: string;
  unread_messages: number;
  content: string;

}

export interface ReadMessage {
  chat_id: string;
  read_at: string;
}
