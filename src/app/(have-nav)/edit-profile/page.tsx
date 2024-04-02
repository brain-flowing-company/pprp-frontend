"use client";
import { useState } from "react";
import Sidebar from "@/components/edit-profile/Sidebar";
import PersonalPage from "@/components/edit-profile/PersonalPage";
import OwnerPage from "@/components/edit-profile/OwnerPage";
import FinancialPage from "@/components/edit-profile/FinancialPage";
import { NotSavedPopUp } from "@/components/edit-profile/NotSavedPopUp";
type Tab = "personal" | "financial" | "owner";
const personalIcon = "/img/edit-profile/personal-icon.svg";
const financialIcon = "/img/edit-profile/financial-icon.svg";
const ownerIcon = "/img/edit-profile/owner-icon.svg";

const EditProfile = () => {
  const [tab, setTab] = useState<Tab>("personal");

  const [isChangesExist, setIsChangesExist] = useState<boolean>(false);
  const [isSwitchingTab, setIsSwitchingTab] = useState<boolean>(false);
  const switchToPersonal = () => setTab("personal");
  const switchToFinancial = () => {
    if (!isChangesExist) {
      setTab("financial");
      setIsSwitchingTab(false);
    } else {
      setIsSwitchingTab(true);
    }
  };
  const switchToOwner = () => {
    if (!isChangesExist) {
      setTab("owner");
      setIsSwitchingTab(false);
    } else {
      setIsSwitchingTab(true);
    }
  };
  return (
    <div className=" flex min-h-dvh  flex-row">
      <Sidebar
        switchTo1={switchToPersonal}
        switchTo2={switchToFinancial}
        switchTo3={switchToOwner}
        header="Edit Profile"
        text1="Personal Information"
        text2="Financial Informations"
        text3="Owner Information"
        iconSrc1={personalIcon}
        iconSrc2={financialIcon}
        iconSrc3={ownerIcon}
      />
      <div className="m-5 min-w-[40%] max-w-full">
        {tab === "personal" && (
          <PersonalPage setIsChangesExist={setIsChangesExist} />
        )}
        {tab === "financial" && (
          <FinancialPage setIsChangesExist={setIsChangesExist} />
        )}
        {tab === "owner" && <OwnerPage />}
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
export default EditProfile;
