"use client";
import { useState } from "react";
import Sidebar from "@/components/edit-profile/Sidebar";

import { NotSavedPopUp } from "@/components/edit-profile/NotSavedPopUp";
import ListingDetail from "@/components/edit-property/ListingDetails";
import AdditionalDetails from "@/components/edit-property/AdditionalDetails";

type Tab = "Listing Details" | "Additional Details" | "Contact Details";

const EditProperty = ({ params }: { params: { id: string } }) => {
  const [tab, setTab] = useState<Tab>("Listing Details");

  const [isChangesExist, setIsChangesExist] = useState<boolean>(false);
  const [isSwitchingTab, setIsSwitchingTab] = useState<boolean>(false);

  const switchToListing = () => setTab("Listing Details");
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
      <div className="m-5 min-w-[40%] w-full">
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
      {isSwitchingTab && isChangesExist && (
        <NotSavedPopUp
          setIsChangesExist={setIsChangesExist}
          setIsSwitchingTab={setIsSwitchingTab}
        />
      )}
    </div>
  );
};
export default EditProperty;
