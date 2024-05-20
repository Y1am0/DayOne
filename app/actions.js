"use server";

import { createAI, getMutableAIState, streamUI } from "ai/rsc";
import { openai } from "@ai-sdk/openai";
import { nanoid } from "nanoid";
import { z } from "zod";
import { authenticate } from "@/utils/authenticate";
import { addHabit, deleteHabitWithName, getHabits, getHabitByNameAndUserId, getHabitProgress, getLogs } from "@/lib/dbHabits"


export async function continueConversation(input) {


    const history = getMutableAIState();

    const result = await streamUI({
        model: openai("gpt-3.5-turbo"),
        system:
            "You are a habit tracker assistant. You help users manage their habits.",
        messages: [...history.get(), { role: "user", content: input }],
        text: ({ content, done }) => {
            if (done) {
                history.done((messages) => [
                    ...messages,
                    { role: "assistant", content },
                ]);
            }
            return content;
        },
        tools: {
            celsiusToFahrenheit: {
                description: "Converts celsius to fahrenheit",
                parameters: z.object({
                    value: z.string().describe("The value in celsius"),
                }),
                generate: async function* ({ value }) {
                    yield "Waiting for the result...";
                    const celsius = parseFloat(value);
                    const fahrenheit = celsius * (9 / 5) + 32;
                    await new Promise((resolve) => setTimeout(resolve, 2000));
                    return `${celsius}°C is ${fahrenheit.toFixed(2)}°F`;
                },


            },
            viewHabits: {
                description: "View all habits of the user",
                parameters: z.object({

                }),
                generate: async function* ({ }) {
                    const userSession = await authenticate();
                    yield "Fetching your habits...";
                    const habits = await getHabits(userSession.user.id);
                    if (habits.length > 0) {
                        return (
                            <div className="space-y-4">
                                {habits.map(habit => (
                                    <div key={habit.id} className="p-4 border rounded shadow-sm">
                                        <h3 className="text-xl font-semibold">{habit.title}</h3>
                                        <p>Difficulty: <span className="font-medium">{habit.difficulty}</span></p>
                                        <p>Color: <span className="font-medium" style={{ color: habit.color }}>{habit.color}</span></p>
                                    </div>
                                ))}
                            </div>
                        );
                    } else {
                        return <div>You have no habits tracked.</div>;
                    }
                },


            },
            addHabit: {
                description: "Add a new habit",
                parameters: z.object({
                    title: z.string().describe("The title of the habit"),
                    difficulty: z.string().describe("The difficulty of the habit. Can be 'TYPICAL', 'HARD', or 'VERY_HARD'"),
                    color: z.string().describe("The color of the habit. Can be one of those hex colors:  #ef4444, #22c55e, #3b82f6, #eab308, #f97316, #a855f7, #64748b"),
                }),
                generate: async function* ({ title, difficulty, color }) {
                    const userSession = await authenticate();
                    yield "Adding your habit...";
                    const newHabit = await addHabit({
                        userId: userSession.user.id,
                        title,
                        difficulty,
                        color,
                    });
                    return `Habit added: ${newHabit.title} (Difficulty: ${newHabit.difficulty}, Color: ${newHabit.color})`;
                },
            },
            deleteHabit: {
                description: "Delete a habit",
                parameters: z.object({
                    name: z.string().describe("The name of the habit to delete. The user input might not match the habit name exactly."),
                }),
                generate: async function* ({ name }) {
                    yield "Deleting your habit...";
                    const remove = await deleteHabitWithName(name);
                    return `Habit deleted: ${remove.title} (Difficulty: ${remove.difficulty}, Color: ${remove.color})`;
                },
            },
            viewHabitProgress: {
                description: "View progress of a specific habit",
                parameters: z.object({
                    name: z.string().describe("The name of the habit"),
                }),
                generate: async function* ({ name }) {
                    const userSession = await authenticate();
                    yield "Fetching progress of your habit...";
                    const habit = await getHabitByNameAndUserId(name, userSession.user.id);
                    console.log(habit);
                    if (!habit) {
                        return <div>Habit not found</div>
                    }
                    const progress = await getHabitProgress(habit.id);
                    if (progress.length > 0) {
                        return (
                            <div className="space-y-2">
                                {progress.map(log => (
                                    <div key={log.id} className="p-2 border rounded shadow-sm">
                                        <p>Date: {new Date(log.date).toLocaleDateString()}</p>
                                        <p>Status: {log.status}</p>
                                        <p>Consecutive Days: {log.consecutiveDays}</p>
                                    </div>
                                ))}
                            </div>
                        );
                    } else {
                        return <div>No progress tracked for this habit.</div>;
                    }
                },
            }





        },
    },
    );


    return {
        id: nanoid(),
        role: "assistant",
        display: result.value,
    };
}

export const AI = createAI({
    actions: {
        continueConversation,
    },
    initialAIState: [],
    initialUIState: [],
});
