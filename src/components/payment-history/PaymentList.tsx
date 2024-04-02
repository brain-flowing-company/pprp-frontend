import { useState, useEffect, useRef } from "react";

import Pagination from "@mui/material/Pagination";
import Image from "next/image";
import Payment from "./Payment";

const PaymentList = ({ totalPay }: { totalPay: number }) => {
  const sortType = {
    datenew: "Newest Payment First",
    dateOld: "Oldest Payment First",
    asc: "Amount from lowest to highest",
    desc: "Amount from highest to lowest",
  };

  const [page, setPage] = useState<number>(1);
  const [text, setText] = useState<string>("Newest Listing First");
  const [changingSort, setChangingSort] = useState<boolean>(false);

  const [showFilter, setShowFilter] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState<Array<string>>([
    "Credit Card",
    "QR PromptPay",
    "Received",
  ]);
  const [checked, setChecked] = useState<{ [key: string]: boolean }>({});

  const ref = useRef<HTMLDivElement>(null);

  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    const isChecked = event.target.checked;

    // Update the checked status in the component's state
    setChecked((prevChecked) => ({
      ...prevChecked,
      [value]: isChecked,
    }));
  };

  useEffect(() => {
    // Scroll to the top of the page
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [page]);

  return (
    <div className="mx-auto mt-8 h-full w-[80%]">
      <div className="mr-auto text-5xl font-bold">Payment History</div>
      <div className="my-5 flex flex-row">
        {/* sort stuff here */}
        <div className="text-xl font-semibold">Sort By</div>
        <div className="flex flex-row text-xl">
          <div
            className="mx-3 font-semibold text-ci-blue"
            onClick={() => setChangingSort(!changingSort)}
          >
            {text}
          </div>
          {changingSort ? (
            <div className="absolute z-40 mt-2 flex flex-col items-center">
              <div className="flex flex-col justify-around rounded-2xl bg-white ">
                <div
                  className="h-full w-full rounded-t-2xl p-3 font-normal text-black hover:bg-ci-light-gray"
                  onClick={() => {
                    setText("Newest Payment First");
                    setChangingSort(!changingSort);
                  }}
                >
                  Newest Payment First
                </div>
                <div
                  className="h-full w-full p-3 font-normal text-black hover:bg-ci-light-gray"
                  onClick={() => {
                    setText("Oldest Payment First");
                    setChangingSort(!changingSort);
                  }}
                >
                  Oldest Payment First
                </div>
                <div
                  className="h-full w-full p-3 font-normal text-black hover:bg-ci-light-gray"
                  onClick={() => {
                    setText("Amount from lowest to highest");
                    setChangingSort(!changingSort);
                  }}
                >
                  Amount from lowest to highest
                </div>
                <div
                  className="h-full w-full rounded-b-2xl p-3 font-normal text-black hover:bg-ci-light-gray"
                  onClick={() => {
                    setText("Amount from highest to lowest");
                    setChangingSort(!changingSort);
                  }}
                >
                  Amount from highest to lowest
                </div>
              </div>
            </div>
          ) : null}
          <div className="relative ml-2 flex flex-row place-items-start text-xl font-bold">
            <div
              className="flex flex-row items-center hover:cursor-pointer"
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
                className="absolute left-0 top-full z-40 flex w-60 flex-col items-end border border-black bg-white"
              >
                {selectedStatus.map((selected) => (
                  <div className="mx-auto flex h-[50px] w-full flex-row bg-slate-200 p-3">
                    <input
                      className="w-1/5 accent-ci-light-gray"
                      type="checkbox"
                      value={selected}
                      onChange={handleCheckboxChange}
                      checked={checked[selected]}
                    />
                    <div className="w-4/5">{selected}</div>
                  </div>
                ))}
              </div>
            ) : null}
          </div>
        </div>
        <div className="small-text ml-auto">
          <div>
            {totalPay % 10 === 1 && totalPay <= 10 * page
              ? null
              : 10 * (page - 1) + 1}{" "}
            {totalPay % 10 === 1 && totalPay <= 10 * page ? null : "-"}{" "}
            {totalPay < 10 * page ? totalPay : 10 * page} of {totalPay}
            {" lists"}
          </div>
        </div>
      </div>

      <div className="rounded-t-2xl bg-ci-dark-blue p-5">
        <div className="grid grid-cols-5 items-center justify-center gap-5 font-semibold text-ci-white">
          <div className="text-center">Name</div>
          <div className="text-center">Date - Time</div>
          <div className="text-center">Payment Type</div>
          <div className="text-center">Amount</div>
          <div className="text-center"></div>
        </div>
      </div>

      {/* EXAMPLE
      EXAMPLE
      EXAMPLE
      EXAMPLE
      EXAMPLE */}

      <Payment
        name="John Doe"
        date="21 June 2023"
        time="14:00"
        type="QR PromptPay"
        amount={100000}
      />
      <Payment
        name="John Doe"
        date="20 June 2023"
        time="14:00"
        type="Received"
        amount={20000}
      />
      <Payment
        name="John Doe"
        date="20 June 2023"
        time="14:00"
        type="Credit Card"
        amount={10000}
      />
      <Payment
        name="John Doe"
        date="20 June 2023"
        time="14:00"
        type="Credit Card"
        amount={1000000}
      />

      {/* EXAMPLE
      EXAMPLE
      EXAMPLE
      EXAMPLE
      EXAMPLE */}

      {totalPay > 10 ? (
        <div className="flex w-full items-center justify-center pt-10">
          <Pagination
            count={Math.ceil(totalPay / 10)}
            size="large"
            onChange={handleChange}
            color="primary"
          ></Pagination>
        </div>
      ) : null}

      <div className="small-text flex h-[100px] items-center justify-center pb-20 pt-10">
        {/* num prop text here */}
        <div>
          {totalPay % 10 === 1 && totalPay <= 10 * page
            ? null
            : 10 * (page - 1) + 1}{" "}
          {totalPay % 10 === 1 && totalPay <= 10 * page ? null : "-"}{" "}
          {totalPay < 10 * page ? totalPay : 10 * page} of {totalPay}
          {" lists"}
        </div>
      </div>
    </div>
  );
};

export default PaymentList;
