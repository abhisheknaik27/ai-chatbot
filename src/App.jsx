import axios from "axios";
import React, { useState } from "react";
import Header from "./Header";

const App = () => {
  const [response, setResponse] = useState("");
  const [question, setQuestion] = useState("");
  const [loading, setLoading] = useState(false);
  const key = import.meta.env.VITE_GEMINI_KEY;

  async function generateAnswer() {
    setLoading(true);
    const response = await axios({
      url: `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${key}`,
      method: "POST",
      data: {
        contents: [{ parts: [{ text: question }] }],
      },
    });
    console.log(response.data.candidates[0].content.parts[0].text);
    setResponse(response.data.candidates[0].content.parts[0].text);
    setLoading(false);
  }
  return (
    <>
      {loading ? (
        <>
          <div className="flex flex-col items-center justify-center h-screen">
            <Header />
            <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-500 border-solid"></div>
          </div>
        </>
      ) : (
        <div className="flex flex-col items-center justify-center min-h-screen ">
          <Header />
          <div className="rounded p-8 shadow-2xl w-full max-w-screen-md">
            <div className="flex flex-col items-center">
              <div className="flex items-center w-full border-2 border-gray-500 rounded-sm overflow-hidden ">
                <input
                  className="bg-transparent flex-grow text-white px-6 py-2   focus:outline-none focus:ring-1 focus:ring-gray-500 text-xl"
                  value={question}
                  onChange={(e) => setQuestion(e.target.value)}
                />
                <button
                  className=" bg-blue-400 text-white px-6 py-2 shadow-md hover:bg-blue-600 transition-all text-xl"
                  onClick={generateAnswer}
                >
                  Generate Answer
                </button>
              </div>
            </div>
          </div>

          {response && (
            <div className="p-10 mt-4">
              <div className="bg-gray-300 w-[100vh] h-full text-black rounded-2xl p-4 flex justify-center items-center">
                <div className="border rounded border-blue-700 p-4 max-w-full">
                  <pre className="overflow-y-auto break-words whitespace-pre-wrap max-w-full max-h-[500px] scrollbar-thin scrollbar-thumb-gray-500 scrollbar-track-gray-200">
                    {response}
                  </pre>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default App;
