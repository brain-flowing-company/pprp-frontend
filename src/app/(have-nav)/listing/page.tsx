"use client";
import PropertyData from "@/models/PropertyData";
import PropertyCards from "@/components/my-listing/PropertyCards";
import getUserProperty from "@/services/property/getUserProperty";
import Image from "next/image";

import { useEffect, useState } from "react";
import EmptyProperty from "@/components/my-listing/EmptyProperty";
import getCurrentUser from "@/services/users/getCurrentUser";
import UnverifiedOwner from "@/components/my-listing/UnverifiedOwner";

const myListingPage = () => {
  const [propData, setData] = useState<PropertyData[]>([]);
  const [total, setTotal] = useState<number>(0);
  const [sort, setSortby] = useState<string>("created_at:desc");
  const [onPage, setOnPage] = useState<number>(1);
  const [isVerified, setIsVerified] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getUserProperty(10, onPage, sort);
      if (data) {
        setData(data.properties);
        setTotal(data.total);
      }
      const user = await getCurrentUser();
      setIsVerified(user.is_verified);
    };
    fetchData();
  }, [sort, onPage]);

  const handleCreate = () => {
    window.location.href = "http://localhost:3000/create-property";
  };
  return (
    <>
      {isVerified ? (
        <>
          {total !== 0 && propData !== undefined ? (
            <>
              <div className="mt-8 flex h-full w-full flex-col items-center">
                <div className="flex flex-col md:w-[700px] lg:w-[1000px]">
                  <div className="large-text font-bold ">My Listing</div>
                  <PropertyCards
                    propData={propData}
                    totalProp={total}
                    isEditable={true}
                    additionaltext={"for rent or sales in my listing"}
                    showAmount={false}
                    setSort={setSortby}
                    setOnPage={setOnPage}
                  ></PropertyCards>
                </div>
              </div>
              <button
                className="fixed bottom-24 right-4 size-16 rounded-full bg-ci-blue  shadow-xl shadow-slate-400"
                onClick={handleCreate}
              >
                <div className=" size-15 relative p-5">
                  <Image
                    src="/img/mylisting/plusCircle.svg"
                    alt="add"
                    fill={true}
                  />
                </div>
              </button>
            </>
          ) : (
            <EmptyProperty
              headerText="Empty property listing"
              text1="Your listing is empty."
              text2="Let's create a property on your listing."
              haveButton={true}
            />
          )}
        </>
      ) : (
        <UnverifiedOwner></UnverifiedOwner>
      )}
    </>
  );
};

export default myListingPage;
