const BlogSection = () => {
    return (
      <section className="py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-center text-4xl font-bold text-gray-900 mb-14">
            Our Popular Blogs
          </h2>
          <div className="flex flex-wrap justify-center gap-y-8 lg:gap-y-0 lg:flex-nowrap lg:flex-row lg:justify-between lg:gap-x-8 mb-14">
            {blogData.map((blog, index) => (
              <div
                key={index}
                className="group cursor-pointer w-full max-lg:max-w-xl lg:w-1/3 border border-gray-300 rounded-2xl p-5 transition-all duration-300 hover:border-indigo-600"
              >
                <div className="flex items-center mb-6">
                  <img
                    src={blog.image}
                    alt={blog.author + " image"}
                    className="rounded-lg w-full object-cover"
                  />
                </div>
                <div>
                  <h4 className="text-gray-900 font-medium leading-8 mb-9">
                    {blog.title}
                  </h4>
                  <div className="flex items-center justify-between font-medium">
                    <h6 className="text-sm text-gray-500">By {blog.author}</h6>
                    <span className="text-sm text-indigo-600">{blog.date}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <a
            href="./all-blogs"
            className="cursor-pointer border border-gray-300 shadow-sm rounded-full py-3.5 px-7 w-52 flex justify-center items-center text-gray-900 font-semibold mx-auto transition-all duration-300 hover:bg-gray-100"
          >
            View All
          </a>
        </div>
      </section>
    );
  };
  
  const blogData = [
    {
      image: "https://pagedone.io/asset/uploads/1696244553.png",
      title: "Fintech 101: Exploring the Basics of Electronic Payments",
      author: "Harsh C.",
      date: "2 years ago",
    },
    {
      image: "https://pagedone.io/asset/uploads/1696244579.png",
      title: "From Classroom to Cyberspace: The Growing Influence of EdTech in Fintech",
      author: "John D.",
      date: "2 years ago",
    },
    {
      image: "https://pagedone.io/asset/uploads/1696244619.png",
      title: "Fintech Solutions for Student Loans: Easing the Burden of Education Debt",
      author: "Alexa H.",
      date: "2 years ago",
    },
  ];
  
  export default BlogSection;
  