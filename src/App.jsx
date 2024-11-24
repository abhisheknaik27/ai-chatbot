import axios from "axios";
import React, { useState } from "react";

const App = () => {
  const [response, setResponse] = useState("");
  const [question, setQuestion] = useState("");
  const key = import.meta.env.VITE_GEMINI_KEY;

  async function generateAnswer() {
    const response = await axios({
      url: `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${key}`,
      method: "POST",
      data: {
        contents: [{ parts: [{ text: question }] }],
      },
    });
    console.log(response.data.candidates[0].content.parts[0].text);
    setResponse(response.data.candidates[0].content.parts[0].text);
  }
  return (
    <>
      <div className="flex flex-col items-center justify-center min-h-screen ">
        <div className="relative">
          <h1 className="text-4xl font-bold py-4 uppercase text-white">
            Ai answer generator
            <span className="text-xs absolute bottom-0 right-0 bg-gradient-to-br from-gray-300 to-sky-400 bg-clip-text text-transparent">
              powered by Google Gemini
            </span>
          </h1>
        </div>
        <div className="rounded p-8 shadow-2xl w-full max-w-screen-md">
          <div className="flex flex-col items-center">
            <div className="flex items-center w-full border-2 rounded-sm overflow-hidden ">
              <input
                className="bg-transparent flex-grow text-white px-6 py-2   focus:outline-none focus:ring-1 focus:ring-gray-500 text-xl"
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
              />
              <button
                className=" bg-violet-500 text-white px-6 py-2 shadow-md hover:bg-pink-600 transition-all text-xl"
                onClick={generateAnswer}
              >
                Click
              </button>
            </div>
          </div>
        </div>

        {response && (
          <div className="p-10 mt-4">
            <div className="bg-gray-200 w-[100vh] h-full text-black rounded-2xl p-4 flex justify-center items-center ">
              <div className="border rounded border-violet-400 p-4">
                <pre className="">{response}</pre>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default App;
