import { useEffect, useState } from "react";
import pfp from "../assets/abtmeimg.jpg";
import SkillsCarousel from "./SkillsCarousel";

const Home = () => {
	const [isLoaded, setIsLoaded] = useState(false);

	useEffect(() => {
		const timer = setTimeout(() => {
			setIsLoaded(true);
		}, 100);
		return () => clearTimeout(timer);
	}, []);

	return (
		<main id="home" className="pt-20">
			<header className="relative hidden h-full w-full flex-col items-end justify-between px-5 lg:flex lg:flex-row lg:px-0">
				<div
					className={`w-full text-center transition-all duration-700 ease-out animate-on-load lg:w-auto lg:text-left ${
						isLoaded ? "translate-x-0 opacity-100" : "-translate-x-5 opacity-0"
					}`}
				>
					<h1 className="font-extralight text-[68px] leading-[62px] lg:text-[150px] lg:leading-[145px]">
						Medwin
						<br className="block lg:inline" /> Gardose
					</h1>
				</div>

				<section
					className={`mx-auto mt-8 flex w-full max-w-md flex-col items-center transition-all duration-700 ease-out lg:mx-0 lg:mb-8 lg:mt-10 lg:gap-60 lg:items-end ${
						isLoaded ? "translate-x-0 opacity-100" : "translate-x-5 opacity-0"
					}`}
				>
					<img
						src={pfp}
						alt="Medwin Gardose"
						className="mb-4 w-64 rounded-2xl shadow-2xl lg:w-70"
					/>
					<p className="px-4 text-center text-sm font-semibold leading-relaxed lg:px-0 lg:text-right lg:leading-5">
						I'm Medwin Gardose, <br className="hidden lg:inline" />a web
						developer crafting modern, <br className="hidden lg:inline" />
						responsive, and user-friendly websites.
					</p>
				</section>
			</header>

			<section className="relative overflow-x-clip px-5 lg:hidden" aria-labelledby="mobile-home-title">
				<div
					className={`relative z-10 -mr-5 flex justify-end transition-all duration-700 ease-out ${
						isLoaded
							? "translate-x-0 opacity-100"
							: "translate-x-8 opacity-0"
					}`}
				>
					<div className="h-64 sm:h-80 w-[16.5rem] sm:w-[22rem] overflow-hidden rounded-l-full border-y border-l border-gray-200 bg-white/40 shadow-2xl dark:border-white/20 dark:bg-black/15">
						<img
							src={pfp}
							alt="Medwin Gardose"
							className="h-full w-full object-cover object-center"
						/>
					</div>
				</div>

				<div className="relative max-w-[22rem] sm:max-w-[28rem] text-gray-900 dark:text-white">
					<div
						className={`relative z-10 mt-6 transition-all duration-700 ease-out ${
							isLoaded
								? "translate-x-0 opacity-100"
								: "-translate-x-8 opacity-0"
						}`}
					>
						<h1
							id="mobile-home-title"
							className="text-5xl sm:text-6xl font-extralight leading-[2.9rem] sm:leading-[3.5rem] tracking-normal"
						>
							Medwin
							<br />
							Gardose
						</h1>
						<p className="mt-4 max-w-[16rem] sm:max-w-[22rem] text-xs sm:text-sm font-light leading-5 sm:leading-6 text-gray-600 dark:text-gray-300">
							I build modern, responsive, and user-friendly websites with a
							focus on clean interfaces and practical details.
						</p>
					</div>

					<div className="relative z-10 mt-6">
						<a
							href="#projects"
							className={`inline-flex h-12 sm:h-11 items-center justify-center rounded-full bg-green-200 px-7 sm:px-6 text-xs sm:text-sm font-semibold text-gray-900 shadow-md transition-all duration-700 delay-150 ease-out hover:bg-green-300 dark:bg-white dark:text-black dark:hover:bg-gray-200 ${
								isLoaded
									? "translate-y-0 scale-100 opacity-100"
									: "translate-y-4 scale-95 opacity-0"
							}`}
						>
							Discover work
						</a>
					</div>
				</div>

				{/* Full-width carousel consuming website width */}
				<div className="-mx-5 sm:-mx-8 mt-7">
					<SkillsCarousel
						compact
						className={`w-full transition-all duration-700 delay-300 ease-out ${
							isLoaded
								? "translate-y-0 scale-100 opacity-100"
								: "translate-y-4 scale-95 opacity-0"
						}`}
					/>
				</div>
			</section>

			<SkillsCarousel className="hidden lg:block" />
		</main>
	);
};

export default Home;


