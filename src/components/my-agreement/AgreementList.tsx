import Image from "next/image";
import StatusBox from "@/components/my-agreement/StatusBox";
import { DetailButton, CancelButton, PaymentButton } from "@/components/my-agreement/InteractiveButton";
import { useEffect, useState } from "react";
import UpdateAgreementStatus from "@/services/agreement/updateAgreementStatus";
import { useRouter } from "next/navigation";

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

    const router = useRouter();

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
        <div 
            className="border-ci-dark-gray border-y-2 border-x-4 bg-ci-light-gray w-full h-[240px] hover:cursor-pointer"
            onClick={() => router.push(`/my-agreement/${agreementId}`)}
        >
            <div className="flex flex-row w-[90%] h-[67%] mx-auto my-10 justify-between">
                <div className="flex flex-row w-[40%] my-auto">
                    <div className="my-auto w-40 relative flex aspect-square items-center justify-center overflow-hidden rounded-lg hover:cursor-auto"
                    onClick={(e) => e.stopPropagation()}>
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
                        <div className="medium-text font-medium hover:cursor-text" onClick={(e) => e.stopPropagation()}>
                            {propertyName}
                        </div>
                        <div className="small-text font-normal hover:cursor-text" onClick={(e) => e.stopPropagation()}>
                            {propertySubName}
                        </div>
                        <div className="flex flex-row mt-3 small-text font-normal">
                            <div className="w-20 relative flex aspect-square items-center justify-center overflow-hidden rounded-full hover:cursor-auto"
                            onClick={(e) => e.stopPropagation()}>
                                <Image 
                                    src={ownerImgSrc}
                                    alt="Owner Image"
                                    draggable={false}
                                    fill
                                    objectFit="cover"
                                    // layout="responsive"
                                />
                            </div>
                            <div className="mx-2 my-auto hover:cursor-text" onClick={(e) => e.stopPropagation()}>
                                {ownerName}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col w-[15%] ml-20 my-auto medium-text font-regular hover:cursor-text" 
                onClick={(e) => e.stopPropagation()}>
                    <div>
                        {date}
                    </div>
                    <div className="mt-2">
                        {time}
                    </div>
                </div>
                <div className="w-[20%] h-[30%] ml-20 my-auto hover:cursor-auto" onClick={(e) => e.stopPropagation()}>
                    <StatusBox status={currentStatus}/>
                </div>
                <div className="flex flex-col w-[12.5%] h-full ml-28 my-auto justify-center">
                    {/* <DetailButton agreementId={agreementId}/> */}
                    {currentStatus !== 'Archived' && currentStatus !== 'Cancelled' ? (
                        <div className="flex flex-col h-full">
                            <div className="my-auto">
                                <PaymentButton agreementId={agreementId}/>
                            </div>
                            <div className="my-auto">
                                <CancelButton status={currentStatus} reasontmp={reason} setReason={setReason} setCancel={setCancel}/>            
                            </div>
                        </div>
                    ) : null}
                </div>
            </div>
        </div>
    )
}