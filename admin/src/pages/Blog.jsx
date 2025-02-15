import { useNavigate } from 'react-router-dom';
import DefaultPagination from '../common/DefaultPagination';
import Breadcrumb from '../components/Breadcrumbs/Breadcrumb';

const blogPosts = [
    {
        id: 1,
        title: "How to Generate Papers with Ease",
        feature_image: "https://img.freepik.com/premium-photo/blog-concept-woman-blogger-reading-writing-online-screen-computer_1150253-537.jpg?semt=ais_hybrid", // Example image URL
        content: "Learn how to generate papers with ease using our platform...",
        created_at: "Feb 13, 2025",
        updated_at: "Feb 13, 2025",
    },
    {
        id: 2,
        title: "Top 5 Study Tips for 2025",
        feature_image: "https://img.freepik.com/free-photo/woman-influencer-presenting-yellow-book-front-recording-smartphone-similing-content-creator-broadcasting-review-social-media-channel-home-studio-with-microphone-laptop_482257-35359.jpg?semt=ais_hybrid", // Example image URL
        content: "In this post, we’ll cover five tips for students in 2025...",
        created_at: "Feb 10, 2025",
        updated_at: "Feb 10, 2025",
    },
    {
        id: 3,
        title: "Understanding the Basics of AI in Education",
        feature_image: "https://img.freepik.com/premium-photo/social-media-blog-concept-futuristic-icon-design-graphics-hand-with-smartphone_102583-6104.jpg?semt=ais_hybrid", // Example image URL
        content: "AI is transforming the education sector, and here’s how...",
        created_at: "Feb 5, 2025",
        updated_at: "Feb 5, 2025",
    },
];

const Blog = () => {

    const handleEdit = (index) => {
        console.log(`Editing blog post at index: ${index}`);
    };

    const navigate = useNavigate();

    const handleDelete = (index) => {
        console.log(`Deleting blog post at index: ${index}`);
    };

    return (
        <>
            <Breadcrumb pageName="Blog" />
            <div className="flex flex-col gap-10">
                <div className="rounded-sm border border-stroke bg-white px-4 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark xl:pb-1">
                    <div className="flex items-center justify-between mt-5 mb-3">
                        {/* Left Side: Search Bar */}
                        <div className="flex items-center w-1/3">
                            <input
                                type="search"
                                name="search"
                                placeholder="Search blogs..."
                                className="w-full px-4 py-1 border border-gray-300 rounded focus:outline-none"
                            />
                        </div>
                        {/* Right Side: Button */}
                        <button onClick={()=>{navigate('/blog/new')}} className="px-4 text-sm py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition">
                            Create Blog
                        </button>
                    </div>

                    <div>

                        <div className="max-w-full overflow-x-auto">
                            <table className="w-full table-auto">
                                <thead>
                                    <tr className="bg-gray-2 text-left dark:bg-meta-4">
                                        <th className="min-w-[200px] py-4 px-4 font-medium text-black dark:text-white">Image</th>
                                        <th className="min-w-[220px] py-4 px-4 font-medium text-black dark:text-white">Title</th>
                                        <th className="min-w-[200px] py-4 px-4 font-medium text-black dark:text-white">content</th>
                                        <th className="min-w-[200px] py-4 px-4 font-medium text-black dark:text-white">Last Updated</th>
                                        <th className="py-4 px-4 font-medium text-black dark:text-white">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {blogPosts.map((post, index) => (
                                        <tr key={post.id}>
                                            <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                                                <img src={post.feature_image} alt="Feature" className="w-20 h-20 object-cover" />
                                            </td>
                                            <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                                                <h5>{post.title}</h5>
                                            </td>
                                            <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                                                {post.content}
                                            </td>
                                            <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                                                {post.updated_at}
                                            </td>
                                            <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                                                <div className="flex items-center space-x-3.5">
                                                    <button onClick={() => handleEdit(index)} className="hover:text-primary">
                                                        <svg width="18" height="18" fill="currentColor" className="bi bi-pencil-square" viewBox="0 0 16 16">
                                                            <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                                                            <path fillRule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z" />
                                                        </svg>
                                                    </button>
                                                    <button onClick={() => handleDelete(index)} className="hover:text-primary">
                                                        <svg width="18" height="18" fill="currentColor" className="bi bi-trash" viewBox="0 0 16 16">
                                                            <path d="M5.5 5.5a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 0 1h-4a.5.5 0 0 1-.5-.5zM4.118 7h7.764l-.82 6.567A1 1 0 0 1 10.064 15H5.936a1 1 0 0 1-.998-.933L4.118 7z" />
                                                            <path fillRule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H3.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v1zm-1-.5V2h-10v.5h10z" />
                                                        </svg>
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        <DefaultPagination />
                    </div>
                </div>
            </div>
        </>
    );
};

export default Blog;
