import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import TextBox from "../my-appointment/TextField";

export function DetailButton({
    appointmentId
} : {
    appointmentId: string
}) {

    const router = useRouter();

    return (
        <div className="h-[30%]">
            <button 
                className="w-full bg-ci-blue text-white rounded-lg font-medium text-2xl text-center py-3 hover:shadow-blue-950 hover:shadow-inner"
                onClick={(e) => {
                    e.stopPropagation();
                    router.push(`/my-appointment/${appointmentId}`)
                }}
            >
                Detail
            </button>
        </div>
    )
}

export function CancelButton({
    status,
    reasontmp,
    setReason,
    setCancel
} : {
    status: string,
    reasontmp: string
    setReason: Function,
    setCancel: Function
}) {
    const [isPending, setPending] = useState<Boolean>(false);

    function checkStatus() {
        return (status === 'Pending')? setPending(true): setPending(false);
    }
    
    const setButtonColor = (value: string) => {
        return (status === 'Pending')? 'bg-ci-blue': 'bg-ci-dark-gray';
    }

    const buttonColor = setButtonColor(status);
    const inputRef = useRef<HTMLInputElement>(null);
    const reason = useRef("");

    return (
        <div>
            <div className="h-[30%]">
                {status === 'Pending'? (
                    <button 
                    className={`w-full ${buttonColor} text-white rounded-lg font-medium text-2xl text-center py-3 hover:shadow-blue-950 hover:shadow-inner`}
                    onClick={(e) => {
                        e.stopPropagation();
                        checkStatus();
                    }}
                    >
                        Cancel
                    </button>
                ) : (
                    <button 
                    className={`w-full ${buttonColor} text-white rounded-lg font-medium text-2xl text-center py-3`}
                    onClick={(e) => {
                        e.stopPropagation();
                        checkStatus();
                    }}
                    disabled
                    >
                        Cancel
                    </button>
                )}
                </div>
            {isPending? (
                <div 
                    className="fixed left-[0] top-[0] z-40 flex h-[100vh] w-[100%] flex-col items-center justify-center bg-black bg-opacity-20 hover:cursor-default"
                    onClick={(e) => {
                        e.stopPropagation();
                    }}
                >
                    <div className="relative flex flex-col rounded-2xl bg-white p-[32px] items-center w-1/3 h-1/2">
                        <div className="relative flex flex-col w-full h-full items-center justify-around">
                            <div className="items-center">
                                <div className="text-4xl font-bold">
                                    Are you sure?
                                </div>
                            </div>
                            <div className="text-xl font-bold">
                                Reason
                                {/* <TextBox
                                    onChange={(e) => {
                                        reason.current = e.target.value;
                                        setReason(reason.current);
                                    }}
                                    value={reasontmp}
                                    ref={inputRef}
                                ></TextBox> */}
                                <textarea 
                                    className="h-[220px] w-full rounded-[10px] mx-auto border border-black p-2 text-gray-700`"
                                    name="" id="" placeholder='Enter text' cols={40} rows={10}
                                    value={reasontmp} ref={inputRef} 
                                    onChange={(e) => {
                                        reason.current = e.target.value;
                                        setReason(reason.current);
                                    }}
                                    onClick={(e) => {
                                        e.stopPropagation();
                                    }}
                                >

                                </textarea>
                            </div>
                            <div className="grid grid-cols-2 gap-x-6 mx-auto text-2xl font-medium text-white">
                                {reasontmp.length === 0? (
                                    <button 
                                        className="w-[180px] h-[50px] bg-ci-dark-gray rounded-2xl" 
                                        disabled
                                        onClick={(e) => {
                                            e.stopPropagation();
                                        }}
                                    >
                                        Confirm
                                    </button>
                                ) : (
                                    <button 
                                        className="w-[180px] h-[50px] bg-ci-blue rounded-2xl hover:shadow-blue-950 hover:shadow-inner" 
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            setCancel(true);
                                            setPending(false);
                                        }}    
                                    >
                                        Confirm
                                    </button>
                                )}
                                <button 
                                    className="w-[180px] h-[50px] bg-ci-blue rounded-2xl hover:shadow-blue-950 hover:shadow-inner"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        setPending(false);
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
        
    )
}

export function ConfirmButton({
    status,
    setConfirm
} : {
    status: string,
    setConfirm: Function
}) {
    const [isConfirmed, setConfirmed] = useState<Boolean>(false);

    function checkStatus() {
        return (status === 'Pending')? setConfirmed(true): setConfirmed(false);
    }
    
    const setButtonColor = (value: string) => {
        return (status === 'Pending')? 'bg-ci-blue': 'bg-ci-dark-gray';
    }

    const buttonColor = setButtonColor(status);
    const inputRef = useRef<HTMLInputElement>(null);
    const reason = useRef("");

    return (
        <div>
            {status === 'Pending' ? (
                <div>
                <div className="h-[30%]">
                    <button 
                    className={`w-full ${buttonColor} text-white rounded-lg font-medium text-2xl text-center py-3 hover:shadow-blue-950 hover:shadow-inner`}
                    onClick={(e) => {
                        e.stopPropagation();
                        checkStatus();
                    }}
                    >
                        Confirm
                    </button>
                </div>
                {isConfirmed? (
                <div 
                    className="fixed left-[0] top-[0] z-40 flex h-[100vh] w-[100%] flex-col items-center justify-center bg-black bg-opacity-20 hover:cursor-default"
                    onClick={(e) => {
                        e.stopPropagation();
                    }}
                >
                    <div className="relative flex flex-col rounded-2xl bg-white p-[32px] items-center w-1/3 h-1/2">
                        <div className="relative flex flex-col w-full h-full items-center justify-around">
                            <div className="items-center">
                                <div className="text-4xl font-bold">
                                    Are you sure?
                                </div>
                            </div>
                
                            <div className="grid grid-cols-2 gap-x-6 mx-auto text-2xl font-medium text-white"> 
                                <button 
                                    className="w-[180px] h-[50px] bg-ci-blue rounded-2xl hover:shadow-blue-950 hover:shadow-inner" 
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        setConfirm(true);
                                        setConfirmed(false);
                                    }}    
                                >
                                    Confirm
                                </button>
                            
                                <button 
                                    className="w-[180px] h-[50px] bg-ci-blue rounded-2xl hover:shadow-blue-950 hover:shadow-inner"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        setConfirmed(false);
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
            ) : null}
            
        </div>
        
    )
}