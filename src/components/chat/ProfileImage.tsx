import Image from "next/image";

interface ProfileImageProps {
  src: string;
}

export default function ProfileImage({ src }: ProfileImageProps) {
  return (
    <div className="relative flex aspect-square w-full items-center justify-center overflow-hidden rounded-full">
      <Image
        src={
          src && src.length > 0
            ? src
            : "/img/PropertyNavBar/ic_round-account-circle.svg"
        }
        className="bg-ci-gray"
        alt="profile image"
        draggable={false}
        fill
        style={{ objectFit: "cover" }}
      />
    </div>
  );
}
