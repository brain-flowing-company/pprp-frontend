"use client";
import { useState, useEffect } from "react";
import { Pagination, Checkbox } from "@mui/material";
import Dropdown from "@/components/edit-profile/DropDown";
import getUserPayment from "@/services/payments/getUserPayment";
import { Filter } from "lucide-react";
import { PaymentDetail } from "@/components/payment-history/PaymentDetail";
export type Transaction = {
  name: string;
  payment_method: string;
  price: string;
  created_at: string;
  agreement_id: string;
  payment_id: string;
};
export const formatDate = (e:any) => {
  const newDate = new Date(e);
  return newDate.toDateString().slice(4,) + " - " + newDate.toLocaleTimeString();
}
const PaymentHistory = () => {
  const [sortBy, setSortBy] = useState("Oldest Payment First");
  const [pageCount, setPageCount] = useState(1);
  const [page, setPage] = useState(1);
  const options = [
    "Newest Payment First",
    "Oldest Payment First",
    "Amount from highest to lowest",
    "Amount from lowest to highest",
  ];
  const [begin, setBegin] = useState(1);
  const [end, setEnd] = useState(0);
  const [items, setItems] = useState<Transaction[] | null>([]);
  const [allItems, setAllItems] = useState<Transaction[] | null>([]);
  const [currentItems, setCurrentItems] = useState<Transaction[] | null>([]);
  const [length, setLength] = useState(0);
  const [filterCard, setFilterCard] = useState(true);
  const [filterPromptPay, setFilterPromptPay] = useState(true);
  const [filterReceived, setFilterReceived] = useState(true);
  const [filter, setFilter] = useState(false);
  const [detail, setDetail] = useState(false);
  const [currentTransaction, setCurrentTransaction] = useState<Transaction|null>();
  const fetchData = async () => {
    try{
      const data = await getUserPayment();
      console.log(data);
      setItems([]);
      setAllItems([]);
      setPageCount(0);
      setLength(0);
      if(data != null){
        setItems(data.payments);
        setAllItems(data.payments);
        setPageCount(Math.ceil(data.payments.length / 10));
        setLength(data.payments.length);
      }
    }
    catch{
      console.log("Failed to fetch")
    }
  };
  const handleChange = (p: any) => {};
  const handleSort = (e: any) => {
    setSortBy(e);
    if(e == "Newest Payment First"){
      sortByDate();
      setItems([...items!.reverse()])
    }
    if(e == "Oldest Payment First"){
      sortByDate();
      setItems([...items!])

    }
  };
  const sortByDate = () => {
    items?.sort((x:any, y:any) => {
      const a = new Date(x.created_at);
      const b = new Date(y.created_at)
      if(a > b){
        return 1;
      }
      if(a < b){
        return -1;
      }
      return 0;
    });
  }

  const handlePageChange = (p: any) => {
    setPageCount(Math.ceil(items?.length || 0 / 10));
    setLength(items?.length || 0);
    const begin = (p - 1) * 10;
    const end = p == pageCount ? length : p * 10;
    const cur = items? items : []
    setCurrentItems([...cur.slice(begin, end)]);
    setBegin(begin);
    setEnd(end);

  };
  
  const toggleFilter = () => {
    setFilter(!filter);
  }
  const handleFilter = () => {
    const tmp:any = [];
    const all = allItems? allItems : [];
    all.forEach(e => {
      if(filterCard && e.payment_method == "CREDIT_CARD"){
        tmp.push(e);
      }
      if(filterPromptPay && e.payment_method == "PROMPTPAY"){
        tmp.push(e);
      }
      if(filterReceived && e.payment_method == "RECEIVED"){
        tmp.push(e);
      }
    });
    setItems([...tmp]);
  }
  const toggleDetail = (e:Transaction) => {
    setDetail(true);
    setCurrentTransaction(e);
  }
  function formatPrice(num: number): string {
    if (num) {
      return Math.round(num)
        .toString()
        .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
    return "0";
  }
  useEffect(() => {
    handlePageChange(1);
  }, [pageCount, items]);
  useEffect(() => {
    fetchData();
  }, []);
  useEffect(() => {
    handleFilter();
    handlePageChange(1);
  }, [filterCard,filterPromptPay,filterReceived]);
  return (
    <div>
    <div className={`${detail? "hidden": ""} text-md m-16 flex flex-col`}>
      <div className="text-3xl font-bold">Payment History</div>
      <div className="mt-4 flex flex-row items-center font-bold space-x-2">
        <div>Sort By </div>
        <Dropdown
          label=""
          onSelect={handleSort}
          options={options}
          selected={sortBy}
          className="h-auto w-auto border-none bg-transparent text-ci-blue"
        />
        <div className="flex flex-row items-center space-x-1">
        <div>
          Filter Payment Type
        </div>
        <Filter className="hover:opacity-50" onClick={toggleFilter}></Filter>
        {filter && <div className="bg-white absolute mt-40 drop-shadow-md rounded-xl pr-10">
          <div className="flex flex-row items-center">
            <Checkbox defaultChecked={filterCard} onChange={() => {setFilterCard(!filterCard)}}/>
            <div>Credit Card</div>
          </div>
          <div className="flex flex-row items-center">
            <Checkbox defaultChecked={filterPromptPay} onChange={() => {setFilterPromptPay(!filterPromptPay)}}/>
            <div>Promptpay</div>
          </div>
          <div className="flex flex-row items-center">
            <Checkbox defaultChecked={filterReceived} onChange={() => {setFilterReceived(!filterReceived)}}/>
            <div>Received</div>
          </div>
          </div>}
        </div>
      </div>
      <div className="mt-4 flex flex-col items-center justify-center">
        <div className="flex h-16 w-4/5 flex-row rounded-t-2xl bg-ci-dark-blue px-4 text-white ">
          <div className="flex w-1/5 items-center justify-center">Name</div>
          <div className="flex w-1/5 items-center justify-center">
            Date - Time
          </div>
          <div className="flex w-1/5 items-center justify-center">
            Payment Type
          </div>
          <div className="flex w-1/5 items-center justify-center">Amount</div>
          <div className="flex w-1/5 items-center justify-center"></div>
        </div>
        {currentItems && currentItems!.map((item) => (
          <div className="flex h-20 w-4/5 flex-row border-x border-b border-ci-gray bg-ci-light-gray px-4 py-4 ">
            <div className="flex w-1/5 items-center justify-center">
              {item.name}
            </div>
            <div className="flex w-1/5 items-center justify-center">
              {formatDate(item.created_at)}
            </div>
            <div className="flex w-1/5 items-center justify-center">
              {item.payment_method.replace(/_/g, " ")}
            </div>
            <div className={`flex w-1/5 items-center justify-center
            ${item.payment_method !== "Received" ? "text-ci-red" : "text-ci-light-blue"}`}>
              {item.payment_method !== "Received" ? "- ฿" : "+ ฿"} {formatPrice(Number(item.price))}
            </div>
            <div className="flex w-1/5 items-center justify-center">
              <button className="rounded-md bg-ci-blue px-8 text-white" onClick={() => {toggleDetail(item)}}>
                Detail
              </button>
            </div>
          </div>
        ))}
        <Pagination
          count={pageCount}
          color="primary"
          onChange={(e: any) => {
            handlePageChange(e.target.textContent);
          }}
          className="mt-4"
        />
        <div className="mt-4">
          {begin + 1} - {end} of {length} lists
        </div>
      </div>
    </div>
      {detail && <PaymentDetail transaction={currentTransaction!} setDetail={setDetail}/>}
    </div>
    
  );
};

export default PaymentHistory;
