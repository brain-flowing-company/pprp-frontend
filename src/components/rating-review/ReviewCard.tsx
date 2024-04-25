import PropertyData from "@/models/PropertyData";
import Image from "next/image";
import { useState, useEffect } from "react";
import UserReview from "./UserReview";
import Pagination from "@mui/material/Pagination";
import createReview from "@/services/rating-review/createReview";
import getPropertyReviews from "@/services/rating-review/getPropertyReviews";
type Review = {
  created_at: string;
  dweller_user_id: string;
  first_name: string;
  last_name: string;
  property_id: string;
  rating: 0;
  review: string;
  review_id: string;
};
const ReviewCard = ({ property }: { property: PropertyData }) => {
  const [isShown, setShown] = useState<boolean>(false);
  const [showForm, setShowForm] = useState<boolean>(false);
  const [hovered, setHovered] = useState<number>(0);
  const [rating, setRating] = useState<number>(0);
  const [review, setReview] = useState("");
  const [reviews, setReviews] = useState<Review[] | null>();

  const sortType = {
    datenew: "Newest Review First",
    asc: "Rating from lowest to highest",
    desc: "Rating from highest to lowest",
  };

  const [changingSort, setChangingSort] = useState<boolean>(false);
  const [text, setText] = useState<string>("Newest Review First");
  const [page, setPage] = useState<number>(1);

  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };
  const handleCreateReview = () => {
    console.log(rating, review, property.property_id);
    createReview(rating, review, property.property_id);
  };
  const handleReviewChange = (e: string) => {
    setReview(e);
  };
  const fetchPropertyReview = async () => {
    try {
      const data = await getPropertyReviews(property.property_id);
      setReviews(data);
    } catch {
      console.log("Failed to fetch reviews");
    }
  };
  useEffect(() => {
    fetchPropertyReview();
  }, []);
  const totalReviews = reviews?.length || 0;
  let sumOfRatings = 0;

  reviews?.forEach((review) => {
    sumOfRatings += review.rating;
  });

  const averageRating = totalReviews > 0 ? sumOfRatings / totalReviews : 0;
  const formattedAverageRating = Number.isInteger(averageRating)
    ? averageRating.toFixed(0)
    : averageRating.toFixed(1);
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
          <div className="pr-3 text-xl">{formattedAverageRating}/5</div>
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
        <div className="flex w-full flex-grow items-center justify-center px-16 pb-8">
          {isShown ? (
            <>
              <div className="flex w-full flex-col">
                <div className="mb-8 flex flex-row">
                  {/* <div className="text-lg font-semibold">Sort By</div>
                  <div className="flex flex-row text-lg">
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
                            className="h-full w-full rounded-t-2xl p-3 font-normal text-black hover:bg-ci-light-gray"
                            onClick={() => {
                              setText("Newest Review First");
                              setChangingSort(!changingSort);
                            }}
                          >
                            Newest Review First
                          </div>
                          <div
                            className="h-full w-full p-3 font-normal text-black hover:bg-ci-light-gray"
                            onClick={() => {
                              setText("Rating from lowest to highest");
                              setChangingSort(!changingSort);
                            }}
                          >
                            Rating from lowest to highest
                          </div>
                          <div
                            className="h-full w-full rounded-b-2xl p-3 font-normal text-black hover:bg-ci-light-gray"
                            onClick={() => {
                              setText("Rating from highest to lowest");
                              setChangingSort(!changingSort);
                            }}
                          >
                            Rating from highest to lowest
                          </div>
                        </div>
                      </div>
                    ) : null}
                  </div> */}
                </div>
                <div className="flex w-full flex-col gap-4">
                  {reviews?.map((review, idx) => (
                    <UserReview
                      key={idx}
                      dwellerId={review.dweller_user_id}
                      star={review.rating}
                      review={review.review}
                      date={review.created_at}
                      ratingId={review.review_id}
                    />
                  ))}
                </div>
                {reviews?.length || 0 > 10 ? (
                  <div className="flex w-full items-center justify-center pt-10">
                    <Pagination
                      count={Math.ceil((reviews?.length || 0) / 10)}
                      size="large"
                      onChange={handleChange}
                      color="primary"
                    ></Pagination>
                  </div>
                ) : null}

                <div className="small-text flex h-[100px] items-center justify-center">
                  {/* num prop text here */}
                  <div>
                    {reviews?.length ||
                    (0 % 10 === 1 && reviews?.length) ||
                    0 <= 10 * page
                      ? null
                      : 10 * (page - 1) + 1}{" "}
                    {reviews?.length ||
                    (0 % 10 === 1 && reviews?.length) ||
                    0 <= 10 * page
                      ? null
                      : "-"}{" "}
                    {reviews?.length || 0 < 10 * page
                      ? reviews?.length || 0
                      : 10 * page}{" "}
                    of {reviews?.length || 0} property&apos;s reviews from other
                    dwellers
                  </div>
                </div>
              </div>
            </>
          ) : null}
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
                  value={review}
                  onChange={(e) => {
                    handleReviewChange(e.target.value);
                  }}
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
                  onClick={handleCreateReview}
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
