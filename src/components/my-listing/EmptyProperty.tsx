import Image from "next/image";

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
    
  const handleCreate = () => {
    window.location.href = "http://localhost:3000/create-property";
  };
  return (
    <div className="mt-8 flex h-1/2 flex-col items-center justify-around">
      <div className="text-center large-text font-bold">{headerText}</div>

      <Image
        src="/img/mylisting/home.svg"
        alt="home"
        width={100}
        height={100}
        className="m-10"
      />

      <div className="">
        <div className="m-1 text-center medium-text">{text1}</div>
        {text2 ? <div className="m-1 text-center medium-text">{text2}</div> : null}
      </div>

      {haveButton ? (
        <button
          className="flex m-8 w-[230px] md:w-[250px] lg:w-[270px] flex-row justify-around rounded-md bg-ci-blue p-2 md:p-3 lg:p-4"
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
