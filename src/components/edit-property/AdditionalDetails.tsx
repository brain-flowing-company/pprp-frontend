"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import { redirect } from "next/navigation";
import { Input } from "@/components/ui/input";
import FurnishingButton from "@/components/create-property/FurnishingButton";
import TrackingCircle from "@/components/create-property/TrackingCircle";
import { AdditionalDetailPaneProps } from "@/app/(have-nav)/create-property/page";

export default function AdditionalDetail({
  additionalDetailPaneProps,
  setAdditionalDetailPaneProps,
  createProperty,
  nextStage,
  backStage,
}: {
  additionalDetailPaneProps: AdditionalDetailPaneProps;
  setAdditionalDetailPaneProps: Function;
  createProperty: Function;
  nextStage: Function;
  backStage: Function;
}) {
  const {
    furnishing,
    bedrooms,
    bathrooms,
    floor,
    floorSize,
    unitNumber,
    images,
    imageURLs,
  } = {
    furnishing: "ready-to-move-in",
    bedrooms: "",
    bathrooms: "",
    floor: "",
    floorSize: "",
    unitNumber: "",
    images: [],
    imageURLs: [],
  };

  // const router = useRouter();

  async function nextPageStatus() {
    console.log(additionalDetailPaneProps);
    const res = await createProperty();
    console.log(res);
    // redirect to the homepage
    window.location.href = "/";
    // redirect("/");
    // router.push("/app/(have-nav)/page");
    alert("Property created successfully!");
  }

  const handlePhotoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    console.log(files);
    const newImages = [...images];
    const newImageURLs = [...imageURLs];

    if (files !== null) {
      for (let i = 0; i < files.length; i++) {
        newImages.push(files[i]);
        newImageURLs.push(URL.createObjectURL(files[i]));
      }
    }
    setAdditionalDetailPaneProps({
      ...additionalDetailPaneProps,
      images: newImages,
      imageURLs: newImageURLs,
    });
  };

  function test() {
    console.log(additionalDetailPaneProps);
  }

  return (
    <div>
      {/* <button onClick={test}>test</button> */}
      <div className="m-20 my-20 h-auto items-center justify-center space-y-10 rounded-2xl border-2 border-ci-gray bg-white p-4 px-20 pt-10">
        <h2 className="text-c-2xl mb-4 font-bold">Additional Details</h2>
        <div className="mb-4">
          <div className="flex space-x-4">
            <div className="w-full">
              <h3 className="text-c-md mb-2">Furnishing</h3>
              <div className="flex flex-col space-y-4">
                <div className="flex flex-row space-x-4">
                  <div className="w-full">
                    <FurnishingButton
                      furnishing={furnishing}
                      label="Ready to Move"
                      tag={"ready-to-move-in"}
                      onClick={() =>
                        setAdditionalDetailPaneProps({
                          ...additionalDetailPaneProps,
                          furnishing: "ready-to-move-in",
                        })
                      }
                    />
                  </div>
                  <div className="w-full">
                    <FurnishingButton
                      furnishing={furnishing}
                      label="Fully-Furnished"
                      tag={"fully-furnished"}
                      onClick={() =>
                        setAdditionalDetailPaneProps({
                          ...additionalDetailPaneProps,
                          furnishing: "fully-furnished",
                        })
                      }
                    />
                  </div>
                </div>
                <div className="flex flex-row space-x-4">
                  <div className="w-full">
                    <FurnishingButton
                      furnishing={furnishing}
                      label="Partially-Furnished"
                      tag={"partially-furnished"}
                      onClick={() =>
                        setAdditionalDetailPaneProps({
                          ...additionalDetailPaneProps,
                          furnishing: "partially-furnished",
                        })
                      }
                    />
                  </div>
                  <div className="w-full">
                    <FurnishingButton
                      furnishing={furnishing}
                      label="Unfurnished"
                      tag={"unfurnished"}
                      onClick={() =>
                        setAdditionalDetailPaneProps({
                          ...additionalDetailPaneProps,
                          furnishing: "unfurnished",
                        })
                      }
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col">
          {/* Add input fields for other details */}
          <div className="mb-4">
            <div className="grid grid-cols-3 gap-4">
              <div>
                <label
                  htmlFor="bedrooms"
                  className="text-c-md block font-medium text-gray-700"
                >
                  Bedrooms
                </label>
                <Input
                  type="number"
                  id="bedrooms"
                  placeholder="Bedrooms"
                  value={bedrooms}
                  onChange={(e) =>
                    setAdditionalDetailPaneProps({
                      ...additionalDetailPaneProps,
                      bedrooms: e.target.value,
                    })
                  }
                  className="sm:text-c-sm mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label
                  htmlFor="bathrooms"
                  className="text-c-md block font-medium text-gray-700"
                >
                  Bathrooms
                </label>
                <Input
                  type="number"
                  id="bathrooms"
                  placeholder="Bathrooms"
                  value={bathrooms}
                  onChange={(e) =>
                    setAdditionalDetailPaneProps({
                      ...additionalDetailPaneProps,
                      bathrooms: e.target.value,
                    })
                  }
                  className="sm:text-c-sm mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label
                  htmlFor="floor"
                  className="text-c-md block font-medium text-gray-700"
                >
                  Floor
                </label>
                <Input
                  type="number"
                  id="floor"
                  placeholder="Floor"
                  value={floor}
                  onChange={(e) =>
                    setAdditionalDetailPaneProps({
                      ...additionalDetailPaneProps,
                      floor: e.target.value,
                    })
                  }
                  className="sm:text-c-sm mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label
                  htmlFor="floorSize"
                  className="text-c-md block font-medium text-gray-700"
                >
                  Floor Size
                </label>
                <div className="mt-1 flex w-full flex-row shadow-sm">
                  <Input
                    type="number"
                    id="floorSize"
                    placeholder="Floor Size"
                    value={floorSize}
                    onChange={(e) =>
                      setAdditionalDetailPaneProps({
                        ...additionalDetailPaneProps,
                        floorSize: e.target.value,
                      })
                    }
                    className="sm:text-c-sm block rounded-l-md border-gray-300 pr-12 focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
                  />
                  <div className="flex items-center rounded-md bg-ci-light-blue hover:bg-ci-dark-blue">
                    <label htmlFor="floorSizeUnit" className="sr-only">
                      Floor Size Unit
                    </label>
                    <select
                      id="floorSizeUnit"
                      className="sm:text-sm h-full border-transparent bg-transparent py-0 pl-2 pr-7  text-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
                      onChange={(e) =>
                        setAdditionalDetailPaneProps({
                          ...additionalDetailPaneProps,
                          floorSizeUnit: e.target.value.toUpperCase(),
                        })
                      }
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
                  className="text-c-md block font-medium text-gray-700"
                >
                  Unit Number
                </label>
                <Input
                  type="number"
                  id="unitNumber"
                  placeholder="Unit Number"
                  value={unitNumber}
                  onChange={(e) =>
                    setAdditionalDetailPaneProps({
                      ...additionalDetailPaneProps,
                      unitNumber: e.target.value,
                    })
                  }
                  className="sm:text-c-sm mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          </div>
          <div className="mb-4">
            <h3 className="text-c-md mb-2">Upload Photos of Your Property</h3>
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
              {imageURLs.map((imageURL, index) => (
                <div
                  key={index}
                  className="relative inline-block h-28 w-44 flex-shrink-0"
                >
                  {" "}
                  {/* Adjust width as needed */}
                  <Image
                    src={imageURL}
                    alt={`Property Photo ${index + 1}`}
                    layout="fill" // This makes the image fill the container
                    objectFit="cover" // Adjusts the image's fit within its box
                    className="rounded-md"
                  />
                  <button
                    className="absolute bottom-0 right-0 m-1 rounded-full bg-red-500 p-1 text-white"
                    onClick={() => {
                      const newImages = [...images];
                      const newImageURLs = [...imageURLs];
                      newImageURLs.splice(index, 1);
                      newImages.splice(index, 1);
                      setAdditionalDetailPaneProps({
                        ...additionalDetailPaneProps,
                        images: newImages,
                        imageURLs: newImageURLs,
                      });
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
        </div>
        <div className="flex justify-between">
          <button
            className="rounded-md bg-white px-10 py-2 text-gray-700 outline outline-gray-300 hover:bg-ci-dark-blue hover:text-white hover:outline-none"
            onClick={backStage}
          >
            Back
          </button>
          <button
            className="rounded-md bg-ci-light-blue px-10 py-2 text-white hover:bg-ci-dark-blue"
            onClick={nextPageStatus}
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
}
