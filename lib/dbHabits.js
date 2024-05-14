import { db } from "@/lib/db";
export async function getHabits(userId) {
  return await db.habit.findMany({
    where: { userId },
    include: {
      dailyLogs: true,
    },
  });
}

export async function addHabit(habitData) {
  return await db.habit.create({
    data: habitData,
  });
}

export async function deleteHabit(habitId) {
  return await db.habit.delete({
    where: { id: habitId },
  });
}

export async function getLogs(habitId) {
  return await db.dailyLog.findMany({
    where: { habitId: habitId },
    orderBy: { date: "asc" },
  });
}

export async function getClosestDateLog(habitId, startDate) {
  const closestDateLog = await db.dailyLog.findFirst({
    where: { habitId: habitId, date: { lt: startDate }, status: "COMPLETE" },
    orderBy: { date: "desc" }, // Find the closest date before the start date
  });
  console.log(closestDateLog, "closestDateLog");
  return closestDateLog;
}

export async function getRelevantLogs(habitId, startDate) {
  // First, find the closest date before the start date
  const closestDateLog = await getClosestDateLog(habitId, startDate);
  console.log(closestDateLog, "closestDateLog");

  if (!closestDateLog) {
    return [];
  }

  const closestDate = closestDateLog.date;
  console.log(closestDate, "closestDate");

  // Fetch all logs from the closest date up to the latest date
  return await db.dailyLog.findMany({
    where: {
      habitId: habitId,
      date: { gte: closestDate }, // All logs from the closest date to the latest
      status: "COMPLETE",
    },
    orderBy: { date: "asc" },
  });
}

function daysBetweenDates(date1, date2) {
  const DAY_IN_MS = 86400000; // 24 * 60 * 60 * 1000
  return Math.round((date2 - date1) / DAY_IN_MS);
}

async function revalidateLogs(habitId, startDate) {
  const logs = await getRelevantLogs(habitId, startDate);

  let counter = 0;

  let previousLogDate = null;
  const updates = [];

  console.log(previousLogDate);

  for (const log of logs) {
    console.log("arxisa");
    log.consecutiveDays ? (counter = log.consecutiveDays) : counter;
    console.log(counter, "counter");

    const currentDate = new Date(log.date);
    console.log((currentDate, "currentDate"));

    if (previousLogDate) {
      console.log("mpikelathos1");
      let daysDiff = daysBetweenDates(previousLogDate, currentDate);
      if (daysDiff > 1) {
        counter = 0;
      }
    }

    if (log.status === "COMPLETE") {
      counter++;
      console.log("mpikeswsta");
    } else if (log.status !== "PLANNED_SKIP") {
      console.log("mpikelathos2");
      counter = 0;
    }

    updates.push(
      db.dailyLog.update({
        where: { id: log.id },
        data: { consecutiveDays: counter },
      })
    );

    previousLogDate = currentDate;
    console.log(previousLogDate, "loop");
  }

  await db.$transaction(updates);
}

export async function addLog(logData) {
  const newLog = await db.dailyLog.create({
    data: logData,
  });

  await revalidateLogs(newLog.habitId, newLog.date);
  return newLog;
}

export async function updateLog(logId, logData) {
  const updatedLog = await db.dailyLog.update({
    where: { id: logId },
    data: logData,
  });

  await revalidateLogs(updatedLog.habitId);
  return updatedLog;
}

export async function deleteLog(logId, logData) {
  const deletedLog = await db.dailyLog.delete({
    where: { id: logId },
  });

  await revalidateLogs(deletedLog.habitId);
}
