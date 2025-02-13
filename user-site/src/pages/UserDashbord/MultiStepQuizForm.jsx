import React, { useState } from "react";

const exampleMCQs = [
  {
    question: "What is the maximum quantity of items that can be specified for a post load?",
    options: ["20 pcs", "10 pcs", "50 pcs", "30 pcs"],
    answer: "D) 30 pcs"
  },
  {
    question: "Which of the following is NOT listed as a type of truck in the document?",
    options: ["Rigid Truck", "Semi-trailer with inclined table", "Articulated Truck", "Electric Truck"],
    answer: "D) Electric Truck"
  },
  {
    question: "What is the minimum unit weight specified for the loads?",
    options: ["10 kg", "1 kg", "0 kg", "5 kg"],
    answer: "B) 1 kg"
  },
  {
    question: "Which body type is mentioned as an option for the trucks?",
    options: ["Flatbed", "Refrigerated", "Tanker", "The document doesn't specify"],
    answer: "D) The document doesn't specify"
  },
  {
    question: "What is the primary purpose of JSX in React?",
    options: ["State management", "Templating", "Routing", "API calls"],
    answer: "B) Templating"
  },
  {
    question: "Which hook is used to manage state in functional components?",
    options: ["useEffect", "useState", "useContext", "useReducer"],
    answer: "B) useState"
  },
  {
    question: "What does CSS stand for?",
    options: ["Cascading Style Sheets", "Computer Style System", "Creative Style Syntax", "Component Style System"],
    answer: "A) Cascading Style Sheets"
  },
  {
    question: "Which is NOT a JavaScript framework?",
    options: ["React", "Vue", "Angular", "Django"],
    answer: "D) Django"
  },
  {
    question: "What is the virtual DOM in React?",
    options: ["A lightweight version of the real DOM", "A 3D rendering engine", "A security feature", "A database optimization technique"],
    answer: "A) A lightweight version of the real DOM"
  },
  {
    question: "Which HTTP method is used for creating resources?",
    options: ["GET", "POST", "PUT", "DELETE"],
    answer: "B) POST"
  }
];

