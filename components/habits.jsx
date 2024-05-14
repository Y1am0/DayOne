"use client";

import React, { useEffect, useState, useRef, useMemo } from "react";
import { fetchHabits } from "@/utils/habitsApi";
import { generateDates } from "@/utils/generateDates";
import { DateColumn } from "@/components/dateColumn";
import { HabitsColumn } from "@/components/habitsColumn";

const HabitsView = ({ habits, setHabits, setError }) => {
  const [loading, setLoading] = useState(true);
  const scrollRef = useRef(null);
  const daysToShow = 14;

  const dates = useMemo(() => generateDates(daysToShow), [daysToShow]);

  useEffect(() => {
    fetchHabits(setHabits, setLoading, setError);
  }, [setHabits, setError]);

  useEffect(() => {
    if (scrollRef.current) {
      const { scrollWidth, clientWidth } = scrollRef.current;
      scrollRef.current.scrollLeft = scrollWidth - clientWidth;
    }
  }, [dates]); // This useEffect now only triggers if dates actually changes

  return (
    <div className="w-full flex justify-center">
      <HabitsColumn habits={habits} setHabits={setHabits} setError={setError} />
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
    </div>
  );
};

export default HabitsView;
