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

const propertyTypes = [
  "Condominium",
  "Apartment",
  "Semi-detached House",
  "House",
  "Serviced Apartment",
  "Townhouse",
];

const labelStyle: React.CSSProperties = {
  display: "inline-block",
  padding: "10px 20px",
  backgroundColor: "#FFFFFF",
  border: "1px solid #B3B3B3",
  borderRadius: "10px",
  cursor: "pointer",
  width: "100%",
  height: "60px",
  fontSize: "24px",
  textAlign: "center",
  color: "#0F142E",
  overflow: "hidden",
};

const selectedStyle: React.CSSProperties = {
  ...labelStyle,
  backgroundColor: "#0F142E",
  color: "#FFFFFF",
};

const hoverStyle: React.CSSProperties = {
  ...labelStyle,
  backgroundColor: "#B3B3B3",
};

const noOptionSelectedStyle: React.CSSProperties = {
  ...labelStyle,
  border: "1px solid red",
};

export default function ListingDetail({
  setIsChangesExist,
  propId,
}: {
  setIsChangesExist: Function;
  propId: string;
}) {
  const [ListingType, setListingType] = useState<string>("");
  const [originalData, setOriginalData] = useState<PropertyFormData>(
    {} as PropertyFormData
  );
  const [listingFormData, setListingFormData] = useState<PropertyFormData>(
    {} as PropertyFormData
  );
  const [hoveredOption, setHoveredOption] = useState<string>("");
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
          setListingType("rent/sell");
        } else if (tmp.price !== 0 && tmp.price_per_month === 0) {
          setListingType("sell");
        } else if (tmp.price === 0 && tmp.price_per_month !== 0) {
          setListingType("rent");
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

  const handleMouseEnter = (option: string) => {
    setHoveredOption(option);
  };

  const handleMouseLeave = () => {
    setHoveredOption("");
  };

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
      <div className="flex">
        <div className="m-20 flex-grow rounded-[20px] border-2 border-gray-300 p-10">
          <form onSubmit={handleSubmit}>
            <div className="flex w-full flex-col gap-10">
              <div className="text-[36px] font-bold text-ci-black">
                Listing Details
              </div>
              <div className="grid grid-cols-1 gap-8 xl:grid-cols-2">
                <div className="grid gap-6">
                  <div className="text-[28px] font-medium text-ci-black">
                    Name
                  </div>
                  <input
                    name="property_name"
                    id="txt"
                    autoComplete="off"
                    className={`block h-[60px] w-full rounded-[10px] border ${
                      listingFormData.property_name !== undefined &&
                      listingFormData.property_name.trim() === ""
                        ? "border-ci-red"
                        : "border-ci-dark-gray"
                    } p-2 text-[20px]`}
                    type="text"
                    placeholder="Property Name"
                    value={listingFormData.property_name}
                    onChange={handleFormChange}
                  ></input>
                </div>
                <div className="grid gap-6">
                  <div className="text-[28px] font-medium text-ci-black">
                    Listing Type
                  </div>
                  <div className="grid gap-6 sm:grid-cols-3">
                    <input
                      type="radio"
                      id="rent"
                      name="listingType"
                      value="rent"
                      checked={ListingType === "rent"}
                      onChange={handleListTypeChange}
                      style={{ display: "none" }}
                    />
                    <label
                      htmlFor="rent"
                      style={{
                        ...(ListingType === "rent"
                          ? selectedStyle
                          : hoveredOption === "rent"
                            ? hoverStyle
                            : ListingType === ""
                              ? noOptionSelectedStyle
                              : labelStyle),
                      }}
                      onMouseEnter={() => handleMouseEnter("rent")}
                      onMouseLeave={handleMouseLeave}
                    >
                      Rent
                    </label>

                    <input
                      type="radio"
                      id="sell"
                      name="listingType"
                      value="sell"
                      checked={ListingType === "sell"}
                      onChange={handleListTypeChange}
                      style={{ display: "none" }}
                    />
                    <label
                      htmlFor="sell"
                      style={{
                        ...(ListingType === "sell"
                          ? selectedStyle
                          : hoveredOption === "sell"
                            ? hoverStyle
                            : ListingType === ""
                              ? noOptionSelectedStyle
                              : labelStyle),
                      }}
                      onMouseEnter={() => handleMouseEnter("sell")}
                      onMouseLeave={handleMouseLeave}
                    >
                      Sell
                    </label>

                    <input
                      type="radio"
                      id="rent/sell"
                      name="listingType"
                      value="rent/sell"
                      checked={ListingType === "rent/sell"}
                      onChange={handleListTypeChange}
                      style={{ display: "none" }}
                    />
                    <label
                      htmlFor="rent/sell"
                      style={{
                        ...(ListingType === "rent/sell"
                          ? selectedStyle
                          : hoveredOption === "rent/sell"
                            ? hoverStyle
                            : ListingType === ""
                              ? noOptionSelectedStyle
                              : labelStyle),
                      }}
                      onMouseEnter={() => handleMouseEnter("rent/sell")}
                      onMouseLeave={handleMouseLeave}
                    >
                      Rent/Sell
                    </label>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-1 gap-8 xl:grid-cols-3">
                <div className="grid gap-6">
                  <div className="flex flex-col gap-[24px]">
                    <label
                      className="text-[28px] font-medium text-ci-black"
                      htmlFor="txt"
                    >
                      Property Type
                    </label>

                    <select
                      className={`dropdown-select font-regular block h-[60px] w-full rounded-[10px] border ${listingFormData.property_type === null ? "border-ci-red" : "border-ci-dark-gray"} p-2 text-[20px] ${
                        listingFormData.property_type === null
                          ? "text-ci-dark-gray"
                          : "text-ci-black"
                      }`}
                      value={listingFormData.property_type}
                      onChange={handleFormChange}
                      name="property_type"
                    >
                      <option
                        value=""
                        className="text-[20px] text-ci-dark-gray"
                      >
                        {listingFormData.property_type
                          ? listingFormData.property_type
                          : "Select Property Type"}
                      </option>
                      {propertyTypes.map((option, index) => (
                        <option
                          className="text-[20px] text-ci-black"
                          key={index}
                          value={option}
                        >
                          {option}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="grid gap-6">
                  <div className="text-[28px] font-medium text-ci-black">
                    Rent Price/m (THB)
                  </div>
                  <input
                    name="price_per_month"
                    id="txt"
                    autoComplete="off"
                    className={`block h-[60px] w-full rounded-[10px] border ${
                      listingFormData.price_per_month === null &&
                      (ListingType.trim() === "rent" ||
                        ListingType.trim() === "rent/sell")
                        ? "border-ci-red"
                        : "border-ci-dark-gray"
                    } p-2 text-[20px]`}
                    type="number"
                    placeholder="฿"
                    value={
                      listingFormData.price_per_month !== 0
                        ? listingFormData.price_per_month
                        : ""
                    }
                    onChange={handleFormChange}
                  ></input>
                </div>
                <div className="grid gap-6">
                  <div className="text-[28px] font-medium text-ci-black">
                    Sale Price (THB)
                  </div>
                  <input
                    name="price"
                    id="txt"
                    autoComplete="off"
                    className={`block h-[60px] w-full rounded-[10px] border ${
                      listingFormData.price === null &&
                      (ListingType.trim() === "sell" ||
                        ListingType.trim() === "rent/sell")
                        ? "border-ci-red"
                        : "border-ci-dark-gray"
                    } p-2 text-[20px]`}
                    type="number"
                    placeholder="฿"
                    value={
                      listingFormData.price !== 0 ? listingFormData.price : ""
                    }
                    onChange={handleFormChange}
                  ></input>
                </div>
              </div>
              <div className="grid">
                <div className="grid gap-6">
                  <div className="text-[28px] font-medium text-ci-black">
                    Description
                  </div>
                  <textarea
                    name="property_description"
                    className={`flex w-full rounded-[10px] border ${
                      listingFormData.property_description !== undefined &&
                      listingFormData.property_description.trim() === ""
                        ? "border-ci-red"
                        : "border-ci-dark-gray"
                    } p-2`}
                    id="description"
                    value={listingFormData.property_description}
                    onChange={handleFormChange}
                    rows={3}
                    cols={40}
                    placeholder="Description"
                    style={{
                      fontSize: "20px",
                      paddingTop: "10px",
                      paddingLeft: "10px",
                    }}
                  ></textarea>
                </div>
              </div>
              <div className="grid">
                <div className="grid gap-6">
                  <div className="text-[28px] font-medium text-ci-black">
                    Address
                  </div>
                  <input
                    name="address"
                    type="text"
                    value={listingFormData.address}
                    className={`block h-[60px] rounded-[10px] border ${
                      listingFormData.address !== undefined &&
                      listingFormData.address.trim() === ""
                        ? "border-ci-red"
                        : "border-ci-dark-gray"
                    } p-2`}
                    onChange={handleFormChange}
                    placeholder="Address"
                    style={{ fontSize: "20px" }}
                  ></input>
                  <Map name="" />
                </div>
              </div>
              <div className="flex justify-end">
                <button
                  type="reset"
                  onClick={() => {
                    setIsCanceling(true);
                  }}
                  className="m-3 h-[60px] w-[190px] rounded-[10px] bg-ci-dark-gray px-10 py-2 text-[24px] font-medium text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  //   onClick={() => }
                  className="m-3 h-[60px] w-[190px] rounded-[10px] bg-ci-blue px-10 py-2 text-[24px] font-medium text-white"
                >
                  Save
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
