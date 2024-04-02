"use client";
import PropertyData from "@/models/PropertyData";
import Image from "next/image";
import PropertyFeatures from "./PropertyFeatures";
import PropertyMap from "../property-description/PropertyMap";
import { useEffect, useState } from "react";
import unfavoriteProperty from "@/services/property/unfavoriteProperty";
import favoriteProperty from "@/services/property/favoriteProperty";
import UserData from "@/models/UserData";
import RoomTourRes from "../property-description/RoomTourRes";
import getCurrentUser from "@/services/users/getCurrentUser";
import postAppointment from "@/services/appointments/postAppointment";

export default function PropertyDetail({
  property,
  user,
}: {
  property: PropertyData;
  user: UserData | undefined;
}) {
  const propertyAddress =
    (property?.address || "") +
    " " +
    (property?.alley || "") +
    " " +
    (property?.street || "") +
    " " +
    (property?.district || "") +
    " " +
    (property?.sub_district || "") +
    " " +
    (property?.province || "") +
    " " +
    (property?.postal_code || "");

  const [isFavorite, setIsFavorite] = useState<boolean>(property.is_favorite);

  async function favoriting() {
    if (isFavorite) {
      const res = await unfavoriteProperty(property.property_id);
    } else {
      const res = await favoriteProperty(property.property_id);
    }
  }

  const handlePost = async (selectedDay: string, note: string) => {
    if (user) {
      const myid = user.user_id;
      console.log(myid);
      const data = {
        propertyId: property?.property_id,
        ownerId: property?.owner_id,
        dwellerId: myid,
        apptDate: selectedDay,
        message: note,
      };
      await postAppointment(data);
    }
  };

  useEffect(() => {
    console.log(property.is_favorite);
  }, []);

  return (
    <div className="flex w-11/12 flex-col gap-y-10 text-base sm:text-xl">
      <div className="flex w-full flex-row items-center">
        <div className="flex w-1/2 flex-col gap-y-4 py-6">
          <div className="flex flex-row gap-x-10">
            <div className="text-2xl font-bold sm:text-4xl">
              {property.property_name}
            </div>
            {user && (
              <div
                onClick={(e) => {
                  e.preventDefault();
                  setIsFavorite(!isFavorite);
                  favoriting();
                }}
                className="min-h-8 min-w-8 cursor-pointer"
              >
                {isFavorite ? (
                  <Image
                    src="/img/home-page/heart-like.svg"
                    alt="heart"
                    width={32}
                    height={32}
                  />
                ) : (
                  <Image
                    src="/img/home-page/heart-outline.svg"
                    alt="heart"
                    width={32}
                    height={32}
                  />
                )}
              </div>
            )}
          </div>
          <div className="">{propertyAddress}</div>
          <div className="font-bold">
            ฿{property.renting_property.price_per_month}/month
          </div>
          <div className="flex">
            <div
              className={`rounded-lg px-4 py-3 ${property.renting_property.is_occupied ? "bg-ci-red" : "bg-ci-green"}`}
            >
              {property.renting_property.is_occupied ? (
                <div className="flex flex-row gap-x-4">
                  <Image
                    src="/img/property/cross.svg"
                    width={24}
                    height={24}
                    alt="test"
                  />
                  Not Available
                </div>
              ) : (
                <div className="flex flex-row gap-x-4">
                  <Image
                    src="/img/property/check.svg"
                    width={24}
                    height={24}
                    alt="test"
                  />
                  Available
                </div>
              )}
            </div>
          </div>
        </div>
        {user && <RoomTourRes property={property} handlePost={handlePost} />}
      </div>
      <PropertyFeatures property={property} />
      <PropertyMap name={property.property_name} />
    </div>
  );
}
