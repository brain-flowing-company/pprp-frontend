"use client";
import { useState, useEffect } from "react";

const AdditionalDetails = ({
  setIsChangesExist,
  propId,
}: {
  setIsChangesExist: Function;
  propId: string;
}) => {
  return (
    <>
      <div className="large-text m-4 font-bold mx-10 my-8"> Additional Details</div>
      <div className="flex flex-row px-10">
        <div className="flex flex-col">
          <div className="medium-text m-4 font-medium">Furnishing</div>
          <div className="m-4  grid w-[550px]  grid-cols-2 gap-4">
            <div className="flex  w-full select-none items-center justify-center rounded-md border-2 border-solid border-ci-dark-gray hover:bg-ci-dark-gray has-[:checked]:border-0 has-[:checked]:bg-black has-[:checked]:text-white">
              <input
                type="radio"
                id="Ready to Move"
                name="furnishing"
                className="invisible "
              ></input>
              <label
                htmlFor="Ready to Move"
                className="small-text inline-block h-full w-full p-3 text-center"
              >
                Ready to Move
              </label>
            </div>
            <div className="flex  w-full select-none items-center justify-center rounded-md border-2 border-solid border-ci-dark-gray hover:bg-ci-dark-gray has-[:checked]:border-0 has-[:checked]:bg-black has-[:checked]:text-white">
              <input
                type="radio"
                id="Fully-Furnished"
                name="furnishing"
                className="invisible "
              ></input>
              <label
                htmlFor="Fully-Furnished"
                className="small-text inline-block h-full w-full p-3 text-center"
              >
                Fully-Furnished
              </label>
            </div>
            <div className="flex  w-full select-none items-center justify-center rounded-md border-2 border-solid border-ci-dark-gray hover:bg-ci-dark-gray has-[:checked]:border-0 has-[:checked]:bg-black has-[:checked]:text-white">
              <input
                type="radio"
                id="Partially-Furnished"
                name="furnishing"
                className="invisible "
              ></input>
              <label
                htmlFor="Partially-Furnished"
                className="small-text inline-block h-full w-full p-3 text-center"
              >
                Partially-Furnished
              </label>
            </div>
            <div className="flex  w-full select-none items-center justify-center rounded-md border-2 border-solid border-ci-dark-gray hover:bg-ci-dark-gray has-[:checked]:border-0 has-[:checked]:bg-black has-[:checked]:text-white">
              <input
                type="radio"
                id="Unfurnished"
                name="furnishing"
                className="invisible "
              ></input>
              <label
                htmlFor="Unfurnished"
                className="small-text inline-block h-full w-full p-3 text-center"
              >
                Unfurnished
              </label>
            </div>
          </div>
          <div className="m-4 grid w-[550px] grid-cols-3  gap-4">
            <div>
              <div className="medium-text m-2 font-medium">Bedrooms</div>
              <input
                type="number"
                name="bedrooms"
                placeholder="Bedrooms"
                required
                className="m-2 block w-full rounded-md border-2 border-solid border-ci-dark-gray p-2 "
              />
            </div>
            <div>
              <div className="medium-text m-2 font-medium">Bathrooms</div>
              <input
                type="number"
                name="bathrooms"
                placeholder="Bethrooms"
                required
                className="m-2 block w-full rounded-md border-2 border-solid border-ci-dark-gray p-2 "
              />
            </div>
            <div>
              <div className="medium-text m-2 font-medium">Floor</div>
              <input
                type="number"
                name="floor"
                placeholder="Floor"
                required
                className="m-2 block w-full rounded-md border-2 border-solid border-ci-dark-gray p-2 "
              />
            </div>
          </div>
          <div className="m-4 grid w-[550px] grid-cols-2  gap-4">
            <div>
              <div className="medium-text m-2 font-medium">Floor Size</div>
              <div className="m-2 flex h-11 flex-row">
                <input
                  type="number"
                  name="floor_size"
                  placeholder="Floor Size"
                  required
                  className=" flex h-full w-full rounded-md border-2 border-solid border-ci-dark-gray p-2 "
                />
                <select className="flex    h-full rounded-lg  bg-ci-light-blue text-white  ">
                  <option
                    value="SQM"
                    className=" h-20 bg-white text-center text-black hover:bg-ci-dark-gray"
                  >
                    Sqm
                  </option>
                  <option
                    value="SQFT"
                    className=" h-20 bg-white text-center text-black hover:bg-ci-dark-gray"
                  >
                    Sqft
                  </option>
                </select>
              </div>
            </div>
            <div>
              <div className="medium-text m-2 font-medium">Unit Number</div>
              <input
                type="number"
                name="unit_number"
                placeholder="Unit Number"
                required
                className="m-2 block w-full rounded-md border-2 border-solid border-ci-dark-gray p-2 "
              />
            </div>
          </div>
        </div>
        <div className="flex">sadfgfhghkj</div>
      </div>
    </>
  );
};

export default AdditionalDetails;
