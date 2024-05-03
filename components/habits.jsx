"use client";
import React, { useEffect, useState } from "react";
import IncrementCounter from "./buttonPage";

const HabitsView = () => {
  const [habits, setHabits] = useState([]);
  const [currentLogId, setCurrentLogId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchHabits();
  }, []);

  const fetchHabits = async () => {
    try {
      const response = await fetch("/api/habits/view_habits");
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      setHabits(data);
      setLoading(false);
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };

  const addHabit = async () => {
    const habitData = {
      title: "hahaha atsa ena habit",
      difficulty: "TYPICAL",
      timesPerWeek: 3,
      color: "red",
    };

    try {
      const response = await fetch("/api/habits/view_habits", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(habitData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to add new habit");
      }
      fetchHabits();
    } catch (error) {
      setError(error.message);
    }
  };

  const addLog = async (habitId) => {
    const logData = {
      habitId: habitId,
      date: new Date().toISOString(),
      status: "COMPLETE",
    };

    try {
      const response = await fetch("/api/habits/add_logs", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(logData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to add new log");
      }
      fetchHabits();
    } catch (error) {
      setError(error.message);
    }
  };

  const handleEditLog = async (logId) => {
    setCurrentLogId(logId);
    await updateLog(logId);
  };

  const updateLog = async (logId) => {
    const logData = {
      id: logId,
      status: "SKIPPED",
    };

    try {
      const response = await fetch("/api/habits/add_logs", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(logData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to edit log");
      }
      fetchHabits();
    } catch (error) {
      setError(error.message);
    }
  };

  const deleteHabit = async (habitId) => {
    try {
      const response = await fetch("/api/habits/view_habits", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: habitId }),
      });
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      fetchHabits();
    } catch (error) {
      setError(error.message);
    }
  };

  if (loading)
    return <div className="grid place-content-center">Loading...</div>;
  if (error)
    return <div className="grid place-content-center">Error: {error}</div>;

  return (
    <div className="grid place-content-center flex-col m-auto">
      <div className="flex flex-col gap-y-4">
        {habits.length === 0 ? (
          <div className="text-center">
            <p>No habits found</p>
          </div>
        ) : (
          <ul className="text-white">
            {habits.map((habit) => (
              <>
                <div className="flex flex-col">
                  <li key={habit.id}>{habit.title}</li>
                  <li>
                    <button
                      onClick={() => addLog(habit.id)}
                      className="mb-4 p-2 bg-blue-500 text-white rounded"
                    >
                      Add Log
                    </button>
                    <button
                      onClick={() => deleteHabit(habit.id)}
                      className="text-xs underline"
                    >
                      Delete Habit
                    </button>{" "}
                  </li>
                  <li> {habit.dailyLogs?.[0]?.status} </li>
                  <li>
                    {habit.dailyLogs &&
                      habit.dailyLogs.map((log) => (
                        <button
                          key={log.id}
                          onClick={() => handleEditLog(log.id)}
                          className="text-xs underline"
                        >
                          Edit Log
                        </button>
                      ))}
                  </li>
                </div>
              </>
            ))}
          </ul>
        )}
        <div className="flex flex-col">
          <button
            onClick={addHabit}
            className="mb-4 p-2 bg-blue-500 text-white rounded"
          >
            Add New Habit
          </button>
        </div>

        {/* <IncrementCounter /> */}
      </div>
    </div>
  );
};

export default HabitsView;
