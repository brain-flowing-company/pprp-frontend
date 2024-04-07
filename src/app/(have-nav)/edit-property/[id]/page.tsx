"use client";
import { useState } from "react";
import Sidebar from "@/components/edit-profile/Sidebar";

import { NotSavedPopUp } from "@/components/edit-profile/NotSavedPopUp";
import ListingDetail from "@/components/edit-property/ListingDetails";
import AdditionalDetails from "@/components/edit-property/AdditionalDetails";

type Tab = "Listing Details" | "Additional Details";

const EditProperty = ({ params }: { params: { id: string } }) => {
  const [tab, setTab] = useState<Tab>("Listing Details");

  const [isChangesExist, setIsChangesExist] = useState<boolean>(false);
  const [isSwitchingTab, setIsSwitchingTab] = useState<boolean>(false);

  const switchToListing = () => {
    if (!isChangesExist) {
      setTab("Listing Details");
      setIsSwitchingTab(false);
    } else {
      setIsSwitchingTab(true);
    }
  };
  const switchToAdditional = () => {
    if (!isChangesExist) {
      setTab("Additional Details");
      setIsSwitchingTab(false);
    } else {
      setIsSwitchingTab(true);
    }
  };

  return (
    <div className=" flex min-h-dvh w-full  flex-row">
      <Sidebar
        switchTo1={switchToListing}
        switchTo2={switchToAdditional}
        header="Edit Property"
        text1="Listing Details"
        text2="Additional Details"
      />
      <div className="m-5  w-full">
        {tab === "Listing Details" && (
          <ListingDetail
            propId={params.id}
            setIsChangesExist={setIsChangesExist}
          ></ListingDetail>
        )}
        {tab === "Additional Details" && (
          <AdditionalDetails
            propId={params.id}
            setIsChangesExist={setIsChangesExist}
          />
        )}
      </div>
      {isSwitchingTab && isChangesExist ? (
        <NotSavedPopUp
          setIsChangesExist={setIsChangesExist}
          setIsSwitchingTab={setIsSwitchingTab}
        />
      ) : null}
    </div>
  );
};
export default EditProperty;
