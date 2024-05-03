// app/[your-component]/page.tsx
"use client"; // This directive is needed for client-side operations like useState

import React, { useState } from "react";

const IncrementCounter = () => {
  const [count, setCount] = useState(0);
  const saturation = Math.min(100, count * 5); // Increment saturation by 10% per click, max at 100%

  return (
    <div>
      <button
        onClick={() => setCount(count + 1)}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Click me
      </button>
      <div
        style={{
          width: "100px",
          height: "100px",
          backgroundColor: `hsl(300, ${10 + saturation}%, 35%)`,
          marginLeft: "20px",
          display: "inline-block",
        }}
      >
        {/* This div will change color */}
      </div>
    </div>
  );
};

export default IncrementCounter;
