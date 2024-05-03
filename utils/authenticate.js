import { auth } from "@/auth";

export async function authenticate() {
  const session = await auth();
  if (!session || !session.user) {
    throw new Error("Authentication required");
  }
  return session;
}
