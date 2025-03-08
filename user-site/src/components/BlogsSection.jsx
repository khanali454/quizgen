import { AlertCircle } from "lucide-react"; // icon for no data
import { Link } from "react-router-dom";

const BlogSection = ({ recent_blogs }) => {
  return (
    <section className="py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 className="text-center text-4xl font-bold text-gray-900 mb-14">
          Recent Blogs
        </h2>

        {/* If there are no blogs, show a message */}
        {recent_blogs.length === 0 ? (
          <div className="flex flex-col items-center justify-center w-full p-6 mt-6 rounded-lg">
            <AlertCircle className="w-10 h-10 text-gray-500" />
            <p className="mt-2 text-sm text-gray-600">No blog was found</p>
          </div>
        ) : (
          <div className="flex flex-wrap justify-center gap-y-8 lg:gap-y-0 lg:flex-nowrap lg:flex-row lg:justify-between lg:gap-x-8 mb-14">
            {recent_blogs.map((blog, index) => (
              <Link
              to={`/blog/${blog?.id}`}
                key={index}
                className="group cursor-pointer w-full max-lg:max-w-xl lg:w-1/3 border border-gray-300 rounded-2xl p-5 transition-all duration-300 hover:border-indigo-600"
              >
                <div className="flex items-center mb-6">
                  <img
                    src={blog?.feature_image}
                    alt={blog?.author?.name + " image"}
                    className="rounded-lg w-full object-cover"
                  />
                </div>
                <div>
                  <h4 className="text-gray-900 font-medium leading-8 mb-9">
                    {blog?.title}
                  </h4>
                  <div className="flex items-center justify-between font-medium">
                    <h6 className="text-sm text-gray-500">By {blog?.author?.name}</h6>
                    <span className="text-sm text-indigo-600">
                      {new Date(blog?.created_at).toDateString()}
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}

        {/* View All Blogs Button */}
        {recent_blogs.length > 0 && (
          <a
            href="/blogs"
            className="cursor-pointer border border-gray-300 shadow-sm rounded-full py-3.5 px-7 w-52 flex justify-center items-center text-gray-900 font-semibold mx-auto transition-all duration-300 hover:bg-gray-100"
          >
            View All
          </a>
        )}
      </div>
    </section>
  );
};

export default BlogSection;
