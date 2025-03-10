"use client";
import { ChatMessage } from "@/models/Chat";
import PropertyMessage from "./PropertyMessage";
import AgreementMessage from "./AgreementMessage";
import AppointmentMessage from "./AppointmentMessage";
import { useEffect, useState } from "react";

const MessageStatus = ({ message }: { message: ChatMessage }) => {
  const sentAt = new Date(message.sent_at);
  const hour = String(sentAt.getHours()).padStart(2, "0");
  const minute = String(sentAt.getMinutes()).padStart(2, "0");

  return (
    <div className="flex h-full flex-col items-end justify-end">
      <div className="text-xs">
        {message.read_at !== null && message.author && "Read"}
      </div>
      <div className="text-xs">{`${hour}:${minute}`}</div>
    </div>
  );
};

const MessageContent = ({ message }: { message: ChatMessage }) => {
  return (
    <div className="break-all rounded-xl bg-ci-light-gray px-4 py-2">
      {message.content}
    </div>
  );
};

export default function Message({ message }: { message: ChatMessage }) {
  let type = "message";
  if (message.attatchment.agreement_id) type = "agreement";
  else if (message.attatchment.property_id) type = "property";
  else if (message.attatchment.appointment_id) type = "appointment";

  return (
    <div className={`flex ${message.author ? "justify-end" : "justify-start"}`}>
      <div
        className={`flex w-10/12 justify-end gap-2 ${message.author ? "flex-row" : "flex-row-reverse"}`}
      >
        <MessageStatus message={message} />
        {
          {
            message: <MessageContent message={message} />,
            property: (
              <PropertyMessage message={message.attatchment.property_id} />
            ),
            agreement: (
              <AgreementMessage message={message.attatchment.agreement_id} />
            ),
            appointment: (
              <AppointmentMessage
                message={message.attatchment.appointment_id}
              />
            ),
          }[type]
        }
      </div>
    </div>
  );
}
