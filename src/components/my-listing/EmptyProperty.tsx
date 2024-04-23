import Image from "next/image";
import { useRouter } from "next/navigation";

const EmptyProperty = ({
  headerText,
  text1,
  text2,
  haveButton,
}: {
  headerText: string;
  text1: string;
  text2?: string;
  haveButton: boolean;
}) => {
  const router = useRouter();

  const handleCreate = () => {
    router.push("/create-property");
  };
  return (
    <div className="mt-8 flex h-1/2 flex-col items-center justify-around">
      <div className="large-text text-center font-bold">{headerText}</div>

      <Image
        src="/img/mylisting/home.svg"
        alt="home"
        width={100}
        height={100}
        className="m-10"
      />

      <div className="">
        <div className="medium-text m-1 text-center">{text1}</div>
        {text2 ? (
          <div className="medium-text m-1 text-center">{text2}</div>
        ) : null}
      </div>

      {haveButton ? (
        <button
          className="m-8 flex w-[230px] flex-row justify-around rounded-md bg-ci-blue p-2 md:w-[250px] md:p-3 lg:w-[270px] lg:p-4"
          onClick={handleCreate}
        >
          <Image
            src="/img/mylisting/plusCircle.svg"
            alt="add"
            width={30}
            height={30}
          />
          <div className="medium-text font-bold text-white ">
            Create Property
          </div>
        </button>
      ) : null}
    </div>
  );
};

export default EmptyProperty;
