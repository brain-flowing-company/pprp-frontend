"use client";

import { useState } from "react";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import FurnishingButton from "@/components/create-property/FurnishingButton";

export default function AdditionalDetails() {
  const [furnishing, setFurnishing] = useState("fully-furnished");
  const [bedrooms, setBedrooms] = useState("");
  const [bathrooms, setBathrooms] = useState("");
  const [floor, setFloor] = useState("");
  const [floorSize, setFloorSize] = useState("");
  const [unitNumber, setUnitNumber] = useState("");
  const [photos, setPhotos] = useState([]);

  const handlePhotoUpload = (event) => {
    const files = event.target.files;
    const newPhotos = [...photos];
    for (let i = 0; i < files.length; i++) {
      newPhotos.push(URL.createObjectURL(files[i]));
    }
    setPhotos(newPhotos);
  };

  return (
    <div className="mx-auto h-auto max-w-4xl items-center justify-center rounded-md bg-white p-4 px-20 shadow-md">
      <h2 className="mb-4 text-2xl font-bold">Additional Details</h2>
      <div className="mb-4">
        <div className="flex space-x-4">
          <div className="w-full">
            <h3 className="text-md mb-2">Furnishing</h3>
            <div className="flex flex-col space-y-4">
              <div className="flex flex-row space-x-4">
                <div className="w-full">
                  <FurnishingButton
                    furnishing={furnishing}
                    label="Ready to Move"
                    tag={"ready-to-move"}
                    onClick={() => setFurnishing("ready-to-move")}
                  />
                </div>
                <div className="w-full">
                  <FurnishingButton
                    furnishing={furnishing}
                    label="Fully-Furnished"
                    tag={"fully-furnished"}
                    onClick={() => setFurnishing("fully-furnished")}
                  />
                </div>
              </div>
              <div className="flex flex-row space-x-4">
                <div className="w-full">
                  <FurnishingButton
                    furnishing={furnishing}
                    label="Partially-Furnished"
                    tag={"partially-furnished"}
                    onClick={() => setFurnishing("partially-furnished")}
                  />
                </div>
                <div className="w-full">
                  <FurnishingButton
                    furnishing={furnishing}
                    label="Unfurnished"
                    tag={"unfurnished"}
                    onClick={() => setFurnishing("unfurnished")}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Add input fields for other details */}
      <div className="mb-4">
        <div className="grid grid-cols-3 gap-4">
          <div>
            <label
              htmlFor="bedrooms"
              className="text-md block font-medium text-gray-700"
            >
              Bedrooms
            </label>
            <Input
              type="number"
              id="bedrooms"
              placeholder="Bedrooms"
              value={bedrooms}
              onChange={(e) => setBedrooms(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
            />
          </div>
          <div>
            <label
              htmlFor="bathrooms"
              className="text-md block font-medium text-gray-700"
            >
              Bathrooms
            </label>
            <Input
              type="number"
              id="bathrooms"
              placeholder="Bathrooms"
              value={bathrooms}
              onChange={(e) => setBathrooms(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
            />
          </div>
          <div>
            <label
              htmlFor="floor"
              className="text-md block font-medium text-gray-700"
            >
              Floor
            </label>
            <Input
              type="number"
              id="floor"
              placeholder="Floor"
              value={floor}
              onChange={(e) => setFloor(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
            />
          </div>
          <div>
            <label
              htmlFor="floorSize"
              className="text-md block font-medium text-gray-700"
            >
              Floor Size
            </label>
            <div className="mt-1 flex w-full flex-row shadow-sm">
              <Input
                type="number"
                id="floorSize"
                placeholder="Floor Size"
                value={floorSize}
                onChange={(e) => setFloorSize(e.target.value)}
                className="block rounded-l-md border-gray-300 pr-12 focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              />
              <div className="flex items-center rounded-md bg-ci-light-blue hover:bg-ci-dark-blue">
                <label htmlFor="floorSizeUnit" className="sr-only">
                  Floor Size Unit
                </label>
                <select
                  id="floorSizeUnit"
                  className="h-full border-transparent bg-transparent py-0 pl-2 pr-7 text-white  focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                >
                  <option value="sqm">sqm</option>
                  <option value="sqft">sqft</option>
                  {/* Add other units if needed */}
                </select>
              </div>
            </div>
          </div>
          <div>
            <label
              htmlFor="unitNumber"
              className="text-md block font-medium text-gray-700"
            >
              Unit Number
            </label>
            <Input
              type="number"
              id="unitNumber"
              placeholder="Unit Number"
              value={unitNumber}
              onChange={(e) => setUnitNumber(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
            />
          </div>
        </div>
      </div>
      <div className="mb-4">
        <h3 className="text-md mb-2">Upload Photos of Your Property</h3>
        <div className="flex w-full items-center justify-center">
          <label
            htmlFor="photo-upload"
            className="flex h-48 w-full cursor-pointer flex-col items-center justify-center rounded-md bg-ci-gray outline outline-2 outline-ci-dark-gray hover:bg-ci-dark-gray"
          >
            <svg
              className="mb-2 h-8 w-8 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
            <span className="text-sm text-gray-500">Add photos</span>
            <input
              id="photo-upload"
              type="file"
              className="hidden"
              multiple
              onChange={handlePhotoUpload}
            />
          </label>
        </div>
        <div className="mt-4 flex w-full space-x-4 overflow-x-auto">
          {photos.map((photo, index) => (
            <div
              key={index}
              className="relative inline-block h-28 w-44 flex-shrink-0"
            >
              {" "}
              {/* Adjust width as needed */}
              <Image
                src={photo}
                alt={`Property Photo ${index + 1}`}
                layout="fill" // This makes the image fill the container
                objectFit="cover" // Adjusts the image's fit within its box
                className="rounded-md"
              />
              <button
                className="absolute bottom-0 right-0 m-1 rounded-full bg-red-500 p-1 text-white"
                onClick={() => {
                  const newPhotos = [...photos];
                  newPhotos.splice(index, 1);
                  setPhotos(newPhotos);
                }}
              >
                <svg
                  className="h-4 w-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
          ))}
        </div>
      </div>
      <div className="flex justify-between">
        <button className="rounded-md bg-white px-10 py-2 text-gray-700 outline outline-gray-300 hover:bg-ci-dark-blue hover:text-white hover:outline-none">
          Back
        </button>
        <button className="rounded-md bg-ci-light-blue px-10 py-2 text-white hover:bg-ci-dark-blue">
          Submit
        </button>
      </div>
    </div>
  );
}
