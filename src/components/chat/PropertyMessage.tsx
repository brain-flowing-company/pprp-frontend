import PropertyData from "@/models/PropertyData";
import getPropertyDetail from "@/services/property/getPropertyDetail";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function PropetyMessage({ message }: { message: string }) {
  const [data, setData] = useState<PropertyData>();
  const [img, setImg] = useState<string>("/img/Boss.png");
  useEffect(() => {
    async function getProperty() {
      try {
        const data = await getPropertyDetail(message);
        setData(data);
        if (data.property_images[0]) {
          setImg(data.property_images[0].image_url);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
    getProperty();
  }, []);

  return (
    <div className="flex w-full flex-col gap-y-2 break-words rounded-xl bg-ci-light-gray px-4 py-3">
      <div>You are asking the owner about this property.</div>
      <span className="w-full border-t border-black"></span>
      {data && (
        <div className="flex flex-row gap-x-3">
          <div className="relative flex aspect-square size-16 items-center justify-center overflow-hidden rounded-lg">
            <Image
              src={img || "/img/boss.png"}
              alt="ไอบอสสสส"
              draggable={false}
              fill={true}
              style={{ objectFit: "cover" }}
            />
          </div>
          <div className="flex w-3/5 flex-col justify-center ">
            <div className="text-lg font-bold">{data?.property_name}</div>
            <div className="truncate break-all">{data?.address}</div>
          </div>
        </div>
      )}
    </div>
  );
}
