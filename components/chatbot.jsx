"use client";

import { useState } from "react";
import { useActions, useUIState } from "ai/rsc";
import { nanoid } from "nanoid";
import { AvatarImage, AvatarFallback, Avatar } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function Chatbot() {
  const [input, setInput] = useState("");
  const [conversation, setConversation] = useUIState();
  const { continueConversation } = useActions();

  return (
    <div className="fixed bottom-36 w-full lg:w-1/2 2xl:w-4/12 right-0 px-4 lg:px-12 z-50">
      <div className="cursor-default w-full border shadow-xl rounded-xl">
        <div className="flex h-[32rem] flex-col">
          <header className="flex rounded-t-xl items-center justify-between bg-background px-4 py-3 text-white shadow-md">
            <div className="flex items-center gap-3">
              <Avatar>
                <AvatarImage alt="Chatbot" src="/placeholder-avatar.jpg" />
                <AvatarFallback className={"text-black dark:text-white"}>
                  D
                </AvatarFallback>
              </Avatar>
              <h2 className="text-lg text-black dark:text-white font-medium">
                DayOne AI
              </h2>
            </div>
          </header>
          <div className="h-full overflow-y-scroll backdrop-blur-3xl p-4">
            <div className="flex flex-col gap-4">
              {conversation.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${
                    message.role === "user"
                      ? "justify-end"
                      : "items-start gap-3"
                  }`}
                >
                  {message.role !== "user" && (
                    <Avatar>
                      <AvatarImage
                        alt="Chatbot"
                        src="/placeholder-avatar.jpg"
                      />
                      <AvatarFallback>CB</AvatarFallback>
                    </Avatar>
                  )}
                  <div
                    className={`max-w-[70%] rounded-lg p-3 text-sm ${
                      message.role === "user"
                        ? "bg-blue-500 text-white"
                        : "bg-gray-100 dark:bg-gray-800"
                    }`}
                  >
                    <p>{message.display}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="bg-gray-100 px-4 py-3 dark:bg-gray-800 rounded-b-xl">
            <form
              className="flex items-center gap-2"
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
              <Input
                className="flex-1 rounded-lg bg-white px-4 py-2 text-sm shadow-sm dark:bg-gray-950"
                placeholder="Type your message..."
                type="text"
                value={input}
                onChange={(event) => {
                  setInput(event.target.value);
                }}
              />
              <Button size="sm" variant="primary" type="submit">
                Send
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
