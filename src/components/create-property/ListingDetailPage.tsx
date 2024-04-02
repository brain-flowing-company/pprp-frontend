"use client";

import { useState, FormEvent, useEffect } from "react";
import Dropdown from "./DropDown";
import ListingType from "./ListingType";
import TrackingCircle from "./TrackingCircle";
import Map from "./Map";

export default function ListingDetailPage({
  changeCreateState,
  name,
  listingType,
  propertyType,
  rentPrice,
  salePrice,
  description,
  address,
  setName,
  setListingType,
  setPropertyType,
  setRentPrice,
  setSalePrice,
  setDescription,
  setAddress,
}: {
  changeCreateState: Function;
  name: string;
  listingType: string;
  propertyType: string;
  rentPrice: string;
  salePrice: string;
  description: string;
  address: string;
  setName: Function;
  setListingType: Function;
  setPropertyType: Function;
  setRentPrice: Function;
  setSalePrice: Function;
  setDescription: Function;
  setAddress: Function;
}) {
  const [nametmp, setNametmp] = useState<string>("");
  const [selectedListingType, setSelectedListingType] = useState<string>("");
  const [selectedPropertyType, setSelectedPropertyType] = useState<string>("");
  const [rentPricetmp, setRentPricetmp] = useState<string>();
  const [salePricetmp, setSalePricetmp] = useState<string>();
  const [descriptiontmp, setDescriptiontmp] = useState<string>("");
  const [addresstmp, setAddresstmp] = useState("");
  const [isFormValid, setIsFormValid] = useState<boolean>(false);

  const propertyTypes = [
    "Condominium",
    "Apartment",
    "Semi-detached House",
    "House",
    "Serviced Apartment",
    "Townhouse",
  ];

  function initial(
    name: string,
    listingType: string,
    propertyType: string,
    rentPrice: string,
    salePrice: string,
    description: string,
    address: string
  ) {
    setNametmp(name);
    setSelectedListingType(listingType);
    setSelectedPropertyType(propertyType);
    setRentPricetmp(rentPrice);
    setSalePricetmp(salePrice);
    setDescriptiontmp(description);
    setAddresstmp(address);
  }

  useEffect(() => {
    setIsFormValid(
      name.trim() !== "" &&
        listingType.trim() !== "" &&
        propertyType.trim() !== "" &&
        ((listingType.trim() === "rent" && rentPrice.trim() !== "") ||
          (listingType.trim() === "sell" && salePrice.trim() !== "") ||
          (listingType.trim() === "rent/sell" &&
            rentPrice.trim() !== "" &&
            salePrice.trim() !== "")) &&
        description.trim() !== "" &&
        address.trim() !== ""
    );
  }, [
    name,
    listingType,
    propertyType,
    rentPrice,
    salePrice,
    description,
    address,
  ]);

  const handleSelectPropertyType = (option: any) => {
    setSelectedPropertyType(option);
    setPropertyType(option);
  };

  const handleDescriptionChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setDescriptiontmp(event.target.value);
    setDescription(event.target.value);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAddresstmp(event.target.value);
    setAddress(event.target.value);
  };

  async function nextPage() {
    if (isFormValid) {
      setName(name);
      setListingType(listingType);
      setPropertyType(propertyType);
      setRentPrice(rentPrice);
      setSalePrice(salePrice);
      setDescription(description);
      setAddress(address);
      changeCreateState(1);
    } else {
      console.log("Please fill in all fields.");
    }
  }

  function listingCreate1(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
  }

  return (
    <div
      onLoad={() =>
        initial(
          name,
          listingType,
          propertyType,
          rentPrice,
          salePrice,
          description,
          address
        )
      }
    >
      {/* <button
        onClick={() => {
          console.log(name);
          console.log(listingType);
          console.log(propertyType);
          console.log(rentPrice);
          console.log(salePrice);
          console.log(description);
          console.log(address);
        }}
      >
        test
      </button> */}
      <TrackingCircle page="Listing" />
      <div className="flex">
        <div className="m-20 flex-grow rounded-[20px] border-2 border-gray-300 p-10">
          <form onSubmit={listingCreate1}>
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
                    id="txt"
                    autoComplete="off"
                    className={`block h-[60px] w-full rounded-[10px] border ${
                      name.trim() === ""
                        ? "border-ci-red"
                        : "border-ci-dark-gray"
                    } p-2 text-[20px]`}
                    type="text"
                    placeholder="Property Name"
                    value={name}
                    onChange={(e) => {
                      setNametmp(e.target.value);
                      setName(e.target.value);
                    }}
                  ></input>
                </div>
                <div className="grid gap-6">
                  <div className="text-[28px] font-medium text-ci-black">
                    Listing Type
                  </div>
                  <ListingType
                    selectedType={listingType}
                    onOptionChange={(e) => {
                      setSelectedListingType(e);
                      setListingType(e);
                    }}
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 gap-8 xl:grid-cols-3">
                <div className="grid gap-6">
                  <Dropdown
                    label="Property Type"
                    options={propertyTypes}
                    onSelect={handleSelectPropertyType}
                    placeholder="Select Property Type"
                    selected={propertyType}
                  />
                </div>
                <div className="grid gap-6">
                  <div className="text-[28px] font-medium text-ci-black">
                    Rent Price/m (THB)
                  </div>
                  <input
                    id="txt"
                    autoComplete="off"
                    className={`block h-[60px] w-full rounded-[10px] border ${
                      rentPrice.trim() === "" &&
                      (listingType.trim() === "rent" ||
                        listingType.trim() === "rent/sell")
                        ? "border-ci-red"
                        : "border-ci-dark-gray"
                    } p-2 text-[20px]`}
                    type="text"
                    placeholder="฿"
                    value={rentPrice !== "0" ? rentPrice : ""}
                    onChange={(e) => {
                      const input = e.target.value;
                      const onlyNumbers = input.replace(/[^0-9]/g, "");
                      setRentPricetmp(onlyNumbers);
                      setRentPrice(onlyNumbers);
                    }}
                  ></input>
                </div>
                <div className="grid gap-6">
                  <div className="text-[28px] font-medium text-ci-black">
                    Sale Price (THB)
                  </div>
                  <input
                    id="txt"
                    autoComplete="off"
                    className={`block h-[60px] w-full rounded-[10px] border ${
                      salePrice.trim() === "" &&
                      (listingType.trim() === "sell" ||
                        listingType.trim() === "rent/sell")
                        ? "border-ci-red"
                        : "border-ci-dark-gray"
                    } p-2 text-[20px]`}
                    type="text"
                    placeholder="฿"
                    value={salePrice !== "0" ? salePrice : ""}
                    onChange={(e) => {
                      const input = e.target.value;
                      const onlyNumbers = input.replace(/[^0-9]/g, "");
                      setSalePricetmp(onlyNumbers);
                      setSalePrice(onlyNumbers);
                    }}
                  ></input>
                </div>
              </div>
              <div className="grid">
                <div className="grid gap-6">
                  <div className="text-[28px] font-medium text-ci-black">
                    Description
                  </div>
                  <textarea
                    className={`flex w-full rounded-[10px] border ${
                      description.trim() === ""
                        ? "border-ci-red"
                        : "border-ci-dark-gray"
                    } p-2`}
                    id="description"
                    value={description}
                    onChange={handleDescriptionChange}
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
                    type="text"
                    value={address}
                    className={`block h-[60px] rounded-[10px] border ${
                      address.trim() === ""
                        ? "border-ci-red"
                        : "border-ci-dark-gray"
                    } p-2`}
                    onChange={handleInputChange}
                    placeholder="Address"
                    style={{ fontSize: "20px" }}
                  ></input>
                  <Map name="" />
                </div>
              </div>
              <div className="flex justify-end">
                <button
                  type="submit"
                  onClick={nextPage}
                  className="font- h-[60px] w-[190px] rounded-[10px] bg-ci-light-blue px-10 py-2 text-[24px] font-medium text-white"
                >
                  Next
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
