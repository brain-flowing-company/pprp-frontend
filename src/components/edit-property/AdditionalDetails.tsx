"use client";
import { useState, useEffect } from "react";
import { PropertyFormData } from "@/models/PropertyData";
import PropertyImages from "@/models/PropertyData";

import PropertyData from "@/models/PropertyData";
import updateProperty from "@/services/property/updateProperty";
import getPropertyDetail from "@/services/property/getPropertyDetail";
import Image from "next/image";

const AdditionalDetails = ({
  setIsChangesExist,
  propId,
}: {
  setIsChangesExist: Function;
  propId: string;
}) => {
  const [originalData, setOriginalData] = useState<PropertyFormData>(
    {} as PropertyFormData
  );
  const [additionalFormData, setAdditionalFormData] =
    useState<PropertyFormData>({} as PropertyFormData);

  useEffect(() => {
    const fetchPropDetail = async () => {
      const propDetail: PropertyData = await getPropertyDetail(propId);
      if (propDetail) {
        console.log(propDetail, "test");
        console.log(originalData, "test ori");
        const img_urls: string[] = propDetail.property_images.map(
          (prop_img: PropertyImages) => prop_img.image_url
        );
        const tmp: PropertyFormData = {
          propertyId: propDetail.property_id,
          address: propDetail.address,
          alley: propDetail.alley,
          bedrooms: propDetail.bedrooms,
          bathrooms: propDetail.bathrooms,
          country: propDetail.country,
          district: propDetail.district,
          floor: propDetail.floor,
          floor_size: propDetail.floor_size,
          floor_size_unit: propDetail.floor_size_unit,
          furnishing: propDetail.furnishing,
          image_urls: img_urls,
          is_occupied: propDetail.renting_property.is_occupied,
          is_sold: propDetail.selling_property.is_sold,
          postal_code: propDetail.postal_code,
          price: propDetail.selling_property.price,
          price_per_month: propDetail.renting_property.price_per_month,
          property_description: propDetail.property_description,
          property_name: propDetail.property_name,
          property_type: propDetail.property_type,
          province: propDetail.province,
          street: propDetail.street,
          sub_district: propDetail.sub_district,
          unit_number: propDetail.unit_number,
          property_images: new Array<FileList>(),
        };
        setAdditionalFormData(tmp);
        setOriginalData(tmp);
        console.log(tmp);
      }
    };
    fetchPropDetail();
  }, []);
  useEffect(() => {
    setIsChangesExist(true);
  }, [additionalFormData]);
  const handleFormChange = (e: any) => {
    setAdditionalFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
    console.log(e.target.name, e.target.value);
  };
  const handlePhotoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files !== null) {
      const files: FileList = event.target.files;
      if (files) {
        additionalFormData.property_images?.push(files);
        setAdditionalFormData((prev) => ({
          ...prev,
        }));
      }
    }
  };
  return (
    <>
      <div className="large-text m-4 mx-10 my-8 font-bold">
        {" "}
        Additional Details
      </div>
      <div className="flex flex-col gap-10 px-10 lg:flex-row">
        <div className="flex flex-col ">
          <div className="medium-text m-4 font-medium">Furnishing</div>
          <div className="m-4  grid w-[550px]  grid-cols-2 gap-4">
            <div className="flex  w-full select-none items-center justify-center rounded-md border-2 border-solid border-ci-dark-gray hover:bg-ci-dark-gray has-[:checked]:border-0 has-[:checked]:bg-black has-[:checked]:text-white">
              <input
                type="radio"
                id="Ready to Move"
                name="furnishing"
                className="invisible "
                value="READY_TO_MOVE_IN"
                checked={additionalFormData.furnishing === "READY_TO_MOVE_IN"}
                onChange={handleFormChange}
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
                value="FULLY_FURNISHED"
                checked={additionalFormData.furnishing === "FULLY_FURNISHED"}
                onChange={handleFormChange}
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
                value="PARTIALLY_FURNISHED"
                checked={
                  additionalFormData.furnishing === "PARTIALLY_FURNISHED"
                }
                onChange={handleFormChange}
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
                value="UNFURNISHED"
                checked={additionalFormData.furnishing === "UNFURNISHED"}
                onChange={handleFormChange}
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
                value={additionalFormData.bedrooms}
                className="m-2 block w-full rounded-md border-2 border-solid border-ci-dark-gray p-2 "
                onChange={handleFormChange}
              />
            </div>
            <div>
              <div className="medium-text m-2 font-medium">Bathrooms</div>
              <input
                type="number"
                name="bathrooms"
                placeholder="Bethrooms"
                required
                value={additionalFormData.bathrooms}
                className="m-2 block w-full rounded-md border-2 border-solid border-ci-dark-gray p-2 "
                onChange={handleFormChange}
              />
            </div>
            <div>
              <div className="medium-text m-2 font-medium">Floor</div>
              <input
                type="number"
                name="floor"
                placeholder="Floor"
                required
                value={additionalFormData.floor}
                className="m-2 block w-full rounded-md border-2 border-solid border-ci-dark-gray p-2 "
                onChange={handleFormChange}
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
                  value={additionalFormData.floor_size}
                  className=" flex h-full w-full rounded-md border-2 border-solid border-ci-dark-gray p-2 "
                  onChange={handleFormChange}
                />
                <select
                  name="floor_size_unit"
                  value={additionalFormData.floor_size_unit}
                  className="flex h-full rounded-lg  bg-ci-light-blue text-white  "
                  onChange={handleFormChange}
                >
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
                value={additionalFormData.unit_number}
                className="m-2 block w-full rounded-md border-2 border-solid border-ci-dark-gray p-2 "
                onChange={handleFormChange}
              />
            </div>
          </div>
        </div>
        <div className="flex flex-col">
          <div className="medium-text m-4 font-medium">
            Upload Photos of Your Property
          </div>
          <div className="m-4 flex w-full items-center justify-center">
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
          <div className="m-4 flex w-full space-x-4 overflow-x-auto ">
            {additionalFormData.image_urls
              ? additionalFormData.image_urls.map(
                  (imageURL: string, index: number) => (
                    <div
                      key={index}
                      className="relative inline-block h-36 w-2/3 flex-shrink-0"
                    >
                      {/* Adjust width as needed */}
                      <Image
                        src={imageURL}
                        alt={`Property Photo ${index + 1}`}
                        layout="fill" // This makes the image fill the container
                        objectFit="cover" // Adjusts the image's fit within its box
                        className="rounded-lg"
                      />
                      <button
                        className="absolute bottom-0 right-0 m-1 rounded-full bg-red-500 p-1 text-white"
                        onClick={() => {
                          const tmpImg = additionalFormData.image_urls;
                          tmpImg.splice(index, 1);
                          setAdditionalFormData((prev) => ({
                            ...prev,
                            image_urls: tmpImg,
                          }));
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
                  )
                )
              : null}
            {additionalFormData.property_images?.length !== 0
              ? additionalFormData.property_images?.map(
                  (imageFile: FileList, index: number) => (
                    <div
                      key={index}
                      className="relative inline-block h-36 w-2/3 flex-shrink-0"
                    >
                      {/* Adjust width as needed */}
                      <Image
                        src={URL.createObjectURL(imageFile[0])}
                        alt={`Property Photo ${index + 1}`}
                        layout="fill" // This makes the image fill the container
                        objectFit="cover" // Adjusts the image's fit within its box
                        className="rounded-lg"
                      />
                      <button
                        className="absolute bottom-0 right-0 m-1 rounded-full bg-red-500 p-1 text-white"
                        onClick={() => {
                          const tmpFile = additionalFormData.property_images;
                          if (tmpFile !== undefined) {
                            tmpFile.splice(index, 1);
                            setAdditionalFormData((prev) => ({
                              ...prev,
                              property_images: tmpFile,
                            }));
                          }
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
                  )
                )
              : null}
          </div>
        </div>
      </div>
    </>
  );
};

export default AdditionalDetails;
