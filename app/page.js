"use client";

import React, { useState } from "react";
import HabitsView from "@/components/habits";

const Home = () => {
  const [habits, setHabits] = useState([]);
  const [error, setError] = useState(null);

  return (
    <div>
      <HabitsView habits={habits} setHabits={setHabits} setError={setError} />
    </div>
  );
};

export default Home;
