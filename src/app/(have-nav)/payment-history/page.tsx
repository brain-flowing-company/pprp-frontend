"use client"
import { useState, useEffect } from "react"
import { Pagination } from "@mui/material";
import Dropdown from "@/components/edit-profile/DropDown";
import getUserPayment from "@/services/payments/getUserPayment";
type Transaction = {
    name:string,
    dateTime: string,
    type: string,
    amount: string,
}
const PaymentHistory = () => {
    const [sortBy, setSortBy] = useState("Newest Payment First");
    const [pageCount, setPageCount] = useState(1);
    const [page, setPage] = useState(1);
    const options = ["Newest Payment First", 
                    "Oldest Payment First", 
                    "Amount from highest to lowest", 
                    "Amount from lowest to highest"]
    const [begin, setBegin] = useState(1);
    const [end, setEnd] = useState(0)
    const [items, setItems] = useState<Transaction[]>([{name:"Win ZaZa", dateTime:"20 Jul 2023 - 14:00", type: "Credit Bard", amount:"-฿30,000"}, 
                                                        {name:"Win ZaZa", dateTime:"20 Jul 2023 - 14:00", type: "Credit Bard", amount:"-฿30,000"},
                                                        {name:"Win ZaZa", dateTime:"20 Jul 2023 - 14:00", type: "Credit Bard", amount:"-฿30,000"}, 
                                                        {name:"Win ZaZa", dateTime:"20 Jul 2023 - 14:00", type: "Credit Bard", amount:"-฿30,000"},
                                                        {name:"Win ZaZa", dateTime:"20 Jul 2023 - 14:00", type: "Credit Bard", amount:"-฿30,000"}, 
                                                        {name:"Win ZaZa", dateTime:"20 Jul 2023 - 14:00", type: "Credit Bard", amount:"-฿30,000"},
                                                        {name:"Win ZaZa", dateTime:"20 Jul 2023 - 14:00", type: "Credit Bard", amount:"-฿30,000"}, 
                                                        {name:"Win ZaZa", dateTime:"20 Jul 2023 - 14:00", type: "Credit Bard", amount:"-฿30,000"},
                                                        {name:"Win ZaZa", dateTime:"20 Jul 2023 - 14:00", type: "Credit Bard", amount:"-฿30,000"}, 
                                                        {name:"John ZaZa", dateTime:"20 Jul 2023 - 14:00", type: "Credit Bard", amount:"-฿30,000"},
                                                        {name:"John ZaZa", dateTime:"20 Jul 2023 - 14:00", type: "Credit Bard", amount:"-฿30,000"}, 
                                                        {name:"John ZaZa", dateTime:"20 Jul 2023 - 14:00", type: "Credit Bard", amount:"-฿30,000"},
                                                        {name:"John ZaZa", dateTime:"20 Jul 2023 - 14:00", type: "Credit Bard", amount:"-฿30,000"}, 
                                                        {name:"John ZaZa", dateTime:"20 Jul 2023 - 14:00", type: "Credit Bard", amount:"-฿30,000"},
                                                        {name:"John ZaZa", dateTime:"20 Jul 2023 - 14:00", type: "Credit Bard", amount:"-฿30,000"}, 
                                                        {name:"John ZaZa", dateTime:"20 Jul 2023 - 14:00", type: "Credit Bard", amount:"-฿30,000"},
                                                        {name:"John ZaZa", dateTime:"20 Jul 2023 - 14:00", type: "Credit Bard", amount:"-฿30,000"}, 
                                                        {name:"John ZaZa", dateTime:"20 Jul 2023 - 14:00", type: "Credit Bard", amount:"-฿20,000"},
                                                        {name:"John ZaZa", dateTime:"20 Jul 2023 - 14:00", type: "Credit Bard", amount:"-฿30,000"},
                                                        {name:"John ZaZa", dateTime:"20 Jul 2023 - 14:00", type: "Credit Bard", amount:"-฿30,000"}, 
                                                        {name:"Nim ZaZa", dateTime:"20 Jul 2023 - 14:00", type: "Credit Bard", amount:"-฿30,000"},
                                                        {name:"Nim ZaZa", dateTime:"20 Jul 2023 - 14:00", type: "Credit Bard", amount:"-฿30,000"}, 
                                                        {name:"Nim ZaZa", dateTime:"20 Jul 2023 - 14:00", type: "Credit Bard", amount:"-฿20,000"}]);
    const [currentItems, setCurrentItems] = useState<Transaction[]>([{name:"Win ZaZa", dateTime:"20 Jul 2023 - 14:00", type: "Credit Bard", amount:"-฿30,000"}, 
                                                                    {name:"Win ZaZa", dateTime:"20 Jul 2023 - 14:00", type: "Credit Bard", amount:"-฿30,000"}])
    const fetchData = async () => {
        const data = await getUserPayment();
        console.log(data);
        setCurrentItems(items.slice(0,10));
        setPageCount(Math.ceil(items.length/10));
    }
    const handleChange = (p:any) => {
        
    }
    const handleSort = (e:any) => {
        setSortBy(e);
    }
    const handlePageChange = (p:any) => {
        const begin = (p - 1) * 10 + 1;
        const end = p == pageCount? items.length : p * 10;
        setCurrentItems([...items.slice(begin, end)]);
        setBegin(begin);
        setEnd(end);

    }
    useEffect(() => {
        handlePageChange(1);
    },[pageCount])
    useEffect(() => {
        fetchData()
    },[])
return (
    <div className="flex flex-col m-16 text-md">
        <div className="text-3xl font-bold">Payment History</div>
        <div className="flex flex-row mt-4 font-bold items-center">
            <div>Sort By </div>
            <Dropdown label="" onSelect={handleSort} options={options} selected={sortBy} 
            className="border-none bg-transparent w-auto h-auto text-ci-blue"/>
        </div>
        <div className="flex flex-col items-center justify-center mt-4">
            <div className="flex flex-row bg-ci-dark-blue w-4/5 h-16 rounded-t-2xl px-4 text-white ">
                    <div className="flex justify-center items-center w-1/5">Name</div>
                    <div className="w-1/5 flex justify-center items-center">Date - Time</div>
                    <div className="w-1/5 flex justify-center items-center">Payment Type</div>
                    <div className="w-1/5 flex justify-center items-center">Amount</div>
                    <div className="w-1/5 flex justify-center items-center"></div>
            </div>
            {currentItems.map((item)=>(
                <div className="flex flex-row bg-ci-light-gray w-4/5 h-20 px-4 py-4 border-ci-gray border-b border-x ">
                    <div className="flex justify-center items-center w-1/5">{item.name}</div>
                    <div className="w-1/5 flex justify-center items-center">{item.dateTime}</div>
                    <div className="w-1/5 flex justify-center items-center">{item.type}</div>
                    <div className="w-1/5 flex justify-center items-center">{item.amount}</div>
                    <div className="w-1/5 flex justify-center items-center">
                        <button className="text-white bg-ci-blue rounded-md px-8">Detail</button>
                    </div>
                </div>
            ))}
            <Pagination count={pageCount} color="primary" onChange={(e:any)=>{handlePageChange(e.target.textContent)}} className="mt-4"/>
            <div className="mt-4">{begin} - {end} of {items.length} lists</div>
        </div>
        </div>
    )
}

export default PaymentHistory;