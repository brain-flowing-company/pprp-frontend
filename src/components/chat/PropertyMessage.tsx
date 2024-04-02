import { ChatMessage } from "@/models/Chat";
import PropertyData from "@/models/PropertyData";
import getPropertyDetail from "@/services/property/getPropertyDetail";
import { StaticImport } from "next/dist/shared/lib/get-img-props";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function PropetyMessage({ message }: { message: string }) {
    const [data, setData] = useState<PropertyData>()
    const [img, setImg] = useState<string>("/img/Boss.png")
    useEffect(() => {
        async function getProperty() {
            try {
                const data = await getPropertyDetail(message);
                setData(data)
                if (data.property_images[0]) {
                    setImg(data.property_images[0])
                }
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        }
        getProperty();
    }, [])

    return (
        <div className="flex flex-col break-word rounded-xl bg-ci-light-gray px-4 py-3 w-full gap-y-2">
            <div>
                You are asking the owner about this property.
            </div>
            <span className="w-full border-t border-black"></span>
            {data &&
                <div className="flex flex-row gap-x-3">
                    <div className="relative flex aspect-square w-16 h-16 items-center justify-center overflow-hidden rounded-lg">
                        <Image
                            src={img}
                            alt="ไอบอสสสส"
                            draggable={false}
                            fill={true}
                            style={{ objectFit: "cover" }}

                        />
                    </div>
                    <div className="w-3/5 flex flex-col justify-center ">
                        <div className="text-lg font-bold">{data?.property_name}</div>
                        <div className="break-all truncate">{data?.address}</div>
                    </div>
                </div>}

        </div>
    );
}