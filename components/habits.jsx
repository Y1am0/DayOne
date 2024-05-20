"use client";

import React, { useEffect, useState, useRef, useMemo } from "react";
import { fetchHabits } from "@/utils/habitsApi";
import { generateDates } from "@/utils/generateDates";
import { DateColumn } from "@/components/dateColumn";
import { HabitsColumn } from "@/components/habitsColumn";

const HabitsView = ({ habits, setHabits, setError }) => {
  const [loading, setLoading] = useState(true);
  const scrollRef = useRef(null);

  useEffect(() => {
    fetchHabits(setHabits, setLoading, setError);
  }, [setHabits, setError]);

  const daysToShow = 365;

  const dates = useMemo(() => generateDates(daysToShow), [daysToShow]);

  useEffect(() => {
    if (scrollRef.current) {
      const { scrollWidth, clientWidth } = scrollRef.current;
      scrollRef.current.scrollLeft = scrollWidth - clientWidth;
    }
  }, [dates]); // This useEffect now only triggers if dates actually changes

  return (
    <div className="w-full py-4 px-4 2xl:px-72 flex justify-center ">
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
