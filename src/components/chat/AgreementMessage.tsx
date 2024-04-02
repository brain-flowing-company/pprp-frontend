import { ChatMessage } from "@/models/Chat";
import Image from "next/image";

export default function AgreementMessage({ message }: { message: ChatMessage }) {
    let status = "CANCELLED"
    const owner = 'BossKung'
    return (
        <div className="flex flex-col break-word rounded-xl bg-ci-light-gray px-4 py-3 w-full gap-y-2">
            {status == "AWAITING_DEPOSIT" &&
                <div>
                    You have created an agreement with {owner}
                </div>
            }

            {status == "AWAITING_PAYMENT" &&
                <div>
                    You have created an agreement with {owner}
                </div>
            }

            {status == "RENTING" &&
                <div>
                    Your agreement with {owner} have been confirmed
                </div>
            }

            {status == "REJECTED" &&
                <div>
                    {owner} has rejected your agreement
                </div>
            }

            {status == "CANCELLED" &&
                <div>
                    You have cancelled an appointment with {owner}
                </div>
            }
            <span className="w-full border-t border-black"></span>
            <div className="flex flex-row gap-x-3 items-center">
                <div className="relative flex aspect-square w-16 h-16 items-center justify-center overflow-hidden rounded-lg">
                    <Image
                        src="/img/boss.png"
                        alt="ไอบอสสสส"
                        draggable={false}
                        fill={true}
                        style={{ objectFit: "cover" }}

                    />
                </div>
                <div className="w-3/5 flex flex-col justify-center">
                    <div className="text-lg font-bold">Lumpini</div>
                    <div className="break-all">Price: 15000$</div>
                    <div className="flex flex-row gap-x-1">Status:
                        {status == "AWAITING_DEPOSIT" && <div className="bg-ci-yellow px-2 rounded-lg">Awaiting Deposit</div>}
                        {status == "AWAITING_PAYMENT" && <div className="bg-ci-yellow px-2 rounded-lg">Awaiting Payment</div>}
                        {status == "RENTING" && <div className="bg-ci-green px-2 rounded-lg">Renting</div>}
                        {status == "OVERDUE" && <div className="bg-ci-red px-2 rounded-lg">Overdue</div>}
                        {status == "CANCELLED" && <div className="bg-ci-red px-2 rounded-lg">Cancelled</div>}
                    </div>
                </div>
            </div>
        </div>
    );
}