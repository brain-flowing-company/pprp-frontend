'use client';
import { useState } from "react"

export default function ToggleSwitch({
    label1,
    label2,
    selectOn,
    setSelectOn
} : {
    label1: string,
    label2: string,
    selectOn: number,
    setSelectOn: React.Dispatch<React.SetStateAction<number>>
}) {

    const setButtonSide = (value: number) => {
        if (value % 2 === 0) {
            return ''
        } else {
            return 'translate-x-full'
        }
    };

    return (
        <div className="flex flex-row">
            <div className="medium-text font-bold pt-2">
                {label1}
            </div>
            <div 
            className="flex w-[72px] h-[39px] rounded-full border-solid border-black bg-ci-blue mx-4 items-center hover:cursor-pointer hover:shadow-blue-950 hover:shadow-inner"
            onClick={() => 
                setSelectOn(selectOn + 1)
            }
            >
                <div className={`absolute w-[32px] h-[32px] rounded-[50%] bg-ci-light-gray mx-1 ${setButtonSide(selectOn)}`}>
                </div>
            </div>
            <div className="medium-text font-bold pt-2">
                {label2}
            </div>
        </div>
    )
}