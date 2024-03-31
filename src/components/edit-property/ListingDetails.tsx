"use client";

import { useState, FormEvent, useEffect } from "react";
import Dropdown from "../create-property/DropDown";
import ListingType from "../create-property/ListingType";
import Map from "../create-property/Map";
import getPropertyDetail from "@/services/property/getPropertyDetail";

import PropertyData from "@/models/PropertyData";
import updateProperty from "@/services/property/updateProperty";

type ListingFormDataType = {
  name: string;
  listingType: string;
  propertyType: string;
  rentPrice: string;
  salePrice: string;
  description: string;
  address: string;
};

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

function checkValidFormData(listingFormData: ListingFormDataType): boolean {
  return (
    listingFormData.name.trim() !== "" &&
    listingFormData.listingType.trim() !== "" &&
    listingFormData.propertyType.trim() !== "" &&
    ((listingFormData.listingType.trim() === "rent" &&
      listingFormData.rentPrice.trim() !== "") ||
      (listingFormData.listingType.trim() === "sell" &&
        listingFormData.salePrice.trim() !== "") ||
      (listingFormData.listingType.trim() === "rent/sell" &&
        listingFormData.rentPrice.trim() !== "" &&
        listingFormData.salePrice.trim() !== "")) &&
    listingFormData.description.trim() !== "" &&
    listingFormData.address.trim() !== ""
  );
}

export default function ListingDetail({
  setIsChangesExist,
  propId,
}: {
  setIsChangesExist: Function;
  propId: string;
}) {

  const [originalData, setOriginalData] = useState<ListingFormDataType>({
    name: "",
    listingType: "",
    propertyType: "",
    rentPrice: "",
    salePrice: "",
    description: "",
    address: "",
  });
  const [listingFormData, setListingFormData] = useState<ListingFormDataType>({
    name: "",
    listingType: "",
    propertyType: "",
    rentPrice: "",
    salePrice: "",
    description: "",
    address: "",
  });
  const [hoveredOption, setHoveredOption] = useState<string>("");
  const [fetchData,setFetchData] = useState();
  useEffect(() => {
    const fetchPropDetail = async () => {
      const propDetail = await getPropertyDetail(propId);
      if (propDetail) {
        console.log(propDetail,"test")
        const tmp: ListingFormDataType = {
          name: propDetail.property_name,
          listingType: "rent",
          propertyType: propDetail.property_type,
          rentPrice: propDetail.renting_property.price_per_month.toString(),
          salePrice: propDetail.selling_property.price.toString(),
          description: propDetail.property_description,
          address: propDetail.address,
        };
        setListingFormData(tmp);
        setOriginalData(tmp);
        setFetchData((prev)=>propDetail)
      }
    };
    fetchPropDetail();
  }, []);

  useEffect(() => {
    setIsChangesExist(true);
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

  const handleSubmit = async (e:any)=>{
    e.preventDefault()
    console.log(listingFormData, "test edit")
    const updatedData:PropertyData = fetchData!
    console.log(fetchData,"dftghb")
    const res = await updateProperty(fetchData!)
    console.log(res)
  }

  return (
    
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
                    name="name"
                    id="txt"
                    autoComplete="off"
                    className={`block h-[60px] w-full rounded-[10px] border ${
                      listingFormData.name.trim() === ""
                        ? "border-ci-red"
                        : "border-ci-dark-gray"
                    } p-2 text-[20px]`}
                    type="text"
                    placeholder="Property Name"
                    value={listingFormData.name}
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
                      checked={listingFormData.listingType === "rent"}
                      onChange={handleFormChange}
                      style={{ display: "none" }}
                    />
                    <label
                      htmlFor="rent"
                      style={{
                        ...(listingFormData.listingType === "rent"
                          ? selectedStyle
                          : hoveredOption === "rent"
                            ? hoverStyle
                            : listingFormData.listingType === ""
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
                      checked={listingFormData.listingType === "sell"}
                      onChange={handleFormChange}
                      style={{ display: "none" }}
                    />
                    <label
                      htmlFor="sell"
                      style={{
                        ...(listingFormData.listingType === "sell"
                          ? selectedStyle
                          : hoveredOption === "sell"
                            ? hoverStyle
                            : listingFormData.listingType === ""
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
                      checked={listingFormData.listingType === "rent/sell"}
                      onChange={handleFormChange}
                      style={{ display: "none" }}
                    />
                    <label
                      htmlFor="rent/sell"
                      style={{
                        ...(listingFormData.listingType === "rent/sell"
                          ? selectedStyle
                          : hoveredOption === "rent/sell"
                            ? hoverStyle
                            : listingFormData.listingType === ""
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
                      className={`dropdown-select font-regular block h-[60px] w-full rounded-[10px] border ${listingFormData.propertyType === "" ? "border-ci-red" : "border-ci-dark-gray"} p-2 text-[20px] ${
                        listingFormData.propertyType === ""
                          ? "text-ci-dark-gray"
                          : "text-ci-black"
                      }`}
                      value={listingFormData.propertyType}
                      onChange={handleFormChange}
                      name="propertyType"
                    >
                      <option
                        value=""
                        className="text-[20px] text-ci-dark-gray"
                      >
                        {listingFormData.propertyType
                          ? listingFormData.propertyType
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
                    name="rentPrice"
                    id="txt"
                    autoComplete="off"
                    className={`block h-[60px] w-full rounded-[10px] border ${
                      listingFormData.rentPrice.trim() === "" &&
                      (listingFormData.listingType.trim() === "rent" ||
                        listingFormData.listingType.trim() === "rent/sell")
                        ? "border-ci-red"
                        : "border-ci-dark-gray"
                    } p-2 text-[20px]`}
                    type="number"
                    placeholder="฿"
                    value={
                      listingFormData.rentPrice !== "0"
                        ? listingFormData.rentPrice
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
                    name="salePrice"
                    id="txt"
                    autoComplete="off"
                    className={`block h-[60px] w-full rounded-[10px] border ${
                      listingFormData.salePrice.trim() === "" &&
                      (listingFormData.listingType.trim() === "sell" ||
                        listingFormData.listingType.trim() === "rent/sell")
                        ? "border-ci-red"
                        : "border-ci-dark-gray"
                    } p-2 text-[20px]`}
                    type="number"
                    placeholder="฿"
                    value={
                      listingFormData.salePrice !== "0"
                        ? listingFormData.salePrice
                        : ""
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
                    name="description"
                    className={`flex w-full rounded-[10px] border ${
                      listingFormData.description.trim() === ""
                        ? "border-ci-red"
                        : "border-ci-dark-gray"
                    } p-2`}
                    id="description"
                    value={listingFormData.description}
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
                  onClick={()=>{
                    setListingFormData(originalData)
                    window.scrollTo({ top: 0, behavior: "smooth" });
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

  );
}
