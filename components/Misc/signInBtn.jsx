"use client";

import { signIn } from "next-auth/react";

const SignInBtn = () => {
  return (
    <button
      className="bg-white p-4 text-black rounded-lg"
      onClick={() => signIn("google")}
    >
      Login to continue
    </button>
  );
};

export default SignInBtn;
