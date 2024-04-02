"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { useSearchContext } from "@/context/SearchContext";

const all_filters = [
  {
    id: "Pet-Friendly",
    label: "Pet-Friendly",
  },
  {
    id: "Kitchen",
    label: "Kitchen",
  },
  {
    id: "Air-Conditioning",
    label: "Air-Conditioning",
  },
  {
    id: "Family-Friendly",
    label: "Family-Friendly",
  },
  {
    id: "Balcony",
    label: "Balcony",
  },
  {
    id: "Living-Room",
    label: "Living Room",
  },
  {
    id: "Swimming-Pool",
    label: "Swimming Pool",
  },
  {
    id: "Gym",
    label: "Gym",
  },
  {
    id: "Laundry-Room",
    label: "Laundry Room",
  },
];

const SearchProperty = () => {
  const { searchContent, setIsSearching, searchFilters } = useSearchContext();

  const [filterPrice, setFilterPrice] = useState<boolean>(false);
  const [filterSize, setFilterSize] = useState<boolean>(false);
  const [filter, setFilter] = useState<boolean>(false);

  const [bedrooms, setBedrooms] = useState<number>(0);
  const [bathrooms, setBathrooms] = useState<number>(0);

  const [bedNull,setBedNull] = useState<boolean>(true)
  const [bathNull,setBathNull] = useState<boolean>(true)


  function formatBedroom(val: number) {
    if (val < 0) {
      setBathrooms(0);
    } else {
      setBedrooms(val);
    }
  }


  function formatBathroom(val: number) {
    if (val < 0) {
      setBathrooms(0);
    } else {
      setBathrooms(val);
    }
  }

  useEffect(() => {
    if(!bedNull)searchFilters.current.numBedrooms = bedrooms;
    if(!bathNull)searchFilters.current.numBathrooms = bathrooms;
  }, [bathrooms, bedrooms]);

  return (
    <div className="small-text m-4 flex flex-col justify-self-center sm:m-8 md:w-[600px] lg:w-[800px]">
      <div className="my-4 flex h-14 flex-row items-center justify-center gap-x-5 rounded-2xl bg-white px-3 text-black  md:gap-x-7">
        <input
          type="text"
          className="h-full w-full rounded-xl border bg-ci-light-gray  px-3 placeholder-black lg:px-5"
          placeholder={searchContent.current}
          onChange={(e) => {
            searchContent.current = e.target.value;
            console.log(searchContent.current, "testing search");
          }}
        ></input>

        <button
          onClick={() => setIsSearching(true)}
          className="h-full w-1/5 rounded-xl bg-ci-blue  font-semibold text-white"
        >
          Search
        </button>
      </div>
      {/* filter section */}
      <div className="flex h-14 flex-row justify-center">
        {/* button price */}
        <div className="flex w-1/3 gap-3 px-3">
          <div
            onClick={() => {
              setFilterPrice(!filterPrice);
              setFilterSize(false);
              setFilter(false);
            }}
            className={`flex  h-full w-full cursor-pointer place-content-center items-center rounded-xl ${filterPrice ? "bg-ci-light-blue" : "bg-ci-light-gray"} px-6 text-left`}
          >
            <p className="justify-center px-2  font-semibold">Price</p>
            {filterPrice ? (
              <Image
                src="/img/home-page/arrow-up.svg"
                alt="arrow-down"
                width={30}
                height={30}
                className="sm:w-5 md:w-7 2xl:w-10"
              />
            ) : (
              <Image
                src="/img/home-page/arrow-down.svg"
                alt="arrow-down"
                width={30}
                height={30}
                className="sm:w-5 md:w-7 2xl:w-10"
              />
            )}
          </div>
        </div>
        {/* button size */}
        <div className="flex w-1/3 flex-col gap-3 px-3">
          <div
            onClick={() => {
              setFilterPrice(false);
              setFilterSize(!filterSize);
              setFilter(false);
            }}
            className={`flex  h-full  w-full cursor-pointer place-content-center items-center rounded-xl ${filterSize ? "bg-ci-light-blue" : "bg-ci-light-gray"} px-6 text-left`}
          >
            <p className="justify-center px-2  font-semibold">Size</p>
            {filterSize ? (
              <Image
                src="/img/home-page/arrow-up.svg"
                alt="arrow-down"
                width={30}
                height={30}
                className="sm:w-5 md:w-7 2xl:w-10"
              />
            ) : (
              <Image
                src="/img/home-page/arrow-down.svg"
                alt="arrow-down"
                width={30}
                height={30}
                className="sm:w-5 md:w-7 2xl:w-10"
              />
            )}
          </div>
        </div>
        {/* button filter */}
        <div className="flex w-1/3 flex-col gap-3 px-3">
          <div
            onClick={() => {
              setFilterPrice(false);
              setFilterSize(false);
              setFilter(!filter);
            }}
            className={`flex  h-full w-full cursor-pointer place-content-center items-center rounded-xl ${filter ? "bg-ci-light-blue" : "bg-ci-light-gray"} px-6 text-left`}
          >
            <p className="justify-center px-2  font-semibold">Fliters</p>
            {filter ? (
              <Image
                src="/img/home-page/arrow-up.svg"
                alt="arrow-down"
                width={30}
                height={30}
                className="sm:w-5 md:w-7 2xl:w-10"
              />
            ) : (
              <Image
                src="/img/home-page/arrow-down.svg"
                alt="arrow-down"
                width={30}
                height={30}
                className="sm:w-5 md:w-7 2xl:w-10"
              />
            )}
          </div>
        </div>
      </div>
      {/* what to filter */}
      <div className="flex w-full flex-row">
        {filterPrice ? (
          <div className="flex h-36 w-full flex-row items-center justify-center gap-y-2 rounded-xl ">
            <div className="mx-3 flex w-1/2  flex-col gap-x-2 gap-y-4">
              <div className="">Min. price</div>
              <input
                type="number"
                className="h-14 w-full rounded-xl border bg-ci-light-gray  px-4 placeholder-black"
                onChange={(e) => {
                  if (parseInt(e.target.value) >= 0 || e.target.value === "") {
                    searchFilters.current.minPrice = Number(e.target.value);
                  } else {
                    searchFilters.current.minPrice = 0;
                  }
                }}
                placeholder={searchFilters.current.minPrice?.toString()}
              ></input>
            </div>
            <div className="mx-3 flex w-1/2  flex-col gap-x-2 gap-y-4">
              <div className="">Max. price</div>
              <input
                type="number"
                className="h-14 w-full rounded-xl border bg-ci-light-gray  px-4 placeholder-black"
                onChange={(e) => {
                  if (parseInt(e.target.value) >= 0 || e.target.value === "") {
                    searchFilters.current.maxPrice = Number(e.target.value);
                  } else {
                    searchFilters.current.maxPrice = 0;
                  }
                }}
                placeholder={searchFilters.current.maxPrice?.toString()}
              ></input>
            </div>
          </div>
        ) : null}
        {filterSize ? (
          <div className="flex h-36 w-full flex-row items-center justify-center gap-y-2 rounded-xl ">
            <div className="mx-3 flex w-1/2  flex-col gap-x-2 gap-y-4">
              <p className="">Min (m²)</p>
              <input
                type="number"
                className="h-14 w-full rounded-xl border bg-ci-light-gray px-4 placeholder-black"
                onChange={(e) => {
                  if (parseInt(e.target.value) >= 0 || e.target.value === "") {
                    searchFilters.current.minFloorSize = Number(e.target.value);
                  } else {
                    searchFilters.current.minFloorSize = 0;
                  }
                }}
                placeholder={searchFilters.current.minFloorSize?.toString()}
              ></input>
            </div>
            <div className="mx-3 flex w-1/2  flex-col gap-x-2 gap-y-4 ">
              <p className="">Max (m²)</p>
              <input
                type="number"
                className="h-14 w-full rounded-xl border bg-ci-light-gray px-4 placeholder-black"
                onChange={(e) => {
                  if (parseInt(e.target.value) >= 0 || e.target.value === "") {
                    searchFilters.current.maxFloorSize = Number(e.target.value);
                  } else {
                    searchFilters.current.maxFloorSize = 0;
                  }
                }}
                placeholder={searchFilters.current.maxFloorSize?.toString()}
              ></input>
            </div>
          </div>
        ) : null}
        {filter ? (
          <div className="m-3 h-full w-full flex-col justify-around  rounded-xl bg-ci-light-gray p-2 pb-20 sm:pb-12 md:pb-16 lg:pb-8">
            <div className="flex h-1/3  flex-col items-center justify-between sm:flex-row">
              <div className="h-18  m-auto flex  w-4/5 flex-row items-center  justify-center rounded-xl bg-white sm:w-2/5">
                <div className="font-semibold">Bedroom(s)</div>
                <div className="flex flex-row items-center gap-x-1 py-2">
                  <button
                    onClick={() => {
                      formatBedroom(bedrooms - 1);
                    }}
                    className="large-text cursor-pointer justify-center rounded-xl px-2 pb-2 hover:bg-ci-gray"
                  >
                    -
                  </button>
                  <input
                    type="number"
                    className="h-10 w-10 justify-center rounded-xl border px-2  pb-1 text-center placeholder-black"
                    onChange={(e) => {
                      if (e.target.value === "") {
                        setBedrooms(0);
                      } else {
                        formatBedroom(Number(e.target.value));
                      }
                    }}
                    value={bedrooms.toString()}
                    placeholder={searchFilters.current.numBedrooms?.toString()}
                  ></input>
                  <button
                    onClick={() => {
                      formatBedroom(bedrooms + 1);
                      setBedNull(false)
                    }}
                    className="large-text flex cursor-pointer rounded-xl px-2 pb-2 text-center hover:bg-ci-gray"
                  >
                    +
                  </button>
                </div>
              </div>
              <div className="h-18 m-auto flex w-4/5 flex-row items-center justify-center gap-y-2 rounded-xl bg-white sm:w-2/5">
                <div className="font-semibold">Bathroom(s)</div>
                <div className="flex flex-row items-center gap-x-1 py-2">
                  <button
                    onClick={() => {
                      formatBathroom(bathrooms - 1);
                    }}
                    className="large-text cursor-pointer justify-center  rounded-xl px-2 pb-2 hover:bg-ci-gray"
                  >
                    -
                  </button>
                  <input
                    type="number"
                    className="h-10 w-10 justify-center rounded-xl border px-2 pb-1 text-center placeholder-black"
                    onChange={(e) => {
                      if (e.target.value === "") {
                        setBathrooms(0);
                      } else {
                        formatBathroom(Number(e.target.value));
                      }
                    }}
                    value={bathrooms.toString()}
                    placeholder={searchFilters.current.numBathrooms?.toString()}
                  ></input>
                  <button
                    onClick={() => {
                      formatBathroom(bathrooms + 1);
                      setBathNull(false)
                    }}
                    className="large-text cursor-pointer justify-center rounded-xl px-2 pb-2 hover:bg-ci-gray"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>

            <div className="mx-5 flex  flex-col rounded-xl bg-white p-2 ">
              <div className="m-2 font-semibold">Features</div>
              <div className="grid grid-cols-2 sm:grid-cols-3 ">
                {all_filters.map((fil) => (
                  <div className="m-3 flex flex-row" key={fil.id}>
                    <Checkbox id={fil.id} className="h-7 w-7"></Checkbox>
                    <div className="mx-2 ">{fil.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default SearchProperty;
