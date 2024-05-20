"use client";

import { useState } from 'react';
import Image from 'next/image';

const Chatbot = () => {
  const [isChatbotVisible, setIsChatbotVisible] = useState(false);

  const toggleChatbot = () => {
    setIsChatbotVisible(!isChatbotVisible);
  };

  return (
    <div className="f bg-gray-100 dark:bg-zinc-900">
      {isChatbotVisible ? (
        <div className="max-w-md mx-auto bg-white dark:bg-zinc-800 shadow-md rounded-lg overflow-hidden">
          <div className="flex flex-col h-[400px]">
            <div className="px-4 py-3 border-b dark:border-zinc-700">
              <div className="flex justify-between items-center">
                <h2 className="text-lg font-semibold text-zinc-800 dark:text-white">
                  Chatbot Assistant
                </h2>
                <div className="bg-green-500 text-white text-xs px-2 py-1 rounded-full">
                  Online
                </div>
              </div>
            </div>
            <div
              className=" p-3 overflow-y-auto flex flex-col space-y-2"
              id="chatDisplay"
            >
              {/* Messages will be dynamically loaded here */}
            </div>
            <div className="px-3 py-2 border-t dark:border-zinc-700">
              <div className="flex gap-2">
                <input
                  placeholder="Type your message..."
                  className="flex-1 p-2 border rounded-lg dark:bg-zinc-700 dark:text-white dark:border-zinc-600 text-sm"
                  id="chatInput"
                  type="text"
                />
                <button
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1.5 px-3 rounded-lg transition duration-300 ease-in-out text-sm"

                >
                  Send
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div onClick={toggleChatbot} className="cursor-pointer">
          <Image src={'/robot.png'} alt="Toggle Chatbot" width={24} height={24}
          />
        </div>
      )}
    </div>
  );
};

export default Chatbot;
