import PropertyData from "@/models/PropertyData";
import Image from "next/image";
import { useState } from "react";
import UserReview from "./UserReview";

const ReviewCard = ({ property }: { property: PropertyData }) => {
  const [isShown, setShown] = useState<boolean>(false);
  const [showForm, setShowForm] = useState<boolean>(false);
  const [hovered, setHovered] = useState<number>(0);
  const [rating, setRating] = useState<number>(0);

  return (
    <>
      <div
        className={`flex flex-col ${isShown ? "h-3/4 items-center" : "h-32"} w-5/6 rounded-xl bg-ci-light-gray`}
      >
        <div className="flex w-full items-center rounded-xl bg-ci-light-gray px-16 py-8">
          <div className="pr-6 text-4xl font-semibold">
            Property&apos;s Reviews
          </div>
          <div className="pr-3">
            <Image
              src="/img/rating-review/star.svg"
              alt="star"
              width={32}
              height={32}
            />
          </div>
          {/* rating of property (will change later)*/}
          <div className="pr-3 text-xl">4.5/5</div>
          {/* rating of property (will change later)*/}
          <button
            onClick={() => {
              setShown(!isShown);
            }}
          >
            {isShown ? (
              <Image
                src="/img/rating-review/arrow.svg"
                alt="arrow"
                width={32}
                height={32}
                className="rotate-180"
              />
            ) : (
              <Image
                src="/img/rating-review/arrow.svg"
                alt="arrow"
                width={32}
                height={32}
              />
            )}
          </button>
          <div className="flex-grow"></div>
          <button
            className={`h-14 w-40 items-center rounded-lg bg-ci-blue px-6`}
            onClick={() => {
              setShowForm(true);
            }}
          >
            <div className="w-100% flex flex-row justify-between">
              <Image
                src="/img/rating-review/plus.svg"
                alt="plus"
                width={28}
                height={28}
              />
              <div className="text-xl font-bold text-white">Review</div>
            </div>
          </button>
        </div>
        <div className="flex flex-grow items-center justify-center px-16 pb-8">
          {isShown ? <UserReview /> : null}
        </div>

        {showForm && (
          <div
            className="fixed left-0 top-0 z-50 flex h-full w-full items-center justify-center bg-gray-500 bg-opacity-50"
            onClick={() => {
              setShowForm(false);
            }}
          >
            <form
              className="rounded-xl bg-white p-6"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="mb-6 text-2xl font-semibold">Your Review</div>
              <div>
                <textarea
                  className="mb-6 flex w-full rounded-xl border p-2 text-xl"
                  rows={3}
                  cols={40}
                  placeholder="Write your review here"
                ></textarea>
              </div>
              <div className="mb-6 flex w-1/2 flex-row justify-between">
                <button
                  type="button"
                  onMouseEnter={() => {
                    setHovered(1);
                  }}
                  onMouseLeave={() => {
                    setHovered(0);
                  }}
                  onClick={() => {
                    setRating(1);
                  }}
                >
                  {hovered >= 1 || rating >= 1 ? (
                    <Image
                      src="/img/rating-review/star.svg"
                      alt="star"
                      width={32}
                      height={32}
                    />
                  ) : (
                    <Image
                      src="/img/rating-review/empty-star.svg"
                      alt="empty-star"
                      width={32}
                      height={32}
                    />
                  )}
                </button>
                <button
                  type="button"
                  onMouseEnter={() => {
                    setHovered(2);
                  }}
                  onMouseLeave={() => {
                    setHovered(0);
                  }}
                  onClick={() => {
                    setRating(2);
                  }}
                >
                  {hovered >= 2 || rating >= 2 ? (
                    <Image
                      src="/img/rating-review/star.svg"
                      alt="star"
                      width={32}
                      height={32}
                    />
                  ) : (
                    <Image
                      src="/img/rating-review/empty-star.svg"
                      alt="empty-star"
                      width={32}
                      height={32}
                    />
                  )}
                </button>
                <button
                  type="button"
                  onMouseEnter={() => {
                    setHovered(3);
                  }}
                  onMouseLeave={() => {
                    setHovered(0);
                  }}
                  onClick={() => {
                    setRating(3);
                  }}
                >
                  {hovered >= 3 || rating >= 3 ? (
                    <Image
                      src="/img/rating-review/star.svg"
                      alt="star"
                      width={32}
                      height={32}
                    />
                  ) : (
                    <Image
                      src="/img/rating-review/empty-star.svg"
                      alt="empty-star"
                      width={32}
                      height={32}
                    />
                  )}
                </button>
                <button
                  type="button"
                  onMouseEnter={() => {
                    setHovered(4);
                  }}
                  onMouseLeave={() => {
                    setHovered(0);
                  }}
                  onClick={() => {
                    setRating(4);
                  }}
                >
                  {hovered >= 4 || rating >= 4 ? (
                    <Image
                      src="/img/rating-review/star.svg"
                      alt="star"
                      width={32}
                      height={32}
                    />
                  ) : (
                    <Image
                      src="/img/rating-review/empty-star.svg"
                      alt="empty-star"
                      width={32}
                      height={32}
                    />
                  )}
                </button>
                <button
                  type="button"
                  onMouseEnter={() => {
                    setHovered(5);
                  }}
                  onMouseLeave={() => {
                    setHovered(0);
                  }}
                  onClick={() => {
                    setRating(5);
                  }}
                >
                  {hovered === 5 || rating === 5 ? (
                    <Image
                      src="/img/rating-review/star.svg"
                      alt="star"
                      width={32}
                      height={32}
                    />
                  ) : (
                    <Image
                      src="/img/rating-review/empty-star.svg"
                      alt="empty-star"
                      width={32}
                      height={32}
                    />
                  )}
                </button>
              </div>
              <div className="flex justify-end">
                <button
                  type="submit"
                  className="items-center rounded-lg bg-ci-blue px-10 py-2 text-lg font-bold text-white"
                >
                  Review
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </>
  );
};

export default ReviewCard;
