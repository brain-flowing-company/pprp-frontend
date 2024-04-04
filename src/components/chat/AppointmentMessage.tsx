import AppointmentData from "@/models/AppointmentData";
import getOneAppointment from "@/services/appointments/getOneAppointment";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function AppointmentMessage({ message }: { message: string }) {
  const [data, setData] = useState<AppointmentData>();
  const [img, setImg] = useState<string>("/img/Boss.png");
  useEffect(() => {
    async function getProperty() {
      try {
        const data = await getOneAppointment(message);
        setData(data);
        console.log(data.property.property_images[0]);
        if (data.property.property_images[0]) {
          setImg(data.property.property_images[0].image_url);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
    getProperty();
  }, []);
  return (
    <div className="flex w-full flex-col gap-y-2 break-words rounded-xl bg-ci-light-gray px-4 py-3">
      {data?.status == "PENDING" && (
        <div>
          You have created an appointment with {data?.owner.owner_first_name}{" "}
          {data?.owner.owner_last_name}
        </div>
      )}

      {data?.status == "CONFIRMED" && (
        <div>
          Your appointment with {data?.owner.owner_first_name}{" "}
          {data?.owner.owner_last_name} have been confirmed
        </div>
      )}

      {data?.status == "REJECTED" && (
        <div>
          {data?.owner.owner_first_name} {data?.owner.owner_last_name} has
          rejected your appointment
        </div>
      )}

      {data?.status == "CANCELLED" && (
        <div>
          You have cancelled an appointment with {data?.owner.owner_first_name}{" "}
          {data?.owner.owner_last_name}
        </div>
      )}

      <span className="w-full border-t border-black"></span>
      <div className="flex flex-row items-center gap-x-3">
        <div className="relative flex aspect-square size-16 items-center justify-center overflow-hidden rounded-lg">
          <Image
            src={img || "/img/boss.png"}
            alt="ไอบอสสสส"
            draggable={false}
            fill={true}
            style={{ objectFit: "cover" }}
          />
        </div>
        <div className="flex w-3/5 flex-col justify-center">
          <div className="text-lg font-bold">Lumpini</div>
          <div className="break-all">Date: 16/8/67</div>
          <div className="flex flex-row gap-x-1">
            Status:
            {data?.status == "PENDING" && (
              <div className="rounded-lg bg-ci-yellow px-2">Pending</div>
            )}
            {data?.status == "CONFIRMED" && (
              <div className="rounded-lg bg-ci-green px-2">Confirm</div>
            )}
            {data?.status == "REJECTED" && (
              <div className="rounded-lg bg-ci-red px-2">Rejected</div>
            )}
            {data?.status == "CANCELLED" && (
              <div className="rounded-lg bg-ci-red px-2">Cancelled</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
