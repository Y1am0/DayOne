"use client";

const baseUrl = "/api/habits";

export const fetchHabits = async (setHabits, setLoading, setError) => {
  try {
    const response = await fetch(`${baseUrl}/habits`);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    setHabits(data);
  } catch (error) {
    setError(error.message);
  } finally {
    setLoading(false);
  }
};

export const addHabit = async (habitData, setHabits, setError) => {
  try {
    const response = await fetch(`${baseUrl}/habits`, {
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
    await fetchHabits(setHabits, () => {}, setError);
  } catch (error) {
    setError(error.message);
  }
};

export const deleteHabit = async (habitId, setHabits, setError) => {
  try {
    const response = await fetch(`${baseUrl}/habits`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: habitId }),
    });
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    await fetchHabits(setHabits, () => {}, setError);
  } catch (error) {
    setError(error.message);
  }
};

export const updateLog = async (logData, setHabits, setError) => {
  try {
    const response = await fetch(`${baseUrl}/habit_logs`, {
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
    await fetchHabits(setHabits, () => {}, setError);
  } catch (error) {
    setError(error.message);
  }
};

export const addLog = async (logData, setHabits, setError) => {
  try {
    const response = await fetch(`${baseUrl}/habit_logs`, {
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
    await fetchHabits(setHabits, () => {}, setError);
  } catch (error) {
    setError(error.message);
  }
};