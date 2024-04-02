import Image from "next/image";

const Sidebar = ({
  switchTo1,
  switchTo2,
  switchTo3,
  header,
  text1,
  text2,
  text3,
  iconSrc1,
  iconSrc2,
  iconSrc3,
}: {
  header: string;
  text1: string;
  text2: string;
  text3: string;
  iconSrc1?: string;
  iconSrc2?: string;
  iconSrc3?: string;
  switchTo1: () => void;
  switchTo2: () => void;
  switchTo3: () => void;
}) => {
  return (
    <div className=" invisible max-w-0 bg-ci-light-gray pt-4 text-[20px] md:visible md:min-w-72">
      <div className="flex w-full justify-center text-[40px] font-bold">
        {header}
      </div>
      <div
        className="flex h-14 w-full cursor-pointer flex-row space-x-2 hover:bg-ci-gray"
        onClick={switchTo1}
      >
        <div className="ml-4 flex items-center">
          {iconSrc1 ? <Image src={iconSrc1} alt={"first icon"} width={18} height={18} /> :null}
        </div>
        <div className="flex items-center">{text1}</div>
      </div>
      <div
        className="flex h-14 w-full cursor-pointer flex-row space-x-2 hover:bg-ci-gray"
        onClick={switchTo2}
      >
        <div className="ml-4 flex items-center">
          {iconSrc2 ? <Image src={iconSrc2} alt={"second icon"} width={18} height={18} /> :null}
        </div>
        <div className="flex items-center">{text2}</div>
      </div>
      <div
        className="flex h-14 w-full cursor-pointer flex-row space-x-2 hover:bg-ci-gray "
        onClick={switchTo3}
      >
        <div className="ml-4 flex items-center">
          {iconSrc3 ? <Image src={iconSrc3} alt={"third icon"} width={18} height={18} /> :null}
        </div>
        <div className="flex items-center">{text3}</div>
      </div>
    </div>
  );
};
export default Sidebar;
