import { useRef, useState } from "react";
import ToggleSwitch from "@/components/my-appointment/ToggleSwitch";
import Dropdown, { IDropdownOption } from "@/components/my-agreement/Dropdown";

interface CreatingProps {
    propertiesOption?: IDropdownOption[];
    
}

export default function CreatingAgreement({

} : {

}) {

    // const [deptAmount, setDeptAmount] = useState<number>();
    // const [paymentPerMonth, setPaymentPerMonth] = useState<number>();
    // const [paymentDuration, setPaymentDuration] = useState<number>();
    const inputRef = useRef<HTMLInputElement>(null);
    const deptRef = useRef(0);
    const ppmRef = useRef(0);
    const pDRef = useRef(0);

    const [selectTypeOn, setSelectTypeOn] = useState(0);
    const [showFilter, setShowFilter] = useState(false);
    const [isMakingAgreement, setMakingAgreement] = useState<boolean>(false);
    const [isCreateValid, setCreateValid] = useState<boolean>(false);


    return (
        <div>
        {isMakingAgreement ? (
          <div className="fixed left-[0] top-[0] z-40 flex h-[100vh] w-[100%] flex-col items-center justify-center bg-black bg-opacity-20">
            <div className="relative flex h-4/5 w-1/2 flex-col items-center justify-around rounded-2xl bg-white p-[32px]">
              <div className="large-text font-bold">Make Agreement</div>
              <div className="mx-auto flex w-full flex-row justify-center">
                <div className="mx-auto flex w-[40%] flex-col">
                  <div className="medium-text font-medium">
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
                  <div className="medium-text font-medium">Select dweller</div>
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
                <div className="ml-auto flex w-1/2 flex-col small-text font-medium">
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
                      className="my-auto h-1/3 w-full rounded-full bg-ci-blue small-text font-semibold text-white"
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
                      className="my-auto h-1/3 w-full rounded-full bg-ci-gray small-text font-semibold text-white"
                      disabled
                    >
                      Create
                    </button>
                  )}
                  <button
                    className="my-auto h-1/3 w-full rounded-full bg-ci-blue small-text font-semibold text-white"
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
    );
}