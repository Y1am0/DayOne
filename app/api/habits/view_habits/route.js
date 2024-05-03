import { getHabits, addHabit, deleteHabit } from "/lib/dbhabits";
import { authenticate } from "@/utils/authenticate";

export async function GET(request) {
  try {
    const userSession = await authenticate(request);
    const habits = await getHabits(userSession.user.id);

    return new Response(JSON.stringify(habits), {
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: error.message === "Authentication required" ? 401 : 500,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
}

export async function POST(request) {
  try {
    const userSession = await authenticate(request);
    if (!userSession.user.id) {
      throw new Error(`user id not found ${[userSession]}`);
    }
    const habitData = await request.json();
    const newHabit = await addHabit({
      userId: userSession.user.id,
      ...habitData,
    });
    return new Response(JSON.stringify(newHabit), {
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Failed to add habit:", error);
    return new Response(
      JSON.stringify({ error: error.message || "Internal Server Error" }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}

export async function DELETE(request) {
  try {
    const removeHabit = await request.json();
    const remove = await deleteHabit(removeHabit.id);
    return new Response(JSON.stringify(remove), {
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Failed to delete habit:", error);
    return new Response(
      JSON.stringify({ error: error.message || "Internal Server Error" }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
