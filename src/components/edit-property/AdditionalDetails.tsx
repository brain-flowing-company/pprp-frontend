"use client";
import { useState, useEffect } from "react";
import { PropertyFormData } from "@/models/PropertyData";
import PropertyImages from "@/models/PropertyData";
import PropertyData from "@/models/PropertyData";
import updateProperty from "@/services/property/updateProperty";
import getPropertyDetail from "@/services/property/getPropertyDetail";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { arePropertiesDifferent, isFormValid } from "@/lib/utils";

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

  const [isCanceling, setIsCanceling] = useState<boolean>(false);

  const router = useRouter();

  useEffect(() => {
    const fetchPropDetail = async () => {
      const propDetail: PropertyData = await getPropertyDetail(propId);
      if (propDetail) {
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
        };
        setAdditionalFormData(tmp);
        setOriginalData(tmp);
      }
    };
    fetchPropDetail();
  }, []);

  useEffect(() => {
    if (arePropertiesDifferent(originalData, additionalFormData)) {
      setIsChangesExist(true);
    } else {
      setIsChangesExist(false);
    }
  }, [additionalFormData]);

  const handleFormChange = (e: any) => {
    setAdditionalFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };
  
  const handlePhotoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files !== null) {
      if (additionalFormData.property_images !== undefined) {
        const tmpFiles: FileList[] = additionalFormData.property_images;
        tmpFiles?.push(event.target.files);
        setAdditionalFormData((prev) => ({
          ...prev,
          property_images: tmpFiles,
        }));
      } else {
        const tmpFiles: FileList[] = new Array<FileList>();
        tmpFiles.push(event.target.files);
        setAdditionalFormData((prev) => ({
          ...prev,
          property_images: tmpFiles,
        }));
      }
    }
  };
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const res = await updateProperty(additionalFormData);
    if (res) {
      router.push("/listing");
    }
  };

  return (
    <>
      {isCanceling ? (
        <div className="fixed left-[0] top-[0] z-40 flex h-full w-full flex-col items-center justify-center bg-black bg-opacity-20">
          <div className="p-auto relative  m-10 flex flex-col items-center justify-around rounded-2xl bg-white p-10">
            <div className="large-text font-bold ">Cancel Change</div>
            <div className="small-text m-6 md:m-8 lg:m-10">
              Are you sure you want to discard all changes ?
            </div>

            <div className="flex w-full flex-row items-center justify-center gap-x-5">
              <button
                className="medium-text  in-card-button  bg-[#B3B3B3]  "
                onClick={() => {
                  setIsCanceling(false);
                }}
              >
                No
              </button>
              <button
                className="medium-text in-card-button  bg-ci-red "
                onClick={(e) => {
                  setIsCanceling(false);
                  setAdditionalFormData((prev) => originalData);
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
              >
                Yes
              </button>
            </div>
          </div>
        </div>
      ) : null}
      <form onSubmit={handleSubmit}>
        <div className="large-text m-4 mx-10 my-8 font-bold">
          Additional Details
        </div>
        <div className="flex flex-col gap-10 px-10 xl:flex-row">
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
                  placeholder="Bathrooms"
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
          <div className="flex w-full flex-col">
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
                  required
                />
              </label>
            </div>
            <div className="m-4 flex w-full space-x-4 overflow-x-auto ">
              {/* show fetched image */}
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
                          objectFit="cover" // Adjusts the image's fit within its box
                          className="rounded-lg"
                          fill={true}
                        />
                        <button
                          className="absolute bottom-0 right-0 m-1 rounded-full bg-red-500 p-1 text-white"
                          onClick={(e) => {
                            e.preventDefault();
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
              {/* show new image */}
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
                          objectFit="cover" // Adjusts the image's fit within its box
                          className="rounded-lg"
                          fill={true}
                        />
                        <button
                          className="absolute bottom-0 right-0 m-1 rounded-full bg-red-500 p-1 text-white"
                          onClick={(e) => {
                            e.preventDefault();
                            const tmpFile = additionalFormData.property_images;
                            if (tmpFile !== undefined) {
                              tmpFile.splice(index, 1); //remove img
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
        <div className="flex justify-end">
          <button
            type="reset"
            onClick={(e) => {
              e.preventDefault();
              setIsCanceling(true);
            }}
            className="medium-text m-3 h-12 w-40 rounded-xl  bg-ci-dark-gray font-medium text-white"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="medium-text m-3 h-12 w-40 rounded-xl  bg-ci-blue font-medium text-white"
          >
            Save
          </button>
        </div>
      </form>
    </>
  );
};

export default AdditionalDetails;
