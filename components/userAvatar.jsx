import { auth } from "@/auth";
import Image from "next/image";

export default async function UserAvatar() {
  const session = await auth();

  // Ternary operator to conditionally render images
  return session?.user ? (
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
