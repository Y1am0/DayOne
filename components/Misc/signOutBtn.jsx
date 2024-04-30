"use client";

import { signOut } from "next-auth/react";

const SignOutBtn = () => {
  return (
    <button
      className="bg-white p-4 text-black rounded-lg"
      onClick={() => signOut({ callbackUrl: "/" })}
    >
      Sign Out
    </button>
  );
};

export default SignOutBtn;
