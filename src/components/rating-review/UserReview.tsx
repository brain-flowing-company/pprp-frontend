import { useState } from "react";
import Image from "next/image";

const UserReview = () => {
  const [isOwner, setIsOwner] = useState<boolean>(true);
  const [profileUrl, setProfileUrl] = useState<string>("");
  const [rating, setRating] = useState<number>(4);
  const [date, SetDate] = useState<string>("(21/3/2024)");

  return (
    <>
      <div className="flex h-3/4 w-full flex-col rounded-xl border bg-white p-8">
        <div className="flex w-full flex-row">
          <div className="mr-8">
            <Image
              src="/img/rating-review/profile-picture-example.svg"
              alt="profile-picture-example"
              width={48}
              height={48}
            />
          </div>
          <div className="font-regular mr-8 text-lg">UserMe</div>
          <div className="mr-4 flex flex-row">
            <div>
              {rating >= 1 ? (
                <Image
                  src="/img/rating-review/star.svg"
                  alt="star"
                  width={28}
                  height={28}
                />
              ) : (
                <Image
                  src="/img/rating-review/empty-star.svg"
                  alt="empty-star"
                  width={28}
                  height={28}
                />
              )}
            </div>
            <div>
              {rating >= 2 ? (
                <Image
                  src="/img/rating-review/star.svg"
                  alt="star"
                  width={28}
                  height={28}
                />
              ) : (
                <Image
                  src="/img/rating-review/empty-star.svg"
                  alt="empty-star"
                  width={28}
                  height={28}
                />
              )}
            </div>
            <div>
              {rating >= 3 ? (
                <Image
                  src="/img/rating-review/star.svg"
                  alt="star"
                  width={28}
                  height={28}
                />
              ) : (
                <Image
                  src="/img/rating-review/empty-star.svg"
                  alt="empty-star"
                  width={28}
                  height={28}
                />
              )}
            </div>
            <div>
              {rating >= 4 ? (
                <Image
                  src="/img/rating-review/star.svg"
                  alt="star"
                  width={28}
                  height={28}
                />
              ) : (
                <Image
                  src="/img/rating-review/empty-star.svg"
                  alt="empty-star"
                  width={28}
                  height={28}
                />
              )}
            </div>
            <div>
              {rating === 5 ? (
                <Image
                  src="/img/rating-review/star.svg"
                  alt="star"
                  width={28}
                  height={28}
                />
              ) : (
                <Image
                  src="/img/rating-review/empty-star.svg"
                  alt="empty-star"
                  width={28}
                  height={28}
                />
              )}
            </div>
          </div>
          <div className="font-regular mt-1 text-sm text-ci-dark-gray">
            {date}
          </div>
          <div className="flex-grow"></div>
          <div>
            <button>
              <Image
                src="/img/rating-review/edit.svg"
                alt="edit"
                width={28}
                height={28}
              />
            </button>
          </div>
        </div>
        <div className="font-regular ml-20 text-lg">
          Consider the size and layout of the home, including the number of
          bedrooms, bathrooms, and overall square footage. Look for a layout
          that suits your lifestyle and provides enough space for your
          family&apos;s needs.
        </div>
      </div>
    </>
  );
};

export default UserReview;
