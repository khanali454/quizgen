import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Breadcrumb from '../components/Breadcrumbs/Breadcrumb';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { FaUpload } from 'react-icons/fa';
import axios from 'axios';
import toast from 'react-hot-toast';
import Processor from '../common/Processor';
import Loader from '../common/Loader';

const EditBlog = () => {
  const { id } = useParams();
  const [title, setTitle] = useState('');
  const [featureImage, setFeatureImage] = useState(null);
  const [existingImage, setExistingImage] = useState('');
  const [imagePreview, setImagePreview] = useState('');
  const [content, setContent] = useState('');
  const [processing, setProcessing] = useState(false);
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem('adminAuthToken');

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_BASE_URL}/admin/blog/${id}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        const { data } = response.data;
        setTitle(data?.title);
        // Since image paths are already absolute, we use them directly
        const imageUrl = data?.feature_image || '';
        setExistingImage(imageUrl);
        setImagePreview(imageUrl);
        setContent(data?.content);
      } catch (error) {
        console.log("error : ",error);
        toast.error(error.response?.data?.msg || 'Failed to fetch blog');
      } finally {
        setLoading(false);
      }
    };
    fetchBlog();
  }, [id, token]);

  const handleContentChange = (value) => {
    setContent(value);
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validate file type is an image
      if (!file.type.startsWith('image/')) {
        toast.error('Please select a valid image file.');
        return;
      }
      setFeatureImage(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const removeImage = () => {
    // Reset the feature image and image preview, indicating removal
    setFeatureImage(null);
    setImagePreview('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setProcessing(true);
  
    if (!title.trim() || !content.trim()) {
      toast.error('Title and content are required.');
      setProcessing(false);
      return;
    }
  
    const formData = new FormData();
    formData.append('title', title);
    formData.append('content', content);
  
    if (featureImage) {
      formData.append('feature_image', featureImage);
    } else if (!imagePreview && existingImage) {
      formData.append('remove_feature_image', 'true');
    }
  
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/admin/blogs/${id}?_method=PUT`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data',
          },
        }
      );
      toast.success(response.data.msg);
    } catch (error) {
      toast.error(error.response?.data?.msg || 'Failed to update blog');
    } finally {
      setProcessing(false);
    }
  };
  

  if (loading) {
    return <Loader/>;
  }

  return (
    <>
      <Breadcrumb pageName="Edit Blog" />
      <div className="grid grid-cols-1 gap-9">
        <div className="flex flex-col gap-9">
          <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
              <h3 className="font-medium text-black dark:text-white">Edit Blog</h3>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="p-6.5">
                <div className="mb-4.5">
                  <label className="mb-2.5 block text-black dark:text-white">
                    Blog Title
                  </label>
                  <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full rounded border-[1.5px] border-stroke py-3 px-5 outline-none dark:border-form-strokedark"
                    required
                  />
                </div>
                <div className="mb-4.5">
                  <label className="mb-2.5 block text-black dark:text-white">
                    Feature Image
                  </label>
                  <div className="relative border-dotted border-2 border-gray-400 p-4 text-center">
                    {!imagePreview ? (
                      <>
                        <FaUpload className="text-gray-400 mb-2" size={40} />
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleImageUpload}
                          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                        />
                      </>
                    ) : (
                      <>
                        <img
                          src={imagePreview}
                          alt="Preview"
                          className="w-full h-auto rounded-md mb-4"
                        />
                        <div className="flex justify-center gap-4">
                         
                          <label className="cursor-pointer text-primary underline">
                            Change Image
                            <input
                              type="file"
                              accept="image/*"
                              onChange={handleImageUpload}
                              className="hidden"
                            />
                          </label>
                        </div>
                      </>
                    )}
                  </div>
                </div>
                <div className="mb-4.5">
                  <label className="mb-2.5 block text-black dark:text-white">
                    Content
                  </label>
                  <ReactQuill
                    value={content}
                    onChange={handleContentChange}
                    className="w-full rounded border-[1.5px] border-stroke py-4 px-4 dark:border-form-strokedark"
                  />
                </div>
                <button
                  type="submit"
                  className="flex w-full justify-center rounded bg-primary p-3 font-medium text-gray hover:bg-opacity-90"
                  disabled={processing}
                >
                  {processing ? (
                    <div className="flex items-center justify-center">
                      <Processor borderColorValue="white" widthValue={4} heightValue={4} />
                      <span className="ml-2">Updating Blog...</span>
                    </div>
                  ) : (
                    <>Update Blog</>
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

export default EditBlog;
