import Image from "next/image";
import { useRouter } from "next/navigation";

const UnverifiedOwner = () => {
  const router = useRouter();

  return (
    <div className="mt-8 flex h-1/2 flex-col items-center justify-around">
      <div className="large-text text-center font-bold">
        Empty property listing
      </div>

      <Image
        src="/img/mylisting/home.svg"
        alt="home"
        width={100}
        height={100}
        className="m-10"
      />

      <div className="">
        <div className="medium-text m-1 text-center">
          Your listing is empty.
        </div>
        <div className="medium-text m-1 text-center">
          To create a property. Let's get you verified first!
        </div>
        <div className="medium-text m-1 text-center">
          Click below to edit profile, then select Owner Information.
        </div>
      </div>

      <button
        className="m-8 flex w-[180px] flex-row justify-around rounded-md bg-ci-blue p-2 md:w-[200px] md:p-3 lg:w-[220px] lg:p-4"
        onClick={() => router.push("/edit-profile")}
      >
        <div className="medium-text font-bold text-white ">Edit Profile</div>
      </button>
    </div>
  );
};

export default UnverifiedOwner;
