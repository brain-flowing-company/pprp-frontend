"use client";
import Image from "next/image";
import StatusBox from "@/components/my-agreement/StatusBox";
import UserCard from "@/components/my-agreement/UserCard";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import AppointmentData from "@/models/AgreementData";
import PropertyData from "@/models/PropertyData";
import getPropertyDetail from "@/services/property/getPropertyDetail";
import UserData from "@/models/UserData";
import getOwnerData from "@/services/users/getOwnerData";
import getUserAppointment from "@/services/appointments/getUserAppointment";
import getOneAppointment from "@/services/agreement/getOneAgreement";
import getOneAgreement from "@/services/agreement/getOneAgreement";
import AgreementData from "@/models/AgreementData";

export default function AgreementDetail() {
  const router = useRouter();

  const propertyImgSrc = "/img/my-appointment/mhadaeng.png";
  const propertyName = "Bhan Mha Daeng 3";
  const propertySubName = "Project House of Mha Daeng";
  const ownerImgSrc = "/img/my-appointment/owapapi.png";
  const ownerName = "Owa Papi";
  const ownerTel = "012 - 345 - 6789";
  const dwellerName = "Piwa Opi";
  const dwellerTel = "098 - 765 - 4321";
  const date = "1 Apr 2005";
  const time = "13:39";
  const status = "Pending";

  const address =
    "101 ถนน สุขุมวิท 101/1 Bang Chak, Phra Khanong, Bangkok 10260";
  const price = "25,000 Baht/mo";
  const note =
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo";

  const params = useParams<{ id: string }>();

  const [agmntDetail, setAgmntDetail] = useState<AgreementData | null>(null);
  const [propertyDetail, setPropertyDetail] = useState<PropertyData | null>(
    null
  );
  const [ownerDetail, setOwnerDetail] = useState<UserData | null>(null);
  const [dwellerDetail, setDwellerDetail] = useState<UserData | null>(null);
  const [isFetched, setFetched] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      const agmnt = await getOneAgreement(params.id);
      setAgmntDetail(agmnt);
      // if (appt?.property_id) {
      //     const pptDetail = await getPropertyDetail(appt.property_id);
      //     setPropertyDetail(pptDetail);
      // }
      // if (appt?.owner_user_id) {
      //     const owner = await getOwnerData(appt.owner_user_id);
      //     setOwnerDetail(owner);
      // }
      // if (appt?.dweller_user_id) {
      //     const dweller = await getOwnerData(appt.dweller_user_id);
      //     setDwellerDetail(dweller);
      // }
      if (agmnt.code == 400) {
        window.location.href = "/404";
      }
    };
    fetchData();
    console.log("successful");
    setFetched(true);
  }, []);

  useEffect(() => {
    console.log(agmntDetail);
    // console.log(propertyDetail)
    // console.log(ownerDetail)
    // console.log(dwellerDetail)
  }, [agmntDetail]);

  const getDate = (dateString: string) => {
    const date = new Date(dateString);

    const day = date.getDate();
    const month = date.getMonth();
    const year = date.getFullYear();

    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];

    return `${day} ${months[month]} ${year}`;
  };

  const getEndDate = (dateString: string) => {
    const date = new Date(dateString);
    const newDate = new Date(date.setMonth(date.getMonth() + agmntDetail?.payment_duration))

    const day = newDate.getDate();
    const month = newDate.getMonth();
    const year = newDate.getFullYear();

    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];

    return `${day} ${months[month]} ${year}`;
  }

  const getTime = (dateString: string) => {
    const date = new Date(dateString);

    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    return `${hours}:${minutes}`;
  };

  const getAddress = () => {
    return `${agmntDetail?.property.address}, ${agmntDetail?.property.alley}, ${agmntDetail?.property.street}, ${agmntDetail?.property.district}, ${agmntDetail?.property.sub_district}, ${agmntDetail?.property.province}, ${agmntDetail?.property.country}, ${agmntDetail?.property.postal_code}`;
  };

  return (
    <div className="mx-auto my-[50px] h-full w-[80%]">
      {isFetched ? (
        <div>
          <div className="flex flex-row">
            <button
              className="flex h-min w-[7%] flex-row rounded-full bg-ci-blue px-2 py-2"
              onClick={() => router.back()}
            >
              <div className="mx-auto my-auto w-[40%] pl-2">
                <Image
                  src="/img/my-appointment/return.svg"
                  alt="return"
                  width={20}
                  height={20}
                  objectFit="cover"
                  layout="responsive"
                />
              </div>
              <div className="my-auto w-[60%] text-lg text-white">Back</div>
            </button>
            <div className="mx-5 my-auto text-4xl font-bold">
              {agmntDetail?.property.property_name}
            </div>
          </div>
          <div className="my-10 flex w-full py-5 flex-col rounded-3xl bg-ci-light-gray">
            <div className="mx-auto my-7 flex w-[90%] flex-col items-center justify-center">
              <div className="mb-5 flex w-full flex-row justify-between">
                <div className="text-4xl font-bold">
                  {agmntDetail?.property.property_name}
                </div>
                <div className="w-[20%]">
                  <StatusBox
                    status={
                      agmntDetail?.status.charAt(0) +
                      agmntDetail?.status.toLowerCase().slice(1)
                    }
                  />
                </div>
              </div>
              <div className="flex w-full flex-row justify-between h-max">
                <div className="w-[40%] rounded-lg">
                  <Image
                    src={agmntDetail?.property.property_images[0].image_url}
                    alt="property image"
                    width={600}
                    height={400}
                    objectFit="cover"
                    layout="responsive"
                  />
                </div>
                <div className="flex h-auto w-[50%] flex-col text-3xl">
                  <div className="flex flex-row my-auto">
                    <div className="mr-auto flex">
                      <div className="font-semibold">Start Date:&nbsp;</div>
                      <div className="font-medium">
                        {getDate(agmntDetail?.agreement_date)}
                      </div>
                    </div>
                    <div className="mx-auto flex">
                      <div className="font-semibold">End Date:&nbsp;</div>
                      <div className="font-medium">
                        {getEndDate(agmntDetail?.agreement_date)}
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-row my-auto">
                    <div className="font-semibold">Address:&nbsp;</div>
                    <div className="font-medium">{getAddress()}</div>
                  </div>
                  <div className="flex flex-row my-auto">
                    <div className="font-semibold">Rental Duration:&nbsp;</div>
                    <div className="font-medium">
                      {agmntDetail?.payment_duration + " months"}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-row w-[90%] justify-between mx-auto mt-5 bg-white rounded-full px-5 py-5">
                <div className="flex flex-col text-3xl mx-auto">
                    <div className="my-auto flex flex-row">
                        <div className="font-semibold">Payment per month: &nbsp;</div>
                        <div className="font-regular">{agmntDetail?.payment_per_month + " Baht"}</div>
                    </div>
                    <div className="my-auto flex flex-row mt-10">
                        <div className="font-semibold">Deposit Amount: &nbsp;</div>
                        <div className="font-regular">{agmntDetail?.deposit_amount + " Baht"}</div>
                    </div>
                </div>
                <div className="flex flex-col text-3xl mx-auto">
                    <div className="my-auto flex flex-row">
                        <div className="font-semibold">Total Payment: &nbsp;</div>
                        <div className="font-regular">{agmntDetail?.total_payment + " Baht"}</div>
                    </div>
                </div>
            </div>
            <div className="mx-auto mt-8 flex h-full w-[80%] flex-col items-center justify-center">
              <div className="mb-5 flex w-[80%] flex-row justify-evenly">
                <div className="w-[40%]">
                  <UserCard
                    role="Owner"
                    profilePicSrc={agmntDetail?.owner.owner_profile_image_url}
                    name={`${agmntDetail?.owner.owner_first_name} ${agmntDetail?.owner.owner_last_name}`}
                    tel={agmntDetail?.owner.owner_phone_number}
                  />
                </div>
                <div className="w-[40%]">
                  <UserCard
                    role="Dweller"
                    profilePicSrc={agmntDetail?.dweller.dweller_profile_image_url}
                    name={`${agmntDetail?.dweller.dweller_first_name} ${agmntDetail?.dweller.dweller_last_name}`}
                    tel={agmntDetail?.dweller.dweller_phone_number}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
