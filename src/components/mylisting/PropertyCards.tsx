"use client";
import PropertyData from "../models/PropertyData";
import PropertyCard from "./PropertyCard";
import Pagination from "@mui/material/Pagination";
import { useState, useEffect } from "react";

const PropertyCards = ({ propData }: { propData: PropertyData[] }) => {
  const [page, setPage] = useState<number>(1);
  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  useEffect(() => {
    // Scroll to the top of the page
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [page]);

  return (
    <>
      <div className="my-5 flex text-xl font-semibold">
        {/* sort stuff here */}
        <div className="">Sort By</div>
      </div>

      <div className="grid grid-cols-2 gap-24 ">
        {propData
          .slice(20 * (page - 1), 20 * page)
          .map((prop: PropertyData) => (
            <PropertyCard propData={prop} editable={true} ></PropertyCard>
          ))}
      </div>

      {propData.length > 20 ? (
        <div className="m-10 flex w-full items-center justify-center">
          <Pagination
            count={Math.ceil(propData.length / 20)}
            size="large"
            onChange={handleChange}
            color="primary"
          ></Pagination>
        </div>
      ) : null}

      <div className="flex h-[100px]  items-center justify-center pb-44 text-2xl">
        {/* num prop text here */}
        <div>
          {20 * (page - 1)} -{" "}
          {propData.length < 20 * page ? propData.length : 20 * page} of{" "}
          {propData.length} properties for rent or sales in my listing
        </div>
      </div>
    </>
  );
};

export default PropertyCards;
