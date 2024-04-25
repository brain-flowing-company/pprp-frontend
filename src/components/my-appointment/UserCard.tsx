import Image from "next/image";

export default function UserCard({
  role,
  profilePicSrc,
  name,
  tel,
}: {
  role: string;
  profilePicSrc: string;
  name: string;
  tel: string;
}) {
  return (
    <div className="flex flex-col">
      <div className="mb-5 text-3xl font-semibold">{role}</div>
      <div className="mx-auto flex w-full flex-row">
        <div className="relative my-auto flex aspect-square w-40 items-center justify-center overflow-hidden rounded-full">
          <Image
            src={profilePicSrc}
            alt="profile pic"
            draggable={false}
            fill
            objectFit="cover"
            // layout='responsive'
          />
        </div>
        <div className="mx-auto my-auto flex flex-col text-3xl font-medium">
          <div>{name}</div>
          <div>{tel}</div>
        </div>
      </div>
    </div>
  );
}
