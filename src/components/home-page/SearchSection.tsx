"use client";

import { min } from "date-fns/fp/min";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useRef, useState, useEffect } from "react";
import { useSearchContext } from "@/context/SearchContext";

export default function SearchSection() {
  const router = useRouter();

  const { searchContent, searchFilters } = useSearchContext();

  const [filterPrice, setFilterPrice] = useState(false);
  const [filterSize, setFilterSize] = useState(false);
  const [filterBedroom, setFilterBedroom] = useState(false);

  const [minPrice, setMinPrice] = useState<number>(0);
  const [maxPrice, setMaxPrice] = useState<number>(0);
  const [minSize, setMinSize] = useState<number>(0);
  const [maxSize, setMaxSize] = useState<number>(0);
  const [bedrooms, setBedrooms] = useState<number>(0);

  const [bedNull, setBedNull] = useState<boolean>(true);

  function formatBedroom(val: number) {
    if (val < 0) {
      setBedrooms(0);
    } else {
      setBedrooms(val);
    }
  }

  useEffect(() => {
    if (!bedNull) searchFilters.current.numBedrooms = bedrooms;
    // console.log(searchFilters.current.numBedrooms,"test filter home")
  }, [bedrooms]);

  return (
    <div className="mt-6 flex h-96 w-10/12 flex-col gap-y-6 text-sm sm:text-sm md:text-base lg:w-1/2 2xl:text-xl ">
      <div className="flex h-32 flex-row items-center justify-center gap-x-7 rounded-2xl bg-white px-7 text-black">
        <input
          type="text"
          className="h-1/2 w-full rounded-xl border border-ci-dark-gray px-5"
          placeholder="Location, building"
          onChange={(e) => {
            searchContent.current = e.target.value;
            console.log(searchContent.current, "testing");
          }}
        ></input>
        <button
          onClick={() => router.push("/search")}
          className="h-1/2 w-56 select-none rounded-xl bg-ci-blue font-semibold text-white"
        >
          Search Now!
        </button>
      </div>

      <div className="flex w-full select-none flex-row gap-x-7 text-ci-black">
        <div className="flex w-1/3 min-w-24 flex-col gap-3 ">
          <div
            onClick={() => setFilterPrice(!filterPrice)}
            className="flex h-16 w-full cursor-pointer place-content-between items-center rounded-xl bg-white px-6 text-left "
          >
            <p className="truncate">Price Range</p>
            {filterPrice ? (
              <Image
                src="/img/home-page/arrow-up.svg"
                alt="arrow-down"
                width={40}
                height={40}
                className="w-5 sm:w-5 md:w-7 2xl:w-10"
              />
            ) : (
              <Image
                src="/img/home-page/arrow-down.svg"
                alt="arrow-down"
                width={40}
                height={40}
                className="w-5 sm:w-5 md:w-7 2xl:w-10"
              />
            )}
          </div>
          {filterPrice ? (
            <div className="flex w-full flex-col items-center justify-center gap-y-2 rounded-xl bg-white py-4 sm:h-36 sm:py-0">
              <div className="flex flex-col items-center justify-center gap-x-2 gap-y-2 px-3 text-left sm:flex-row sm:gap-y-4 sm:px-6">
                <div className="text-center">Min (฿)</div>
                <input
                  type="number"
                  className="h-10 w-full rounded-xl border border-ci-gray px-4 sm:h-14"
                  onChange={(e) => {
                    if (
                      parseInt(e.target.value) >= 0 ||
                      e.target.value === ""
                    ) {
                      setMinPrice(Number(e.target.value));
                    } else {
                      setMinPrice(0);
                    }
                  }}
                  value={minPrice.toString()}
                  placeholder="0"
                ></input>
              </div>
              <div className="flex flex-row flex-col items-center justify-center gap-x-2 gap-y-2 px-3 text-left sm:flex-row sm:gap-y-4 sm:px-6">
                <div className="text-center">Max (฿)</div>
                <input
                  type="number"
                  className="h-10 w-full rounded-xl border border-ci-gray px-4 sm:h-14"
                  onChange={(e) => {
                    if (
                      parseInt(e.target.value) >= 0 ||
                      e.target.value === ""
                    ) {
                      setMaxPrice(Number(e.target.value));
                    } else {
                      setMaxPrice(0);
                    }
                  }}
                  value={maxPrice.toString()}
                  placeholder="1000000"
                ></input>
              </div>
            </div>
          ) : null}
        </div>
        <div className="flex w-1/3 min-w-24 flex-col gap-3">
          <div
            onClick={() => setFilterSize(!filterSize)}
            className="flex h-16 w-full cursor-pointer place-content-between items-center rounded-xl bg-white px-6 text-left"
          >
            <p className="truncate">Size</p>
            {filterSize ? (
              <Image
                src="/img/home-page/arrow-up.svg"
                alt="arrow-down"
                width={40}
                height={40}
                className="w-5 sm:w-5 md:w-7 2xl:w-10"
              />
            ) : (
              <Image
                src="/img/home-page/arrow-down.svg"
                alt="arrow-down"
                width={40}
                height={40}
                className="w-5 sm:w-5 md:w-7 2xl:w-10"
              />
            )}
          </div>
          {filterSize ? (
            <div className="flex w-full flex-col items-center justify-center gap-y-2 rounded-xl bg-white py-4 sm:h-36 sm:py-0">
              <div className="flex flex-col items-center justify-center gap-x-2 gap-y-2 px-3 text-left sm:flex-row sm:gap-y-4 sm:px-6">
                <p className="text-center">Min (m²)</p>
                <input
                  type="number"
                  className="h-10 w-full rounded-xl border border-ci-gray px-4 sm:h-14"
                  onChange={(e) => {
                    if (
                      parseInt(e.target.value) >= 0 ||
                      e.target.value === ""
                    ) {
                      setMinSize(Number(e.target.value));
                    } else {
                      setMinSize(0);
                    }
                  }}
                  value={minSize.toString()}
                  placeholder="0"
                ></input>
              </div>
              <div className="flex flex-col items-center justify-center gap-x-2 gap-y-2 px-3 text-left sm:flex-row sm:gap-y-4 sm:px-6">
                <p className="text-center">Max (m²)</p>
                <input
                  type="number"
                  className="h-10 w-full rounded-xl border border-ci-gray px-4 sm:h-14"
                  onChange={(e) => {
                    if (
                      parseInt(e.target.value) >= 0 ||
                      e.target.value === ""
                    ) {
                      setMaxSize(Number(e.target.value));
                    } else {
                      setMaxSize(0);
                    }
                  }}
                  value={maxSize.toString()}
                  placeholder="10000"
                ></input>
              </div>
            </div>
          ) : null}
        </div>
        <div className="flex w-1/3 min-w-24 flex-col gap-3">
          <div
            onClick={() => setFilterBedroom(!filterBedroom)}
            className="flex h-16 w-full cursor-pointer place-content-between items-center rounded-xl bg-white px-6 text-left"
          >
            <p className="truncate">Bedrooms</p>
            {filterBedroom ? (
              <Image
                src="/img/home-page/arrow-up.svg"
                alt="arrow-down"
                width={40}
                height={40}
                className="w-5 sm:w-5 md:w-7 2xl:w-10"
              />
            ) : (
              <Image
                src="/img/home-page/arrow-down.svg"
                alt="arrow-down"
                width={40}
                height={40}
                className="w-5 sm:w-5 md:w-7 2xl:w-10"
              />
            )}
          </div>
          {filterBedroom ? (
            <div className="h-18 flex flex-col items-center justify-center rounded-xl bg-white p-2 md:flex-col 2xl:flex-row">
              <div>Bedroom</div>
              <div className="flex flex-row items-center gap-x-1 py-2">
                <button
                  onClick={() => {
                    formatBedroom(bedrooms - 1);
                  }}
                  className="cursor-pointer rounded-xl px-2 text-2xl hover:bg-ci-gray"
                >
                  -
                </button>
                <input
                  type="number"
                  className="size-10 rounded-xl border border-ci-gray px-2 text-center sm:size-14"
                  onChange={(e) => {
                    if (e.target.value === "") {
                      formatBedroom(0);
                    } else {
                      formatBedroom(Number(e.target.value));
                    }
                  }}
                  value={bedrooms.toString()}
                ></input>
                <button
                  onClick={() => {
                    formatBedroom(bedrooms + 1);
                    setBedNull((prev) => false);
                  }}
                  className="cursor-pointer rounded-xl px-2 text-2xl hover:bg-ci-gray"
                >
                  +
                </button>
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}
