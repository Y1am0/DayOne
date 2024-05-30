import { authenticate } from "@/utils/authenticate";
import UserAvatar from "./userAvatar";

export default async function UserButton() {
  const userSession = await authenticate();

  return (
    <>
      <UserAvatar session={userSession} />
    </>
  );
}
