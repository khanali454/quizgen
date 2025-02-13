// HeroSection 
import heroImage from "../assets/heroimage.svg";
 const HeroSection = () => {
    return (
 <section className="dark:bg-gray-100 dark:text-gray-800">
	<div className="container flex flex-col justify-center p-8 mx-auto sm:py-12 lg:py-24 lg:flex-row lg:justify-between">
		<div className="flex flex-col justify-center p-6 text-center rounded-sm lg:max-w-md xl:max-w-lg lg:text-left">
			<h1 className="text-5xl font-bold leading-none sm:text-6xl">Smart
				<span className="dark:text-indigo-600"> Quiz </span> generator
			</h1>
			<p className="mt-6 mb-8 text-lg sm:mb-12">Crafting engaging quizzes can be a real headache, eating up hours of your time. What if there was a smarter solution?
				<br  className="hidden md:inline lg:hidden" /> Enter free AI Quiz Generator - your go-to tool for swift and efficient quiz creation.
			</p>
			<div className="flex flex-col space-y-4 sm:items-center sm:justify-center sm:flex-row sm:space-y-0 sm:space-x-4 lg:justify-start">
				<a rel="noopener noreferrer" href="/login" className="px-8 py-3 text-lg font-semibold rounded dark:bg-indigo-700 dark:text-gray-50">Generate MCQs</a>
			</div>
		</div>
		<div className="flex items-center justify-center p-6 mt-8 lg:mt-0 h-72 sm:h-80 lg:h-96 xl:h-112 2xl:h-128">
			<img  src={heroImage} alt="Hero image" className="object-contain h-72 sm:h-80 lg:h-96 xl:h-112 2xl:h-128" />
		</div>
	</div>
</section>
    );
 };
 export default HeroSection;