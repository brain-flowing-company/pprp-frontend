"use client";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import AgreementList from "@/components/my-agreement/AgreementList";
import ToggleSwitch from "@/components/my-appointment/ToggleSwitch";
import AgreementData from "@/models/AgreementData";
import getUserAgreement from "@/services/agreement/getUserAgreement";
import Dropdown, { IDropdownOption } from "@/components/my-agreement/Dropdown";
import getUserProperties from "@/services/agreement/getUserProperties";
import getUsersFromChat from "@/services/agreement/getUsersFromChat";
import postAgreement from "@/services/agreement/postAgreement";
import getCurrentUser from "@/services/users/getCurrentUser";

export default function MyAgreement() {
  const [userId, setUserId] = useState<string>("");
  const [ownerAgreementData, setOwnerAgreementData] = useState<AgreementData[]>(
    []
  );
  const [dwellerAgreementData, setDwellerAgreementData] = useState<
    AgreementData[]
  >([]);
  const [ownerTotal, setOwnerTotal] = useState<number>(0);
  const [dwellerTotal, setDwellerTotal] = useState<number>(0);
  const [finishFetching, setFinishFetching] = useState<boolean>(false);
  const [properties, setProperties] = useState<string[]>([]);
  const [dwellers, setDwellers] = useState<string[]>([]);
  const [propertiesOptions, setPropertiesOptions] = useState<IDropdownOption[]>(
    []
  );
  const [dwellersOptions, setDwellersOptions] = useState<IDropdownOption[]>([]);

  const [selectedOption, setSelectedOption] = useState<string | number>();
  const [selectedPropertyOption, setSelectedPropertyOption] = useState<
    string | number
  >();
  const [selectedPropertyId, setSelectedPropertyId] = useState<string>();
  const [selectedDwellerOption, setSelectedDwellerOption] = useState<
    string | number
  >();
  const [selectedDwellerId, setSelectedDwellerId] = useState<string>();

  const [deptAmount, setDeptAmount] = useState<number>();
  const [paymentPerMonth, setPaymentPerMonth] = useState<number>();
  const [paymentDuration, setPaymentDuration] = useState<number>();
  const inputRef = useRef<HTMLInputElement>(null);
  const deptRef = useRef(0);
  const ppmRef = useRef(0);
  const pDRef = useRef(0);

  const [selectOn, setSelectOn] = useState(0);
  const [selectTypeOn, setSelectTypeOn] = useState(0);
  const [showFilter, setShowFilter] = useState(false);
  const [isMakingAgreement, setMakingAgreement] = useState<boolean>(false);
  const [isCreateValid, setCreateValid] = useState<boolean>(false);
  const [isPosted, setPosted] = useState<boolean>(false);
  const [selectedStatus, setSelectedStatus] = useState<Array<string>>([
    "Archive",
    "Await Deposit",
    "Await Rent",
    "Cancelled",
    "Overdue",
    "Renting",
  ]);

  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const getUser = async () => {
      const data = await getCurrentUser();
      setUserId(data.user_id);
    };
    getUser();
  }, []);

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
      const data = await getUserAgreement();
      console.log(data);
      if (data) {
        setOwnerAgreementData(data.owner_agreements);
        if (data.owner_agreements !== null) {
          setOwnerTotal(data.owner_agreements.length);
        }
        setDwellerAgreementData(data.dweller_agreements);
        if (data.dweller_agreements !== null) {
          setDwellerTotal(data.dweller_agreements.length);
        }
      }
    };
    fetchData();
    setFinishFetching(true);
    setPosted(false);
  }, [isPosted]);

  // useEffect(() => {
  //     console.log(total);
  //     console.log(agreementData);
  //     const props: string[] = [];
  //     agreementData.map((agmt) => {
  //         // props.push(agmt.property.property_name);
  //         props.push("1");
  //     })
  //     setProperties(props);
  // }, [agreementData])

  useEffect(() => {
    const getProperty = async () => {
      const allProperties = await getUserProperties();
      console.log(allProperties);

      let label: string | number;
      let labelValue: string; // id
      const optionArray: IDropdownOption[] = [];

      if (allProperties !== null) {
      }

      allProperties.properties?.map((prop) => {
        label = prop.property_name;
        labelValue = prop.property_id;
        let option = { label, labelValue };
        optionArray.push(option);
      });

      setPropertiesOptions(optionArray);
    };

    getProperty();

    //   const props: string[] = [];
    //   (allProperties.properties).map((prop) => {
    //     props.push(prop.property_name)
    //   })
    //   setProperties(props)
    // }
    // getProperty();
  }, []);

  // useEffect(() => {
  //     let label: string | number;
  //     let labelValue: string | number;
  //     const optionArray: IDropdownOption[] = [];
  //     properties.map((prop) => {
  //         label = prop;
  //         labelValue = prop;
  //         let option = {label, labelValue};
  //         optionArray.push(option);
  //     })
  //     setPropertiesOptions(optionArray);
  // }, [properties])

  useEffect(() => {
    const getDweller = async () => {
      const allDwellers = await getUsersFromChat();
      console.log(allDwellers);

      let label: string | number;
      let labelValue: string;
      const optionArray: IDropdownOption[] = [];

      if (allDwellers !== null) {
        allDwellers.map((dwlr) => {
          label = `${dwlr.first_name} ${dwlr.last_name}`;
          labelValue = dwlr.user_id;
          let option = { label, labelValue };
          optionArray.push(option);
        });

        setDwellersOptions(optionArray);
      }

      // const dwlrs: string[] = [];
      // allDwellers.map((dwlr) => {
      //   dwlrs.push(`${dwlr.first_name} ${dwlr.last_name}`)
      // })
      // setDwellers(dwlrs)
    };
    getDweller();
  }, []);

  useEffect(() => {
    if (
      selectedPropertyOption === undefined ||
      selectedDwellerOption === undefined ||
      deptAmount === undefined ||
      paymentPerMonth === undefined ||
      paymentDuration === undefined
    ) {
      setCreateValid(false);
    } else {
      setCreateValid(true);
    }
    console.log(selectedPropertyOption);
    console.log(selectedDwellerOption);
    console.log(deptAmount);
    console.log(paymentPerMonth);
    console.log(paymentDuration);
  }, [
    selectedPropertyOption,
    selectedDwellerOption,
    deptAmount,
    paymentPerMonth,
    paymentDuration,
  ]);

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedOption(event.target.value);
  };

  const handlePropertyChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setSelectedPropertyOption(event.target.value);
  };

  const handleDwellerChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedDwellerOption(event.target.value);
  };

  const handleCheckboxChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    console.log("Checkbox value:", event.target.value);
    // Handle checkbox change logic here
  };

  const handlePost = async () => {
    const agreementType = selectOn % 2 == 0 ? "RENTING" : "SELLING";
    const propertyId = selectedPropertyId;
    const dwellerId = selectedDwellerId;
    const date = new Date().toISOString();
    const firstStatus = "AWAITING_DEPOSIT";
    const sum = deptAmount + paymentPerMonth * paymentDuration;
    const data = {
      agreementType: agreementType,
      propertyId: propertyId,
      dwellerId: dwellerId,
      agreementDate: date,
      status: firstStatus,
      depositAmt: deptAmount,
      paymentPerMonth: paymentPerMonth,
      paymentDuration: paymentDuration,
      totalPayment: sum,
    };
    const response = await postAgreement(data);
    console.log(response);
    console.log("posted");
    setPosted(true);
  };

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

  const getTime = (dateString: string) => {
    const date = new Date(dateString);

    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    return `${hours}:${minutes}`;
  };

  return (
    <div className="mx-auto mt-8 h-full w-[80%]">
      <div className="flex flex-row">
        <div className="mr-auto text-5xl font-bold">My Agreement</div>
        <div className="pt-1">
          <ToggleSwitch
            label1="Dweller"
            label2="Owner"
            selectOn={selectOn}
            setSelectOn={setSelectOn}
          />
        </div>
      </div>
      <div className="mx-auto my-5 flex w-full flex-row items-center">
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
              Latest Agreement First
            </option>
            <option
              className="hover:bg-ci-light-gray hover:shadow-inner"
              value="oldest"
            >
              Oldest Agreement First
            </option>
          </select>
        </div>
        <div className="relative ml-2 mr-auto flex flex-row place-items-start text-xl font-bold">
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
        <div className="flex w-[25%] justify-end">
          <button
            className="w-full rounded-lg bg-ci-blue py-3 text-center text-2xl font-medium text-white hover:shadow-inner hover:shadow-blue-950"
            onClick={() => {
              setMakingAgreement(true);
            }}
          >
            Make Agreement
          </button>
        </div>
        {isMakingAgreement ? (
          <div className="fixed left-[0] top-[0] z-40 flex h-[100vh] w-[100%] flex-col items-center justify-center bg-black bg-opacity-20">
            <div className="relative flex h-4/5 w-1/2 flex-col items-center justify-around rounded-2xl bg-white p-[32px]">
              <div className="text-4xl font-bold">Make Agreement</div>
              <div className="mx-auto flex w-full flex-row justify-center">
                <div className="mx-auto flex w-[40%] flex-col">
                  <div className="text-2xl font-medium">
                    Select your property
                  </div>
                  <div className="">
                    <Dropdown
                      name="Property"
                      options={propertiesOptions}
                      required={true}
                      placeHolder="Select Property"
                      type="arrow-down"
                      selectedItem={selectedPropertyOption}
                      setSelectedItem={setSelectedPropertyOption}
                      sid={selectedPropertyId}
                      setId={setSelectedPropertyId}
                    />
                  </div>
                </div>
                <div className="mx-auto flex w-[40%] flex-col">
                  <div className="text-2xl font-medium">Select dweller</div>
                  <div className="">
                    <Dropdown
                      name="Dweller"
                      options={dwellersOptions}
                      required={true}
                      placeHolder="Select Dweller"
                      type="arrow-down"
                      selectedItem={selectedDwellerOption}
                      setSelectedItem={setSelectedDwellerOption}
                      sid={selectedDwellerId}
                      setId={setSelectedDwellerId}
                    />
                  </div>
                </div>
              </div>
              <div className="flex h-1/3 w-full flex-row">
                <div className="ml-auto flex w-1/2 flex-col text-xl font-medium">
                  <div className="h-1/4">
                    <ToggleSwitch
                      label1="Renting"
                      label2="Selling"
                      selectOn={selectTypeOn}
                      setSelectOn={setSelectTypeOn}
                    />
                  </div>
                  <div className="flex h-3/4 flex-row">
                    <div className="flex flex-col">
                      <div className="mt-auto">Deposit Amount:</div>
                      <div className="mt-auto">Payment per month:</div>
                      <div className="mt-auto">Payment Duration:</div>
                    </div>
                    <div className="mx-auto flex w-1/4 flex-col">
                      <div className="mt-auto w-full">
                        <textarea
                          className={`text-l drop-shadow-input relative flex w-full items-center rounded-lg border-2 border-ci-dark-gray pl-3 font-normal text-ci-black transition hover:cursor-text`}
                          name="depositAmount"
                          id="depositAmount"
                          cols={1}
                          rows={1}
                          placeholder="Enter Amount (THB)"
                          value={deptAmount}
                          ref={inputRef}
                          onChange={(e) => {
                            const re = /^[0-9\b]+$/;
                            if (
                              e.target.value === "" ||
                              re.test(e.target.value)
                            ) {
                              deptRef.current = Number(e.target.value);
                              setDeptAmount(deptRef.current);
                            }
                          }}
                        ></textarea>
                      </div>
                      <div className="mt-auto w-full">
                        <textarea
                          className={`text-l drop-shadow-input relative flex w-full items-center rounded-lg border-2 border-ci-dark-gray pl-3 font-normal text-ci-black transition hover:cursor-text`}
                          name="paymentPerMonth"
                          id="paymentPerMonth"
                          cols={1}
                          rows={1}
                          placeholder="Enter Amount (THB)"
                          value={paymentPerMonth}
                          ref={inputRef}
                          onChange={(e) => {
                            const re = /^[0-9\b]+$/;
                            if (
                              e.target.value === "" ||
                              re.test(e.target.value)
                            ) {
                              ppmRef.current = Number(e.target.value);
                              setPaymentPerMonth(ppmRef.current);
                            }
                          }}
                        ></textarea>
                      </div>
                      <div className="mt-auto w-full">
                        <textarea
                          className={`text-l drop-shadow-input relative flex w-full items-center rounded-lg border-2 border-ci-dark-gray pl-3 font-normal text-ci-black transition hover:cursor-text`}
                          name="paymentMonth"
                          id="paymentMonth"
                          cols={1}
                          rows={1}
                          placeholder="Enter Month"
                          value={paymentDuration}
                          ref={inputRef}
                          onChange={(e) => {
                            const re = /^[0-9\b]+$/;
                            if (
                              e.target.value === "" ||
                              re.test(e.target.value)
                            ) {
                              pDRef.current = Number(e.target.value);
                              setPaymentDuration(pDRef.current);
                            }
                          }}
                        ></textarea>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="mx-auto my-auto flex h-full w-1/3 flex-col">
                  {isCreateValid ? (
                    <button
                      className="my-auto h-1/3 w-full rounded-full bg-ci-blue text-xl font-semibold text-white"
                      onClick={() => {
                        setCreateValid(false);
                        setMakingAgreement(false);
                        handlePost();
                      }}
                    >
                      Create
                    </button>
                  ) : (
                    <button
                      className="my-auto h-1/3 w-full rounded-full bg-ci-gray text-xl font-semibold text-white"
                      disabled
                    >
                      Create
                    </button>
                  )}
                  <button
                    className="my-auto h-1/3 w-full rounded-full bg-ci-blue text-xl font-semibold text-white"
                    onClick={() => {
                      setMakingAgreement(false);
                    }}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        ) : null}
      </div>

      <div className="h-[80px] rounded-t-3xl bg-ci-dark-blue text-2xl font-semibold text-white">
        <div className="mx-auto my-auto flex h-full w-[90%] flex-row justify-start">
          <div className="my-auto w-[40%]">Property</div>
          <div className="mx-auto my-auto w-[15%]">Date - Time</div>
          <div className="mx-auto my-auto w-[15%]">Status</div>
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
                    Empty agreement listing
                  </div>

                  <Image
                    src="/img/my-agreement/handshake2.svg"
                    alt="home"
                    width={100}
                    height={100}
                  />

                  <div className="m-1 text-center text-2xl">
                    Your agreement is empty.
                  </div>
                </div>
              ) : (
                <div>
                  {dwellerAgreementData.map((agmt) => {
                    return (
                      <AgreementList
                        agreementId={agmt.agreement_id}
                        propertyImgSrc={
                          agmt.property.property_images.length === 0
                            ? "/img/my-appointment/mhadaeng.png"
                            : agmt.property.property_images[0].image_url
                        }
                        propertyName={agmt.property.property_name}
                        propertySubName={
                          agmt.property.property_type.charAt(0) +
                          agmt.property.property_type.toLowerCase().slice(1)
                        }
                        ownerImgSrc={agmt.owner.owner_profile_image_url}
                        ownerName={
                          agmt.owner.owner_first_name +
                          " " +
                          agmt.owner.owner_last_name
                        }
                        date={getDate(agmt.agreement_date)}
                        time={getTime(agmt.agreement_date)}
                        status={
                          agmt.status.charAt(0) +
                          agmt.status.toLowerCase().slice(1)
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
                    Empty agreement listing
                  </div>

                  <Image
                    src="/img/my-agreement/handshake2.svg"
                    alt="home"
                    width={100}
                    height={100}
                  />

                  <div className="m-1 text-center text-2xl">
                    Your agreement is empty.
                  </div>
                </div>
              ) : (
                <div>
                  {ownerAgreementData.map((agmt) => {
                    return (
                      <AgreementList
                        agreementId={agmt.agreement_id}
                        propertyImgSrc={
                          agmt.property.property_images.length === 0
                            ? "/img/my-appointment/mhadaeng.png"
                            : agmt.property.property_images[0].image_url
                        }
                        propertyName={agmt.property.property_name}
                        propertySubName={
                          agmt.property.property_type.charAt(0) +
                          agmt.property.property_type.toLowerCase().slice(1)
                        }
                        ownerImgSrc={agmt.owner.owner_profile_image_url}
                        ownerName={
                          agmt.owner.owner_first_name +
                          " " +
                          agmt.owner.owner_last_name
                        }
                        date={getDate(agmt.agreement_date)}
                        time={getTime(agmt.agreement_date)}
                        status={
                          agmt.status.charAt(0) +
                          agmt.status.toLowerCase().slice(1)
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
          <div>{dwellerTotal} lists</div>
        ) : (
          <div>{ownerTotal} lists</div>
        )}
      </div>
    </div>
  );
}
