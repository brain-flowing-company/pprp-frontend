"use client";
import PropertyData from "@/models/PropertyData";
import PropertyCards from "@/components/my-listing/PropertyCards";
import getUserFavProperty from "@/services/property/getUserFavProperty";
import Image from "next/image";

import { useEffect, useState } from "react";
import EmptyProperty from "@/components/my-listing/EmptyProperty";

const myFavPage = () => {
  const [propData, setData] = useState<PropertyData[]>([]);
  const [total, setTotal] = useState<number>(0);

  const [sort,setSortby]  = useState<string>("created_at:desc")
  const [onPage, setOnPage] = useState<number>(1);

  useEffect(() => {
    const fetchProp = async () => {
      const data = await getUserFavProperty(10, onPage,sort);
      if (data) {
        setData(data.properties);
        setTotal(data.total);
      }
    };
    fetchProp();
  }, [sort,onPage]);

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
              setSort={setSortby}
              setOnPage={setOnPage}
            ></PropertyCards>
          </div>
        </div>
      ) : <EmptyProperty headerText="Empty favorite property" text1="Your favorite property is empty." haveButton={false}/>}
    </>
  );
};

export default myFavPage;
