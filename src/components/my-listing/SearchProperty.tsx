"use client";

import Image from "next/image";
import { useState } from "react";
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

  const { searchContent, setSearchContent, isSearching, setIsSearching } =
  useSearchContext();

  const [filterPrice, setFilterPrice] = useState<boolean>(false);
  const [filterSize, setFilterSize] = useState<boolean>(false);
  const [filter, setFilter] = useState<boolean>(false);


  const [minPrice, setMinPrice] = useState<number>(0);
  const [maxPrice, setMaxPrice] = useState<number>(0);
  const [minSize, setMinSize] = useState<number>(0);
  const [maxSize, setMaxSize] = useState<number>(0);
  const [bedrooms, setBedrooms] = useState<number>(0);

  function formatBedroom(val: number) {
    if (val < 0) {
      setBedrooms(0);
    } else {
      setBedrooms(val);
    }
  }

  const [bathrooms, setBathrooms] = useState<number>(0);

  function formatBathroom(val: number) {
    if (val < 0) {
      setBathrooms(0);
    } else {
      setBathrooms(val);
    }
  }

  return (
    <div className="m-8 flex w-1/2 flex-col justify-self-center text-xl ">
      <div className="flex h-32 flex-row items-center justify-center gap-x-7 rounded-2xl bg-white px-3  text-black">
        <input
          type="text"
          className="h-1/2 w-full rounded-xl border  bg-ci-light-gray  px-5"
          onChange={(e) => {
            setSearchContent(e.target.value);
          }}
        ></input>
        <button
          onClick={() => setIsSearching(true)}
          className="h-1/2 w-56 rounded-xl bg-ci-blue  font-semibold text-white"
        >
          Search
        </button>
      </div>
      {/* filter section */}
      <div className="flex flex-row justify-center">
        <div className="flex w-1/3 gap-3 px-3">
          <div
            onClick={() => {
              setFilterPrice(!filterPrice);
              setFilterSize(false);
              setFilter(false);
            }}
            className={`flex h-16 w-full cursor-pointer place-content-center items-center rounded-xl ${filterPrice ? "bg-ci-light-blue" : "bg-ci-light-gray"} px-6 text-left`}
          >
            <p className="px-2  font-semibold">Price</p>
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
        <div className="flex w-1/3 flex-col gap-3 px-3">
          <div
            onClick={() => {
              setFilterPrice(false);
              setFilterSize(!filterSize);
              setFilter(false);
            }}
            className={`flex h-16 w-full cursor-pointer place-content-center items-center rounded-xl ${filterSize ? "bg-ci-light-blue" : "bg-ci-light-gray"} px-6 text-left`}
          >
            <p className="px-2  font-semibold">Size</p>
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
        <div className="flex w-1/3 flex-col gap-3 px-3">
          <div
            onClick={() => {
              setFilterPrice(false);
              setFilterSize(false);
              setFilter(!filter);
            }}
            className={`flex h-16 w-full cursor-pointer place-content-center items-center rounded-xl ${filter ? "bg-ci-light-blue" : "bg-ci-light-gray"} px-6 text-left`}
          >
            <p className="px-2  font-semibold">Fliters</p>
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
                className="h-14 w-full rounded-xl border  bg-ci-light-gray px-4"
                onChange={(e) => {
                  if (parseInt(e.target.value) >= 0 || e.target.value === "") {
                    setMinPrice(Number(e.target.value));
                  } else {
                    setMinPrice(0);
                  }
                }}
                value={minPrice.toString()}
                placeholder="0"
              ></input>
            </div>
            <div className="mx-3 flex w-1/2  flex-col gap-x-2 gap-y-4">
              <div className="">Max. price</div>
              <input
                type="number"
                className="h-14 w-full rounded-xl border  bg-ci-light-gray px-4"
                onChange={(e) => {
                  if (parseInt(e.target.value) >= 0 || e.target.value === "") {
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
        {filterSize ? (
          <div className="flex h-36 w-full flex-row items-center justify-center gap-y-2 rounded-xl ">
            <div className="mx-3 flex w-1/2  flex-col gap-x-2 gap-y-4">
              <p className="">Min (m²)</p>
              <input
                type="number"
                className="h-14 w-full rounded-xl border bg-ci-light-gray px-4"
                onChange={(e) => {
                  if (parseInt(e.target.value) >= 0 || e.target.value === "") {
                    setMinSize(Number(e.target.value));
                  } else {
                    setMinSize(0);
                  }
                }}
                value={minSize.toString()}
                placeholder="0"
              ></input>
            </div>
            <div className="mx-3 flex w-1/2  flex-col gap-x-2 gap-y-4 ">
              <p className="">Max (m²)</p>
              <input
                type="number"
                className="h-14 w-full rounded-xl border bg-ci-light-gray px-4"
                onChange={(e) => {
                  if (parseInt(e.target.value) >= 0 || e.target.value === "") {
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
        {filter ? (
          <div className="m-3 h-full w-full flex-col justify-around gap-y-2 rounded-xl bg-ci-light-gray p-3 ">
            <div className="flex h-1/3  justify-between sm:flex-col md:flex-col 2xl:flex-row">
              <div className="h-18 m-7 flex w-2/5 items-center justify-center  rounded-xl bg-white sm:flex-col md:flex-col 2xl:flex-row">
                <div className="font-semibold">Bedroom(s)</div>
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
                    className="h-14 w-14 rounded-xl border  px-2 text-center"
                    onChange={(e) => {
                      if (e.target.value === "") {
                        setBedrooms(0);
                      } else {
                        formatBedroom(Number(e.target.value));
                      }
                    }}
                    value={bedrooms.toString()}
                  ></input>
                  <button
                    onClick={() => {
                      formatBedroom(bedrooms + 1);
                    }}
                    className="cursor-pointer rounded-xl px-2 text-2xl hover:bg-ci-gray"
                  >
                    +
                  </button>
                </div>
              </div>
              <div className="h-18 m-7 flex w-2/5 items-center justify-center gap-y-2 rounded-xl bg-white sm:flex-col md:flex-col 2xl:flex-row">
                <div className="font-semibold">Bathroom(s)</div>
                <div className="flex flex-row items-center gap-x-1 py-2">
                  <button
                    onClick={() => {
                      formatBathroom(bathrooms - 1);
                    }}
                    className="cursor-pointer rounded-xl px-2 text-2xl hover:bg-ci-gray"
                  >
                    -
                  </button>
                  <input
                    type="number"
                    className="h-14 w-14 rounded-xl border  px-2 text-center"
                    onChange={(e) => {
                      if (e.target.value === "") {
                        setBathrooms(0);
                      } else {
                        formatBathroom(Number(e.target.value));
                      }
                    }}
                    value={bathrooms.toString()}
                  ></input>
                  <button
                    onClick={() => {
                      formatBathroom(bathrooms + 1);
                    }}
                    className="cursor-pointer rounded-xl px-2 text-2xl hover:bg-ci-gray"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>

            <div className="m-7 flex  flex-col rounded-xl bg-white p-2">
              <div className="m-2 font-semibold">Features</div>
              <div className="grid grid-cols-3">
                {all_filters.map((fil) => (
                  <div className="m-3 flex flex-row">
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
