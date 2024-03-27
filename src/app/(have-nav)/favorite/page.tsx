"use client";
import PropertyData from "@/models/PropertyData";
import PropertyCards from "@/components/my-listing/PropertyCards";
import getUserFavProperty from "@/services/property/getUserFavProperty";
import Image from "next/image";

import { useEffect, useState } from "react";

const myFavPage = () => {
  const [propData, setData] = useState<PropertyData[]>([]);
  const [total, setTotal] = useState<number>(0);

  useEffect(() => {
    const fetchProp = async () => {
      const data = await getUserFavProperty(20, 1);
      if (data) {
        setData(data.properties);
        setTotal(data.total);
      }
      console.log(data);
    };
    fetchProp();
  }, []);

  return (
    <>
      {total !== 0 && propData !== undefined ? (
        <div className="mt-8 flex h-full w-full flex-col items-center">
          <div className="flex flex-col md:w-[700px] lg:w-[1000px]">
            <div className="large-text font-bold">My Favorites</div>
            <PropertyCards
              propData={propData}
              totalProp={total}
              isEditable={false}
              additionaltext="for rent or sales in my favorites"
              showAmount={false}
            ></PropertyCards>
          </div>
        </div>
      ) : (
        <div className="mx-72 mt-8 flex h-1/2 flex-col items-center justify-around">
          <div className="text-center text-4xl font-bold">
            Empty favorite property
          </div>

          <Image
            src="/img/mylisting/home.svg"
            alt="home"
            width={100}
            height={100}
          />
          <div className="m-1 text-center text-2xl">
            Your favorite property is empty.
          </div>
        </div>
      )}
    </>
  );
};

export default myFavPage;
