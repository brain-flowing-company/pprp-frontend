// import Dropdown from "../register-login/DropDown";
import Dropdown from "./DropDown";
import NumberTextBox from "../register-login/NumberTextField";
import { useState, useEffect } from "react";
import EmptyCard from "@/components/edit-profile/EmptyCard";
import getUserFinancial from "@/services/users/getUserFinancial";
import updateUserFinancial from "@/services/users/updateUserFinancial";
import CreditCard from "@/components/edit-profile/CreditCard";
import EditCard from "./EditCard";
import AddCard from "./AddCard";

type UserData = {
  bank_name: string;
  bank_account_number: string;
  created_at: string;
  credit_cards: CreditCardData[];
};
export type CreditCardData = {
  card_color: string;
  card_nickname: string;
  card_number: string;
  cardholder_name: string;
  cvv: string;
  expire_month: string;
  expire_year: string;
  tag_number: number;
};
const FinancialPage = ({
  setIsChangesExist,
}: {
  setIsChangesExist: Function;
}) => {
  const [bankNumber, setBankNumber] = useState("");
  const [changed, setChanged] = useState(0);
  const [bankName, setBankName] = useState("");
  const [isSaved, setIsSaved] = useState(0);
  const [userData, setUserData] = useState<UserData | null>(null);
  const [creditCards, setCreditCards] = useState<CreditCardData[] | null>();
  const [displayAddCard, setDisplayAddCard] = useState(false);
  const [displayEdit, setDisplayEdit] = useState(false);
  const [selectedCard, setSelectedCard] = useState<CreditCardData>();
  const options = ["KBANK", "BBL", "KTB", "BAY", "CIMB", "TTB", "SCB", " GSB"];
  setIsChangesExist(false);
  const fetchUser = async () => {
    try {
      const data = await getUserFinancial();
      setBankNumber(data.bank_account_number);
      setBankName(data.bank_name);
      setCreditCards(data.credit_cards);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  useEffect(() => {
    fetchUser();
  }, []);

  const handleSave = (newCreditCards: any) => {
    const data: UserData = {
      bank_name: bankName,
      bank_account_number: bankNumber,
      created_at: "123",
      credit_cards: newCreditCards,
    };
    setIsChangesExist(false);
    updateUserFinancial(data);
    setDisplayAddCard(false);
    setDisplayEdit(false);
    setCreditCards(newCreditCards);
  };
  const handleSelect = (option: any) => {
    setBankName(option);
    setChanged(1);
    setIsChangesExist(true);
  };
  const handleBankNumber = (no: any) => {
    setBankNumber(no);
    setIsChangesExist(true);
    setChanged(1);
  };
  const handleEditCard = (card: any) => {
    setSelectedCard(card);
    setDisplayEdit(true);
  };
  return (
    <div className="flex max-w-[100%] flex-col justify-center space-y-4">
      <div className="text-[32px] font-bold">Financial Information</div>
      <div className="text-[20px] font-semibold ">Credit Card</div>
      <div className="flex w-[70%] flex-col justify-center gap-8 sm:flex-row sm:flex-wrap sm:justify-normal">
        {creditCards &&
          creditCards.map((card) => (
            <div
              onClick={() => {
                handleEditCard(card);
              }}
            >
              <CreditCard
                key={card.card_number}
                cardHolderName={card.cardholder_name}
                cardColor={card.card_color}
                cardNickname={card.card_nickname}
                cardNumber={card.card_number}
                month={card.expire_month}
                year={card.expire_year}
                CVV={card.cvv}
                tagNumber={card.tag_number}
              />
            </div>
          ))}
        {creditCards && creditCards.length < 4 && (
          <EmptyCard setDisplay={setDisplayAddCard} />
        )}
      </div>
      <div className=" text-[20px] font-semibold ">Bank Account</div>
      <div className="flex flex-col space-x-0 xl:flex-row xl:space-x-8">
        <Dropdown
          label="Bank Name"
          options={options}
          onSelect={handleSelect}
          className="w-[400px] lg:w-[510px]"
          selected={bankName}
        />
        <NumberTextBox
          label="Bank Account Number"
          placeholder="Enter your bank account number"
          maxLength={10}
          spaceIndices={[]}
          setNum={handleBankNumber}
          addedClass="w-[400px] lg:w-[510px]"
          value={bankNumber}
        />
      </div>
      <div className="mt-40 flex select-none flex-row justify-end space-x-5">
        <button
          className={`rounded-xl bg-${changed ? "ci-gray" : "ci-dark-gray "} px-4 py-2 text-[20px] font-bold text-white`}
          disabled={!changed}
        >
          Cancel
        </button>
        <button
          className={`rounded-xl bg-${changed ? "ci-blue" : "ci-dark-gray "} px-4 py-2 text-[20px] font-bold text-white`}
          onClick={() => handleSave(creditCards)}
          disabled={!changed}
          type="submit"
        >
          Save
        </button>
      </div>
      {displayAddCard && (
        <AddCard
          setDisplay={setDisplayAddCard}
          handleSave={handleSave}
          creditCards={creditCards!}
        />
      )}
      {displayEdit && (
        <EditCard
          setDisplay={setDisplayEdit}
          handleSave={handleSave}
          creditCards={creditCards!}
          defaultCVV={selectedCard!.cvv}
          defaultColor={selectedCard!.card_color}
          defaultMonth={selectedCard!.expire_month}
          defaultYear={selectedCard!.expire_year}
          defaultCardNumber={selectedCard!.card_number}
          defaultCardholderName={selectedCard!.cardholder_name}
          defaultCardNickname={selectedCard!.card_nickname}
          tagNumber={selectedCard!.tag_number}
          setCreditCards={setCreditCards}
        />
      )}
    </div>
  );
};
export default FinancialPage;
