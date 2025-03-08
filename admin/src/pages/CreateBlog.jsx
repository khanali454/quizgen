import { useState } from 'react';
import Breadcrumb from '../components/Breadcrumbs/Breadcrumb';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { FaUpload } from 'react-icons/fa';
import axios from 'axios';
import toast from 'react-hot-toast';
import Processor from '../common/Processor';

const CreateBlog = () => {
  const [title, setTitle] = useState('');
  const [featureImage, setFeatureImage] = useState(null);
  const [imagePreview, setImagePreview] = useState('');
  const [content, setContent] = useState('');
  const [processing, setProcessing] = useState(false);

  const handleContentChange = (value) => {
    setContent(value);
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFeatureImage(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setProcessing(true);

    const token = localStorage.getItem('adminAuthToken');
    if (!token) {
      toast.error('Authentication token missing');
      setProcessing(false);
      return;
    }

    const formData = new FormData();
    formData.append('title', title);
    formData.append('feature_image', featureImage);
    formData.append('content', content);

    try {
      const response = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/admin/blogs`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });

      toast.success('Blog created successfully');
      setTitle('');
      setFeatureImage(null);
      setImagePreview('');
      setContent('');
    } catch (error) {
      toast.error(error.response?.data?.msg || 'Failed to create blog');
    } finally {
      setProcessing(false);
    }
  };

  return (
    <>
      <Breadcrumb pageName="Create New Blog" />
      <div className="grid grid-cols-1 gap-9">
        <div className="flex flex-col gap-9">
          <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
              <h3 className="font-medium text-black dark:text-white">Add New Blog</h3>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="p-6.5">
                <div className="mb-4.5">
                  <label className="mb-2.5 block text-black dark:text-white">Blog Title</label>
                  <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Enter blog title"
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none focus:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white"
                  />
                </div>
                <div className="mb-4.5">
                  <label className="mb-2.5 block text-black dark:text-white">Feature Image</label>
                  <div className="relative border-dotted border-2 border-gray-400 p-4 text-center">
                    {!imagePreview ? (
                      <>
                        <FaUpload className="text-gray-400 mb-2" size={40} />
                        <p className="text-gray-400">Drag or click to upload image</p>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleImageUpload}
                          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                        />
                      </>
                    ) : (
                      <>
                        <img src={imagePreview} alt="Preview" className="w-full h-auto object-cover rounded-md mb-4" />
                        <button type="button" onClick={() => setImagePreview('')} className="mt-2 text-red-500 hover:text-red-700">Remove Image</button>
                      </>
                    )}
                  </div>
                </div>
                <div className="mb-4.5">
                  <label className="mb-2.5 block text-black dark:text-white">Content</label>
                  <ReactQuill
                    value={content}
                    onChange={handleContentChange}
                    placeholder="Write the content here..."
                    modules={{
                      toolbar: [
                        [{ header: '1' }, { header: '2' }, { font: [] }],
                        [{ list: 'ordered' }, { list: 'bullet' }],
                        [{ align: [] }],
                        ['bold', 'italic', 'underline'],
                        ['link', 'image', 'blockquote'],
                        [{ script: 'sub' }, { script: 'super' }],
                        [{ indent: '-1' }, { indent: '+1' }],
                        [{ direction: 'ltr' }, { direction: 'rtl' }],
                        ['clean'],
                      ],
                    }}
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent text-black outline-none focus:border-primary dark:border-form-strokedark py-4 px-4 dark:bg-form-input dark:text-white"
                  />
                </div>
                <button type="submit" className="flex w-full justify-center rounded bg-primary p-3 font-medium text-gray hover:bg-opacity-90">
                  {processing ? (
                    <div className='flex items-center justify-center'>
                      <Processor borderColorValue='white' widthValue={4} heightValue={4} />
                      <span className="ml-2">Creating Blog...</span>
                    </div>
                  ) : (
                    <>Create Blog</>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default CreateBlog;
