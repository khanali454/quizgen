import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Upload, RefreshCw, FileText, Trash2 } from "lucide-react";
import HomeLoader from '../../components/HomeLoader';
import Processor from '../../components/Processor';
import ConfirmBox from '../../components/ConfirmBox';
import toast from 'react-hot-toast';
import axios from "axios";
import { useRef } from "react";
import { useTranslation } from "react-i18next";

export default function AllFiles() {
  const [t, i18n] = useTranslation("global"); // translations handling
  const [file, setFile] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [files, setFiles] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [uploading, setUploading] = useState(false);


  const fileRef = useRef(null);

  // for handling delete item - states
  const [showConfirm, setShowConfirm] = useState(false);
  const [delete_item, setDeleteItem] = useState(null);
  const [deleting, setDeleting] = useState(false);

  const handleDrop = (event) => {
    event.preventDefault();
    const newFile = event.dataTransfer.files[0];
    setFile(newFile);
  };

  const handleFileSelect = (event) => {
    const newFile = event.target.files[0];
    setFile(newFile);
  };



  let token = localStorage.getItem('token');


  // Load files API calling
  const fetchFiles = (page = 1) => {
    axios.get(`${import.meta.env.VITE_API_BASE_URL}/files?page=${page}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then((response) => {
        setFiles(response?.data?.files?.data);
        setTotalPages(response?.data?.files?.last_page);
      })
      .catch((error) => {
        console.error("Error in fetching files:", error);
        toast.error(error?.message);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    setLoading(true);
    fetchFiles(currentPage);
  }, [currentPage])

  // on clicking delete button
  const handleDelete = async (bid) => {
    setDeleteItem(bid);
    setShowConfirm(true);
  }
  // on confirming delete
  const proceedDelete = () => {
    if (delete_item != null) {
      setDeleting(true);
      try {
        axios.delete(`${import.meta.env.VITE_API_BASE_URL}/files/${delete_item}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }).then((response) => {
          if (response?.data?.status) {
            toast.success(response?.data?.msg);
            fetchFiles(1);
          } else {
            toast.error(response?.data?.msg);
          }
        }).catch((error) => {
          toast.error(error?.message);
        }).finally(() => {
          setDeleting(false);
          setShowConfirm(false);
          setDeleteItem(null);
        });
      } catch (error) {
        console.log("Please report us with the given below error:- \n");
        console.log("File deleting error : ", error);
        console.error('Something went wrong while deleting the file');
      }
    }
  }




  useEffect(() => {
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
          fetchFiles();
        } else {
          toast.error(response?.data?.msg);
        }
      }).catch((error) => {
        toast.error(error?.response?.data?.msg || error?.message);
      }).finally(() => {
        setUploading(false);
        if (fileRef.current) {
          fileRef.current.value = "";
        }
        // setFile(null);
      });
    }
  }, [file])

  return (
    <>
      {loading ? (
        <><HomeLoader /> </>
      ) : (
        <>
          <div className="flex flex-col items-center p-2">
            {/* Grid Layout for Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-6 w-full max-w-6xl">
              {/* Upload Card */}


              <label
                onDrop={handleDrop}
                onDragOver={(e) => e.preventDefault()}
                className="relative flex flex-col items-center justify-center border-2 border-dashed border-gray-300 
          p-6 rounded-2xl bg-white shadow-lg cursor-pointer hover:bg-gray-100 w-full"
              >
                <Upload className="w-12 h-12 text-blue-500" />
                <p className={`mt-2 ${uploading ? "text-gray-400" : "text-gray-700"} font-medium text-sm text-center`}>
                  {t("Drag & Drop or Click to Upload")}
                </p>
                <input type="file" ref={fileRef} disabled={uploading} onChange={handleFileSelect} className="hidden" />
                {uploading && (<div className="flex items-center justify-center text-gray-400"><Processor widthValue={4} heightValue={4} borderColorValue="primary" /> <span className="ml-2">{t("Please wait")}</span> </div>)}

              </label>


              {/* File Cards */}
              {files.map((file, index) => (
                <div key={index} className="relative group overflow-hidden rounded-2xl shadow-lg bg-gray-100 border-gray-200 border p-4 flex flex-col 
            items-center w-full">

                  {/* Delete Button */}
                  <button
                    onClick={() => handleDelete(file.id)}
                    className="absolute top-2 right-2 p-2 rounded-full shadow-md hover:bg-red-50 hover:text-red-600 transition-colors"
                  >
                    <Trash2 className="w-5 h-5 text-gray-600 hover:text-red-600" />
                  </button>

                  {/* File Name */}
                  <div className="flex items-center mt-4 gap-2 bg-white p-2 rounded-lg shadow-sm w-full max-w-[220px]">
                    <FileText className="w-5 h-5 text-gray-600" />
                    <p className="text-sm font-medium text-gray-700 truncate w-full" title={file.name}>{file.name}</p>
                  </div>

                  {/* Generate New Quiz Button */}
                  <Link to={`/mcq/new/${file?.id}`}>
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      // animate={{ opacity: [0.5, 1, 0.5], transition: { repeat: Infinity, duration: 1.5 } }}
                      className="mt-4 px-4 text-nowrap py-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold rounded-full 
                shadow-md flex items-center"
                    >
                      <RefreshCw className="w-5 h-5 mr-2" />
                      {t("Generate New Quiz")}
                    </motion.button>
                  </Link>
                </div>
              ))}
            </div>

            {/* Pagination Controls */}
            <div className="mt-8 flex items-center space-x-4">

              {/* Previous Button */}
              <button
                disabled={currentPage === 1}
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                className="px-4 py-2 bg-gray-300 hover:bg-gray-400 text-gray-800 font-medium rounded-lg shadow-md 
          disabled:opacity-50 disabled:cursor-not-allowed transition-all"
              >
                ←
              </button>

              {/* Page Number Display */}
              <span className="text-lg font-semibold bg-blue-100 text-blue-700 px-4 py-2 rounded-lg shadow-md">
                Page {currentPage} of {totalPages}
              </span>

              {/* Next Button */}
              <button
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                className="px-4 py-2 bg-gray-300 hover:bg-gray-400 text-gray-800 font-medium rounded-lg shadow-md 
          disabled:opacity-50 disabled:cursor-not-allowed transition-all"
              >
                →
              </button>
            </div>
          </div>

          {/* confirm box */}
          {showConfirm && (
            <ConfirmBox
              message={t("Are you sure you want to proceed") + "?"}
              buttonText={deleting ? (<div className='flex items-center justify-center'><Processor borderColorValue='white' widthValue={4} heightValue={4} /> <span className="ml-2">{t("Confirm")}</span> </div>) : (<>{t("Confirm")}</>)}
              onConfirm={() => {
                proceedDelete();
              }}
              onCancel={() => setShowConfirm(false)}
            />
          )}
        </>
      )}
    </>
  );
}