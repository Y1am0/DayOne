import { signOut } from "@/auth";

const LoginBtn = () => {
  return (
    <>
      <form
        action={async () => {
          "use server";
          await signOut("google");
        }}
      >
        <button type="submit" className="bg-white p-4 text-black rounded-lg">
          SignOut
        </button>
      </form>
    </>
  );
};

export default LoginBtn;
