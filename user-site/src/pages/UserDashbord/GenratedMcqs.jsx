import { Link } from "react-router-dom"; 
import SidebarWithBurgerMenu from "../../components/SidebarWithBurgerMenu";
import { useState } from "react";
import { motion } from "framer-motion";
import { Upload, RefreshCw, FileText, Trash2, PlusSquare} from "lucide-react"; 


export default function GeneratedMcqs() {
  const [file, setFile] = useState(null);

  const handleDrop = (event) => {
    event.preventDefault();
    const newFile = event.dataTransfer.files[0];
    setFile(newFile);
  };

  const handleFileSelect = (event) => {
    const newFile = event.target.files[0];
    setFile(newFile);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 p-6 absolute top-[90px] left-0 md:left-[250px]">
       {/* Upload Card */}
       <label
        onDrop={handleDrop}
        onDragOver={(e) => e.preventDefault()}
        className="relative flex flex-col items-center justify-center border-2 border-dashed border-blue-400 p-6 rounded-2xl bg-gray-100 cursor-pointer hover:bg-gray-200"
      >
        <PlusSquare className="w-12 h-12 text-blue-500" />
        <p className="mt-2 text-gray-700 font-medium text-sm">Create a new quiz</p>
        <input
          type="file"
          onChange={handleFileSelect}
          className="hidden"
        />
        {file && (
          <div className="absolute top-2 right-2 bg-white p-2 rounded-lg shadow-md flex items-center gap-2">
            <FileText className="w-5 h-5 text-gray-600" />
          </div>
        )}
      </label>
      
      {/* Generated Cards */}
      {[
        "VeryLongFileNameExampleThatShouldBeTruncated.pdf",
        "AnotherSuperLongFileNameForTestingPurposes.docx",
        "ShortFile.txt"
      ].map((fileName, index) => (
        <div key={index} className="relative group overflow-hidden rounded-2xl shadow-lg bg-gray-200 p-4 flex flex-col items-center">
              {/* Delete Button */}
          <button
            onClick={() => handleDelete(fileName)}
            className="absolute top-2 right-2 p-2 rounded-full shadow-md hover:bg-red-50 hover:text-red-600 transition-colors"
          >
            <Trash2 className="w-5 h-5 text-gray-600 hover:text-red-600" />
          </button>

          <div className="flex items-center mr-7 mt-5 gap-2 bg-white p-2 rounded-lg shadow-sm w-full max-w-[200px]">
            <FileText className="w-5 h-5 text-gray-600" />
            <p className="text-sm font-medium text-gray-700 truncate w-full" title={fileName}>{fileName}</p>
          </div>

          <motion.button
            whileHover={{ scale: 1.1 }}
            animate={{ opacity: [0.5, 1, 0.5], transition: { repeat: Infinity, duration: 1.5 } }}
            className="mt-4 px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold rounded-full shadow-md flex items-center"
          >
            <RefreshCw className="w-5 h-5 mr-2" /> Download Again
          </motion.button>
        </div>
      ))}
    </div>
  );
}