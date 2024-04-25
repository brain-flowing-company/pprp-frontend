import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import getUserById from "@/services/users/getUserById";
import ProfileImage from "../chat/ProfileImage";
import { formatDate } from "@/app/(have-nav)/payment-history/page";
import getCurrentUser from "@/services/users/getCurrentUser";
import PropertyData from "@/models/PropertyData";
import editReview from "@/services/rating-review/editReview";
import deleteReview from "@/services/rating-review/deleteReview";

type User = {
  first_name: string;
  last_name: string;
  profile_image_url: string;
};
const UserReview = ({
  dwellerId,
  star,
  review,
  date,
  ratingId,
}: {
  dwellerId: string;
  star: number;
  review: string;
  date: string;
  ratingId: string;
}) => {
  const [isOwner, setIsOwner] = useState<boolean>(false);
  const [user, setUser] = useState<User | null>();
  const [rating, setRating] = useState<number>(star);
  const [showEdit, setShowEdit] = useState<boolean>(false);
  const [mod, setMod] = useState<string>("");
  const [hovered, setHovered] = useState<number>(0);
  const [newReview, setNewReview] = useState(review);

  const handleReviewChange = (e: string) => {
    setNewReview(e);
  };

  const handleEditReview = () => {
    editReview(rating, newReview, ratingId);
  };

  const fetchUser = async () => {
    try {
      const data = await getUserById(dwellerId);
      const currentUser = await getCurrentUser();
      setIsOwner(currentUser.user_id === dwellerId);
      setUser(data);
    } catch {
      console.log("Failed to fetch user.");
    }
  };
  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <>
      <div className="flex h-3/4 w-full flex-col rounded-xl border bg-white p-8">
        <div className="flex w-full flex-row items-center">
          <div className="mr-4 h-16 w-16">
            <ProfileImage
              src={
                user?.profile_image_url ||
                "/img/rating-review/profile-picture-example.svg"
              }
            />
          </div>
          <div className="font-regular mr-8 text-lg">
            {user?.first_name} {user?.last_name}
          </div>
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
            {formatDate(date)}
          </div>
          <div className="flex-grow"></div>
          {isOwner ? (
            <div>
              <button
                onClick={() => {
                  setShowEdit(!showEdit);
                }}
              >
                <Image
                  src="/img/rating-review/edit.svg"
                  alt="edit"
                  width={28}
                  height={28}
                />
              </button>
              {showEdit ? (
                <div className="absolute z-40 mt-2 flex flex-col items-center">
                  <div className="flex flex-col justify-around rounded-2xl bg-white ">
                    <div
                      className="h-full w-full rounded-t-2xl p-3 font-normal text-black hover:bg-ci-light-gray"
                      onClick={() => {
                        setMod("edit");
                        setShowEdit(false);
                      }}
                    >
                      Edit
                    </div>
                    <div
                      className="h-full w-full p-3 font-normal text-black hover:bg-ci-light-gray"
                      onClick={() => {
                        setMod("delete");
                        setShowEdit(false);
                      }}
                    >
                      Delete
                    </div>
                  </div>
                </div>
              ) : null}
            </div>
          ) : null}
        </div>
        <div className="font-regular ml-20 mt-4 text-lg">{review}</div>
        {mod === "edit" && (
          <div
            className="fixed left-0 top-0 z-50 flex h-full w-full items-center justify-center bg-gray-500 bg-opacity-50"
            onClick={() => {
              setShowEdit(false);
              setMod("");
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
                  value={newReview}
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
                  onClick={handleEditReview}
                >
                  Review
                </button>
              </div>
            </form>
          </div>
        )}
        {mod === "delete" && (
          <div
            className="fixed left-0 top-0 z-50 flex h-full w-full items-center justify-center bg-gray-500 bg-opacity-50"
            onClick={() => {
              setShowEdit(false);
              setMod("");
            }}
          >
            <form
              className="rounded-xl bg-white p-6"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex flex-col items-center p-8">
                <div className="mb-6 text-2xl font-semibold">
                  Delete a Review
                </div>
                <div className="mb-6 text-lg font-medium">
                  Are you sure you want to delete this review ?
                </div>
                <div className="flex w-full flex-row justify-between gap-8 px-8 text-xl font-bold text-white">
                  <button
                    className="flex w-2/3 justify-center rounded-xl bg-ci-dark-gray p-4"
                    type="button"
                    onClick={(e) => {
                      setShowEdit(false);
                      setMod("");
                    }}
                  >
                    Cancel
                  </button>
                  <button
                    className="flex w-2/3 justify-center rounded-xl bg-ci-red p-4"
                    type="submit"
                    onClick={() => {
                      deleteReview(ratingId);
                    }}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </form>
          </div>
        )}
      </div>
    </>
  );
};

export default UserReview;
