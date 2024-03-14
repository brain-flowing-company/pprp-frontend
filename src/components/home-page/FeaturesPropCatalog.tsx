<<<<<<< HEAD
=======
<<<<<<< HEAD
import { useEffect, useState } from "react";
import SmallPropertyCard from "./SmallPropertyCard";
import Image from "next/image";

export default function FeaturesPropCatalog() {
  const [start, setStart] = useState<number>(0);
  const [stop, setStop] = useState<number>(3);
  const property = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];

  useEffect(() => {
    setStop(calculateStopValue());
    function handleResize() {
      const newStop = calculateStopValue();
      setStop(newStop);
    }

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  function calculateStopValue() {
    if (window.innerWidth > 1536) {
      return 3;
    } else if (window.innerWidth > 1024) {
      return 2;
    } else {
      return 1;
    }
  }

  function goNext() {
    if (stop < 10) {
      setStart(start + 1);
      setStop(stop + 1);
    }
  }

  function goBack() {
    if (start > 0) {
      setStart(start - 1);
      setStop(stop - 1);
    }
  }

  return (
    <div className="flex w-full flex-col gap-y-10 bg-ci-gray px-32 py-24">
      <div className="flex flex-col gap-y-5">
        <div className="text-4xl font-semibold text-ci-blue">
          Featured Listings
        </div>
        <div className="text-2xl">
          Here are some featured listings deals sourced by our experienced real
          estate experts
        </div>
      </div>
      <div className="flex flex-row justify-between gap-x-4">
        {start > 0 ? (
          <Image
            src="/img/home-page/back.svg"
            alt="next"
            width={60}
            height={60}
            onClick={goBack}
            className="cursor-pointer"
          />
        ) : (
          <div className="w-15 h-15 pr-[60px]"></div>
        )}

        {property.slice(start, stop).map((item) => (
          <SmallPropertyCard id={item} key={item} />
        ))}

        {stop < 10 ? (
          <Image
            src="/img/home-page/next.svg"
            alt="next"
            width={60}
            height={60}
            onClick={goNext}
            className="cursor-pointer"
          />
        ) : (
          <div className="w-15 h-15 pl-[60px]"></div>
        )}
      </div>
    </div>
  );
}
||||||| b074513
=======
>>>>>>> 9b9102f7735205ca6346bc5a8ecf19f315514ff4
"use client";
import { useEffect, useState } from "react";
import SmallPropertyCard from "./SmallPropertyCard";
import Image from "next/image";
import getTopProperty from "@/services/getTopProperty";
import PropertyData from "../models/PropertyData";

export default function FeaturesPropCatalog() {
  const [start, setStart] = useState<number>(0);
  const [windowSize, setWindowSize] = useState<number>(3);
  const [propertiesId, setPropsId] = useState<PropertyData[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await getTopProperty();
      const property2: PropertyData[] = [];
      if (res) {
        res.forEach((item: PropertyData) => {
          property2.push(item);
        });
        setPropsId(property2);
      }
      console.log(property2.length);
    };
    fetchData();
  }, []);

  useEffect(() => {
    function handleResize() {
      const newStop = calculateStopValue();
      setWindowSize(newStop);
    }

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  function calculateStopValue() {
    if (window.innerWidth > 1536) {
      return 3;
    } else if (window.innerWidth > 1024) {
      return 2;
    } else {
      return 1;
    }
  }

  function goNext() {
    if (start + windowSize < 10) {
      setStart(start + 1);
    }
  }

  function goBack() {
    if (start > 0) {
      setStart(start - 1);
    }
  }

  return (
    <div className="flex w-full flex-col gap-y-10 bg-ci-gray px-16 py-24 sm:px-32">
      <div className="flex flex-col gap-y-5">
        <div className="text-3xl font-semibold text-ci-blue sm:text-4xl">
          Featured Listings
        </div>
        <div className="text-xl sm:text-2xl">
          Here are some featured listings deals sourced by our experienced real
          estate experts
        </div>
      </div>

      {propertiesId ? (
        <div className="flex flex-row justify-between gap-x-4">
          {start > 0 ? (
            <Image
              src="/img/home-page/back.svg"
              alt="next"
              width={60}
              height={60}
              onClick={goBack}
              className="cursor-pointer"
            />
          ) : (
            <div className="w-15 h-15 pr-[60px]"></div>
          )}

          {propertiesId
            .slice(start, start + windowSize)
            .map((item: PropertyData) => (
              <SmallPropertyCard property={item} key={item.property_id} />
            ))}

          {start + windowSize < 10 ? (
            <Image
              src="/img/home-page/next.svg"
              alt="next"
              width={60}
              height={60}
              onClick={goNext}
              className="cursor-pointer"
            />
          ) : (
            <div className="w-15 h-15 pl-[60px]"></div>
          )}
        </div>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
}
>>>>>>> df15c90262049e0e4c2b76616c35e28d9f934767
