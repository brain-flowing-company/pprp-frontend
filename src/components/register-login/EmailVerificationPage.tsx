"use client";

import authCallback from "@/services/auth/authCallback";
import sendVerification from "@/services/emails/sendVerificationEmail";
import { CircularProgress } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function EmailVerificationPage({
  email,
  finReg,
  changeRegState,
  isGoogle,
}: {
  email: string;
  changeRegState: Function;
  finReg: any;
  isGoogle: boolean;
}) {
  const [code, setCode] = useState<string>();
  const [isValid, setValid] = useState<boolean>(true);

  const code_forTesting = 'AbCd12'

  useEffect(() => {
    if (isGoogle) {
      changeRegState(2);
    }
  }, []);
  async function checkVerification() {
    if (!isGoogle) {
      // const checkCode = await authCallback(`code=SCK-${code}&email=${email}`);
      // // console.log(checkCode.session_type);
      // if (checkCode.session_type !== undefined) {
      //   changeRegState(2);
      // } else {
      //   setValid(false);
      // }

      // for testing
      if (code === code_forTesting) {
        changeRegState(2);
      } else {
        setValid(false);
      }
    }
  }
  async function sendEmail() {
    const tmp = [email];
    const sendEmail = await sendVerification(tmp);
    console.log(sendEmail);
  }

  return (
    <div>
      {true ? (
        <div className="flex h-full flex-col items-center justify-center gap-y-10 rounded-[10px] bg-white px-20 py-16">
          <div className="text-3xl font-bold">Please Verify Your Email</div>

          <div className="flex flex-col items-center gap-y-10">
            <div className="font-regular flex flex-col items-center justify-center text-center text-lg">
              <Image
                src={"/img/login-register/email-sent.svg"}
                width={150}
                height={150}
                alt="BlueValidIcon"
              />
              <div className="flex flex-col">
                <div className="font-bold">
                  We have sent the verification code to your email.
                </div>
                <div>Please verify your email in 5 minutes.</div>
              </div>
            </div>
          </div>

          <div className="font-regular flex w-full flex-col justify-between gap-y-4 text-xl">
            <input
              data-testid='verification-input'
              type="text"
              className="block h-[50px] w-full rounded-[10px] border border-[#B3B3B3] p-2 text-gray-700"
              placeholder="Enter your verification code"
              onChange={(e) => {
                setCode(e.target.value);
                console.log(code);
              }}
            ></input>
            <button
              onClick={() => {
                checkVerification();
              }}
              data-testid='verify-button'
              className="h-[60px] w-full rounded-[10px] bg-ci-blue font-bold text-white"
            >
              Verify
            </button>
            {!isValid && (
              <div data-testid='wrong-code' className="fixed left-[0] top-[0] z-40 flex h-[100vh] w-[100%] flex-col items-center justify-center bg-black bg-opacity-20">
                <div className="relative flex h-2/5 w-1/3 flex-col items-center justify-around rounded-2xl bg-white p-[32px]">
                  <div className="large-text font-bold">Error</div>
                  <div className="medium-text font-medium">Wrong verification code</div>
                  <div className="cursor-pointer text-ci-blue gap-y-6 text-center text-lg" onClick={() => {
                    sendEmail();
                    setValid(true);
                  }}>
                    Resend verification link
                  </div>
                </div>
              </div>
            )}
          </div>
          <div className="flex flex-col gap-y-6 text-center text-lg text-ci-blue">
            <div onClick={sendEmail} className="cursor-pointer">
              Resend verification link
            </div>
            <div
              onClick={() => {
                changeRegState(0);
              }}
              className="cursor-pointer"
            >
              Back
            </div>
          </div>
        </div>
      ) : (
        <div
          onLoad={() => console.log("test")}
          className="flex h-[713px] w-[1214px] flex-col items-center rounded-[10px] bg-white"
        >
          <CircularProgress className="relative mt-[400px]" />
        </div>
      )}
    </div>
  );
}
