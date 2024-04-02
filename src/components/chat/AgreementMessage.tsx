import AgreementData from "@/models/AgreementData";
import { ChatMessage } from "@/models/Chat";
import getOneAgreement from "@/services/agreement/getOneAgreement";
import getUserAgreement from "@/services/agreement/getUserAgreement";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function AgreementMessage({ message }: { message: string }) {
    const [data, setData] = useState<AgreementData>()
    const [img, setImg] = useState<string>("/img/Boss.png")
    useEffect(() => {
        async function getProperty() {
            try {
                const data = await getOneAgreement(message);
                setData(data)
                console.log(data.property.property_images[0])
                if (data.property.property_images[0]) {
                    setImg(data.property.property_images[0])
                }
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        }
        getProperty();
    }, [])
    return (
        <div className="flex flex-col break-word rounded-xl bg-ci-light-gray px-4 py-3 w-full gap-y-2">
            {data?.status == "AWAITING_DEPOSIT" &&
                <div>
                    You have created an agreement with {data?.owner.owner_first_name} {data?.owner.owner_last_name}
                </div>
            }

            {data?.status == "AWAITING_PAYMENT" &&
                <div>
                    You have created an agreement with {data?.owner.owner_first_name} {data?.owner.owner_last_name}
                </div>
            }

            {data?.status == "RENTING" &&
                <div>
                    Your agreement with {data?.owner.owner_first_name} {data?.owner.owner_last_name} have been confirmed
                </div>
            }

            {data?.status == "OVERDUE" &&
                <div>
                    Your agreement are overdue
                </div>
            }

            {data?.status == "CANCELLED" &&
                <div>
                    You have cancelled an appointment with {data?.owner.owner_first_name} {data?.owner.owner_last_name}
                </div>
            }
            <span className="w-full border-t border-black"></span>
            <div className="flex flex-row gap-x-3 items-center">
                <div className="relative flex aspect-square w-16 h-16 items-center justify-center overflow-hidden rounded-lg">
                    <Image
                        src={img}
                        alt="ไอบอสสสส"
                        draggable={false}
                        fill={true}
                        style={{ objectFit: "cover" }}

                    />
                </div>
                <div className="w-3/5 flex flex-col justify-center">
                    <div className="text-lg font-bold">{data?.property.property_name}</div>
                    <div className="break-all">Price: {data?.total_payment}$</div>
                    <div className="flex flex-row gap-x-1 items-center">Status:
                        {data?.status == "AWAITING_DEPOSIT" && <div className="bg-ci-yellow px-2 rounded-lg">Awaiting Deposit</div>}
                        {data?.status == "AWAITING_PAYMENT" && <div className="bg-ci-yellow px-2 rounded-lg">Awaiting Payment</div>}
                        {data?.status == "RENTING" && <div className="bg-ci-green px-2 rounded-lg">Renting</div>}
                        {data?.status == "OVERDUE" && <div className="bg-ci-red px-2 rounded-lg">Overdue</div>}
                        {data?.status == "CANCELLED" && <div className="bg-ci-red px-2 rounded-lg">Cancelled</div>}
                    </div>
                </div>
            </div>
        </div>
    );
}