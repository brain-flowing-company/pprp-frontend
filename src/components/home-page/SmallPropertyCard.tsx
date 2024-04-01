import Image from "next/image";
import { useEffect, useState } from "react";
import PropertyData from "../../models/PropertyData";
import unfavoriteProperty from "@/services/property/unfavoriteProperty";
import favoriteProperty from "@/services/property/favoriteProperty";
import getCurrentUser from "@/services/users/getCurrentUser";
import UserData from "@/models/UserData";
export default function SmallPropertyCard({
  property,
  user,
}: {
  property: PropertyData;
  user: UserData | undefined;
}) {
  const [isFavorite, setIsFavorite] = useState<boolean>(property.is_favorite);

  async function favoriting() {
    if (isFavorite) {
      const res = await unfavoriteProperty(property.property_id);
    } else {
      const res = await favoriteProperty(property.property_id);
    }
  }
  function formatPrice(num: number): string {
    if (num) {
      return Math.round(num)
        .toString()
        .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
    return "0";
  }

  return (
    <div>
      {property ? (
        <div className="w-[320px] select-none rounded-3xl bg-white xl:w-[400px]">
          <div className="relative h-60 w-full">
            <Image
              src={
                property.property_images[0]
                  ? property.property_images[0].image_url
                  : "/img/home-page/lumpini.png"
              }
              alt="prop-img"
              fill={true}
              className="rounded-t-3xl"
            />
          </div>
          <div className="flex flex-col gap-y-5 px-8 py-7">
            <div className="flex flex-row justify-between">
              <div className="text-lg font-semibold xl:text-2xl">
                {property.property_name}
              </div>
              {user && (
                <div
                  onClick={(e) => {
                    e.preventDefault();
                    setIsFavorite(!isFavorite);
                    favoriting();
                  }}
                  className="cursor-pointer"
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

            <span className="w-full border-t border-black"></span>

            <div className="flex flex-col gap-y-2 text-lg xl:text-xl">
              <div>
                {/* {property.street}, {property.province} */}
                {property.address}
              </div>
              <div className="font-semibold">
                {formatPrice(property.renting_property.price_per_month)}/month
              </div>
            </div>

            <span className="w-full border-t border-black"></span>

            <div className="justify:center flex flex-col  gap-x-6 px-2 xl:flex-row xl:justify-around">
              <div className="flex flex-row items-center gap-x-2 text-lg">
                <Image
                  src="/img/home-page/bed.svg"
                  alt="heart"
                  width={40}
                  height={40}
                />
                <div>{property.bedrooms} Bedrooms</div>
              </div>
              <div className="flex flex-row items-center gap-x-2 text-lg">
                <Image
                  src="/img/home-page/area.svg"
                  alt="heart"
                  width={40}
                  height={40}
                />
                <div>{property.floor_size} m²</div>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
