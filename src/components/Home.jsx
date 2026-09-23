import { useEffect, useState } from "react";
import pfp from "../assets/portpfp.jpg";
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
		<main id="home" className="mt-28 sm:mt-20 lg:mt-10">
			<header className="relative hidden h-full w-full flex-col items-end justify-between px-5 sm:flex sm:px-8 lg:flex-row lg:px-0">
				<div
					className={`w-full text-center transition-all duration-700 ease-out animate-on-load lg:w-auto lg:text-left ${
						isLoaded ? "translate-x-0 opacity-100" : "-translate-x-5 opacity-0"
					}`}
				>
					<h1 className="font-extralight text-[68px] leading-[62px] sm:mb-8 sm:text-sm sm:leading-[100px] md:text-[130px] md:leading-[120px] lg:text-[150px] lg:leading-[145px]">
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
						className="mb-4 w-64 rounded-2xl shadow-2xl sm:w-72 lg:w-70"
					/>
					<p className="px-4 text-center text-sm font-semibold leading-relaxed sm:text-base lg:px-0 lg:text-right lg:leading-5">
						I'm Medwin Gardose, <br className="hidden sm:inline" />a web
						developer crafting modern, <br className="hidden sm:inline" />
						responsive, and user-friendly websites.
					</p>
				</section>
			</header>

			<section className="relative overflow-x-clip px-5 sm:hidden" aria-labelledby="mobile-home-title">
				<div
					className={`relative z-10 -mr-5 flex justify-end transition-all duration-700 ease-out ${
						isLoaded
							? "translate-x-0 opacity-100"
							: "translate-x-8 opacity-0"
					}`}
				>
					<div className="-mt-8 h-64 w-[16.5rem] overflow-hidden rounded-l-full border-y border-l border-gray-200 bg-white/40 shadow-2xl dark:border-white/20 dark:bg-black/15">
						<img
							src={pfp}
							alt="Medwin Gardose"
							className="h-full w-full object-cover object-center"
						/>
					</div>
				</div>

				<div className="relative mx-auto max-w-[22rem] text-gray-900 dark:text-white">
					<div
						className={`relative z-10 mt-6 transition-all duration-700 ease-out ${
							isLoaded
								? "translate-x-0 opacity-100"
								: "-translate-x-8 opacity-0"
						}`}
					>
						<h1
							id="mobile-home-title"
							className="text-5xl font-extralight leading-[2.9rem] tracking-normal"
						>
							Medwin
							<br />
							Gardose
						</h1>
						<p className="mt-4 max-w-[16rem] text-xs font-light leading-5 text-gray-600 dark:text-gray-300">
							I build modern, responsive, and user-friendly websites with a
							focus on clean interfaces and practical details.
						</p>
					</div>

					<SkillsCarousel
						compact
						className={`relative z-10 mt-5 transition-all duration-700 delay-150 ease-out ${
							isLoaded
								? "translate-y-0 scale-100 opacity-100"
								: "translate-y-4 scale-95 opacity-0"
						}`}
					/>

					<a
						href="#projects"
						className={`relative z-10 mt-5 flex h-14 items-center justify-center rounded-full bg-green-200 text-sm font-semibold text-gray-900 shadow-lg transition-all duration-700 delay-300 ease-out hover:bg-green-300 dark:bg-white dark:text-black dark:hover:bg-gray-200 ${
							isLoaded
								? "translate-y-0 scale-100 opacity-100"
								: "translate-y-4 scale-95 opacity-0"
						}`}
					>
						Discover work
					</a>
				</div>
			</section>

			<SkillsCarousel className="hidden sm:block" />
		</main>
	);
};

export default Home;


