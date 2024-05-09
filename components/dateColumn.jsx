import { nextStatus, styleStatus } from "@/utils/statusHelpers";
import { updateLog, addLog } from "@/utils/habitsApi";

// Component to render each date column
export const DateColumn = ({ dateObj, habits, setHabits, setError }) => {
  // TODO [] implement optimistic updates here!

  const handleStatusClick = async (habitId, logId, currentStatus) => {
    if (logId && currentStatus) {
      const newStatus = nextStatus(currentStatus);
      updateLog({ id: logId, status: newStatus }, setHabits, setError);
    } else {
      addLog(
        {
          habitId: habitId,
          date: dateObj.fullDate,
          status: "COMPLETE",
        },
        setHabits,
        setError
      );
    }
  };

  return (
    <div className="flex flex-col text-center flex-shrink-0 w-16">
      <div className="h-16 flex flex-col justify-center">
        <div className="font-thin text-sm">{dateObj.day}</div>
        <div
          className={`font-medium text-sm mx-2 ${
            dateObj.isToday ? "bg-blue-600 rounded-full" : ""
          }`}
        >
          {dateObj.date}
        </div>
      </div>
      {habits.map((habit) => {
        const log = habit.dailyLogs.find(
          (log) => log.date.split("T")[0] === dateObj.calDate
        );
        return (
          <div
            key={habit.id}
            className="text-xs h-16 grid place-content-center cursor-pointer"
            onClick={() => handleStatusClick(habit.id, log?.id, log?.status)}
          >
            <div
              className={`size-8 ${styleStatus(log?.status, habit.color)}`}
            ></div>
          </div>
        );
      })}
    </div>
  );
};

export default DateColumn;
