import { addLog, updateLog } from "@/lib/dbHabits";

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
