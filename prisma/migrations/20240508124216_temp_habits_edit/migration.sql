/*
  Warnings:

  - You are about to drop the column `timesPerWeek` on the `Habit` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "DailyLog" ALTER COLUMN "date" SET DATA TYPE TIMESTAMP(3);

-- AlterTable
ALTER TABLE "Habit" DROP COLUMN "timesPerWeek";
