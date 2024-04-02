import TextBox from "../register-login/TextField";
import Dropdown from "../register-login/DropDown";
import { useState, useEffect } from "react"
import { CreditCardData } from "../edit-profile/FinancialPage";
import getUserFinancial from "@/services/users/getUserFinancial";
import { redirectPayment } from "@/services/payments/redirectPayment";
import { log } from "console";

type PaymentInfo = {
    title:string,
    sub_title: string,
    owner: string,
    image_url: string,
    check_in: string,
    check_out: string,
    total_night: string,
    price: string
};
export const CreatePaymentHomePage = ({
    setConfirm
    }:{
    setConfirm: Function
    }) => {
    const [paymentType, setPaymentType] = useState("QR");
    const [message, setMessage] = useState("");
    const [creditCards, setCreditCards] = useState<CreditCardData[]|null>();
    // const [selectedCardNumber, setSelectedCardNumber] = useState("-");
    const fetchData = async () => {
        try {
          const data = await getUserFinancial();
          setCreditCards(data.credit_cards)
        } catch (error) {
          console.error("Error fetching data:", error);
        }
    }
    useEffect(() => {
        fetchData();
    },[])
    const redirect = async() => {
        const response = {
            price : 100000,
            name : "win",
            payment_method : paymentType,
            agreement_id : "23f563dc-ebbb-400c-ab3e-9a7611f0ae30"
        }
        const res = await redirectPayment(response)
        window.location.href = res;
    }
    // const getCreditCardsName = () => {
    //     const names:string[] = []
    //     for(let i = 0; i < creditCards!.length; i++ ){
    //         names.push(creditCards![i].card_nickname);
    //     }
    //     return names
    // }
    // const maskedCardNumber = (cardNumber:string) => {
    //     return "xxxx xxxx xxxx " + cardNumber.slice(12,16);
    //   }
    // const handleSelectCard = (cardName:any) => {
    //     for(let i = 0; i < creditCards!.length; i++ ){
    //         if(creditCards![i].card_nickname === cardName){
    //             setSelectedCardNumber(maskedCardNumber(creditCards![i].card_number))
    //         }
    //     }
    // }
    return (
        <div className="flex flex-col justify-center items-center sm:text-md text-sm">
            <div className="flex flex-row bg-ci-dark-blue w-full h-16 rounded-t-2xl px-10 text-ci-white ">
                <div className="flex items-center w-[40%]">Property</div>
                <div className="flex flex-row items-center justify-between w-3/5">
                    <div className="w-1/4 flex justify-center">Check-in</div>
                    <div className="w-1/4 flex justify-center">Check-out</div>
                    <div className="w-1/4 flex justify-center">Total Nights</div>
                    <div className="w-1/4 flex justify-center">Price</div>
                </div>
            </div>
            <div className="flex flex-row bg-ci-light-gray w-full h-32 px-10 ">
                <div className="flex flex-row items-center w-2/5 py-4 space-x-2">
                    <div className="bg-red-500 w-[50%] h-full flex items-center rounded-sm">Image</div>
                    <div className="flex flex-col">
                        <div>Bhaan Mha Daeng 1</div>
                        <div>Project House of Mha Daeng</div>
                        <div>Owner</div>
                    </div>
                </div>
                <div className="flex flex-row items-center justify-between w-3/5">
                    <div className="w-1/4 flex justify-center">30 Nov 2002</div>
                    <div className="w-1/4 flex justify-center">30 Nov 2002</div>
                    <div className="w-1/4 flex justify-center">30</div>
                    <div className=" text-ci-red w-1/4 flex justify-center">$10,000</div>
                    
                </div>
            </div>
            <div className="flex flex-row bg-ci-gray w-full h-24 px-10 ">
                <div className="flex flex-row items-center space-x-4 w-full">
                    <div>Message:</div>
                    <TextBox placeholder=" (Optional) Message to Owner" className="h-10 rounded-sm bg-ci-light-gray w-[520px]" value={message} onChange={(e) => setMessage(e.target.value)}/>
                </div>
            </div>
            <div className="flex flex-row bg-ci-dark-gray w-full h-16 px-10  mt-4 items-center font-bold select-none cursor-default">
                <div className="w-1/3">Payment Method</div>
                <div className="w-1/3 flex justify-center">
                    <div className={`${paymentType == "QR"? "bg-ci-blue text-white" : "bg-white text-black"} w-48 h-8 flex items-center px-4 justify-center rounded-md`}
                        onClick={()=>{setPaymentType("QR")}}>
                        QR PromptPay
                    </div>
                </div>
                <div className="w-1/3 flex justify-center">
                    <div className={`${paymentType == "CREDIT_CARD"? "bg-ci-blue text-white" : "bg-white text-black"} w-48 h-8 flex items-center px-4 justify-center rounded-md`}
                        onClick={()=>{setPaymentType("CREDIT_CARD")}}>
                        Credit Card
                    </div>
                </div>
            </div>
            <div className="flex flex-row bg-ci-gray w-full h-16 px-10 items-center font-bold cursor-default">
                <div className="w-1/3 text-ci-blue">{paymentType == "QR"? "QR PromptPay" : "Credit Card"}</div>
                <div className="w-1/3 flex justify-center">
                </div>
                <div className="w-1/3 flex items-center justify-center">
                </div>
            </div>
            <div className="bg-ci-light-gray w-full h-24 px-16 py-3 text-lg font-bold rounded-b-2xl">
                <div className="flex flex-row justify-center float-right h-full space-x-8">
                    <div className="mt-1">Price</div>
                    <div className="flex flex-col space-y-2">
                        <div className="text-2xl text-ci-red">$10,000</div>
                        <button className="text-white bg-ci-blue text-sm px-4 rounded-md py-1" 
                            onClick={redirect}>
                                Confirm</button>
                    </div>
                </div>

            </div>

        </div>
    )
}