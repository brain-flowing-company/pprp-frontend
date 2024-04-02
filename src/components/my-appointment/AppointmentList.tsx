import Image from "next/image";
import StatusBox from "@/components/my-appointment/StatusBox";
import {
  DetailButton,
  CancelButton,
  ConfirmButton,
  RejectButton,
} from "@/components/my-appointment/InteractiveButton";
import { useEffect, useState } from "react";
import UpdateAppointmentStatus from "@/services/appointments/updateAppointmentStatus";
import { useRouter } from "next/navigation";

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
  isOwner,
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
  isOwner: boolean;
}) {
  const [reason, setReason] = useState("");
  const [isCancelled, setCancel] = useState(false);
  const [isConfirm, setConfirm] = useState(false);
  const [isRejected, setRejected] = useState(false);
  const [currentStatus, setCurrentStatus] = useState(status);

  const router = useRouter();

  useEffect(() => {
    const updateCancel = async () => {
      const state = isOwner? "REJECTED" : "CANCELLED";
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

  useEffect(() => {
    const updateConfirm = async () => {
      if (isConfirm) {
        const data = await UpdateAppointmentStatus({
          appointmentId: apptId,
          status: "CONFIRMED",
          msg: "",
        });
        console.log(data);
        setCurrentStatus("Confirmed");
      }
    };
    updateConfirm();
  }, [isConfirm]);

  useEffect(() => {
    const updateRejected = async () => {
      if (isRejected) {
        const data = await UpdateAppointmentStatus({
          appointmentId: apptId,
          status: "REJECTED",
          msg: "",
        });
        console.log(data);
        setCurrentStatus("Rejected");
      }
    };
    updateRejected();
  }, [isRejected]);

  return (
    <div className="flex h-[240px] w-full border-x-4 border-y-2 border-ci-dark-gray bg-ci-light-gray hover:cursor-pointer" 
    onClick={() => router.push(`/my-appointment/${apptId}`)}
    >
      <div className="mx-auto flex h-[67%] w-[90%] flex-row my-auto">
        <div className="my-auto flex w-[40%] flex-row">
          <div className="my-auto w-40 relative flex aspect-square items-center justify-center overflow-hidden rounded-lg cursor-auto"  onClick={(e) => e.stopPropagation()}
          >
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
            <div className="medium-text font-medium hover:cursor-text" onClick={(e) => e.stopPropagation()}>{propertyName}</div>
            <div className="small-text font-normal hover:cursor-text" onClick={(e) => e.stopPropagation()}>{propertySubName}</div>
            <div className="mt-3 flex flex-row small-text font-normal">
              <div className="w-20 relative flex aspect-square items-center justify-center overflow-hidden rounded-full hover:cursor-auto" onClick={(e) => e.stopPropagation()}>
                <Image
                  src={ownerImgSrc}
                  alt="Owner Image"
                  draggable={false}
                  fill
                  objectFit="cover"
                  // layout="responsive"
                />
              </div>
              <div className="mx-2 my-auto hover:cursor-text" onClick={(e) => e.stopPropagation()}>{ownerName}</div>
            </div>
          </div>
        </div>
        <div className="font-regular medium-text my-auto mx-auto flex w-[15%] flex-col hover:cursor-text" 
          onClick={(e) => e.stopPropagation()}>
          <div>{date}</div>
          <div className="mt-2">{time}</div>
        </div>
        <div className="my-auto mx-auto h-[30%] w-[12.5%] hover:cursor-auto" onClick={(e) => e.stopPropagation()}>
          <StatusBox status={currentStatus} />
        </div>
        <div className="my-auto ml-auto flex h-full w-[12.5%] flex-col justify-center">
          {/* <DetailButton appointmentId={apptId} /> */}
          {(isOwner && currentStatus === 'Pending') ? (
            <>
              <div className="my-auto">
                <ConfirmButton status={currentStatus} setConfirm={setConfirm}/>
              </div>
              <div className="my-auto">
                <RejectButton status={currentStatus} setRejected={setRejected}/>
              </div>
            </>
          ) : null}
          {(((!isOwner) && currentStatus !== 'Rejected') || currentStatus === 'Confirmed') ? (
            <div className="my-auto">
              <CancelButton
                status={currentStatus}
                reasontmp={reason}
                setReason={setReason}
                setCancel={setCancel}
              />
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}
