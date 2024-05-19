import Image from "next/image";

export default function UserAvatar({ session }) {
  // Ternary operator to conditionally render images

  return session ? (
    <Image
      className="rounded-full border dark:border-white border-black"
      width={24}
      height={24}
      src={session.user.image}
      alt="profile image"
    />
  ) : (
    <Image src={"/user.svg"} width={24} height={24} alt="users icon" />
  );
}
