import Image from "next/image";
import { CreditCardIcon } from "../ui/icon";
import { useState } from "react";
import EditCard from "./EditCard";
const colorMap: { [key: string]: string } = {
  LIGHT_BLUE: "light-blue",
  BLUE: "blue",
  DARK_BLUE: "dark-blue",
  VERY_DARK_BLUE: "very-dark-blue",
};
const textcss = "text-[24px] font-medium text-white";
const CreditCard = ({
  cardNumber,
  cardHolderName,
  cardColor,
  cardNickname,
  CVV,
  month,
  year,
  tagNumber,

}: {
  cardNumber: string;
  cardHolderName: string;
  cardColor: string;
  cardNickname: string;
  CVV: string;
  month: string;
  year: string;
  tagNumber: number;
}) => {
  const maskedCardNumber = () => {
    return "xxxx xxxx xxxx " + cardNumber.slice(12, 16);
  };
  return (
    <div>
      <div
        className={`flex h-56 min-w-[400px] max-w-[400px] cursor-pointer select-none flex-col items-start rounded-xl bg-ci-${colorMap[cardColor]} p-5 hover:bg-opacity-80 hover:text-white`}
      >
        <div className={textcss}>{cardNickname}</div>
        <div className="mb-6 mt-2 h-[1.25px] w-7/12 bg-white">&nbsp;</div>
        <div className={`${textcss} mb-8`}>{cardHolderName}</div>
        <div className="flex flex-row items-center space-x-16">
          <div className={`${textcss} min-w-[220px]`}>{maskedCardNumber()}</div>
          <CreditCardIcon size={60} className="pb-4" />
        </div>
      </div>
    </div>
  );
};
export default CreditCard;
