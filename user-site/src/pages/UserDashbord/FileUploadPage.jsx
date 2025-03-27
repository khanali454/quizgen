import React, { useState } from "react";
import SidebarWithBurgerMenu from "../../components/SidebarWithBurgerMenu";
import { useTranslation } from "react-i18next";

export function FileUploadPage() {
  const [file, setFile] = useState(null);
  const [t, i18n] = useTranslation("global"); // translations handling

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (file) {
      alert(`File Uploaded: ${file.name}`);
      // Implement upload logic here
    } else {
      alert(t("Please select a file first"));
    }
  };

  return (
    <div className="flex">
      <SidebarWithBurgerMenu />
      <div className="flex-1 p-6">
        <h2 className="text-2xl font-bold mb-4">Upload File</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="file"
            onChange={handleFileChange}
            className="border p-2 w-full rounded"
          />
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default FileUploadPage;
