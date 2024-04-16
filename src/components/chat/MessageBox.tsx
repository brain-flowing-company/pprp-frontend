"use client";

import Image from "next/image";
import TextFieldSection from "./TextFieldSection";
import ProfileImage from "./ProfileImage";
import { useContext, useEffect, useRef, useState } from "react";
import MessageSection, { MessageSectionHandler } from "./MessageSection";
import { ChatContext } from "@/context/ChatContext";
import ToggleSwitch from "../my-appointment/ToggleSwitch";
import postAgreement from "@/services/agreement/postAgreement";

export default function MessageBox() {
  const ctx = useContext(ChatContext);
  const chat = ctx.chats[ctx.chatUserId];
  const messages = ctx.messages[ctx.chatUserId];

  const [isVisible, setVisible] = useState<boolean>(false);
  const [isFetching, setFetching] = useState<boolean>(false);

  const [autoScrolling, setAutoScrolling] = useState<boolean>(true);
  const contentRef = useRef<MessageSectionHandler>(null);

  const [isMakingAgreement, setMakingAgreement] = useState<boolean>(false);
  const [selectTypeOn, setSelectTypeOn] = useState(0);
  const [isCreateValid, setCreateValid] = useState<boolean>(false);
  const [deptAmount, setDeptAmount] = useState<number>();
  const [paymentPerMonth, setPaymentPerMonth] = useState<number>();
  const [paymentDuration, setPaymentDuration] = useState<number>();
  const inputRef = useRef<HTMLInputElement>(null);
  const deptRef = useRef(0);
  const ppmRef = useRef(0);
  const pDRef = useRef(0);

  useEffect(() => {
    if (isVisible && !isFetching) {
      setFetching(true);
      ctx.fetchMessages().then(() => setFetching(false));
    }
  }, [isVisible, ctx.chatUserId]);

  const sendMessage = (msg: string) => {
    ctx.sendMessage(msg);
  };

  const handlePost = async () => {
    const agreementType = selectTypeOn % 2 == 0 ? "RENTING" : "SELLING";
    const propertyId = 'uuid';
    const dwellerId = 'uuid';
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
  };

  return (
    <div className="relative flex h-[528px] w-96 flex-col rounded-t-xl bg-white pb-2 shadow-xl shadow-slate-500">
      <div className="mb-4 flex flex-row items-center justify-start gap-4 px-6 py-4 shadow-lg shadow-slate-300">
        <div className="flex size-12 shrink-0 items-center justify-center overflow-hidden rounded-full">
          <ProfileImage src={chat.profile_image_url} />
        </div>
        <div className="w-full truncate text-xl font-bold">{`${chat.first_name} ${chat.last_name}`}</div>
        <div className="flex shrink-0 flex-row gap-x-4 text-lg">
          <button className="rounded-md hover:bg-slate-300">
            <Image
              src="/img/chat/agreement.svg"
              width={24}
              height={24}
              alt="agreement"
              onClick={() => {
                setMakingAgreement(true);
              }}
            />
          </button>
          <button
            className="rounded-md hover:bg-slate-300"
            onClick={() => {
              ctx.closeChat();
              ctx.setChat(false);
            }}
          >
            <Image
              src="/img/chat/close-icon.svg"
              width={24}
              height={24}
              alt="close"
            />
          </button>
        </div>
      </div>
      <MessageSection
        messages={messages}
        setVisible={setVisible}
        autoScrolling={autoScrolling}
        setAutoScrolling={setAutoScrolling}
        ref={contentRef}
      />
      <TextFieldSection sendMessage={sendMessage} />
      {!autoScrolling && (
        <div className="absolute bottom-20 flex w-full justify-center">
          <button
            className="aspect-square w-10 cursor-pointer rounded-full bg-ci-light-gray/40 text-ci-dark-gray"
            onClick={() => contentRef.current?.scrollToBottom(false)}
          >
            <span className="flex size-full select-none items-center justify-center">
              v
            </span>
          </button>
        </div>
      )}

      {isMakingAgreement ? (
        <div className="fixed left-[0] top-[0] z-40 flex h-[100vh] w-[100%] flex-col items-center justify-center bg-black bg-opacity-20">
            <div className="relative flex h-4/5 w-1/2 flex-col items-center justify-around rounded-2xl bg-white p-[32px]">
              <div className="large-text font-bold">Make Agreement</div>
              <div className="mx-auto flex w-full flex-row justify-center">
                <div className="mx-auto flex w-[40%] flex-col">
                  <div className="medium-text font-medium">
                    Select your property
                  </div>
                  <div className='w-full small-text font-medium text-ci-black h-[60px] border-2 border-ci-dark-gray rounded-lg drop-shadow-input pl-3 transition relative flex items-center'>
                    abc
                  </div>
                </div>
                <div className="mx-auto flex w-[40%] flex-col">
                  <div className="medium-text font-medium">Select dweller</div>
                  <div className='w-full small-text font-medium text-ci-black h-[60px] border-2 border-ci-dark-gray rounded-lg drop-shadow-input pl-3 transition relative flex items-center'>
                    abc
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
              {/* <div className="flex h-1/3 w-full flex-row">
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
              </div> */}
            </div>
          </div>
        ) : null}
    </div>
  );
}
