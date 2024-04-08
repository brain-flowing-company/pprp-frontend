import { Transaction } from "@/app/(have-nav)/payment-history/page";
import { ArrowLeft } from "../ui/icon";
import getOneAgreement from "@/services/agreement/getOneAgreement";
import { useEffect, useState } from "react";
import { AgreementInfo } from "../create-payment/CreatePaymentHome";
import Image from "next/image";
import { formatDate } from "@/app/(have-nav)/payment-history/page";
export const PaymentDetail = ({transaction, setDetail}:{transaction: Transaction, setDetail:Function}) => {
    const [agreement, setAgreement] = useState<AgreementInfo|null>();
    const [address, setAddress] = useState("");
    const fetchAgreement = async() => {
        try{    
            const data = await getOneAgreement(transaction.agreement_id);
            setAgreement(data);
            console.log(transaction)
        }
        catch{
            console.log("failed to fetch agreement")
        }
    }
    function formatPrice(num: number): string {
        if (num) {
          return Math.round(num)
            .toString()
            .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        }
        return "0";
      };
      function formatPhoneNumber(phoneNumber: string) {
        return phoneNumber.slice(0,3) + "-" + phoneNumber.slice(3,6) + "-" + phoneNumber.slice(6,10);
      }
    useEffect(()=>{
        fetchAgreement();
        setAddress(agreement?.property.alley + " " +
            agreement?.property.address + " " +
            agreement?.property.street + " " +
            agreement?.property.district + " " +
            agreement?.property.sub_district + " "+
            agreement?.property.country + " " +
            agreement?.property.postal_code)
    },[])
    useEffect(()=>{
        setAddress(agreement?.property.alley + " " +
            agreement?.property.address + " " +
            agreement?.property.street + " " +
            agreement?.property.district + " " +
            agreement?.property.sub_district + " "+
            agreement?.property.country + " " +
            agreement?.property.postal_code)
    },[agreement])

    return (
        <div className="absolute w-full h-full flex flex-col m-16 space-y-4 ">
            <div className="flex flex-row items-center space-x-2">
                <div className="hover:opacity-50" onClick={() => {setDetail(false)}}>
                    <ArrowLeft size={20}/>
                </div>
                <div className="text-3xl font-bold">Payment History</div>
                    
            </div>
                <div className="flex flex-col text-md items-center">
                    <div className="w-[80%] flex flex-col rounded-xl bg-ci-light-gray p-4 py-6">
                        <div className="text-2xl font-bold ml-8">{agreement?.property.property_name}</div>
                        <div className="flex flex-row w-full mx-4 mt-4 space-x-2 px-8 ">
                            <div className="w-1/2 h-64 rounded-xl overflow-hidden relative">
                            <Image
                            src={agreement?.property.property_images[0].image_url || "/img/black-close-icon.svg"}
                            alt="property image"
                            fill
                            objectFit="cover"/>
                            </div>
                            <div className="flex flex-col w-1/2 pr-8 space-y-12 justify-start">
                                    <div className=" text-lg">Address: {address}</div>
                                    <div className=" text-lg">Transaction Time: {formatDate(transaction.created_at)}</div>
                                    <div className=" text-lg">Transaction Number: {transaction.payment_id}</div>
                            </div>
                        </div>
                        <div className="w-[95%] flex flex-row rounded-xl bg-white justify-evenly py-10 text-xl mt-6 mx-auto">
                            <div>Payment Method: {transaction.payment_method.replace(/_/g, " ")}</div>
                            <div>Amount: ฿{formatPrice(Number(transaction.price))}</div>
                        </div>
                        <div className="w-[80%] flex flex-col justify-evenly py-10 text-xl mt-6 mx-auto">
                            <div className="flex flex-row justify-evenly">
                                <div className="w-1/2">Owner</div>
                                <div className="w-1/2">Dweller</div>
                            </div>
                            <div className="flex flex-row">
                                <div className="w-1/2 flex flex-row justify-start space-x-2">
                                    <div className="aspect-square relative w-24 overflow-hidden h-24 rounded-md">
                                    <Image
                                        src={agreement?.owner.owner_profile_image_url || "/img/black-close-icon.svg"}
                                        alt="owner image"
                                        fill
                                        objectFit="cover"/>
                                    </div>
                                    <div>
                                        <div>{agreement?.owner.owner_first_name} {agreement?.owner.owner_last_name}</div>
                                        <div>{formatPhoneNumber(agreement?.owner.owner_phone_number || "")}</div>
                                    </div>
                                </div>
                                <div className="w-1/2 flex flex-row justify-start space-x-2">
                                    <div className="aspect-square relative w-24 overflow-hidden h-24 rounded-md">
                                    <Image
                                        src={agreement?.dweller.dweller_profile_image_url || "/img/black-close-icon.svg"}
                                        alt="owner image"
                                        fill
                                        objectFit="cover"/>
                                    </div>
                                    <div>
                                        <div>{agreement?.dweller.dweller_first_name} {agreement?.dweller.dweller_last_name}</div>
                                        <div>{formatPhoneNumber(agreement?.dweller.dweller_phone_number || "")}</div>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
        </div>
    )
}