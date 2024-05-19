import { auth } from "@/auth";

export async function authenticate() {
  const session = await auth();
  if (!session || !session.user) {
    return null;
  }
  return session;
}
