import { useState, useEffect } from "react";
import TextBox from "../register-login/TextField";
export const PaymentConfirmation = ({
    setConfirm
    }:{
    setConfirm: Function
    }) => {
        const [password, setPassword] = useState("");
        useEffect(() => {
            console.log(password)
        },[password])
        const handlePassword = (e:string) => {
            setPassword(password + e.slice(-1))
        }
        return (
            <div className="fixed left-0 -top-4 z-50 flex h-full w-full items-center justify-center bg-black bg-opacity-20">
                <div className="flex flex-col justify-center items-center bg-white p-6 w-[600px] space-y-4 rounded-2xl">
                    <div className="font-bold text-xl">
                        Payment Confirmation
                    </div>
                    <TextBox label="Password" placeholder="Fill in your password" 
                        value={"•".repeat(password.length)} 
                        onChange={(e) => {handlePassword(e.target.value)}}/>
                    <div className="flex flex-row text-white w-full px-6 justify-between">
                        <button className="px-4 py-2 flex items-center justify-center bg-ci-blue w-2/5 rounded-md" 
                            onClick={() => {setConfirm(0)}}>
                            Cancel
                        </button>
                        <button className="px-4 py-2 flex items-center justify-center bg-ci-blue w-2/5 rounded-md">
                            Confirm
                        </button>
                    </div>


                </div>
            </div>
    )
};
