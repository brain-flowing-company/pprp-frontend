import Image from "next/image";
import StatusBox from "@/components/my-appointment/StatusBox";
import {
  DetailButton,
  CancelButton,
} from "@/components/my-appointment/InteractiveButton";
import { useEffect, useState } from "react";
import UpdateAppointmentStatus from "@/services/appointments/updateAppointmentStatus";

export default function AppointmentList({
  apptId,
  propertyImgSrc,
  propertyName,
  propertySubName,
  ownerImgSrc,
  ownerName,
  date,
  time,
  status,
}: {
  apptId: string;
  propertyImgSrc: string;
  propertyName: string;
  propertySubName: string;
  ownerImgSrc: string;
  ownerName: string;
  date: string;
  time: string;
  status: string;
}) {
  const [reason, setReason] = useState("");
  const [isCancelled, setCancel] = useState(false);
  const [currentStatus, setCurrentStatus] = useState(status);

  useEffect(() => {
    const updateCancel = async () => {
      if (isCancelled) {
        const data = await UpdateAppointmentStatus({
          appointmentId: apptId,
          status: "CANCELLED",
          msg: reason,
        });
        console.log(data);
        setCurrentStatus("Cancelled");
      }
    };
    updateCancel();
  }, [isCancelled]);

  return (
    <div className="flex h-[240px] w-full border-x-4 border-y-2 border-ci-dark-gray bg-ci-light-gray">
      <div className="mx-auto flex h-[67%] w-[90%] flex-row my-auto">
        <div className="my-auto flex w-[40%] flex-row">
          <div className="my-auto w-40 relative flex aspect-square items-center justify-center overflow-hidden rounded-lg">
            <Image
              src={propertyImgSrc}
              alt="propertyImg"
              draggable={false}
              fill
              objectFit="cover"
              // layout="responsive"
            />
          </div>
          <div className="my-auto ml-5 flex flex-col">
            <div className="text-2xl font-medium">{propertyName}</div>
            <div className="text-xl font-normal">{propertySubName}</div>
            <div className="mt-3 flex flex-row text-xl font-normal">
              <div className="w-20 relative flex aspect-square items-center justify-center overflow-hidden rounded-full">
                <Image
                  src={ownerImgSrc}
                  alt="Owner Image"
                  draggable={false}
                  fill
                  objectFit="cover"
                  // layout="responsive"
                />
              </div>
              <div className="mx-2 my-auto">{ownerName}</div>
            </div>
          </div>
        </div>
        <div className="font-regular my-auto mx-auto flex w-[15%] flex-col text-2xl">
          <div>{date}</div>
          <div className="mt-2">{time}</div>
        </div>
        <div className="my-auto mx-auto h-[30%] w-[12.5%]">
          <StatusBox status={currentStatus} />
        </div>
        <div className="my-auto ml-auto flex h-full w-[12.5%] flex-col justify-between">
          <DetailButton appointmentId={apptId} />
          <CancelButton
            status={currentStatus}
            reasontmp={reason}
            setReason={setReason}
            setCancel={setCancel}
          />
        </div>
      </div>
    </div>
  );
}
