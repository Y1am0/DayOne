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

export async function addLog(logData) {
  return await db.dailyLog.create({
    data: logData,
  });
}

export async function updateLog(habitId, logData) {
  return await db.dailyLog.update({
    where: { habitId: habitId },
    data: logData,
  });
}
