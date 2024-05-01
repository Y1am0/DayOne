import { auth } from "@/auth";
import LoginBtn from "./ui/loginBtn";

const Habits = async () => {
  let categories = [];

  const session = await auth();

  return (
    <div className="grid place-content-center flex-col m-auto">
      {categories.length > 0 && "content here"}
      <div className="flex flex-col gap-4">
        <button className="bg-white p-4 text-black rounded-lg">
          New Category
        </button>
        {session ? "" : <LoginBtn />}
      </div>
    </div>
  );
};
export default Habits;
