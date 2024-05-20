"use client";

import { useState } from "react";
import { useActions, useUIState } from "ai/rsc";
import { nanoid } from "nanoid";

export default function Chatbot() {
  const [input, setInput] = useState("");
  const [conversation, setConversation] = useUIState();
  const { continueConversation } = useActions();

  return (
    <div className="flex flex-col w-full max-w-md py-24 mx-auto stretch">
      <div>
        {conversation.map((message) => (
          <div key={message.id} className="whitespace-pre-wrap">
            {message.role}: {message.display}
          </div>
        ))}
      </div>

      <form
        action={async () => {
          setInput("");

          setConversation((currentConversation) => [
            ...currentConversation,
            { id: nanoid(), role: "user", display: input },
          ]);

          const message = await continueConversation(input);

          setConversation((currentConversation) => [
            ...currentConversation,
            message,
          ]);
        }}
      >
        <input
          className="text-white fixed bottom-32 w-full max-w-md p-2 mb-8 border border-gray-300 rounded shadow-xl"
          type="text"
          value={input}
          onChange={(event) => {
            setInput(event.target.value);
          }}
        />
      </form>
    </div>
  );
}