"use client";
import Image from "next/image";
import StatusBox from "@/components/my-appointment/StatusBox";
import UserCard from "@/components/my-appointment/UserCard";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import AppointmentData from "@/models/AppointmentData";
import PropertyData from "@/models/PropertyData";
import getPropertyDetail from "@/services/property/getPropertyDetail";
import UserData from "@/models/UserData";
import getOwnerData from "@/services/users/getOwnerData";
import getUserAppointment from "@/services/appointments/getUserAppointment";
import getOneAppointment from "@/services/appointments/getOneAppointment";

export default function AppointmentDetail() {
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

  const [apptDetail, setApptDetail] = useState<AppointmentData | null>(null);
  const [propertyDetail, setPropertyDetail] = useState<PropertyData | null>(
    null
  );
  const [ownerDetail, setOwnerDetail] = useState<UserData | null>(null);
  const [dwellerDetail, setDwellerDetail] = useState<UserData | null>(null);
  const [isFetched, setFetched] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      const appt = await getOneAppointment(params.id);
      setApptDetail(appt);
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
      if (appt.code == 400) {
        window.location.href = "/404";
      }
    };
    fetchData();
    console.log("successful");
    setFetched(true);
  }, []);

  useEffect(() => {
    console.log(apptDetail);
    // console.log(propertyDetail)
    // console.log(ownerDetail)
    // console.log(dwellerDetail)
  }, [apptDetail]);

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

    return `${day} ${months[month - 1]} ${year}`;
  };

  const getTime = (dateString: string) => {
    const date = new Date(dateString);

    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    return `${hours}:${minutes}`;
  };

  const getAddress = () => {
    return `${apptDetail?.property.address}, ${apptDetail?.property.alley}, ${apptDetail?.property.street}, ${apptDetail?.property.district}, ${apptDetail?.property.sub_district}, ${apptDetail?.property.province}, ${apptDetail?.property.country}, ${apptDetail?.property.postal_code}`;
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
              {apptDetail?.property.property_name}
            </div>
          </div>
          <div className="my-10 flex w-full py-5 flex-col rounded-3xl bg-ci-light-gray">
            <div className="mx-auto my-7 flex w-[90%] flex-col items-center justify-center">
              <div className="mb-5 flex w-full flex-row justify-between">
                <div className="text-4xl font-bold">
                  {apptDetail?.property.property_name}
                </div>
                <div>
                  <StatusBox
                    status={
                      apptDetail?.status.charAt(0) +
                      apptDetail?.status.toLowerCase().slice(1)
                    }
                  />
                </div>
              </div>
              <div className="flex w-full flex-row justify-between h-max">
                <div className="w-[40%] rounded-lg">
                  <Image
                    src={apptDetail?.property.property_images[0].image_url}
                    alt="property image"
                    width={600}
                    height={400}
                    objectFit="cover"
                    layout="responsive"
                  />
                </div>
                <div className="flex h-auto w-[50%] flex-col text-3xl">
                  <div className="my-auto flex flex-row">
                    <div className="mr-auto flex">
                      <div className="font-semibold">Date:&nbsp;</div>
                      <div className="font-medium">
                        {getDate(apptDetail?.appointment_date)}
                      </div>
                    </div>
                    <div className="mx-auto flex">
                      <div className="font-semibold">Time:&nbsp;</div>
                      <div className="font-medium">
                        {getTime(apptDetail?.appointment_date)}
                      </div>
                    </div>
                  </div>
                  <div className="my-auto flex flex-row">
                    <div className="font-semibold">Address:&nbsp;</div>
                    <div className="font-medium">{getAddress()}</div>
                  </div>
                  <div className="my-auto flex flex-row">
                    <div className="font-semibold">Price:&nbsp;</div>
                    <div className="font-medium">
                      {apptDetail?.property.price_per_month + " Baht / month"}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="mx-auto mt-10 flex h-full w-[80%] flex-col items-center justify-between">
              <div className="mb-5 flex w-[80%] flex-row justify-evenly">
                <div className="w-[40%]">
                  <UserCard
                    role="Owner"
                    profilePicSrc={apptDetail?.owner.owner_profile_image_url}
                    name={`${apptDetail?.owner.owner_first_name} ${apptDetail?.owner.owner_last_name}`}
                    tel={apptDetail?.owner.owner_phone_number}
                  />
                </div>
                <div className="w-[40%]">
                  <UserCard
                    role="Dweller"
                    profilePicSrc={apptDetail?.dweller.dweller_profile_image_url}
                    name={`${apptDetail?.dweller.dweller_first_name} ${apptDetail?.dweller.dweller_last_name}`}
                    tel={apptDetail?.dweller.dweller_phone_number}
                  />
                </div>
              </div>
              <div className="flex flex-row text-3xl mt-5">
                <div className="font-semibold">Note:&nbsp;</div>
                <div className="font-medium">{apptDetail?.note}</div>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
