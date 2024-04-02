import { ChatMessage } from "@/models/Chat";
import Image from "next/image";

export default function AppointmentMessage({ message }: { message: ChatMessage }) {
    let status = "CANCELLED"
    const owner = 'BossKung'
    return (
        <div className="flex flex-col break-word rounded-xl bg-ci-light-gray px-4 py-3 w-full gap-y-2">
            {status == "PENDING" &&
                <div>
                    You have created an appointment with {owner}
                </div>
            }

            {status == "CONFIRMED" &&
                <div>
                    Your appointment with {owner} have been confirmed
                </div>
            }

            {status == "REJECTED" &&
                <div>
                    {owner} has rejected your appointment
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
                    <div className="break-all">Date: 16/8/67</div>
                    <div className="flex flex-row gap-x-1">Status:
                        {status == "PENDING" && <div className="bg-ci-yellow px-2 rounded-lg">Pending</div>}
                        {status == "CONFIRMED" && <div className="bg-ci-green px-2 rounded-lg">Confirm</div>}
                        {status == "REJECTED" && <div className="bg-ci-red px-2 rounded-lg">Rejected</div>}
                        {status == "CANCELLED" && <div className="bg-ci-red px-2 rounded-lg">Cancelled</div>}
                    </div>
                </div>
            </div>
        </div>
    );
}