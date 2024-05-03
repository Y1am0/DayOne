"use client";
import React, { useEffect, useState } from "react";

const HabitsView = () => {
  const [habits, setHabits] = useState([]);
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

  const addLog = async () => {
    const logData = {
      habitId: "clvqjdc50000jn9du75x77ueq",
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

  if (loading)
    return <div className="grid place-content-center">Loading...</div>;
  if (error)
    return <div className="grid place-content-center">Error: {error}</div>;

  return (
    <div className="grid place-content-center flex-col m-auto">
      {habits.length === 0 ? (
        <div>
          <p>
            No habits found. Would you like to{" "}
            <button onClick={addHabit} className="underline text-blue-600">
              create one?
            </button>
          </p>
        </div>
      ) : (
        <ul className="text-white">
          {habits.map((habit) => (
            <>
              <li key={habit.id}>{habit.title}</li>
              <li> {habit.dailyLogs?.[0]?.status} </li>
            </>
          ))}
        </ul>
      )}
      <button
        onClick={addHabit}
        className="mb-4 p-2 bg-blue-500 text-white rounded"
      >
        Add New Habit
      </button>
      <button
        onClick={addLog}
        className="mb-4 p-2 bg-blue-500 text-white rounded"
      >
        Add Log
      </button>
    </div>
  );
};

export default HabitsView;
