import { authOptions } from "@/app/utils/auth";
import { getServerSession } from "next-auth";
import SignInBtn from "./Misc/signInBtn";
import SignOutBtn from "./Misc/signOutBtn";

const Habits = async () => {
  const session = await getServerSession(authOptions);

  let categories = [];

  return (
    <div className="h-full flex place-content-center flex-col m-auto">
      {categories.length > 0 && "content here"}
      {session ? (
        <div className="flex flex-col gap-4">
          <button className="bg-white p-4 text-black rounded-lg">
            New Category
          </button>
          <SignOutBtn />
        </div>
      ) : (
        <SignInBtn />
      )}
    </div>
  );
};
export default Habits;
