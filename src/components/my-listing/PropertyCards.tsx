"use client";
import PropertyData from "../../models/PropertyData";
import PropertyCard from "./PropertyCard";
import Pagination from "@mui/material/Pagination";
import getCurrentUser from "@/services/users/getCurrentUser";
import {
  useState,
  useEffect,
  SetStateAction,
  Dispatch,
} from "react";

const PropertyCards = ({
  propData,
  totalProp,
  isEditable,
  additionaltext,
  showAmount,
  setSort,
  setOnPage,
}: {
  propData: PropertyData[];
  totalProp: number;
  isEditable: boolean;
  additionaltext: string;
  showAmount: boolean;
  setSort: Dispatch<SetStateAction<string>>;
  setOnPage: Dispatch<SetStateAction<number>>;
}) => {
  const [page, setPage] = useState<number>(1);
  const [text, setText] = useState<string>("Newest Listing First");
  const [changingSort, setChangingSort] = useState<boolean>(false);
  const [isLogin,setIsLogin] = useState<boolean>(false);

  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
    setOnPage(value)
  };
  useEffect(()=>{
    const fetchUser = async()=>{
      const user = await getCurrentUser()
      if(user){
        setIsLogin(true)
      }
    }
    fetchUser()
  },[])

  useEffect(() => {
    // Scroll to the top of the page
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [page]);

  return (
    <div className=" ">
      {showAmount ? (
        <div className="small-text ">
          {10 * (page - 1) + 1} -{" "}
          {totalProp < 10 * page ? totalProp : 10 * page} of {totalProp}{" "}
          properties {additionaltext}
        </div>
      ) : null}

      <div className="my-5 flex flex-row">
        {/* sort stuff here */}
        <div className="small-text font-semibold">Sort By</div>
        <div className="small-text">
          <div
            className="mx-3 font-semibold text-ci-blue"
            onClick={() => setChangingSort(!changingSort)}
          >
            {text}
          </div>
          {changingSort ? (
            <div className="absolute z-40 mt-2 flex flex-col items-center">
              <div className="flex flex-col justify-around rounded-2xl bg-white ">
                <div
                  className="h-full w-full rounded-t-2xl p-3 font-normal text-black hover:bg-[#ECECEC] "
                  onClick={() => {
                    setText("Newest Listing First");
                    setSort("created_at:desc");
                    setChangingSort(!changingSort);
                  }}
                >
                  Newest Listing First
                </div>
                <div
                  className="h-full w-full p-3 font-normal text-black hover:bg-[#ECECEC]"
                  onClick={() => {
                    setText("Price from lowest to highest");
                    setSort("renting_property.price_per_month:asc");
                    setChangingSort(!changingSort);
                  }}
                >
                  Price from lowest to highest
                </div>
                <div
                  className="h-full w-full rounded-b-2xl p-3 font-normal text-black hover:bg-[#ECECEC]"
                  onClick={() => {
                    setText("Price from highest to lowest");
                    setSort("renting_property.price_per_month:desc");
                    setChangingSort(!changingSort);
                  }}
                >
                  Price from highest to lowest
                </div>
              </div>
            </div>
          ) : null}
        </div>
      </div>

      <div className=" flex flex-col gap-10 sm:grid sm:grid-cols-2 ">
        {propData
          .map((prop: PropertyData) => (
            <PropertyCard
              propData={prop}
              editable={isEditable}
              canFav={isLogin}
              key={prop.property_id}
            ></PropertyCard>
          ))}
      </div>

      {totalProp > 10 ? (
        <div className="flex w-full  items-center justify-center pt-10">
          <Pagination
            count={Math.ceil(totalProp / 10)}
            size="large"
            onChange={handleChange}
            color="primary"
          ></Pagination>
        </div>
      ) : null}

      <div className="small-text flex h-[100px] items-center justify-center pb-20 pt-10">
        {/* num prop text here */}
        <div>
          {10 * (page - 1) + 1} -{" "}
          {totalProp < 10 * page ? totalProp : 10 * page} of {totalProp}{" "}
          properties {additionaltext}
        </div>
      </div>
    </div>
  );
};

export default PropertyCards;
