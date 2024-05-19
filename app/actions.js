"use server";

import { generateText, streamText } from "ai";
import { openai } from "@ai-sdk/openai";
import { z } from "zod";

export async function continueConversation(history) {
  const { text, toolResults } = await streamText({
    model: openai("gpt-4o"),
    system: "You are a friendly assistant!",
    messages: history,
    tools: {
      celsiusToFahrenheit: {
        description: "Converts celsius to fahrenheit",
        parameters: z.object({
          value: z.string().describe("The value in celsius"),
        }),
        execute: async ({ value }) => {
          const celsius = parseFloat(value);
          const fahrenheit = celsius * (9 / 5) + 32;
          return `${celsius}°C is ${fahrenheit.toFixed(2)}°F`;
        },
      },
    },
  });

  return {
    messages: [
      ...history,
      {
        role: "assistant",
        content: text,
      },
    ],
  };
}
