import { ChatMessage } from "@/models/Chat";
import Image from "next/image";

export default function PropetyMessage({ message }: { message: ChatMessage }) {
    const name = "Lumpini"
    const address = "Nisi officia 47550 flex flex-col justify-centerflex flex-col justify-center"
    return (
        <div className="flex flex-col break-word rounded-xl bg-ci-light-gray px-4 py-3 w-full gap-y-2">
            <div>
                You are asking the owner about this property.
            </div>
            <span className="w-full border-t border-black"></span>
            <div className="flex flex-row gap-x-3">
                <div className="relative flex aspect-square w-16 h-16 items-center justify-center overflow-hidden rounded-lg">
                    <Image
                        src="/img/boss.png"
                        alt="ไอบอสสสส"
                        draggable={false}
                        fill={true}
                        style={{ objectFit: "cover" }}

                    />
                </div>
                <div className="w-3/5 flex flex-col justify-center ">
                    <div className="text-lg font-bold">{name}</div>
                    <div className="break-all truncate">{address}</div>
                </div>
            </div>
        </div>
    );
}