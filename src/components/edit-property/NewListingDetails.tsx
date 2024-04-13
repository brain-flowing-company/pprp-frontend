"use client";

import { useState, useEffect } from "react";
import Map from "../create-property/Map";
import getPropertyDetail from "@/services/property/getPropertyDetail";
import PropertyData from "@/models/PropertyData";
import updateProperty from "@/services/property/updateProperty";
import { PropertyFormData } from "@/models/PropertyData";
import PropertyImages from "@/models/PropertyData";
import { useRouter } from "next/navigation";
import { arePropertiesDifferent } from "@/lib/utils";
import PropertyMap from "@/components/edit-property/PropertyMap";

const propertyTypes = [
  ["Condominium", "CONDOMINIUM"],
  ["Apartment", "APARTMENT"],
  ["Semi-detached House", "SEMI-DETACHED_HOUSE"],
  ["House", "HOUSE"],
  ["Serviced Apartment", "SERVICED_APARTMENT"],
  ["Townhouse", "TOWNHOUSE"],
];

const ListingDetails = ({
  setIsChangesExist,
  propId,
}: {
  setIsChangesExist: Function;
  propId: string;
}) => {
  const [ListingType, setListingType] = useState<string>("");
  const [originalData, setOriginalData] = useState<PropertyFormData>(
    {} as PropertyFormData
  );
  const [listingFormData, setListingFormData] = useState<PropertyFormData>(
    {} as PropertyFormData
  );
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
        setListingFormData(tmp);
        setOriginalData(tmp);
        if (tmp.price !== 0 && tmp.price_per_month !== 0) {
          setListingType("Rent/Sell");
        } else if (tmp.price !== 0 && tmp.price_per_month === 0) {
          setListingType("Sell");
        } else if (tmp.price === 0 && tmp.price_per_month !== 0) {
          setListingType("Rent");
        }
      }
    };
    fetchPropDetail();
  }, []);

  useEffect(() => {
    if (arePropertiesDifferent(originalData, listingFormData)) {
      setIsChangesExist(true);
    } else {
      setIsChangesExist(false);
    }
  }, [listingFormData]);

  const handleFormChange = (e: any) => {
    setListingFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleListTypeChange = (e: any) => {
    setListingType(e.target.value);
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    console.table(listingFormData);
    const res = await updateProperty(listingFormData);
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
                onClick={() => {
                  setIsCanceling(false);
                  setListingFormData(originalData);
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
          Listing Details
        </div>
        <div className="flex h-full flex-col gap-10 px-10 xl:flex-row">
          <div className="flex flex-col">
            <div>
              <div className="medium-text m-2 font-medium">Name</div>
              <input
                type="text"
                name="property_name"
                placeholder="Name"
                required
                value={listingFormData.property_name}
                className="m-2 block w-full rounded-md border-2 border-solid border-ci-dark-gray p-2 "
                onChange={handleFormChange}
              />
            </div>
            <div className="medium-text m-4 max-h-4 font-medium">
              Listing Type
            </div>
            <div className="m-4  grid h-full w-full xl:w-[550px]  grid-cols-3 gap-4 xl:gap-8">
              <div className="flex  w-full select-none items-center justify-center rounded-md border-2 border-solid border-ci-dark-gray hover:bg-ci-dark-gray has-[:checked]:border-0 has-[:checked]:bg-black has-[:checked]:text-white">
                <input
                  type="radio"
                  id="Rent"
                  className="invisible "
                  value="Rent"
                  checked={ListingType === "Rent"}
                  onChange={handleListTypeChange}
                ></input>
                <label
                  htmlFor="Rent"
                  className="small-text inline-block h-full w-full p-3 text-center"
                >
                  Rent
                </label>
              </div>
              <div className="flex  w-full select-none items-center justify-center rounded-md border-2 border-solid border-ci-dark-gray hover:bg-ci-dark-gray has-[:checked]:border-0 has-[:checked]:bg-black has-[:checked]:text-white">
                <input
                  type="radio"
                  id="Sell"
                  className="invisible "
                  value="Sell"
                  checked={ListingType === "Sell"}
                  onChange={handleListTypeChange}
                ></input>
                <label
                  htmlFor="Sell"
                  className="small-text inline-block h-full w-full p-3 text-center"
                >
                  Sell
                </label>
              </div>
              <div className="flex  w-full select-none items-center justify-center rounded-md border-2 border-solid border-ci-dark-gray hover:bg-ci-dark-gray has-[:checked]:border-0 has-[:checked]:bg-black has-[:checked]:text-white">
                <input
                  type="radio"
                  id="Rent/Sell"
                  className="invisible "
                  value="Rent/Sell"
                  checked={ListingType === "Rent/Sell"}
                  onChange={handleListTypeChange}
                ></input>
                <label
                  htmlFor="Rent/Sell"
                  className="small-text inline-block h-full w-full p-3 text-center"
                >
                  Rent/Sell
                </label>
              </div>
            </div>
            <div className="flex flex-col gap-4 md:flex-col lg:flex-row xl:gap-0 xl:flex-col justify-between">
              <div className="w-full">
                <div className="medium-text m-2 font-medium">
                  Rent Price/month(THB)
                </div>
                <input
                  type="number"
                  name="price_per_month"
                  placeholder="฿"
                  required
                  value={listingFormData.price_per_month}
                  className="m-2 block w-full rounded-md border-2 border-solid border-ci-dark-gray p-2 "
                  onChange={handleFormChange}
                />
              </div>

              <div className="w-full">
                <div className="medium-text m-2 font-medium">
                  Sale Price(THB)
                </div>
                <input
                  type="number"
                  name="price"
                  placeholder="฿"
                  required
                  value={listingFormData.price}
                  className="m-2 block w-full rounded-md border-2 border-solid border-ci-dark-gray p-2 "
                  onChange={handleFormChange}
                />
              </div>
            </div>

            <div>
              <div className="medium-text m-2 font-medium">Property Type</div>
              <select
                name="property_type"
                value={listingFormData.property_type}
                className="m-2 flex h-11 w-full rounded-lg border-2 border-solid border-ci-dark-gray  "
                onChange={handleFormChange}
              >
                {propertyTypes.map((option, index) => (
                  <option
                    className="small-text text-ci-black"
                    key={index}
                    value={option[1]}
                  >
                    {option[0]}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="flex w-full flex-col">
            <div>
              <div className="medium-text m-2 font-medium">Address</div>
              <input
                type="text"
                name="address"
                placeholder="Address"
                required
                value={listingFormData.address}
                className="m-2 block w-full rounded-md border-2 border-solid border-ci-dark-gray p-2 "
                onChange={handleFormChange}
              />
            </div>
            <div className="m-2 h-full w-full">
              <PropertyMap name={listingFormData.property_name}></PropertyMap>
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

export default ListingDetails;
