import React, { useState, useEffect, useRef, useContext } from "react";
import { useNavigate, useParams } from 'react-router-dom';
import { SSE } from 'sse.js';
import axios from 'axios';
import { LoggedUserContext } from "../../layouts/LoggedUserContext";
import Processor from '../../components/Processor';
import toast from 'react-hot-toast'
import HomeLoader from "../../components/HomeLoader";
import { createJsonAutocomplete } from "@bonniernews/json-autocomplete";
import { jsonAutocomplete } from "@bonniernews/json-autocomplete";
import * as clipboard from "clipboard-polyfill";
import { FaExclamationCircle } from "react-icons/fa";
import { FaCopy, FaFilePdf, FaFilePowerpoint, FaFileWord } from "react-icons/fa";


export default function MultiStepQuizForm() {

  const { id } = useParams();
  const [step, setStep] = useState(1);
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [loading, setLoading] = useState(false);
  const fileRef = useRef(null);
  const [choosen_file_id, setChoosenFileId] = useState(id || null);
  const [choosen_file_name, setChoosenFileName] = useState(null);
  const [mcqCount, setMcqCount] = useState("");
  const [difficulty, setDifficulty] = useState("Easy");
  const [mcqType, setMcqType] = useState("");
  const [topic, setTopic] = useState("");
  const [language, setLanguage] = useState("English"); // choosen language
  const [activeTab, setActiveTab] = useState("questions"); // active tab - questions or answers
  const [generating, setGenerating] = useState(false); // generating
  const [streaming, setStreaming] = useState(false); // generate started and now streaming

  const [download_formats, setDownloadFormats] = useState();
  const [paper_id, setPaperId] = useState();


  const [generated, setGenerated] = useState();
  const navigate = useNavigate();
  const user = useContext(LoggedUserContext);

  useEffect(() => {
    if (id != null) {
      setLoading(true);
      axios.get(
        `${import.meta.env.VITE_API_BASE_URL}/files/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data',
          },
        }
      ).then((response) => {
        if (response?.data?.status) {
          setChoosenFileId(response?.data?.file?.id);
          setChoosenFileName(response?.data?.file?.name);
        } else {
          toast.error(response?.data?.msg);
          navigate('/files');
        }
      }).finally(() => {
        setLoading(false);
      })
    }
  }, [id])

  const handleDrop = (event) => {
    event.preventDefault();
    const newFile = event.dataTransfer.files[0];
    setFile(newFile);
    setChoosenFileId(null);
  };

  const handleFileSelect = (event) => {
    const newFile = event.target.files[0];
    setFile(newFile);
    setChoosenFileId(null);
  };

  let token = localStorage.getItem('token'); // logged in user token

  const uploadFile = () => {
    if (choosen_file_id) {
      setStep(2);
    } else {
      if (file) {
        setUploading(true);
        const fileSize = file.size;
        const form_data = new FormData();
        form_data.append('file', file);

        axios.post(
          `${import.meta.env.VITE_API_BASE_URL}/files`,
          form_data,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'multipart/form-data',
            },
          }
        ).then((response) => {
          if (response?.data?.status) {
            toast.success(response?.data?.msg);
            setChoosenFileId(response?.data?.file?.id);
            setStep(2);
          } else {
            toast.error(response?.data?.msg);
            if (response?.data?.action == "subscription_redirect") {
              navigate('/manage-subscription');
            } else if (response?.data?.action == "files_redirect") {
              navigate('/files');
            }
          }
        }).catch((error) => {
          toast.error(error?.response?.data?.msg || error?.message);
        }).finally(() => {
          setUploading(false);
          if (fileRef.current) {
            fileRef.current.value = "";
          }
        });
      } else {
        toast.error("Please select file");
      }
    }
  }

  useEffect(() => {
    if (choosen_file_id) {
      setStep(2);
    }
  }, [choosen_file_id])

  const copyQuestions = () => {
    let textToCopy = "";

    generated?.questions?.forEach((question, index) => {
      textToCopy += `Question ${index + 1}: ${question?.question}\n`;

      if (question?.options && question?.options?.length > 0) {
        textToCopy += "Options:\n";
        question?.options?.forEach((option, optionIndex) => {
          textToCopy += `  ${optionIndex + 1}. ${option}\n`;
        });
      }

      textToCopy += `Answer: ${generated?.answers[index]?.answer}\n\n`;
    });
    clipboard.writeText(textToCopy).then(
      () => { toast.success("Copied to clipboard successfully") },
      () => { console.log("Copy to clipboard failed"); }
    );
  }

  // generate questions
  const generatePaper = async () => {

    if (!user?.subscription || user?.subscription?.status != "active") {
      toast.error("You don't have an active subscription. Please subscribe a plan");
      navigate('/manage-subscription');
      return;
    }

    setGenerated([]);

    let gen_data = {
      file_id: choosen_file_id,
      no_of_questions: mcqCount,
      question_type: mcqType,
      level_of_difficulty: difficulty,
      specific_subject: topic,
      language: language
    }

    if (gen_data?.no_of_questions <= 0 || gen_data?.no_of_questions > user?.subscription?.plan?.mcq_per_request) {
      toast.error(`Please enter a valid number of questions in the range: 1 to ${user?.subscription?.plan?.mcq_per_request}.`);
      return;
    }
    if (gen_data?.question_type == "") {
      toast.error("Question type is required");
      return;
    }
    // set generating true
    setGenerating(true);
    setStep(3); // go to step 3
    // generate request

    let form_data = new FormData();
    form_data.append("file_id", gen_data.file_id);
    form_data.append("no_of_questions", gen_data.no_of_questions);
    form_data.append("question_type", gen_data.question_type);
    form_data.append("level_of_difficulty", gen_data.level_of_difficulty);
    form_data.append("specific_subject", gen_data.specific_subject);
    form_data.append("language", gen_data.language);

    let url = `${import.meta.env.VITE_API_BASE_URL}/stream`;
    const token = localStorage.getItem('token'); // Get the token from localStorage
    var source = new SSE(url, {
      headers: { 'Authorization': `Bearer ${token}` },
      payload: form_data
    });

    let strings = "";
    source.addEventListener('update', function (e) {
      setStreaming(true);
      setGenerating(false);
      let delta = e.data;
      strings += delta;
      if (strings.length > 8) {
        strings = strings
          .replace(/```json/g, '')
          .replace(/```/g, '')
        let json = jsonAutocomplete(strings);
        try {
          let jsonParsed = JSON.parse(json);
          console.log("parsed json : ", jsonParsed);
          setGenerated(jsonParsed);
        } catch (error) {
          console.log("parsing error - error :", error);
          console.log("parsing json :", json);
        }
      }
    });
    source.addEventListener('thread.message.completed', function (e) {
      // thread message completed
      let data = JSON.parse(e?.data);
      setDownloadFormats(data?.download_formats);
      setPaperId(data?.paper_id);
      console.log("data on completed : ",data);

    });
    source.addEventListener('thread.run.completed', function (e) {
      // run completed
      setStreaming(false);

    });
    source.addEventListener('error', function (e) {
      setStep(2);
      setStreaming(false);
      setGenerating(false);
      toast.error(JSON.parse(e.data)?.msg);
    });
  }




  const downloadPaper = async (format) => {
    if(!paper_id){
      toast.error("Error in downloading paper,Try again later");
    }
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/download-paper/${paper_id}/${format}`, {
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
      className={`px-4 py-2 rounded-lg transition-all ${active
        ? "bg-blue-600 text-white shadow-lg"
        : "bg-white text-gray-600 border-2 border-gray-200 hover:border-blue-400"
        }`}
    >
      {children}
    </button>
  );

  return (
    <>
      {loading ? (<><HomeLoader /></>) : (<>
        <div className="w-full p-8 bg-white rounded-xl shadow-lg">
          {/* Header Section */}


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
                  ref={fileRef}
                  onChange={handleFileSelect}
                  disabled={uploading}
                  className="hidden"
                  id="fileUpload"
                />
                <label htmlFor="fileUpload" className="cursor-pointer space-y-4" onDrop={handleDrop}
                  onDragOver={(e) => e.preventDefault()}>
                  <div className="inline-block p-3 bg-white rounded-full shadow-lg">
                    <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                    </svg>
                  </div>
                  <div>
                    {(file || choosen_file_name) ? (
                      <p className="text-gray-700 font-medium">{file?.name || choosen_file_name}</p>
                    ) : (<></>)}
                    <>
                      <p className="text-gray-700 font-medium">Drag & drop files or click to upload</p>
                      <p className="text-sm text-gray-500 mt-1">Supported formats: {user?.subscription?.plan?.upload_formats?.toString()}</p>
                      {uploading && (<div className="flex items-center justify-center text-gray-400 my-2"><Processor widthValue={4} heightValue={4} borderColorValue="primary" /> <span className="ml-2">Please wait</span> </div>)}
                    </>

                  </div>
                </label>
              </div>
              <button
                onClick={() => { uploadFile() }}
                className="w-full bg-blue-600 cursor-pointer text-white py-3 rounded-lg hover:bg-blue-700 disabled:bg-gray-400 transition-colors"
                disabled={!(file || choosen_file_id) || uploading}
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
                  onChange={(e) => setMcqCount(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  min="1"
                  max={user?.subscription?.plan?.mcq_per_request || 50}
                />
              </div>


              <div className="space-y-4">
                <label className="block text-gray-700 font-medium">Question Type</label>
                <div className="flex gap-3 flex-wrap">
                  {(user?.subscription?.plan?.mcq_types || ["True_False"]).map(type => (
                    <OptionButton
                      key={type}
                      active={mcqType === type}
                      onClick={() => setMcqType(type)}
                    >
                      {type.replaceAll("_", " ")}
                    </OptionButton>
                  ))}
                </div>
              </div>


              <div className="space-y-4">
                <label className="block text-gray-700 font-medium">Difficulty Level</label>
                <div className="flex gap-3 flex-wrap">
                  {(user?.subscription?.plan?.difficulty_levels || ["Easy"]).map(level => (
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
                <label className="block text-gray-700 font-medium">Language</label>
                <div className="flex gap-3 flex-wrap">
                  {(user?.subscription?.plan?.language_support || ["English"]).map(lang => (
                    <OptionButton
                      key={lang}
                      active={language === lang}
                      onClick={() => setLanguage(lang)}
                    >
                      {lang.replace("-", " ").toUpperCase()}
                    </OptionButton>
                  ))}
                </div>
              </div>

              <div className="space-y-4">
                <label className={`block ${user?.subscription?.plan?.specific_subject == 0 ? "text-gray-300" : "text-gray-700"} font-medium`}>Specific subject/topic {user?.subscription?.plan?.specific_subject == 0 ? (<span className="text-red-400 text-xs">(Upgrade Plan)</span>) : (<></>)}
                </label>
                <textarea
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                  disabled={user?.subscription?.plan?.specific_subject == 0 ? true : false}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg placeholder-gray-400"
                  placeholder="Topic focus prompt from the document"
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
                  onClick={() => { generatePaper() }}
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
                      className={`pb-3 px-1 border-b-2 font-medium transition-colors ${activeTab === tab
                        ? "border-blue-600 text-blue-600"
                        : "border-transparent text-gray-500 hover:text-gray-700"
                        }`}
                    >
                      {tab.charAt(0).toUpperCase() + tab.slice(1)}
                    </button>
                  ))}
                </div>
              </div>
              {generating ? (<div className="flex w-full items-center justify-center bg-gray-50 rounded-xl p-6 max-h-[500px] shadow-inner"><Processor /></div>) : (
                <>
                  {/* Questions/Answers Content */}
                  <div className="bg-gray-50 rounded-xl p-6 max-h-[500px] overflow-y-auto shadow-inner">
                    {activeTab === "questions" ? (
                      <>
                        {generated?.is_error ? (
                          <div className="text-red-400 py-4 px-4 text-center w-full flex flex-col items-center justify-center">
                            <FaExclamationCircle size={40} />
                            <span className="my-2">{generated?.error_msg}</span>
                          </div>
                        ) : (
                          <>
                            {generated?.questions?.map((mcq, qindex) => (
                              <div key={qindex} className="mb-6 last:mb-0 bg-white p-4 rounded-lg shadow-sm">
                                <h3 dir={`${language == "Arabic" ? "rtl" : "ltr"}`} className="font-medium text-gray-800 mb-4">{qindex + 1}. {mcq?.question}</h3>
                                <div className="grid gap-2" dir={`${language == "Arabic" ? "rtl" : "ltr"}`}>
                                  {mcq?.options?.map((option, index) => (
                                    <label
                                      dir={`${language == "Arabic" ? "rtl" : "ltr"}`}
                                      key={"o"+index}
                                      labelFor={"q"+qindex}
                                      className="flex items-center space-x-3 p-3 hover:bg-blue-50 rounded cursor-pointer"
                                    >
                                      <input
                                      id={`q${qindex}`}
                                        type="radio"
                                        name={`q${qindex}`}
                                        className="h-5 w-5 text-blue-600 border-gray-300"
                                      />
                                      <span className="text-gray-700">{option}</span>
                                    </label>
                                  ))}
                                </div>
                              </div>))}
                          </>
                        )}
                      </>
                    ) : (
                      <div className="space-y-4">
                        {generated?.answers?.map((qans, aindex) => (
                          <div key={"a"+aindex} className="bg-green-50 p-4 rounded-lg" dir={`${language == "Arabic" ? "rtl" : "ltr"}`}>
                            <p className="font-medium text-gray-800" dir={`${language == "Arabic" ? "rtl" : "ltr"}`}>
                              {aindex + 1}. {qans?.answer}
                            </p>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </>
              )}

              {/* Action Buttons */}
              <div className="flex justify-between pt-6">
                <button
                  disabled={generating}
                  onClick={() => setStep(2)}
                  className="px-6 py-2 text-gray-600 hover:text-blue-600 font-medium transition-colors"
                >
                  ← Back
                </button>
                <div className="flex gap-3">

                  {/* PDF Download Button */}
                  <button
                  onClick={()=>{downloadPaper('pdf')}}
                    disabled={generating || streaming || !download_formats?.includes('PDF')}
                    className="inline-flex items-center disabled:opacity-50 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
                  >
                    <FaFilePdf className="w-4 h-4" />
                  </button>

                  {/* PPT Download Button */}


                  <button
                  onClick={()=>{downloadPaper('ppt')}}
                    disabled={generating || streaming || !download_formats?.includes('PPTX')}
                    className="inline-flex items-center disabled:opacity-50 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
                  >
                    <FaFilePowerpoint className="w-4 h-4" />
                  </button>



                  {/* DOCX Download Button */}
                  <button
                  onClick={()=>{downloadPaper('docx')}}
                    disabled={generating || streaming || !download_formats?.includes('DOCX')}
                    className="inline-flex items-center disabled:opacity-50 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
                  >
                    <FaFileWord className="w-4 h-4" />
                  </button>



                  {/* Copy Button */}
                  <button
                    onClick={copyQuestions}
                    disabled={generating || streaming}
                    className="inline-flex items-center disabled:opacity-50 bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors"
                  >
                    <FaCopy className="w-4 h-4" />
                  </button>


                </div>
              </div>


            </div>
          )}
        </div>
      </>)}
    </>
  );
}