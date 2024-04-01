import Image from "next/image";
import StatusBox from "@/components/my-agreement/StatusBox";
import { DetailButton, CancelButton } from "@/components/my-agreement/InteractiveButton";
import { useEffect, useState } from "react";
import UpdateAgreementStatus from "@/services/agreement/updateAgreementStatus";

export default function AgreementList({
    agreementId,
    propertyImgSrc,
    propertyName,
    propertySubName,
    ownerImgSrc,
    ownerName,
    date,
    time,
    status
} : {
    agreementId: string,
    propertyImgSrc: string,
    propertyName: string,
    propertySubName: string,
    ownerImgSrc: string,
    ownerName: string,
    date: string,
    time: string,
    status: string
}) {
    const [reason, setReason] = useState("");
    const [isCancelled, setCancel] = useState(false);
    const [currentStatus, setCurrentStatus] = useState(status);

    useEffect(() => {
        const updateCancel = async () => {
            if (isCancelled) {
                const data = await UpdateAgreementStatus({
                    agreementId: agreementId,
                    status: "CANCELLED",
                    msg: reason
                });
                console.log(data)
                setCurrentStatus("Cancelled")
            }
        }
        updateCancel();
    }, [isCancelled])

    return (
        <div className="border-ci-dark-gray border-y-2 border-x-4 bg-ci-light-gray w-full h-[240px]">
            <div className="flex flex-row w-[90%] h-[67%] mx-auto my-10 justify-between">
                <div className="flex flex-row w-[40%] my-auto">
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
                    <div className="flex flex-col ml-5 my-auto">
                        <div className="text-2xl font-medium">
                            {propertyName}
                        </div>
                        <div className="text-xl font-normal">
                            {propertySubName}
                        </div>
                        <div className="flex flex-row mt-3 text-xl font-normal">
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
                            <div className="mx-2 my-auto">
                                {ownerName}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col w-[15%] ml-20 my-auto text-2xl font-regular">
                    <div>
                        {date}
                    </div>
                    <div className="mt-2">
                        {time}
                    </div>
                </div>
                <div className="w-[20%] h-[30%] ml-20 my-auto">
                    <StatusBox status={currentStatus}/>
                </div>
                <div className="flex flex-col w-[12.5%] h-full ml-28 my-auto justify-between">
                    <DetailButton agreementId={agreementId}/>
                    <CancelButton status={currentStatus} reasontmp={reason} setReason={setReason} setCancel={setCancel}/>            
                </div>
            </div>
        </div>
    )
}