export default function MultiStepQuizForm() {
  const [step, setStep] = useState(1);
  const [file, setFile] = useState(null);
  const [mcqCount, setMcqCount] = useState(10);
  const [difficulty, setDifficulty] = useState("medium");
  const [mcqType, setMcqType] = useState("multiple-choice");
  const [topic, setTopic] = useState("");
  const [prompt, setPrompt] = useState("");
  const [activeTab, setActiveTab] = useState("questions");

  const handleFileUpload = (e) => {
    setFile(e.target.files[0]);
  };

  // Custom Components for Better Reusability
  const StepIndicator = ({ number, active, label }) => (
    <div className="flex items-center gap-2">
      <div className={`w-8 h-8 rounded-full flex items-center justify-center 
        ${active ? "bg-blue-600 text-white" : "bg-gray-100 border-2 border-gray-300"}`}>
        {number}
      </div>
      <span className={`text-sm font-medium ${active ? "text-blue-600" : "text-gray-500"}`}>
        {label}
      </span>
    </div>
  );

  const OptionButton = ({ children, active, onClick }) => (
    <button
      onClick={onClick}
      className={`px-4 py-2 rounded-lg transition-all ${
        active 
          ? "bg-blue-600 text-white shadow-lg" 
          : "bg-white text-gray-600 border-2 border-gray-200 hover:border-blue-400"
      }`}
    >
      {children}
    </button>
  );

  return (
    <div className="max-w-4xl mx-auto p-6 pt-15 bg-white rounded-xl shadow-lg">
      {/* Header Section */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold text-gray-800">AI Quiz Generator</h1>
        <button className="text-gray-500 hover:text-red-600 transition-colors">
          ✖ Close
        </button>
      </div>

      {/* Progress Steps */}
      <div className="flex justify-between mb-10 px-4">
        <StepIndicator number={1} active={step === 1} label="Upload Document" />
        <StepIndicator number={2} active={step === 2} label="Configure Quiz" />
        <StepIndicator number={3} active={step === 3} label="Review & Export" />
      </div>

      {/* Step 1 - File Upload */}
      {step === 1 && (
        <div className="space-y-6">
          <div className="border-2 border-dashed border-blue-200 rounded-xl p-8 text-center bg-blue-50 transition-all hover:border-blue-400">
            <input 
              type="file" 
              onChange={handleFileUpload} 
              className="hidden" 
              id="fileUpload" 
              accept=".pdf,.png,.jpg,.jpeg"
            />
            <label htmlFor="fileUpload" className="cursor-pointer space-y-4">
              <div className="inline-block p-3 bg-white rounded-full shadow-lg">
                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                </svg>
              </div>
              <div>
                {file ? (
                  <p className="text-gray-700 font-medium">{file.name}</p>
                ) : (
                  <>
                    <p className="text-gray-700 font-medium">Drag & drop files or click to upload</p>
                    <p className="text-sm text-gray-500 mt-1">Supported formats: PDF, PNG, JPG (Max 25MB)</p>
                  </>
                )}
              </div>
            </label>
          </div>
          <button
            onClick={() => setStep(2)}
            className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 disabled:bg-gray-400 transition-colors"
            disabled={!file}
          >
            Continue →
          </button>
        </div>
      )}

      {/* Step 2 - Quiz Configuration */}
      {step === 2 && (
        <div className="space-y-8">
          <div className="space-y-4">
            <label className="block text-gray-700 font-medium">Number of Questions</label>
            <input
              type="number"
              value={mcqCount}
              onChange={(e) => setMcqCount(Math.min(50, Math.max(1, e.target.value)))}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              min="1"
              max="50"
            />
          </div>

          <div className="space-y-4">
            <label className="block text-gray-700 font-medium">Difficulty Level</label>
            <div className="flex gap-3 flex-wrap">
              {["easy", "medium", "hard"].map(level => (
                <OptionButton
                  key={level}
                  active={difficulty === level}
                  onClick={() => setDifficulty(level)}
                >
                  {level.charAt(0).toUpperCase() + level.slice(1)}
                </OptionButton>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <label className="block text-gray-700 font-medium">Question Type</label>
            <div className="flex gap-3 flex-wrap">
              {["MCQs", "True/false"].map(type => (
                <OptionButton
                  key={type}
                  active={mcqType === type}
                  onClick={() => setMcqType(type)}
                >
                  {type.replace("-", " ").toUpperCase()}
                </OptionButton>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <input
              type="text"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg placeholder-gray-400"
              placeholder="Specific topic focus (optional)"
            />
            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg placeholder-gray-400"
              placeholder="Additional instructions (optional)"
              rows="3"
            />
          </div>

          <div className="flex justify-between pt-6">
            <button
              onClick={() => setStep(1)}
              className="px-6 py-2 text-gray-600 hover:text-blue-600 font-medium transition-colors"
            >
              ← Back
            </button>
            <button
              onClick={() => setStep(3)}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Generate Questions →
            </button>
          </div>
        </div>
      )}

      {/* Step 3 - Quiz Review */}
      {step === 3 && (
        <div className="space-y-6">
          {/* Tabs Navigation */}
          <div className="border-b border-gray-200">
            <div className="flex gap-4">
              {["questions", "answers"].map(tab => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`pb-3 px-1 border-b-2 font-medium transition-colors ${
                    activeTab === tab 
                      ? "border-blue-600 text-blue-600"
                      : "border-transparent text-gray-500 hover:text-gray-700"
                  }`}
                >
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </button>
              ))}
            </div>
          </div>

          {/* Questions/Answers Content */}
          <div className="bg-gray-50 rounded-xl p-6 max-h-[500px] overflow-y-auto shadow-inner">
            {activeTab === "questions" ? (
              exampleMCQs.map((mcq, index) => (
                <div key={index} className="mb-6 last:mb-0 bg-white p-4 rounded-lg shadow-sm">
                  <h3 className="font-medium text-gray-800 mb-4">{index + 1}. {mcq.question}</h3>
                  <div className="grid gap-2">
                    {mcq.options.map((option, i) => (
                      <label 
                        key={i} 
                        className="flex items-center space-x-3 p-3 hover:bg-blue-50 rounded cursor-pointer"
                      >
                        <input 
                          type="radio" 
                          name={`q${index}`} 
                          className="h-5 w-5 text-blue-600 border-gray-300" 
                        />
                        <span className="text-gray-700">{option}</span>
                      </label>
                    ))}
                  </div>
                </div>
              ))
            ) : (
              <div className="space-y-4">
                {exampleMCQs.map((mcq, index) => (
                  <div key={index} className="bg-green-50 p-4 rounded-lg">
                    <p className="font-medium text-gray-800">
                      {index + 1}. {mcq.answer}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex justify-between pt-6">
            <button
              onClick={() => setStep(2)}
              className="px-6 py-2 text-gray-600 hover:text-blue-600 font-medium transition-colors"
            >
              ← Back to Settings
            </button>
            <div className="flex gap-3">
              <button className="px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors flex items-center gap-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
                Download PDF
              </button>
              <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                Copy to Clipboard
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}