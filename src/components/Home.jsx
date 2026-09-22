import { useEffect, useRef } from "react";
import pfp from "../assets/portpfp.jpg";
import SkillsCarousel from "./SkillsCarousel";

const Home = () => {
	const headingRef = useRef(null);
	const profileRef = useRef(null);
	const carouselRef = useRef(null);

	useEffect(() => {
		const timer = setTimeout(() => {
			if (headingRef.current) {
				headingRef.current.classList.remove("opacity-0", "-translate-x-5");
			}
		}, 100);
		return () => clearTimeout(timer);
	}, []);

	useEffect(() => {
		const timer = setTimeout(() => {
			if (profileRef.current) {
				profileRef.current.classList.remove("opacity-0", "translate-x-5");
			}
		}, 100);
		return () => clearTimeout(timer);
	}, []);

	return (
		<main id="home" className="mt-28 sm:mt-20 lg:mt-10">
			<header className="relative hidden h-full w-full flex-col items-end justify-between px-5 sm:flex sm:px-8 lg:flex-row lg:px-0">
				<div
					ref={headingRef}
					className="w-full -translate-x-5 text-center opacity-0 transition-all duration-700 ease-out animate-on-load lg:w-auto lg:text-left"
				>
					<h1 className="font-extralight text-[68px] leading-[62px] sm:mb-8 sm:text-sm sm:leading-[100px] md:text-[130px] md:leading-[120px] lg:text-[150px] lg:leading-[145px]">
						Medwin
						<br className="block lg:inline" /> Gardose
					</h1>
				</div>

				<section
					ref={profileRef}
					className="mx-auto mt-8 flex w-full max-w-md translate-x-5 flex-col items-center opacity-0 transition-all duration-700 ease-out lg:mx-0 lg:mb-8 lg:mt-10 lg:gap-60 lg:items-end"
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

			<section className="px-5 sm:hidden" aria-labelledby="mobile-home-title">
				<div className="relative mx-auto min-h-[31rem] max-w-[22rem] overflow-hidden p-2 text-gray-900">
					<div className="relative z-10 flex justify-end">
						<div className="relative h-52 w-52 overflow-hidden rounded-full border border-gray-200 bg-white/40 shadow-2xl">
							<img
								src={pfp}
								alt="Medwin Gardose"
								className="h-full w-full object-cover"
							/>
						</div>
					</div>

					<div className="relative z-10 -mt-5">
						<h1
							id="mobile-home-title"
							className="text-5xl font-extralight leading-[2.9rem] tracking-normal"
						>
							Medwin
							<br />
							Gardose
						</h1>
						<p className="mt-4 max-w-[16rem] text-xs font-light leading-5 text-gray-600">
							I build modern, responsive, and user-friendly websites with a
							focus on clean interfaces and practical details.
						</p>
					</div>

					<SkillsCarousel compact className="relative z-10 mt-7" />

					<a
						href="#projects"
						className="relative z-10 mt-6 flex h-14 items-center justify-center rounded-full bg-green-200 text-sm font-semibold text-gray-900 shadow-lg transition hover:bg-green-300"
					>
						Discover work
					</a>
				</div>
			</section>

			<SkillsCarousel ref={carouselRef} className="hidden sm:block" />
		</main>
	);
};

export default Home;
