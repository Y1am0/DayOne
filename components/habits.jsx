"use client";

import React, { useEffect, useState, useRef } from "react";
import {
  fetchHabits,
  addHabit,
  deleteHabit,
  addLog,
  updateLog,
} from "@/utils/habitsApi";

import { generateDates } from "@/utils/generateDates";
import { DateColumn } from "@/components/dateColumn";
import { HabitsColumn } from "@/components/habitsColumn";

const HabitsView = () => {
  const [habits, setHabits] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const scrollRef = useRef(null);
  const daysToShow = 14;
  const dates = generateDates(daysToShow);

  useEffect(() => {
    fetchHabits(setHabits, setLoading, setError);
  }, []);

  useEffect(() => {
    if (scrollRef.current) {
      const { scrollWidth, clientWidth } = scrollRef.current;
      scrollRef.current.scrollLeft = scrollWidth - clientWidth;
    }
  }, [dates]);

  return (
    <div className="w-full flex justify-center">
      <HabitsColumn habits={habits} />
      <div ref={scrollRef} className="flex overflow-x-scroll">
        <div className="flex">
          {dates.map((dateObj) => (
            <DateColumn
              key={dateObj.fullDate}
              dateObj={dateObj}
              habits={habits}
              setHabits={setHabits}
              setError={setError}
            />
          ))}
        </div>
      </div>
      {/* </div>
  );
};

export default HabitsView; */}

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
                    title: "Βούρτσιμα δοντιών",
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
