import { signIn } from "@/auth";

const LoginBtn = () => {
  return (
    <>
      <form
        action={async () => {
          "use server";
          await signIn("google");
        }}
      >
        <button type="submit" className="bg-white p-4 text-black rounded-lg">
          Signin with Google
        </button>
      </form>
    </>
  );
};

export default LoginBtn;
