import { nextStatus, styleStatus } from "@/utils/statusHelpers";
import { updateLog, addLog, deleteLog } from "@/utils/habitsApi";

// Component to render each date column
export const DateColumn = ({ dateObj, habits, setHabits, setError }) => {
  // TODO [] implement optimistic updates here!

  const handleStatusClick = async (habitId, logId, currentStatus) => {
    if (!logId) {
      addLog(
        {
          habitId: habitId,
          date: dateObj.fullDate,
          status: "COMPLETE",
        },
        setHabits,
        setError
      );
      return;
    }

    const newStatus = nextStatus(currentStatus);

    if (newStatus === "SKIPPED") {
      deleteLog(logId, setHabits, setError);
    } else {
      updateLog({ id: logId, status: newStatus }, setHabits, setError);
    }
  };

  return (
    <div className={`flex flex-col text-center flex-shrink-0 w-16`}>
      <div
        className={`h-16 flex flex-col justify-center ${
          dateObj.isToday &&
          "bg-gradient-to-t from-transparent from-35% to-[#3b82f630] to-100% rounded-t-full"
        }`}
      >
        <div className="font-light text-sm">{dateObj.day}</div>
        <div
          className={`font-medium text-sm mx-2 ${
            dateObj.isToday ? "text-white bg-blue-600 rounded-full" : ""
          }`}
        >
          {dateObj.date}
        </div>
      </div>
      {habits.map((habit) => {
        const log = habit.dailyLogs.find(
          (log) => log.date.split("T")[0] === dateObj.fullDate.split("T")[0]
        );
        return (
          <div
            key={habit.id}
            className="text-xs h-16 grid place-content-center cursor-pointer"
            onClick={() => handleStatusClick(habit.id, log?.id, log?.status)}
          >
            <div
              style={styleStatus(log?.status, habit.color)}
              className="size-8"
            ></div>
          </div>
        );
      })}
    </div>
  );
};

export default DateColumn;
