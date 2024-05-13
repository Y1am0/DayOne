"use client";

import { useState } from "react";
import { PlusIcon } from "@radix-ui/react-icons";
import { z } from "zod";

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
import { Button } from "./ui/button";

const habitSchema = z.object({
  title: z.string().min(4, "Title must be at least 4 characters"),
  difficulty: z.enum(["TYPICAL", "HARD", "VERY_HARD"]),
  color: z.string(),
});

const habitColors = [
  "#ef4444",
  "#22c55e",
  "#3b82f6",
  "#eab308",
  "#f97316",
  "#a855f7",
  "#64748b",
];

const NewHabitButton = ({ setHabits, setError }) => {
  const [title, setTitle] = useState("");
  const [difficulty, setDifficulty] = useState("TYPICAL");
  const [color, setColor] = useState("#3b82f6");
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [titleError, setTitleError] = useState("");

  const handleSubmit = async () => {
    if (isSubmitting) return;

    setIsSubmitting(true);
    setTitleError("");
    const result = habitSchema.safeParse({ title, difficulty, color });
    if (!result.success) {
      setTitleError(result.error.flatten().fieldErrors.title.join(", "));
      setIsSubmitting(false);
      return;
    }

    try {
      await addHabit(result.data, setHabits, setError);
      setIsOpen(false);
    } catch (error) {
      setError(error.message);
      console.error("Failed to add habit:", error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Drawer open={isOpen} onOpenChange={setIsOpen}>
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
            className={`border rounded-md p-2 w-full ${
              titleError ? "border-red-500" : "border-gray-300"
            }`}
            placeholder="Title"
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
              setTitleError("");
            }}
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
            {habitColors.map((c) => (
              <button
                key={c}
                style={{ backgroundColor: c }}
                className={`h-8 w-8 rounded-full ${
                  color === c && "border-white border-2"
                }`}
                onClick={() => setColor(c)}
              />
            ))}
          </div>
        </div>
        <DrawerFooter>
          <Button type="submit" onClick={handleSubmit} disabled={isSubmitting}>
            Submit
          </Button>
          <DrawerClose>
            <Button variant="outline">Cancel</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

export default NewHabitButton;
