"use client";

import { useState } from "react";
import ListingDetailPage from "@/components/create-property/ListingDetailPage";
import AdditionalDetailPane from "@/components/create-property/AdditionalDetailPane";
import propertyCreate from "@/services/property/propertyCreate";

export interface ListingDetailPageProps {
  name: string;
  description: string;
  propertyType: string;
  address: string;
  listingType: string;
  rentPrice: string;
  salePrice: string;
}

export interface AdditionalDetailPaneProps {
  bedrooms: string;
  bathrooms: string;
  furnishing: string;
  floor: string;
  floorSize: string;
  floorSizeUnit: string;
  unitNumber: string;
  images: File[];
  imageURLs: string[];
}

export interface ContactPaneProps {
  first_name: string;
  last_name: string;
  phone_number: string;
  email: string;
}

export interface PropertyInfo
  extends ListingDetailPageProps,
    AdditionalDetailPaneProps {
  is_sold: string;
  is_occupied: string;
}

export default function CreateProperty() {
  const [createStage, changeState] = useState(0);

  const [listingDetailPageProps, setListingDetailPageProps] =
    useState<ListingDetailPageProps>({
      name: "",
      listingType: "",
      propertyType: "",
      rentPrice: "",
      salePrice: "",
      description: "",
      address: "",
    });

  const [additionalDetailPaneProps, setAdditionalDetailPaneProps] =
    useState<AdditionalDetailPaneProps>({
      bedrooms: "",
      bathrooms: "",
      furnishing: "",
      floor: "",
      floorSize: "",
      floorSizeUnit: "SQM",
      unitNumber: "",
      images: [],
      imageURLs: [],
    });

  const [name, setName] = useState<string>("");
  const [listingType, setListingType] = useState<string>("");
  const [propertyType, setPropertyType] = useState<string>("");
  const [rentPrice, setRentPrice] = useState<string>("");
  const [salePrice, setSalePrice] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [address, setAddress] = useState("");

  const createProperty = async () => {
    const propertyCreateRes = await propertyCreate({
      name: name,
      description: description,
      propertyType: propertyType,
      rentPrice: rentPrice,
      salePrice: salePrice,
      address: address,

      alley: "",
      street: "",
      sub_district: "",
      district: "",
      province: "",
      country: "",
      postal_code: "",

      ...additionalDetailPaneProps,

      is_sold: "false",
      is_occupied: "false",
    });
    console.log(propertyCreateRes);
  };

  function nextStage() {
    changeState((createStage + 1) % 2);
  }

  function backStage() {
    changeState((createStage - 1) % 2);
  }

  return (
    <div>
      {/* <button
        onClick={() => {
          setName("Property Name");
          setListingType("rent/sell");
          setPropertyType("CONDOMINIUM");
          setRentPrice("100");
          setSalePrice("100000");
          setDescription("Property Description");
          setAddress("Address");
          setAdditionalDetailPaneProps({
            ...additionalDetailPaneProps,
            bedrooms: "2",
            bathrooms: "1",
            furnishing: "READY_TO_MOVE_IN",
            floor: "1",
            floorSize: "30",
            unitNumber: "101",
          });
        }}
      >
        fill |{" "}
      </button>
      <button
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
        test var |
      </button>
      <button onClick={nextStage}>Next | </button>
      <button onClick={backStage}>Back | </button> */}
      {createStage === 0 ? (
        <div>
          <ListingDetailPage
            changeCreateState={nextStage}
            name={name}
            listingType={listingType}
            propertyType={propertyType}
            rentPrice={rentPrice}
            salePrice={salePrice}
            description={description}
            address={address}
            setName={setName}
            setListingType={setListingType}
            setPropertyType={setPropertyType}
            setRentPrice={setRentPrice}
            setSalePrice={setSalePrice}
            setDescription={setDescription}
            setAddress={setAddress}
          />
        </div>
      ) : null}
      {createStage === 1 ? (
        <div>
          <AdditionalDetailPane
            additionalDetailPaneProps={additionalDetailPaneProps}
            setAdditionalDetailPaneProps={setAdditionalDetailPaneProps}
            createProperty={createProperty}
            nextStage={nextStage}
            backStage={backStage}
          />
        </div>
      ) : null}
    </div>
  );
}
