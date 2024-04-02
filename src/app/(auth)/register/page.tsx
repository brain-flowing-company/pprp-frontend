"use client";

import { useEffect, useState } from "react";
import RegisterPage1 from "@/components/register-login/RegisterPage1";
import PersonalInformation from "@/components/register-login/PersonalInformation";
import userRegister from "@/services/users/userRegister";
import { useSearchParams } from "next/navigation";
import authCallback from "@/services/auth/authCallback";
import { useRouter } from "next/navigation";
import { CircularProgress } from "@mui/material";
import EmailVerificationPage from "@/components/register-login/EmailVerificationPage";
import sendVerification from "@/services/emails/sendVerificationEmail";
import AccountCreated from "@/components/register-login/AccountCreated";

export interface PersonalInfo {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  img: any;
  registered_type: string;
}

export default function RegisterPage() {
  const [registerStage, changeRegState] = useState(-1);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [conPass, setConPass] = useState("");

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [registeredType, setRegisteredType] = useState("EMAIL");

  const [img, setImg] = useState();

  const [user, setUser] = useState();
  const [isGoogle, setIsGoogle] = useState(false);

  const router = useRouter();

  const queryParams = useSearchParams();
  const queryString = Array.from(queryParams.entries())
    .map(([key, val]) => `${key}=${val}`)
    .join("&");

  useEffect(() => {
    async function getUser() {
      try {
        const data = await authCallback(queryString);

        if (data.registered_type === "GOOGLE")
          setRegisteredType(data.registered_type);

        if (
          data.registered_type === "GOOGLE" &&
          data.session_type === "REGISTER"
        ) {
          setUser(data);
          console.log(data);
          setEmail(data.email);
          setIsGoogle(true);
          changeRegState(0);
        } else if (data.session_type === "LOGIN") {
          router.push("/");
        } else if (
          data.registered_type === "EMAIL" &&
          registeredType === "GOOGLE"
        ) {
          setUser(Object);
        } else {
          setUser(Object);
          changeRegState(0);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
    getUser();
  }, []);

  const [finReg, setFinReg] = useState(null);
  const register = async () => {
    const userRegis = await userRegister({
      email: email,
      password: password,
      firstName: firstName,
      lastName: lastName,
      phoneNumber: phoneNumber,
      img: img,
      registered_type: registeredType,
    });
    setFinReg(userRegis);
  };

  function test() {
    console.log(email);
    console.log(password);
    console.log(conPass);
    console.log(firstName);
    console.log(lastName);
    console.log(phoneNumber);
    console.log(img);
  }

  function nextStage() {
    changeRegState((registerStage + 1) % 4);
  }

  return (
    <div className="flex h-screen flex-col items-center justify-center bg-[#B8B8B8]">
      {registerStage === -1 && (
        <div className="flex h-[830px] w-[650px] flex-col items-center justify-center rounded-[10px] bg-white">
          <CircularProgress />
        </div>
      )}

      {registerStage === 0 ? (
        <RegisterPage1
          emailtmp={email}
          passtmp={password}
          conpasstmp={conPass}
          setEmail={setEmail}
          setPassword={setPassword}
          setConPass={setConPass}
          changeRegState={nextStage}
          isGoogle={isGoogle}
          user={user}
        />
      ) : null}

      {registerStage === 1 ? (
        <div>
          <EmailVerificationPage
            email={email}
            changeRegState={changeRegState}
            finReg={finReg}
            isGoogle={isGoogle}
          />
        </div>
      ) : null}

      {registerStage === 2 ? (
        <div>
          <PersonalInformation
            firsttmp={firstName}
            lasttmp={lastName}
            numtemp={phoneNumber}
            setFirstName={setFirstName}
            setLastName={setLastName}
            setPhoneNumber={setPhoneNumber}
            changeRegState={changeRegState}
            setImg={setImg}
            register={register}
            isGoogle={isGoogle}
          />
        </div>
      ) : null}

      {registerStage === 3 ? (
        <div>
          <AccountCreated />
        </div>
      ) : null}
    </div>
  );
}
