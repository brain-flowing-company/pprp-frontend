import { useRouter } from "next/navigation";
import { useRef, useState } from "react";

export function DetailButton({
    agreementId
} : {
    agreementId: string
}) {

    const router = useRouter();

    return (
        <div className="h-[30%]">
            <button 
                className="w-full bg-ci-blue text-white rounded-lg font-medium text-2xl text-center py-3 hover:shadow-blue-950 hover:shadow-inner"
                onClick={(e) => {
                    e.stopPropagation();
                    router.push(`/my-agreement/${agreementId}`)
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
        return (status === 'Awaiting_deposit')? setPending(true): setPending(false);
    }
    
    const setButtonColor = (value: string) => {
        return (status === 'Awaiting_deposit')? 'bg-ci-blue': 'bg-ci-dark-gray';
    }

    const buttonColor = setButtonColor(status);
    const inputRef = useRef<HTMLInputElement>(null);
    const reason = useRef("");

    return (
        <div>
            <div className="h-[30%]">
                {status === 'Awaiting_deposit'? (
                    <button 
                    className={`w-full ${buttonColor} text-white rounded-lg font-medium text-2xl text-center py-3 hover:shadow-blue-950 hover:shadow-inner`}
                    onClick={() => checkStatus()}
                    >
                        Cancel
                    </button>
                ) : (
                    <button 
                    className={`w-full ${buttonColor} text-white rounded-lg font-medium text-2xl text-center py-3`}
                    onClick={() => checkStatus()}
                    disabled
                    >
                        Cancel
                    </button>
                )}
                </div>
            {isPending? (
                <div className="fixed left-[0] top-[0] z-40 flex h-[100vh] w-[100%] flex-col items-center justify-center bg-black bg-opacity-20">
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
                                >

                                </textarea>
                            </div>
                            <div className="grid grid-cols-2 gap-x-6 mx-auto text-2xl font-medium text-white">
                                {reasontmp.length === 0? (
                                    <button 
                                        className="w-[180px] h-[50px] bg-ci-dark-gray rounded-2xl" 
                                        disabled
                                    >
                                        Confirm
                                    </button>
                                ) : (
                                    <button 
                                        className="w-[180px] h-[50px] bg-ci-blue rounded-2xl hover:shadow-blue-950 hover:shadow-inner" 
                                        onClick={() => {
                                            setCancel(true);
                                            setPending(false);
                                        }}    
                                    >
                                        Confirm
                                    </button>
                                )}
                                <button 
                                    className="w-[180px] h-[50px] bg-ci-blue rounded-2xl hover:shadow-blue-950 hover:shadow-inner"
                                    onClick={() => setPending(false)}    
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