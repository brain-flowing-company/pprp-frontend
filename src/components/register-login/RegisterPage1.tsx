"use client";
import Image from "next/image";
import TextField from "./TextField";
import { FormEvent, useEffect, useRef, useState } from "react";
import PasswordField from "./PasswordField";
import Link from "next/link";
import { CircularProgress } from "@mui/material";
import sendVerification from "@/services/emails/sendVerificationEmail";

const normalIcon = "/img/login-register/NormalIcon.png";
const invalidIcon = "/img/login-register/InvalidIcon.png";
const validIcon = "/img/login-register/ValidIcon.png";
const compIcon = "/img/login-register/comp-icon.svg";
const googleIcon2 = "/img/login-register/google2.png";
export default function RegisterPage1({
  emailtmp,
  passtmp,
  conpasstmp,
  setEmail,
  setPassword,
  setConPass,
  changeRegState,
  isGoogle,
  user,
}: {
  emailtmp: string;
  passtmp: string;
  conpasstmp: string;
  setEmail: Function;
  setPassword: Function;
  setConPass: Function;
  changeRegState: Function;
  isGoogle: boolean;
  user: undefined;
}) {
  const [color1, changeColor1] = useState("#B3B3B3");
  const [passValid, changeValid] = useState(0);
  const [color2, changeColor2] = useState("#B3B3B3");
  const [passValid2, changeValid2] = useState(0);
  const [isValidColor, setValidColor] = useState("ci-gray");
  const [isInfoValid, setInfoValid] = useState(0);
  const [isEmailValid, setEmailValid] = useState(true);
  const [isLoading, setLoading] = useState(false);

  const submit = (event: { keyCode: number }) => {
    if (event.keyCode === 13) {
      console.log("enter");
      if (isInfoValid) {
        nextStage();
      }
    }
  };

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.select();
  }, []);

  const email = useRef("");
  const password = useRef("");
  const conPass = useRef("");

  async function initial(emailtmp: string, pass: string, conpass: string) {
    if (!isGoogle) {
      email.current = emailtmp;
      password.current = pass;
      conPass.current = conpass;

      isPassValid(password.current);
      isSame(conPass.current);
    } else {
      setInfoValid(1);
      setValidColor("ci-blue");
    }
  }

  function isPassValid(password: string) {
    if (password.length === 0) {
      changeColor1("#B3B3B3");
      changeValid(0);
      setValidColor("ci-gray");
      setInfoValid(0);
    } else {
      if (
        !/\d/.test(password) ||
        !/[a-zA-Z]/.test(password) ||
        password.length < 8
      ) {
        changeColor1("#D22F42");
        changeValid(1);
        setValidColor("ci-gray");
        setInfoValid(0);
      } else {
        changeColor1("#30AD53");
        changeValid(2);
      }
    }
  }

  function isSame(password2: string) {
    if (password2.length === 0) {
      changeColor2("#B3B3B3");
      changeValid2(0);
      setValidColor("ci-gray");
      setInfoValid(0);
    } else {
      if (password2 !== password.current) {
        changeColor2("#D22F42");
        changeValid2(1);
        setValidColor("ci-gray");
        setInfoValid(0);
      } else {
        changeColor2("#30AD53");
        changeValid2(2);
        if (email.current.length !== 0) {
          setInfoValid(1);
          setValidColor("ci-blue");
        }
      }
    }
  }

  function userReg1(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
  }

  async function nextStage() {
    setLoading(true);
    if (isInfoValid == 1) {
      const tmp = [email.current];
      const sendEmail = await sendVerification(tmp);
      console.log(sendEmail);
      if (sendEmail) {
        setEmailValid(true);
        changeRegState(1);
      } else {
        setEmailValid(false);
        setLoading(false);
      }
    }
  }

  return (
    <div
      onLoad={() => initial(emailtmp, passtmp, conpasstmp)}
      className="flex max-h-[830px] w-full max-w-[650px] flex-col items-center justify-around gap-y-4 rounded-[10px] bg-white py-20"
    >
      <form
        className="flex flex-col gap-y-4 text-left text-[20px]"
        onSubmit={userReg1}
      >
        {user && !isLoading ? (
          <div>
            <div className="flex flex-col items-center gap-y-4">
              <Image src={compIcon} alt="test" width={80} height={80}></Image>
              <div className="text-[40px] font-bold">Register</div>
            </div>
            {isGoogle ? (
              <div className="flex flex-col items-center justify-center">
                <Image
                  src={googleIcon2}
                  alt={"google"}
                  width={220}
                  height={220}
                />
                <p>You have register with Google account</p>
                <p className="text-[#3AAEEF]">{emailtmp}</p>
              </div>
            ) : (
              <div className="flex flex-col gap-[18px]">
                <div className="flex flex-col gap-y-2">
                  <TextField
                    label="Email"
                    placeholder="Enter your email here"
                    type="email"
                    required
                    onChange={(e) => {
                      email.current = e.target.value;
                      setEmail(email.current);
                    }}
                    value={emailtmp}
                    readOnly={isGoogle}
                    onKeyDown={(e) => submit(e)}
                    ref={inputRef}
                  />
                  {!isEmailValid && (
                    <div className="text-base text-ci-red">
                      This email is already in use
                    </div>
                  )}
                </div>
                <div>
                  <PasswordField
                    label="Password"
                    placeholder="Enter your password"
                    type="password"
                    onChange={(e) => {
                      password.current = e.target.value;
                      setPassword(password.current);
                      isPassValid(password.current);
                      isSame(conPass.current);
                    }}
                    style={{ borderColor: color1 }}
                    value={passtmp}
                    onKeyDown={(e) => submit(e)}
                  />

                  <div className="flex flex-row gap-[7px] pt-[10px] text-[16px]">
                    {passValid === 0 ? (
                      <Image
                        src={normalIcon}
                        width={16}
                        height={0}
                        alt={"state"}
                        style={{
                          objectFit: "contain",
                          alignContent: "flex-start",
                          display: "flex",
                          flexDirection: "row",
                        }}
                      />
                    ) : null}

                    {passValid === 1 ? (
                      <Image
                        src={invalidIcon}
                        width={16}
                        height={0}
                        alt={"state"}
                        style={{
                          objectFit: "contain",
                          alignContent: "flex-start",
                          display: "flex",
                          flexDirection: "row",
                        }}
                      />
                    ) : null}

                    {passValid === 2 ? (
                      <Image
                        src={validIcon}
                        width={16}
                        height={0}
                        alt={"state"}
                        style={{
                          objectFit: "contain",
                          alignContent: "flex-start",
                          display: "flex",
                          flexDirection: "row",
                        }}
                      />
                    ) : null}

                    <div style={{ color: color1 }}>
                      Password must be 8 or more characters and contain{" "}
                      <br></br>
                      at least 1 number
                    </div>
                  </div>
                </div>
                <PasswordField
                  label="Confirm Password"
                  placeholder="Re-enter your password"
                  type="password"
                  onChange={(e) => {
                    conPass.current = e.target.value;
                    setConPass(conPass.current);
                    isSame(conPass.current);
                  }}
                  style={{ borderColor: color2 }}
                  value={conpasstmp}
                  onKeyDown={(e) => submit(e)}
                />
                <div className="flex flex-row text-[16px]">
                  {passValid2 === 0 ? (
                    <div className="flex flex-row gap-[7px]">
                      <Image
                        src={normalIcon}
                        width={16}
                        height={0}
                        alt={"state"}
                        style={{
                          objectFit: "contain",
                          alignContent: "flex-start",
                          display: "flex",
                          flexDirection: "row",
                        }}
                      />
                      <div style={{ color: color2 }}>
                        Please confirm password
                      </div>
                    </div>
                  ) : null}
                  {passValid2 === 1 ? (
                    <div className="flex flex-row gap-[7px]">
                      <Image
                        src={invalidIcon}
                        width={16}
                        height={0}
                        alt={"state"}
                        style={{
                          objectFit: "contain",
                          alignContent: "flex-start",
                          display: "flex",
                          flexDirection: "row",
                        }}
                      />
                      <div style={{ color: color2 }}>Password do not match</div>
                    </div>
                  ) : null}

                  {passValid2 === 2 ? (
                    <div className="flex flex-row gap-[7px]">
                      <Image
                        src={validIcon}
                        width={16}
                        height={0}
                        alt={"state"}
                        style={{
                          objectFit: "contain",
                          alignContent: "flex-start",
                          display: "flex",
                          flexDirection: "row",
                        }}
                      />
                      <div style={{ color: color2 }}>Password match</div>
                    </div>
                  ) : null}
                </div>
              </div>
            )}
          </div>
        ) : null}

        {user && isGoogle && !isLoading && (
          <div>
            <button
              className={`h-[60px] w-full rounded-[10px] bg-${isValidColor} py-4 font-bold text-white`}
              onClick={() => changeRegState(2)}
            >
              Confirm
            </button>
          </div>
        )}
        {user && !isGoogle && !isLoading && (
          <div>
            <button
              data-testid='page1-confirm-button'
              className={`h-[60px] w-full rounded-[10px] bg-${isValidColor} font-bold text-white`}
              onClick={nextStage}
              disabled={isValidColor === 'ci-gray'}
            >
              Confirm
            </button>
          </div>
        )}
      </form>

      {user && !isGoogle && !isLoading ? (
        <div className="flex flex-row items-center justify-center text-[20px]">
          <div className="">Already have an account?</div>
          <Link href="/login">
            <div className="pl-[16px] text-ci-blue ">Login</div>
          </Link>
        </div>
      ) : null}

      {!user ? <CircularProgress className="absolute mt-[400px]" /> : null}

      {user && isLoading && (
        <div className="py-[400px]">
          <CircularProgress />
        </div>
      )}
    </div>
  );
}