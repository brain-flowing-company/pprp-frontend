import TextBox from "../register-login/TextField";
import Dropdown from "../register-login/DropDown";
import { useState, useEffect } from "react"
import { useParams } from "next/navigation";
import { CreditCardData } from "../edit-profile/FinancialPage";
import getUserFinancial from "@/services/users/getUserFinancial";
import { redirectPayment } from "@/services/payments/redirectPayment";
import getOneAgreement from "@/services/agreement/getOneAgreement";
import Image from "next/image";
import { formatDate } from "@/app/(have-nav)/payment-history/page";

export type AgreementInfo = {
    owner: Owner
    dweller: Dweller
    property: Property,
    deposit_amount: number,
    created_at: string,
}
type Owner = {
    owner_first_name: string,
    owner_last_name: string,
    owner_profile_image_url: string,
    owner_phone_number: string,
}
type Dweller = {
    dweller_first_name: string,
    dweller_last_name: string,
    dweller_phone_number: string,
    dweller_profile_image_url: string,
}
type Property = {
    property_name: string,
    property_images: Image[],
    address: string,
    street: string,
    district: string,
    sub_district: string,
    alley: string,
    postal_code: string,
    country: string,

}
type Image = {
    image_url:string,
}
function formatPrice(num: number): string {
    if (num) {
      return Math.round(num)
        .toString()
        .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
    return "0";
  }
export const CreatePaymentHomePage = ({
    setConfirm
    }:{
    setConfirm: Function
    }) => {
    const [paymentType, setPaymentType] = useState("PROMPTPAY");
    const [message, setMessage] = useState("");
    const [creditCards, setCreditCards] = useState<CreditCardData[]|null>();
    const [agreement, setAgreement] = useState<AgreementInfo|null>();
    // const [selectedCardNumber, setSelectedCardNumber] = useState("-");
    // const agreementId = "481095e8-f136-4e5b-b7fd-179e5fa40a28";
    const params = useParams<{ id: string }>();

    const fetchData = async () => {
        try {
          const data = await getUserFinancial();
          const agreement = await getOneAgreement(params.id)
          console.log(agreement)
          setAgreement(agreement);
        //   setCreditCards(data.credit_cards);
        } catch (error) {
          console.error("Error fetching data:", error);
        }
    }
    useEffect(() => {
        fetchData();
    },[])
    const redirect = async() => {
        const response = {
            price : agreement?.deposit_amount,
            name : agreement!.dweller.dweller_first_name + agreement!.dweller.dweller_last_name,
            payment_method : paymentType,
            agreement_id : params.id,
        }
        const res = await redirectPayment(response);
        window.location.href = res.url;
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
            <div className="flex flex-row bg-ci-dark-blue w-full h-16 rounded-t-2xl px-10 text-white ">
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
                    <div className="relative w-36 h-full flex items-center rounded-md overflow-hidden">
                        <Image
                        src={agreement?.property.property_images[1].image_url || "/img/login-register/ProfilePhoto_square.png"}
                        alt={"owner image"}
                        draggable={false}
                        fill
                        style={{ objectFit: "cover"}}
                        />
                    </div>
                    <div className="flex flex-col">
                        <div>{agreement?.property.property_name}</div>
                        <div className="flex flex-row items-center space-x-1">
                            <div className="relative flex aspect-square w-8 items-center justify-center overflow-hidden rounded-full">
                                <Image
                                    src={agreement?.owner.owner_profile_image_url || "/img/login-register/ProfilePhoto_square.png"}
                                    alt={"owner image"}
                                    draggable={false}
                                    fill
                                    style={{ objectFit: "cover"}}
                                />
                            </div>
                            <div>{agreement?.owner.owner_first_name} {agreement?.owner.owner_last_name}</div>
                        </div>
                    </div>
                </div>
                <div className="flex flex-row items-center justify-between w-3/5">
                    <div className="w-1/4 flex justify-center">{formatDate(agreement?.created_at)}</div>
                    <div className="w-1/4 flex justify-center">{formatDate(agreement?.created_at)}</div>
                    <div className="w-1/4 flex justify-center">-</div>
                    <div className=" text-ci-red w-1/4 flex justify-center">฿{formatPrice(agreement?.deposit_amount || 0)}</div>
                    
                </div>
            </div>
            {/* <div className="flex flex-row bg-ci-gray w-full h-24 px-10 ">
                <div className="flex flex-row items-center space-x-4 w-full">
                    <div>Message:</div>
                    <TextBox placeholder=" (Optional) Message to Owner" className="h-10 rounded-sm bg-ci-light-gray w-[520px]" value={message} onChange={(e) => setMessage(e.target.value)}/>
                </div>
            </div> */}
            <div className="flex flex-row bg-ci-dark-gray w-full h-16 px-10  mt-4 items-center font-bold select-none cursor-default">
                <div className="w-1/3">Payment Method</div>
                <div className="w-1/3 flex justify-center">
                    <div className={`${paymentType == "PROMPTPAY"? "bg-ci-blue text-white" : "bg-white text-black"} w-48 h-8 flex items-center px-4 justify-center rounded-md`}
                        onClick={()=>{setPaymentType("PROMPTPAY")}}>
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
                <div className="w-1/3 text-ci-blue">{paymentType == "PROMPTPAY"? "QR PromptPay" : "Credit Card"}</div>
                <div className="w-1/3 flex justify-center">
                </div>
                <div className="w-1/3 flex items-center justify-center">
                </div>
            </div>
            <div className="bg-ci-light-gray w-full h-24 px-16 py-3 text-lg font-bold rounded-b-2xl">
                <div className="flex flex-row justify-center float-right h-full space-x-8">
                    <div className="mt-1">Price</div>
                    <div className="flex flex-col space-y-2">
                        <div className="text-2xl text-ci-red">฿{formatPrice(agreement?.deposit_amount || 0)}</div>
                        <button className="text-white bg-ci-blue text-sm px-4 rounded-md py-1" 
                            onClick={redirect}>
                                Confirm</button>
                    </div>
                </div>

            </div>

        </div>
    )
}