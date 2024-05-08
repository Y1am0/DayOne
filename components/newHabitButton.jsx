"use client";

import { useState } from "react";

import { PlusIcon } from "@radix-ui/react-icons";

import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";

import { addHabit } from "@/utils/habitsApi";

const NewHabitButton = ({ setHabits, setError }) => {
  const [title, setTitle] = useState("");
  const [difficulty, setDifficulty] = useState("TYPICAL");
  const [color, setColor] = useState("bg-blue-500");

  const handleSubmit = async () => {
    try {
      await addHabit({ title, difficulty, color }, setHabits, setError);
    } catch (error) {
      setError(error.message);
      console.error("Failed to add habit:", error.message);
    }
  };

  return (
    <Drawer>
      <DrawerTrigger className="border flex gap-1 border-blue-500 text-xs py-1 px-2 rounded-md">
        <PlusIcon width={12} /> New habit
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle className={"text-xl font-medium font-sans m-auto"}>
            New Habit
          </DrawerTitle>
        </DrawerHeader>

        <div className="p-4 space-y-4">
          <input
            type="text"
            className="border border-gray-300 rounded-md p-2 w-full"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <select
            className="border border-gray-300 rounded-md p-2 w-full"
            value={difficulty}
            onChange={(e) => setDifficulty(e.target.value)}
          >
            <option value="TYPICAL">Typical</option>
            <option value="HARD">Hard</option>
            <option value="VERY_HARD">Very Hard</option>
          </select>

          <div className="flex gap-2">
            {["bg-red-500", "bg-green-500", "bg-blue-500", "bg-yellow-500"].map(
              (c) => (
                <button
                  key={c}
                  className={`h-8 w-8 rounded-full ${c}`}
                  onClick={() => setColor(c)}
                />
              )
            )}
          </div>
        </div>
        <DrawerFooter>
          <button onClick={handleSubmit}>Submit</button>
          <DrawerClose>
            <button variant="outline">Cancel</button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

export default NewHabitButton;
