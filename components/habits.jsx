"use client";
import React, { useEffect, useState, useRef } from "react";
import {
  fetchHabits,
  addHabit,
  deleteHabit,
  addLog,
  updateLog,
} from "@/utils/habitsApi";

const HabitsView = () => {
  const [habits, setHabits] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const scrollRef = useRef(null);

  const daysToShow = 14;
  const today = new Date();
  const dates = Array.from({ length: daysToShow }, (_, i) => {
    const date = new Date();
    date.setDate(today.getDate() - i);
    return {
      day: date.toLocaleDateString("en-US", { weekday: "short" }), // gets the abbreviated day name
      date: date.getDate().toString().padStart(2, "0"),
      isToday:
        date.getDate() === today.getDate() &&
        date.getMonth() === today.getMonth() &&
        date.getFullYear() === today.getFullYear(),
    };
  }).reverse();

  useEffect(() => {
    // Check if the scrollable element is available
    if (scrollRef.current) {
      const { scrollWidth, clientWidth } = scrollRef.current;
      scrollRef.current.scrollLeft = scrollWidth - clientWidth;
    }
  }, [dates]);

  useEffect(() => {
    fetchHabits(setHabits, setLoading, setError);
  }, []);

  return (
    <div className=" w-full flex">
      <div className="flex flex-col w-28 z-10 flex-shrink-0 text-lg pl-4 font-light">
        <p className="h-16 flex items-center">Habits</p>
        {habits.map((habit) => (
          <p key={habit.id} className="text-sm h-16 flex items-center">
            {habit.title}
          </p>
        ))}
      </div>
      <div ref={scrollRef} className="flex overflow-x-scroll">
        {dates.map((dateObj, index) => (
          <div
            key={index}
            className="place-content-center grid text-center flex-shrink-0 w-16 h-16 text-white"
          >
            <div className="font-thin text-sm">{dateObj.day}</div>
            <div
              className={`font-medium text-sm py-1 ${
                dateObj.isToday ? "bg-blue-500 rounded-full" : ""
              }`}
            >
              {dateObj.date}
            </div>
          </div>
        ))}
      </div>

      {/* //Loading spinner & error message UI */}
      <div className="absolute top-[50%] grid place-content-center flex-col m-auto">
        HERE FOR TESTING AND DEBUGGING. REMOVE WHEN DONE
        {loading ? (
          <div className="grid place-content-center">Loading...</div>
        ) : error ? (
          <div className="grid place-content-center">Error: {error}</div>
        ) : (
          // Habits list UI

          // HANDLE NO HABITS
          <div className="flex flex-col gap-y-4">
            {habits.length === 0 ? (
              <div className="text-center">
                <p>No habits found</p>
              </div>
            ) : (
              <ul className="text-white">
                {habits.map((habit) => (
                  <li key={habit.id} className="flex flex-col">
                    {/* HABIT TITLE */}
                    <div className="text-xl">{habit.title}</div>
                    {/* HABIT STATUS */}
                    <div>Status: {habit.dailyLogs[0]?.status}</div>
                    {/* ADD HABIT STATUS */}
                    {!habit.dailyLogs[0] && (
                      <button
                        onClick={() =>
                          addLog(
                            {
                              habitId: habit.id,
                              date: new Date().toISOString(),
                              status: "COMPLETE",
                            },
                            setHabits,
                            setError
                          )
                        }
                        className="mb-4 p-2 bg-blue-500 text-white rounded"
                      >
                        Add Log
                      </button>
                    )}
                    {/* EDIT HABIT STATUS */}
                    {habit.dailyLogs[0] && (
                      <button
                        onClick={() =>
                          updateLog(
                            { id: habit.dailyLogs[0]?.id, status: "SKIPPED" },
                            setHabits,
                            setError
                          )
                        }
                        className="text-xs underline"
                      >
                        Edit Log
                      </button>
                    )}
                    {/* DELETE HABIT */}
                    <button
                      onClick={() => deleteHabit(habit.id, setHabits, setError)}
                      className="text-xs underline"
                    >
                      Delete Habit
                    </button>
                  </li>
                ))}
              </ul>
            )}
            {/* ADD NEW HABIT */}
            <button
              onClick={() =>
                addHabit(
                  {
                    title: "New Habit",
                    difficulty: "TYPICAL",
                    timesPerWeek: 3,
                    color: "blue",
                  },
                  setHabits,
                  setError
                )
              }
              className="mb-4 p-2 bg-blue-500 text-white rounded"
            >
              Add New Habit
            </button>
          </div>
        )}
      </div>
    </div>
  );

  // );
};

export default HabitsView;
