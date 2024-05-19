import Image from "next/image";
import { authenticate } from "@/utils/authenticate";
import { User } from "lucide-react";
import UserAvatar from "./userAvatar";

export default async function UserButton() {
  // Ternary operator to conditionally render images
  const userSession = await authenticate();

  return (
    <>
      <UserAvatar session={userSession} />
    </>
  );
}
