"use client";
import Image from "next/image";
import userLogout from "@/services/auth/userLogout";
import { useRouter } from "next/navigation";
const editIcon = "/img/PropertyNavBar/tabler_pencil.svg";
const logoutIcon = "/img/PropertyNavBar/logout-icon.svg";
const paymentIcon = "/img/PropertyNavBar/payment-hist-icon.svg";

const AccountMenu = ({ profileUrl }: { profileUrl: string }) => {
  const accountIcon = profileUrl;
  const router = useRouter();
  const logout = async () => {
    userLogout();
    router.push("/login");
  };
  return (
    <div className="fixed right-0 top-0 z-40 mt-24 flex  h-80 w-80  flex-col overflow-hidden rounded-lg bg-white text-[20px] drop-shadow-[0_2px_1px_rgba(0,0,0,0.25)]">
      <div className="relative flex h-3/5 items-center justify-center bg-ci-gray">
      <div className="relative flex aspect-square w-32 items-center justify-center overflow-hidden rounded-full">
              <Image
                src={accountIcon}
                alt={"accountMenu"}
                draggable={false}
                fill
                style={{ objectFit: "cover"}}
                
              />
        </div>
      </div>
      <div
        className="flex h-1/5 cursor-pointer flex-row items-center px-2 hover:bg-ci-light-gray"
        onClick={() => router.push("/edit-profile")}
      >
        <div className="flex h-full w-8 items-center">
          <Image
            src={editIcon}
            alt={"edit"}
            width={30}
            height={30}
            draggable={false}
            style={{ height: `28px`, width: "auto" }}
          />
        </div>
        <div>Edit profile</div>
      </div>
      <div
        className="flex h-1/5 cursor-pointer flex-row items-center px-2 hover:bg-ci-light-gray"
        onClick={() => router.push("/payment-history")} // add path to payment history
      >
        <div className="flex h-full w-8 items-center">
          <Image
            src={paymentIcon}
            alt={"payment history"}
            width={30}
            height={30}
            draggable={false}
            style={{ height: `21px`, width: "auto" }}
          />
        </div>
        <div>Payment history</div>
      </div>
      <div
        className="flex h-1/5 cursor-pointer flex-row items-center px-2 hover:bg-ci-light-gray"
        onClick={logout}
      >
        <div className="flex h-full w-8 items-center">
          <Image
            src={logoutIcon}
            alt={"logout"}
            width={30}
            height={16}
            draggable={false}
            style={{ height: `19px`, width: "auto" }}
          />
        </div>
        <div>Log out</div>
      </div>
    </div>
  );
};
export default AccountMenu;