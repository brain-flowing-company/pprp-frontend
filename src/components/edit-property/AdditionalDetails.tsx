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
    <div className="flex flex-row">
      <div className="flex flex-col">
        <div className="large-text m-4 font-bold"> Additional Details</div>
        <div className="medium-text font-medium">Furnishing</div>
        <div className="grid  grid-cols-2 gap-4 w-[550px]">
          <div className="flex  select-none items-center justify-center rounded-md w-full hover:bg-ci-dark-gray has-[:checked]:bg-black has-[:checked]:text-white">
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
          <div className="flex  select-none items-center justify-center rounded-md   w-full hover:bg-ci-dark-gray has-[:checked]:bg-black has-[:checked]:text-white">
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
          <div className="flex  select-none items-center justify-center rounded-md   w-full hover:bg-ci-dark-gray has-[:checked]:bg-black has-[:checked]:text-white">
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
          <div className="flex  select-none items-center justify-center rounded-md   w-full hover:bg-ci-dark-gray has-[:checked]:bg-black has-[:checked]:text-white">
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
      </div>
    </div>
  );
};

export default AdditionalDetails;
