"use client";
import React, { useEffect, useState } from "react";
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

  useEffect(() => {
    fetchHabits(setHabits, setLoading, setError);
  }, []);

  return (
    // Loading spinner & error message UI

    <div className="grid place-content-center flex-col m-auto">
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
  );
};

export default HabitsView;
