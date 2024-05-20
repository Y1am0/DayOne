"use client";

import { Edit } from "lucide-react";
import NewHabitButton from "./newHabitButton";
// import EditHabitButton from "./editHabitButton";
import { deleteHabit } from "@/utils/habitsApi";

// Component to render the habits column
export const HabitsColumn = ({ habits, setHabits, setError }) => {
  // const [editingHabit, setEditingHabit] = useState(null);

  // constOpenEditHabit = (habit) => {
  //   setEditingHabit(habit);
  // };

  // const closeEditHabit = (updatedHabit) => {
  //   if (updatedHabit) {
  //     const updatedHabits = habits.map((habit) =>
  //       habit.id === updatedHabit.id ? updatedHabit : habit
  //     );
  //     setHabits(updatedHabits);
  //   }
  //   setEditingHabit(null);
  // };

  return (
    <div className="flex flex-col w-28 z-10 flex-shrink-0 text-lg pl-4 font-light">
      <p className="h-16 flex items-center">Habits</p>
      {habits.map((habit) => (
        <button
          // onClick={() => deleteHabit(habit.id, setHabits, setError)}
          // onClick={() => openEditHabit(habit)}
          key={habit.id}
          className="text-sm h-16 flex items-center text-left"
        >
          {habit.title.length > 18
            ? habit.title.substr(0, 18) + "\u2026"
            : habit.title}
        </button>
      ))}
      <div className=" place-content-center h-16">
        <NewHabitButton setHabits={setHabits} setError={setError} />
      </div>
      {/* {editingHabit && (
        <EditHabitButton
          habit={editingHabit}
          closeDialog={closeEditHabit}
          setError={setError}
        />
      )} */}
    </div>
  );
};
