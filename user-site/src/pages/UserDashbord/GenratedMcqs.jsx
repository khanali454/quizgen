import { Link } from "react-router-dom"; 
import SidebarWithBurgerMenu from "../../components/SidebarWithBurgerMenu";
import { useState } from "react";
import { motion } from "framer-motion";
import { Upload, RefreshCw, FileText, Trash2, PlusSquare} from "lucide-react"; 



export default function GeneratedMcqs() {
  const [file, setFile] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const filesPerPage = 8; // Desktop: 3 cards per row, total 9 per page

  const handleDrop = (event) => {
    event.preventDefault();
    const newFile = event.dataTransfer.files[0];
    setFile(newFile);
  };

  const handleFileSelect = (event) => {
    const newFile = event.target.files[0];
    setFile(newFile);
  };

  const handleDelete = (fileName) => {
    console.log("Deleted file:", fileName);
  };

  // Sample File Names (Replace with actual data)
  const fileNames = Array.from({ length: 27 }, (_, i) => `File_${i + 1}.pdf`);

  // Pagination Logic
  const indexOfLastFile = currentPage * filesPerPage;
  const indexOfFirstFile = indexOfLastFile - filesPerPage;
  const currentFiles = fileNames.slice(indexOfFirstFile, indexOfLastFile);

  const totalPages = Math.ceil(fileNames.length / filesPerPage);

  return (
    <div className="flex flex-col items-center mt-[60px] lg:ml-[100px]"> 
      {/* Grid Layout for Cards */}
     <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-6 w-full max-w-6xl">
        
        {/* Upload Card */}
        <label
          onDrop={handleDrop}
          onDragOver={(e) => e.preventDefault()}
          className="relative flex flex-col items-center justify-center border-2 border-dashed border-blue-400 
          p-6 rounded-2xl bg-gray-100 cursor-pointer hover:bg-gray-200 w-full"
        >
          <PlusSquare className="w-12 h-12 text-blue-500" />
          <p className="mt-2 text-gray-700 font-medium text-sm text-center">Create a new quiz</p>
          <input type="file" onChange={handleFileSelect} className="hidden" />
          {file && (
            <div className="absolute top-2 right-2 bg-white p-2 rounded-lg shadow-md flex items-center gap-2">
              <FileText className="w-5 h-5 text-gray-600" />
            </div>
          )}
        </label>

        {/* File Cards */}
        {currentFiles.map((fileName, index) => (
          <div key={index} className="relative group overflow-hidden rounded-2xl shadow-lg bg-gray-200 p-4 flex flex-col 
            items-center w-full">
            
            {/* Delete Button */}
            <button
              onClick={() => handleDelete(fileName)}
              className="absolute top-2 right-2 p-2 rounded-full shadow-md hover:bg-red-50 hover:text-red-600 transition-colors"
            >
              <Trash2 className="w-5 h-5 text-gray-600 hover:text-red-600" />
            </button>

            {/* File Name */}
            <div className="flex items-center mt-4 gap-2 bg-white p-2 rounded-lg shadow-sm w-full max-w-[220px]">
              <FileText className="w-5 h-5 text-gray-600" />
              <p className="text-sm font-medium text-gray-700 truncate w-full" title={fileName}>{fileName}</p>
            </div>

            {/* Download Again Button */}
            <motion.a
  whileHover={{ scale: 1.1 }}
  animate={{ opacity: [0.5, 1, 0.5], transition: { repeat: Infinity, duration: 1.5 } }}
  href="./download-view" // Yahan apni link daalain
  target="_blank"
  rel="noopener noreferrer"
  className="mt-4 px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold rounded-full 
  shadow-md flex items-center"
>
  <RefreshCw className="w-5 h-5 mr-2" /> Download & View
</motion.a>

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
  );
}
