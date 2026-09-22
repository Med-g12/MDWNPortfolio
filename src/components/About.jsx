import React, { useState } from "react";
import abtmeImg from "../assets/abtmeimg.jpg";

const About = () => {
	const [isExpanded, setIsExpanded] = useState(false);
	const aboutText =
		"I'm Medwin Gardose. I enjoy designing and building things with attention to detail, combining creativity with logic. I'm naturally curious and always exploring new ways to make projects both functional and visually appealing. I'm fascinated by how design and technology intersect, and I strive to create work that is thoughtful, intentional, and polished. Every project is an opportunity to learn, experiment, and push the boundaries of what's possible while keeping things practical and user-friendly.";
	const previewText =
		"I'm Medwin Gardose. I enjoy designing and building things with attention to detail, combining creativity with logic. I'm naturally curious and always exploring new ways...";

	return (
		<div id="about" className="my-20 lg:my-40 px-6 sm:px-10 lg:px-0">
			<div
				className="py-3 pr-12 sm:pr-50 px-6 text-lg rounded-full w-fit border-2 transition"
				style={{
					borderImage: "linear-gradient(to right, #9ca3af, transparent) 1",
				}}
			>
				About Me
			</div>

			<div className="flex flex-col lg:flex-row justify-between mt-8 lg:mt-5 items-start lg:items-center gap-12 lg:gap-20">
				<div className="w-full lg:w-auto flex justify-center lg:justify-start">
					<img
						src={abtmeImg}
						alt="Medwin Gardose"
						className="h-80 sm:h-96 lg:h-120 w-auto rounded-2xl object-cover shadow-2xl"
					/>
				</div>

				<div className="w-full lg:w-auto max-w-none lg:max-w-2xl">
					<h1 className="text-4xl sm:text-5xl font-light mb-8 sm:mb-15">
						So, Who am I?
					</h1>
					<button
						type="button"
						className="w-full cursor-pointer text-left text-base leading-relaxed text-gray-600 transition-colors hover:text-gray-800 focus:outline-none dark:text-gray-300 dark:hover:text-white sm:hidden"
						onClick={() => setIsExpanded((current) => !current)}
						aria-expanded={isExpanded}
					>
						{isExpanded ? aboutText : previewText}
					</button>
					<p className="hidden text-base leading-relaxed text-gray-600 dark:text-gray-300 sm:block sm:text-lg lg:w-160">
						{aboutText}
					</p>
					<a href="#footer">
						<button className="mt-10 cursor-pointer rounded-full bg-green-200 px-8 py-3 font-semibold text-gray-900 shadow-lg transition hover:bg-green-300 dark:bg-white dark:text-black dark:hover:bg-gray-200 sm:mt-15">
							Contact Me
						</button>
					</a>
				</div>
			</div>
		</div>
	);
};

export default About;
