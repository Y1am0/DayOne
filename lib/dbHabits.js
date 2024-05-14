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

async function revalidateLogs(habitId) {
  const logs = await getLogs(habitId);

  let counter = 0;
  let previousLogDate = null;

  for (let i = 0; i < logs.length; i++) {
    const log = logs[i];
    const currentDate = new Date(log.date);

    if (previousLogDate && diffInDays(currentDate, previousLogDate) > 1) {
      counter = 0;
    }

    if (log.status === "COMPLETE") {
      counter++;
    }

    await db.dailyLog.update({
      where: {
        id: log.id,
      },
      data: {
        consecutiveDays: counter,
      },
    });

    console.log(previousLogDate);
    previousLogDate = currentDate;
  }
}

function diffInDays(date1, date2) {
  const diffTime = Math.abs(date2 - date1);
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
}

export async function addLog(logData) {
  const newLog = await db.dailyLog.create({
    data: logData,
  });

  await revalidateLogs(newLog.habitId);
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
