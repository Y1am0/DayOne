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

export async function deleteHabitWithName(habitName, userId) {
  // Find the habit by title and userId
  const habit = await db.habit.findFirst({
    where: {
      title: habitName,
      userId: userId
    },
  });

  if (!habit) {
    throw new Error(`Habit with title "${habitName}" not found.`);
  }

  // Delete the habit using its id
  return await db.habit.delete({
    where: { id: habit.id },
  });
}
export async function getHabitByNameAndUserId(habitName, userId) {
  console.log(`Fetching habit with name: ${habitName} and userId: ${userId}`);
  const habit = await db.habit.findFirst({
    where: {
      title: habitName,
      userId: userId,
    },
    include: {
      dailyLogs: true,
    },
  });
  console.log(`Fetched habit: ${JSON.stringify(habit)}`);
  return habit;
}

export async function getHabitProgress(habitId) {
  return await getLogs(habitId);
}

export async function getLogs(habitId) {
  return await db.dailyLog.findMany({
    where: { habitId: habitId },
    orderBy: { date: "asc" },
  });
}

export async function getUserHabitLogs(userId) {
  return await db.habit.findMany({
    where: { userId },
    include: {
      dailyLogs: {
        orderBy: { date: "asc" }
      }
    },
  });
}



function daysBetweenDates(date1, date2) {
  const DAY_IN_MS = 86400000; // 24 * 60 * 60 * 1000
  return Math.round((date2 - date1) / DAY_IN_MS);
}

async function revalidateLogs(habitId) {
  const logs = await getLogs(habitId);

  let counter = 0;
  let previousLogDate = null;
  const updates = [];

  for (const log of logs) {
    const currentDate = new Date(log.date);

    if (previousLogDate) {
      let daysDiff = daysBetweenDates(previousLogDate, currentDate);
      if (daysDiff > 1) {
        counter = 0;
      }
    }

    if (log.status === "COMPLETE") {
      counter++;
    } else if (log.status !== "PLANNED_SKIP") {
      counter = 0;
    }

    updates.push(
      db.dailyLog.update({
        where: { id: log.id },
        data: { consecutiveDays: counter },
      })
    );

    previousLogDate = currentDate;
  }

  await db.$transaction(updates);
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
