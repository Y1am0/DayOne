"use server";

import { createAI, getMutableAIState, streamUI } from "ai/rsc";
import { openai } from "@ai-sdk/openai";
import { nanoid } from "nanoid";
import { z } from "zod";

export async function continueConversation(input) {


    const history = getMutableAIState();

    const result = await streamUI({
        model: openai("gpt-4o"),
        system:
            "you are a spotify api expert and you are helping me add song playback when i ask you to play a song",
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
        },
    });

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
