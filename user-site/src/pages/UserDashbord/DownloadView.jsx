import axios from "axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";
import HomeLoader from "../../components/HomeLoader";
import * as clipboard from "clipboard-polyfill";
import { FaCopy, FaFilePdf, FaFilePowerpoint, FaFileWord, FaRedo, FaCheck, FaTrophy, FaAward, FaMedal } from "react-icons/fa";
import { useUser } from "../../layouts/LoggedUserContext";

const DownloadView = () => {
  const [activeTab, setActiveTab] = useState("question");
  const [loading, setLoading] = useState(true);
  const [mcqs, setMcqs] = useState({ questions: [], answers: [] });
  const [language, setLanguage] = useState("English");
  const [paper_type, setPaperType] = useState(null);
  let token = localStorage.getItem("token");
  const { id } = useParams();
  const { loggedUser, updateUser } = useUser();
  const [download_formats, setDownloadFormats] = useState([]);
  const [selectedOptions, setSelectedOptions] = useState({});
  const [fillInAnswers, setFillInAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);
  const [score, setScore] = useState({ correct: 0, total: 0, percentage: 0 });
  const [userAnswers, setUserAnswers] = useState([]);

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_API_BASE_URL}/mcqs/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then((response) => {
        setDownloadFormats(response?.data?.mcq?.download_formats);
        setPaperType(response?.data?.mcq?.question_type);
        setLanguage(response?.data?.mcq?.language);
        const parsedData = JSON.parse(response?.data?.mcq?.generated_paper);
        setMcqs(parsedData);

        // Initialize selected options state
        const initialSelected = {};
        const initialFillInAnswers = {};
        parsedData?.questions?.forEach((_, index) => {
          initialSelected[index] = null;
          initialFillInAnswers[index] = "";
        });
        setSelectedOptions(initialSelected);
        setFillInAnswers(initialFillInAnswers);
      })
      .catch((error) => {
        toast.error(error?.response?.data?.msg || error?.message);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const handleOptionSelect = (questionIndex, optionIndex) => {
    setSelectedOptions(prev => ({
      ...prev,
      [questionIndex]: optionIndex
    }));
  };

  const handleFillInAnswer = (questionIndex, answer) => {
    setFillInAnswers(prev => ({
      ...prev,
      [questionIndex]: answer
    }));
  };

  const checkAllAttempted = () => {
    if (paper_type === "Fill_in_the_Blanks") {
      return Object.values(fillInAnswers).every(answer => answer.trim() !== "");
    } else {
      return Object.values(selectedOptions).every(option => option !== null);
    }
  };

  const handleAttemptOnline = () => {
    if (!checkAllAttempted()) {
      toast.error("Please attempt all questions before submitting!");
      return;
    }

    // Calculate score and prepare user answers
    let correctAnswers = 0;
    const userAnswersList = [];

    mcqs?.answers?.forEach((answer, index) => {
      let isCorrect = false;
      let userAnswer = "";
      let correctAnswer = answer.answer;

      if (paper_type === "Fill_in_the_Blanks") {
        userAnswer = fillInAnswers[index];
        // lower case
        isCorrect = userAnswer.trim().toLowerCase() === correctAnswer.toLowerCase();
      } else {
        // Get the correct answer text and index
        const correctAnswerIndex = mcqs.questions[index]?.options?.indexOf(correctAnswer);
        // Get user's selected option index and text
        const userSelectedIndex = selectedOptions[index];
        userAnswer = mcqs.questions[index]?.options[userSelectedIndex];

        // Compare both the index and text to be sure
        isCorrect = userSelectedIndex === correctAnswerIndex &&
          userAnswer === correctAnswer;
      }

      if (isCorrect) {
        correctAnswers++;
      }

      userAnswersList.push({
        question: mcqs.questions[index]?.question,
        userAnswer,
        correctAnswer,
        isCorrect,
        userAnswerIndex: paper_type === "Fill_in_the_Blanks" ? null : selectedOptions[index],
        correctAnswerIndex: paper_type === "Fill_in_the_Blanks" ? null : mcqs.questions[index]?.options?.indexOf(correctAnswer)
      });
    });

    const totalQuestions = mcqs?.questions?.length || 1;
    const percentage = (correctAnswers / totalQuestions) * 100;

    setScore({
      correct: correctAnswers,
      total: totalQuestions,
      percentage: percentage.toFixed(2)
    });

    setUserAnswers(userAnswersList);
    setShowResults(true);
  };

  const resetAttempt = () => {
    const resetSelected = {};
    const resetFillInAnswers = {};
    mcqs?.questions?.forEach((_, index) => {
      resetSelected[index] = null;
      resetFillInAnswers[index] = "";
    });
    setSelectedOptions(resetSelected);
    setFillInAnswers(resetFillInAnswers);
    setShowResults(false);
    setUserAnswers([]);
  };

  const downloadPaper = async (format) => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/download-paper/${id}/${format}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        responseType: 'blob'
      });

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `paper.${format}`);
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (error) {
      console.error('Download error:', error);
      if (error.status === 404) {
        toast.error("Paper does not exist in our records. Try refreshing the page and request again");
      } else if (error.status === 403) {
        toast.error("You are not allowed to download paper in this format");
      } else {
        toast.error("Error in downloading the paper");
      }
    }
  };

  const copyQuestions = () => {
    let textToCopy = "";

    mcqs?.questions?.forEach((question, index) => {
      textToCopy += `Question ${index + 1}: ${question?.question}\n`;

      if (question?.options && question?.options?.length > 0) {
        textToCopy += "Options:\n";
        question?.options?.forEach((option, optionIndex) => {
          textToCopy += `  ${optionIndex + 1}. ${option}\n`;
        });
      }

      textToCopy += `Answer: ${mcqs?.answers[index]?.answer}\n\n`;
    });
    clipboard.writeText(textToCopy).then(
      () => { toast.success("Copied to clipboard successfully") },
      () => { console.log("Copy to clipboard failed"); }
    );
  };

  // Results Popup Component
  const ResultsPopup = ({ score, userAnswers, onClose }) => {
    let performanceText = "";
    let performanceColor = "";
    let PerformanceIcon = FaTrophy;

    if (score.percentage >= 90) {
      performanceText = "Outstanding!";
      performanceColor = "text-purple-600";
      PerformanceIcon = FaTrophy;
    } else if (score.percentage >= 75) {
      performanceText = "Excellent!";
      performanceColor = "text-green-600";
      PerformanceIcon = FaAward;
    } else if (score.percentage >= 60) {
      performanceText = "Good Job!";
      performanceColor = "text-blue-600";
      PerformanceIcon = FaMedal;
    } else if (score.percentage >= 40) {
      performanceText = "Keep Practicing!";
      performanceColor = "text-yellow-600";
    } else {
      performanceText = "Needs Improvement";
      performanceColor = "text-red-600";
    }

    return (
      <div className="fixed inset-0 flex items-center justify-center z-50 p-4 backgroud-[rgba(0,0,0,0.5)]">
        <div className="bg-white p-6 rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
          <div className="text-center mb-6">
            <h2 className="text-3xl font-bold mb-2">Quiz Results</h2>
            <div className={`flex items-center justify-center ${performanceColor}`}>
              <PerformanceIcon className="w-8 h-8 mr-2" />
              <span className="text-2xl font-bold">{performanceText}</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div className="bg-blue-50 p-4 rounded-lg">
              <h3 className="font-semibold text-lg text-center mb-3">Summary</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span>Total Questions:</span>
                  <span className="font-medium">{score.total}</span>
                </div>
                <div className="flex justify-between">
                  <span>Correct Answers:</span>
                  <span className="font-medium text-green-600">{score.correct}</span>
                </div>
                <div className="flex justify-between">
                  <span>Incorrect Answers:</span>
                  <span className="font-medium text-red-600">{score.total - score.correct}</span>
                </div>
                <div className="flex justify-between">
                  <span>Percentage:</span>
                  <span className="font-medium">{score.percentage}%</span>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-semibold text-lg text-center mb-3">Performance</h3>
              <div className="w-full bg-gray-200 rounded-full h-4">
                <div
                  className="bg-gradient-to-r from-blue-500 to-purple-500 h-4 rounded-full"
                  style={{ width: `${score.percentage}%` }}
                ></div>
              </div>
              <div className="flex justify-between mt-2 text-sm">
                <span>0%</span>
                <span>50%</span>
                <span>100%</span>
              </div>
            </div>
          </div>

          <div className="mb-6">
            <h3 className="font-semibold text-lg mb-3">Question Review</h3>
            <div className="space-y-4">
              {userAnswers.map((answer, index) => (
                <div
                  key={index}
                  className={`p-3 rounded-lg border ${answer.isCorrect ? 'border-green-200 bg-green-50' : 'border-red-200 bg-red-50'}`}
                >
                  <p className="font-medium mb-1">Q{index + 1}: {answer.question}</p>
                  <p className={answer.isCorrect ? 'text-green-600' : 'text-red-600'}>
                    Your answer: {answer.userAnswer || "Not answered"}
                  </p>
                  {!answer.isCorrect && (
                    <p className="text-green-600">Correct answer: {answer.correctAnswer}</p>
                  )}
                  {paper_type !== "Fill_in_the_Blanks" && (
                    <div className="text-xs text-gray-500 mt-1">
                      (You selected option {answer.userAnswerIndex + 1},
                      correct was option {answer.correctAnswerIndex + 1})
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-center">
            <button
              onClick={onClose}
              className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-6 py-2 rounded-lg hover:from-blue-600 hover:to-purple-600 transition-colors"
            >
              Close Results
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen p-4 bg-gray-50 items-center relative">
      {/* Results Popup */}
      {showResults && (
        <ResultsPopup
          score={score}
          userAnswers={userAnswers}
          onClose={() => setShowResults(false)}
        />
      )}

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
      <div className="pb-4">
        {loading ? (
          <HomeLoader />
        ) : (
          <>
            {activeTab === "question" ? (
              <div className="space-y-4">
                {mcqs?.questions?.map((mcq, qindex) => (
                  <div key={"q" + qindex} className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                    <h3 className="text-lg font-semibold text-gray-800" dir={`${language === "Arabic" ? "rtl" : "ltr"}`}>
                      {qindex + 1}. {mcq?.question}
                    </h3>
                    <ul className="mt-3 space-y-2">
                      {paper_type === "Fill_in_the_Blanks" ? (
                        <li>
                          <label htmlFor={`fill-${qindex}`} className="text-gray-400">Answer:</label>
                          <input 
                            type="text" 
                            id={`fill-${qindex}`}
                            className="w-full border rounded-md my-2 p-2 outline-none border-gray-300"
                            value={fillInAnswers[qindex] || ""}
                            onChange={(e) => handleFillInAnswer(qindex, e.target.value)}
                          />
                        </li>
                      ) : (
                        mcq?.options?.map((option, index) => (
                          <li key={"o" + index} className="flex items-center" dir={`${language === "Arabic" ? "rtl" : "ltr"}`}>
                            <input
                              type="radio"
                              name={`mcq-${qindex}`}
                              id={`option-${qindex}-${index}`}
                              className={`${language === "Arabic" ? "ml-2" : "mr-2"}`}
                              checked={selectedOptions[qindex] === index}
                              onChange={() => handleOptionSelect(qindex, index)}
                            />
                            <label htmlFor={`option-${qindex}-${index}`} className="text-gray-700">
                              {option}
                            </label>
                          </li>
                        ))
                      )}
                    </ul>
                  </div>
                ))}
              </div>
            ) : (
              <div className="space-y-4">
                {mcqs?.answers?.map((qans, index) => (
                  <div key={index} className="bg-green-50 p-4 rounded-lg">
                    <p className="font-medium text-gray-800" dir={`${language === "Arabic" ? "rtl" : "ltr"}`}>
                      {index + 1}. {qans?.answer}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </div>

      {/* Fixed Bottom Buttons */}
      <div className="bg-white p-4 flex justify-center space-x-4">
        <div className="flex flex-wrap gap-3 justify-center">
          {(loggedUser?.subscription?.status === "active" && loggedUser?.subscription?.plan?.online_test === 1) ? (
            <>
              {/* Online Teest Button */}
              <button
                onClick={handleAttemptOnline}
                disabled={loading}
                className="inline-flex items-center disabled:opacity-50 bg-purple-500 text-white px-4 py-2 rounded-lg hover:bg-purple-600 transition-colors"
              >
                <FaCheck className="w-4 h-4 mr-2" />
                Online Test
              </button>

              {/* Reset Button */}
              <button
                onClick={resetAttempt}
                disabled={loading}
                className="inline-flex items-center disabled:opacity-50 bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition-colors"
              >
                <FaRedo className="w-4 h-4 mr-2" />
                Reset
              </button>
            </>
          ) : (
            <>
              {/* Online Attempt Button */}
              <button
                disabled={true}
                className="inline-flex items-center disabled:opacity-50 bg-purple-500 text-white px-4 py-2 rounded-lg hover:bg-purple-600 transition-colors"
              >
                <FaCheck className="w-4 h-4 mr-2" />
                Online Test
              </button>

              {/* Reset Button */}
              <button
                disabled={true}
                className="inline-flex items-center disabled:opacity-50 bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition-colors"
              >
                <FaRedo className="w-4 h-4 mr-2" />
                Reset
              </button>
            </>
          )}

          {/* PDF Download Button */}
          <button
            onClick={() => downloadPaper('pdf')}
            disabled={loading || !download_formats?.includes('PDF')}
            className="inline-flex items-center disabled:opacity-50 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
          >
            <FaFilePdf className="w-4 h-4 mr-2" />
            PDF
          </button>

          {/* PPT Download Button */}
          <button
            onClick={() => downloadPaper('ppt')}
            disabled={loading || !download_formats?.includes('PPTX')}
            className="inline-flex items-center disabled:opacity-50 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
          >
            <FaFilePowerpoint className="w-4 h-4 mr-2" />
            PPT
          </button>

          {/* DOCX Download Button */}
          <button
            onClick={() => downloadPaper('docx')}
            disabled={loading || !download_formats?.includes('DOCX')}
            className="inline-flex items-center disabled:opacity-50 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
          >
            <FaFileWord className="w-4 h-4 mr-2" />
            DOC
          </button>

          {/* Copy Button */}
          <button
            onClick={copyQuestions}
            disabled={loading}
            className="inline-flex items-center disabled:opacity-50 bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors"
          >
            <FaCopy className="w-4 h-4 mr-2" />
            Copy
          </button>
        </div>
      </div>
    </div>
  );
};

export default DownloadView;