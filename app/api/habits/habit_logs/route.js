import { getLogs, addLog, updateLog, deleteLog } from "@/lib/dbHabits";

export async function GET(request) {
  try {
    const habitId = new URL(request.url).searchParams.get("habitId");
    const logs = await getLogs(habitId);

    return new Response(JSON.stringify(logs), {
      headers: {
        "Content-Type": "application/json",
      },
      status: 200,
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: error.message === "Authentication required",
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
}

export async function POST(request) {
  try {
    const logData = await request.json();
    const newLog = await addLog({
      ...logData,
    });
    return new Response(JSON.stringify(newLog), {
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Failed to add log:", error);
    return new Response(
      JSON.stringify({ error: error.message || "Internal Server Error" }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}

export async function PUT(request) {
  try {
    const logData = await request.json();
    if (!logData.id) {
      throw new Error("Log ID is required for editing.");
    }
    const updatedLog = await updateLog(logData.id, logData);
    return new Response(JSON.stringify(updatedLog), {
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Failed to edit log:", error);
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
    const removeLog = await request.json();
    const remove = await deleteLog(removeLog);
    return new Response(JSON.stringify(remove), {
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Failed to delete log:", error);
    return new Response(
      JSON.stringify({ error: error.message || "Internal Server Error" }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
