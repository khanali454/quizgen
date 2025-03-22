import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";
import HomeLoader from "../../components/HomeLoader";
import * as clipboard from "clipboard-polyfill";
import { FaCopy, FaFilePdf, FaFilePowerpoint, FaFileWord } from "react-icons/fa";
import { LoggedUserContext } from "../../layouts/LoggedUserContext";

const DownloadView = () => {
  const [activeTab, setActiveTab] = useState("question");
  const [loading, setLoading] = useState(true);
  const [mcqs, setMcqs] = useState([]);
  const [language, setLanguage] = useState("English");
  let token = localStorage.getItem("token");
  const { id } = useParams();
  const user = useContext(LoggedUserContext);
  const [download_formats, setDownloadFormats] = useState([]);

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_API_BASE_URL}/mcqs/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then((response) => {
        setDownloadFormats(response?.data?.mcq?.download_formats);
        setLanguage(response?.data?.mcq?.language);
        setMcqs(JSON.parse(response?.data?.mcq?.generated_paper));
      })
      .catch((error) => {
        toast.error(error?.response?.data?.msg || error?.message);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);


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
      if(error.status==404){
        toast.error("Paper does not exists in our records, Try refreshing the page and request again");
      }else if(error.status==403){
        toast.error("You are not allowed to download paper in this format");
      }else{
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
  }

  return (
    <div className="min-h-screen p-4 bg-gray-50 items-center relative">
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
      <div className=" pb-4">
        {loading ? (<>
          <HomeLoader />
        </>) : (<>
          {activeTab === "question" ? (
            <div className="space-y-4">
              {mcqs?.questions?.map((mcq, qindex) => (
                <div key={"q"+qindex} className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                  <h3 className="text-lg font-semibold text-gray-800" dir={`${language == "Arabic" ? "rtl" : "ltr"}`}>
                    {qindex + 1}. {mcq?.question}
                  </h3>
                  <ul className="mt-3 space-y-2">
                    {mcq?.options?.map((option, index) => (
                      <li key={"o"+index} className="flex items-center" dir={`${language == "Arabic" ? "rtl" : "ltr"}`}>
                        <input
                          type="radio"
                          name={`mcq-${qindex}`}
                          id={`option-${qindex}`}
                          className={`${language == "Arabic" ? "ml-2" : "mr-2"}`}
                        />
                        <label htmlFor={`option-${qindex}`} className="text-gray-700">
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
              {mcqs?.answers?.map((qans, index) => (
                <div key={index} className="bg-green-50 p-4 rounded-lg">
                  <p className="font-medium text-gray-800" dir={`${language == "Arabic" ? "rtl" : "ltr"}`}>
                    {index + 1}. {qans?.answer}
                  </p>
                </div>
              ))}
            </div>
          )}
        </>)}

      </div>

      {/* Fixed Bottom Buttons */}
      <div className="bg-white p-4 flex justify-center space-x-4">


        <div className="flex flex-wrap gap-3">




          {/* PDF Download Button */}
          <button
          onClick={()=>{downloadPaper('pdf')}}
            disabled={loading || !download_formats?.includes('PDF')}
            className="inline-flex items-center disabled:opacity-50 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
          >
            <FaFilePdf className="w-4 h-4 mr-2" />
            PDF
          </button>

          {/* PPT Download Button */}


          <button
          onClick={()=>{downloadPaper('ppt')}}
            disabled={loading || !download_formats?.includes('PPTX')}
            className="inline-flex items-center disabled:opacity-50 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
          >
            <FaFilePowerpoint className="w-4 h-4 mr-2" />
            PPT
          </button>



          {/* DOCX Download Button */}
          <button
          onClick={()=>{downloadPaper('docx')}}
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