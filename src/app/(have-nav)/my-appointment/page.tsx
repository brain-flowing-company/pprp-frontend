"use client";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import AppointmentList from "@/components/my-appointment/AppointmentList";
import ToggleSwitch from "@/components/my-appointment/ToggleSwitch";
import getUserAppointment from "@/services/appointments/getUserAppointment";
import AppointmentData from "@/models/AppointmentData";
import PropertyData from "@/models/PropertyData";
import getPropertyDetail from "@/services/property/getPropertyDetail";
import AppointmentDetailData from "@/models/AppointmentDetailData";
import getOwnerData from "@/services/users/getOwnerData";

export default function MyAppointment() {
  const [ownerAppointmentData, setOwnerAppointmentData] = useState<AppointmentData[]>([]);
  const [dwellerAppointmentData, setDwellerAppointmentData] = useState<AppointmentData[]>([]);
  const [ownerTotal, setOwnerTotal] = useState<number>(0);
  const [dwellerTotal, setDwellerTotal] = useState<number>(0);
  const [appointmentDetail, setAppointmentDetail] = useState<
    AppointmentDetailData[]
  >([]);
  const [finishFetching, setFinishFetching] = useState<boolean>(false);

  const [selectOn, setSelectOn] = useState(0);
  const [selectedOption, setSelectedOption] = useState("");
  const [showFilter, setShowFilter] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState<Array<string>>([
    "Archive",
    "Cancelled",
    "Confirm",
    "Pending",
    "Rejected",
  ]);

  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setShowFilter(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getUserAppointment();
      console.log(data);
      setOwnerAppointmentData(data.owner_appointments);
      if (data.owner_appointments !== null) {
        setOwnerTotal(data.owner_appointments.length);
      }
      setDwellerAppointmentData(data.dweller_appointments);
      if (data.dweller_appointments !== null) {
        setDwellerTotal(data.dweller_appointments.length);
      }
    };
    fetchData();
    setFinishFetching(true);
  }, []);

  // useEffect(() => {
  //     const fetchPropertyData = async () => {
  //         const dataDetail = [];
  //         for (let i = 0; i < total; i++) {
  //             const dataObject = await getPropertyDetail(appointmentData[i].property.property_id);
  //             console.log(appointmentData[i]);
  //             console.log(dataObject);
  //             const ownerDetail = await getOwnerData(appointmentData[i].owner.owner_user_id);
  //             const newJSON = Object.assign({}, appointmentData[i], dataObject, ownerDetail);
  //             dataDetail.push(newJSON);
  //         }
  //         setAppointmentDetail(dataDetail);
  //     }
  //     fetchPropertyData();
  //     setFinishFetching(true);
  // }, [appointmentData])

  useEffect(() => {
    console.log(ownerAppointmentData);
    console.log(ownerTotal);
    console.log(dwellerAppointmentData);
    console.log(dwellerTotal);
  }, [ownerAppointmentData]);

  useEffect(() => {
    console.log(appointmentDetail);
  }, [appointmentDetail]);

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedOption(event.target.value);
  };

  const handleCheckboxChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    console.log("Checkbox value:", event.target.value);
    // Handle checkbox change logic here
  };

  const getDate = (dateString: string) => {
    const date = new Date(dateString);
    console.log(date)

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

  const getTime = (dateString: string) => {
    const date = new Date(dateString);

    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    return `${hours}:${minutes}`;
  };

  return (
    <div className="mx-auto mt-8 h-full w-[80%]">
      <div className="flex flex-row">
        <div className="mr-auto text-5xl font-bold">My Appointment</div>
        <div className="pt-1">
          <ToggleSwitch
            label1="Dweller"
            label2="Owner"
            selectOn={selectOn}
            setSelectOn={setSelectOn}
          />
        </div>
      </div>
      <div className="my-5 flex flex-row">
        <div className="text-xl font-bold">Sort By</div>
        <div className="ml-1">
          <select
            className="block w-full rounded-md text-xl font-semibold text-ci-blue focus-within:border-none hover:cursor-pointer focus:border-none"
            value={selectedOption}
            onChange={handleChange}
          >
            <option
              className="hover:bg-ci-light-gray hover:shadow-inner"
              value="latest"
            >
              Latest Appointment First
            </option>
            <option
              className="hover:bg-ci-light-gray hover:shadow-inner"
              value="oldest"
            >
              Oldest Appointment First
            </option>
          </select>
        </div>
        <div className="relative ml-2 flex flex-row place-items-start text-xl font-bold">
          <div
            className="flex flex-row hover:cursor-pointer"
            onClick={() => {
              setShowFilter(!showFilter);
            }}
          >
            Filter Status Type
            <Image
              className="mx-1 hover:cursor-pointer"
              src="img/my-appointment/filter.svg"
              alt="filter"
              width={25}
              height={25}
            />
          </div>

          {showFilter ? (
            <div
              ref={ref}
              className="absolute -right-40 top-full z-40 flex w-full flex-col items-center border border-black bg-white"
            >
              {selectedStatus.map((selected) => (
                <div className="mx-auto flex h-[50px] w-full flex-row bg-slate-200 p-3">
                  <input
                    className="w-1/5 accent-ci-light-gray"
                    type="checkbox"
                    value={selected}
                    onChange={handleCheckboxChange}
                    checked={true}
                  />
                  <div className="w-4/5">{selected}</div>
                </div>
              ))}
            </div>
          ) : null}
        </div>
      </div>

      <div className="h-[80px] rounded-t-3xl bg-ci-dark-blue text-2xl font-semibold text-white">
        <div className="mx-auto my-auto flex h-full w-[90%] flex-row justify-start">
          <div className="my-auto w-[40%]">Property</div>
          <div className="w-[15%] mx-auto my-auto">Date - Time</div>
          <div className="w-[15%] mx-auto my-auto">Status</div>
          <div className="mx-auto"></div>
        </div>
      </div>
      {finishFetching ? (
        <div>
          {selectOn % 2 == 0 ? (
              <div>
                {dwellerTotal == 0 ? (
                    <div className="mx-72 mt-8 flex h-1/2 flex-col items-center justify-around">
                      <div className="large-text text-center font-bold">
                        Empty appointment listing
                      </div>
          
                      <Image
                        src="/img/my-appointment/contract.svg"
                        alt="home"
                        width={100}
                        height={100}
                      />
                      
                      <div className="m-1 text-center text-2xl">
                        Your appointment is empty.
                      </div>
                    </div>
                  ) : (
                    <div>
                        {dwellerAppointmentData.map((appt) => {
                          return (
                            <AppointmentList
                              apptId={appt.appointment_id}
                              propertyImgSrc={
                                appt.property.property_images.length === 0
                                  ? "/img/my-appointment/mhadaeng.png"
                                  : appt.property.property_images[0].image_url
                              }
                              propertyName={appt.property.property_name}
                              propertySubName={
                                appt.property.property_type.charAt(0) +
                                appt.property.property_type.toLowerCase().slice(1)
                              }
                              ownerImgSrc={appt.owner.owner_profile_image_url}
                              ownerName={
                                appt.owner.owner_first_name + " " + appt.owner.owner_last_name
                              }
                              date={getDate(appt.appointment_date)}
                              time={getTime(appt.appointment_date)}
                              status={
                                appt.status.charAt(0) + appt.status.toLowerCase().slice(1)
                              }
                            />
                          );
                        })}
                    </div>
                )}
              </div>
          ) : (
            <div>
                {ownerTotal == 0 ? (
                    <div className="mx-72 mt-8 flex h-1/2 flex-col items-center justify-around">
                      <div className="large-text text-center font-bold">
                        Empty appointment listing
                      </div>
          
                      <Image
                        src="/img/my-appointment/contract.svg"
                        alt="home"
                        width={100}
                        height={100}
                      />
                      
                      <div className="m-1 text-center text-2xl">
                        Your appointment is empty.
                      </div>
                    </div>
                  ) : (
                    <div>
                        {ownerAppointmentData.map((appt) => {
                          return (
                            <AppointmentList
                              apptId={appt.appointment_id}
                              propertyImgSrc={
                                appt.property.property_images.length === 0
                                  ? "/img/my-appointment/mhadaeng.png"
                                  : appt.property.property_images[0].image_url
                              }
                              propertyName={appt.property.property_name}
                              propertySubName={
                                appt.property.property_type.charAt(0) +
                                appt.property.property_type.toLowerCase().slice(1)
                              }
                              ownerImgSrc={appt.owner.owner_profile_image_url}
                              ownerName={
                                appt.owner.owner_first_name + " " + appt.owner.owner_last_name
                              }
                              date={getDate(appt.appointment_date)}
                              time={getTime(appt.appointment_date)}
                              status={
                                appt.status.charAt(0) + appt.status.toLowerCase().slice(1)
                              }
                            />
                          );
                        })}
                    </div>
                )}
              </div>
          )}

          
        </div>
      ) : null}

      <div className="mx-auto flex h-20 w-full place-items-center justify-center text-2xl font-medium">
        {selectOn % 2 == 0 ? (
          <div>
            {dwellerTotal} lists
          </div>
        ) : (
          <div>
            {ownerTotal} lists
          </div>
        )}
      </div>
    </div>
  );
}
