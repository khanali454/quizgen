import React, { useState } from "react";

const DownloadView = () => {
  const [activeTab, setActiveTab] = useState("question");

  // Sample MCQs data
  const mcqs = [
    { id: 1, question: "What is 2 + 2?", options: ["3", "4", "5", "6"], answer: "4" },
    { id: 2, question: "What is the capital of France?", options: ["Berlin", "Madrid", "Paris", "Rome"], answer: "Paris" },
    { id: 3, question: "Which planet is known as the Red Planet?", options: ["Earth", "Mars", "Jupiter", "Saturn"], answer: "Mars" },
    { id: 4, question: "What is the largest ocean on Earth?", options: ["Atlantic", "Indian", "Arctic", "Pacific"], answer: "Pacific" },
    { id: 5, question: "Who wrote 'To Kill a Mockingbird'?", options: ["Harper Lee", "Mark Twain", "J.K. Rowling", "Ernest Hemingway"], answer: "Harper Lee" },
    { id: 6, question: "What is the chemical symbol for water?", options: ["H2O", "CO2", "NaCl", "O2"], answer: "H2O" },
    { id: 7, question: "Which country is known as the Land of the Rising Sun?", options: ["China", "Japan", "India", "South Korea"], answer: "Japan" },
    { id: 8, question: "What is the smallest prime number?", options: ["1", "2", "3", "5"], answer: "2" },
    { id: 9, question: "Who painted the Mona Lisa?", options: ["Vincent Van Gogh", "Pablo Picasso", "Leonardo da Vinci", "Claude Monet"], answer: "Leonardo da Vinci" },
    { id: 10, question: "What is the square root of 64?", options: ["6", "7", "8", "9"], answer: "8" },
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-4 items-center lg:ml-[240px]">
      {/* Top Space */}
      <div className="h-[60px]"></div>

      {/* Tabs */}
      <div className="flex space-x-4 border-b border-gray-200 mb-4">
        <button
          className={`px-4 py-2 font-medium ${activeTab === "question" ? "border-b-2 border-blue-500 text-blue-500" : "text-gray-500 hover:text-gray-700"}`}
          onClick={() => setActiveTab("question")}
        >
          Question
        </button>
        <button
          className={`px-4 py-2 font-medium ${activeTab === "answer" ? "border-b-2 border-blue-500 text-blue-500" : "text-gray-500 hover:text-gray-700"}`}
          onClick={() => setActiveTab("answer")}
        >
          Answer
        </button>
      </div>

      {/* Content */}
      <div className="overflow-y-auto h-[calc(100vh-180px)]">
        {activeTab === "question" ? (
          <div className="space-y-4">
            {mcqs.map((mcq) => (
              <div key={mcq.id} className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                <h3 className="text-lg font-semibold text-gray-800">{mcq.question}</h3>
                <ul className="mt-3 space-y-2">
                  {mcq.options.map((option, index) => (
                    <li key={index} className="flex items-center">
                      <input
                        type="radio"
                        name={`mcq-${mcq.id}`}
                        id={`option-${mcq.id}-${index}`}
                        className="mr-2"
                      />
                      <label htmlFor={`option-${mcq.id}-${index}`} className="text-gray-700">
                        {option}
                      </label>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        ) : (
          <div className="space-y-4">
            {mcqs.map((mcq) => (
              <div key={mcq.id} className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                <h3 className="text-lg font-semibold text-gray-800">{mcq.question}</h3>
                <p className="mt-2 text-green-600 font-medium">Answer: {mcq.answer}</p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Fixed Bottom Buttons */}
      <div className="fixed bottom-0 left-0 right-0 bg-white p-4 shadow-lg flex justify-center space-x-4">
        <button className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-colors">
          Download
        </button>
        <button className="bg-green-500 text-white px-6 py-2 rounded-lg hover:bg-green-600 transition-colors">
          Copy
        </button>
      </div>
    </div>
  );
};

export default DownloadView;