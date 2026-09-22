import { useState } from "react";
import figmaLogo from "../assets/figmalogo.png";
import htmlLogo from "../assets/htmllogo.png";
import tailwindLogo from "../assets/tailwindlogo.png";
import laravelLogo from "../assets/laravellogo.png";
import csharpLogo from "../assets/csharplogo.png";
import javaLogo from "../assets/javalogo.png";
import reactLogo from "../assets/reactlogo.png";
import pythonLogo from "../assets/pythonlogo.png";
import nuxtLogo from "../assets/nuxtlogo.svg";
import nextLogo from "../assets/next.webp";
import supabaseLogo from "../assets/supabase.webp";

const Skills = () => {
	const [activeSkill, setActiveSkill] = useState(null);
	const [mobileSkillPage, setMobileSkillPage] = useState(0);

	const skills = [
		{
			name: "Figma",
			level: 90,
			color: "text-green-500",
			logo: figmaLogo,
			category: "Design",
		},
		{
			name: "HTML/CSS",
			level: 95,
			color: "text-pink-500",
			logo: htmlLogo,
			category: "Frontend",
		},
		{
			name: "Tailwind CSS",
			level: 90,
			color: "text-cyan-500",
			logo: tailwindLogo,
			category: "Styling",
		},
		{
			name: "Laravel",
			level: 70,
			color: "text-red-500",
			logo: laravelLogo,
			category: "Backend",
		},
		{
			name: "PHP",
			level: 60,
			color: "text-purple-600",
			logo: laravelLogo,
			category: "Backend",
		},
		{
			name: "React.js",
			level: 70,
			color: "text-blue-500",
			logo: reactLogo,
			category: "Frontend",
		},
		{
			name: "C#",
			level: 50,
			color: "text-blue-300",
			logo: csharpLogo,
			category: "Programming",
		},
		{
			name: "Java",
			level: 50,
			color: "text-orange-500",
			logo: javaLogo,
			category: "Programming",
		},
		{
			name: "Supabase",
			level: 30,
			color: "text-green-800",
			logo: supabaseLogo,
			category: "Database",
		},
		{
			name: "Python",
			level: 80,
			color: "text-yellow-500",
			logo: pythonLogo,
			category: "Programming",
		},
		{
			name: "Nuxt.js",
			level: 95,
			color: "text-green-500",
			logo: nuxtLogo,
			category: "Frontend",
		},
		{
			name: "Next.js",
			level: 60,
			color: "text-blue-500",
			logo: nextLogo,
			category: "Frontend",
		},
		{
			name: "Currently exploring",
			level: null,
			color: "text-gray-500",
			logo: nextLogo,
			category: "Learning",
			language: ["Supabase", "Next.js"],
		},
	];

	const activeSkillData = activeSkill !== null ? skills[activeSkill] : null;
	const skillsPerMobilePage = 4;
	const mobileSkillPages = Math.ceil(skills.length / skillsPerMobilePage);
	const visibleMobileSkills = skills.slice(
		mobileSkillPage * skillsPerMobilePage,
		mobileSkillPage * skillsPerMobilePage + skillsPerMobilePage,
	);

	return (
		<div id="skills" className="my-20 lg:my-40 px-5 sm:px-8 lg:px-0">
			<div
				className="py-3 px-6 lg:pr-50 text-lg rounded-full w-fit border-2 transition"
				style={{
					borderImage: "linear-gradient(to right, #9ca3af, transparent) 1",
				}}
			>
				Skills
			</div>

			<div className="relative mx-auto mt-8 max-w-5xl overflow-hidden rounded-3xl border border-gray-200/70 bg-white/75 p-4 shadow-xl backdrop-blur-sm sm:p-8 lg:mt-5 lg:p-10">
				<div className="relative mb-7 flex flex-col gap-6 sm:mb-10 lg:mb-12 lg:flex-row lg:items-end lg:justify-between">
					<div>
						<h2 className="text-2xl font-bold text-gray-900 sm:text-4xl">
							What I Can Do
						</h2>
						<p className="mt-2 max-w-2xl text-xs leading-5 text-gray-600 sm:mt-3 sm:text-base sm:leading-6">
							A practical mix of design, frontend, backend, and tools I use to
							turn ideas into polished web experiences.
						</p>
					</div>
				</div>

				{activeSkill === null ? (
					<>
						<div className="grid grid-cols-2 gap-3 sm:hidden">
							{visibleMobileSkills.map((skill, pageIndex) => {
								const skillIndex =
									mobileSkillPage * skillsPerMobilePage + pageIndex;

								return (
									<button
										key={skill.name}
										type="button"
										className="group relative flex min-h-24 flex-col items-center justify-between overflow-hidden rounded-2xl border border-gray-200 bg-white/85 p-3 text-left transition-all duration-300 hover:-translate-y-1 hover:border-green-300 focus:outline-none focus:ring-2 focus:ring-green-400"
										onClick={() => setActiveSkill(skillIndex)}
										aria-label={`Show ${skill.name} skill level`}
									>
										<span className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-green-300 via-cyan-300 to-blue-300 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
										<span className="self-start rounded-full bg-gray-100 px-2 py-0.5 text-[9px] font-semibold uppercase tracking-wide text-gray-500">
											{skill.category}
										</span>
										<img
											src={skill.logo}
											alt=""
											className="h-8 w-8 object-contain transition-transform duration-500 group-hover:scale-110"
										/>
										<div className="w-full">
											<span
												className={`block text-center text-xs font-semibold ${skill.color}`}
											>
												{skill.name}
											</span>
											<div className="mt-2 h-1 overflow-hidden rounded-full bg-gray-100">
												<div
													className="h-full rounded-full bg-gradient-to-r from-green-400 to-blue-400 transition-all duration-500"
													style={{ width: `${skill.level ?? 35}%` }}
												/>
											</div>
										</div>
									</button>
								);
							})}
						</div>

						<div className="mt-5 flex items-center justify-center gap-2 sm:hidden">
							{Array.from({ length: mobileSkillPages }).map((_, index) => (
								<button
									key={index}
									type="button"
									className={`h-1.5 rounded-full transition-all duration-300 ${mobileSkillPage === index ? "w-10 bg-gray-800" : "w-6 bg-gray-300"}`}
									onClick={() => setMobileSkillPage(index)}
									aria-label={`Show skills page ${index + 1}`}
								/>
							))}
						</div>

						<div className="hidden grid-cols-2 gap-3 sm:grid sm:grid-cols-3 sm:gap-4 lg:grid-cols-4 lg:gap-6">
							{skills.map((skill, index) => (
								<button
									key={skill.name}
									type="button"
									className="group relative flex min-h-24 flex-col items-center justify-between overflow-hidden rounded-2xl border border-gray-200 bg-white/85 p-3 text-left transition-all duration-300 hover:-translate-y-1 hover:border-green-300 focus:outline-none focus:ring-2 focus:ring-green-400 sm:min-h-36 sm:p-4 sm:shadow-sm sm:hover:shadow-xl"
									onClick={() => setActiveSkill(index)}
									aria-label={`Show ${skill.name} skill level`}
								>
									<span className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-green-300 via-cyan-300 to-blue-300 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
									<span className="self-start rounded-full bg-gray-100 px-2 py-0.5 text-[9px] font-semibold uppercase tracking-wide text-gray-500 sm:px-2.5 sm:py-1 sm:text-[10px]">
										{skill.category}
									</span>
									<img
										src={skill.logo}
										alt=""
										className="h-8 w-8 object-contain transition-transform duration-500 group-hover:scale-110 sm:h-12 sm:w-12"
									/>
									<div className="w-full">
										<span
											className={`block text-center text-xs font-semibold sm:text-sm ${skill.color}`}
										>
											{skill.name}
										</span>
										<div className="mt-2 h-1 overflow-hidden rounded-full bg-gray-100 sm:mt-3 sm:h-1.5">
											<div
												className="h-full rounded-full bg-gradient-to-r from-green-400 to-blue-400 transition-all duration-500"
												style={{ width: `${skill.level ?? 35}%` }}
											/>
										</div>
									</div>
								</button>
							))}
						</div>
					</>
				) : (
					<div className="relative isolate overflow-hidden">
						<div className="mb-4 flex items-center justify-between gap-4 sm:mb-6">
							<p className="text-xs font-medium text-gray-500 sm:text-sm">
								Selected skill details
							</p>
							<button
								type="button"
								className="rounded-full border border-gray-200 bg-white px-3 py-1.5 text-xs font-semibold text-gray-600 transition hover:border-green-300 hover:text-green-700 focus:outline-none focus:ring-2 focus:ring-green-400 sm:px-4 sm:py-2 sm:text-sm sm:shadow-sm"
								onClick={() => setActiveSkill(null)}
							>
								View all
							</button>
						</div>

						<div className="skill-rail-enter overflow-x-auto rounded-2xl border border-gray-200 bg-white/60 px-3 py-3 scrollbar-none sm:px-4 sm:py-4">
							<div className="skill-carousel-track flex w-max gap-3 hover:[animation-play-state:paused] focus-within:[animation-play-state:paused] sm:gap-4">
								{[...skills, ...skills].map((skill, trackIndex) => {
									const index = trackIndex % skills.length;

									return index !== activeSkill ? (
										<button
											key={`${skill.name}-${trackIndex}`}
											type="button"
											className="group flex shrink-0 flex-col items-center justify-center gap-1.5 rounded-2xl border border-gray-200 bg-white/90 px-4 py-3 transition-all duration-500 hover:-translate-y-1 hover:border-green-300 focus:outline-none focus:ring-2 focus:ring-green-400 sm:gap-2 sm:px-5 sm:py-4 sm:shadow-sm sm:hover:shadow-lg"
											onClick={() => setActiveSkill(index)}
											aria-label={`Show ${skill.name} skill level`}
										>
											<img
												src={skill.logo}
												alt=""
												className="h-7 w-7 object-contain transition-transform duration-500 group-hover:scale-110 sm:h-10 sm:w-10"
											/>
											<span
												className={`whitespace-nowrap text-[11px] font-semibold sm:text-xs ${skill.color}`}
											>
												{skill.name}
											</span>
										</button>
									) : null;
								})}
							</div>
						</div>

						<div className="pointer-events-none absolute inset-y-14 left-0 w-8 bg-gradient-to-r from-white/95 to-transparent" />
						<div className="pointer-events-none absolute inset-y-14 right-0 w-8 bg-gradient-to-l from-white/95 to-transparent" />

						{activeSkillData && (
							<div
								key={activeSkillData.name}
								className="skill-featured-enter mx-auto mt-6 grid max-w-3xl gap-5 rounded-3xl border border-gray-200 bg-white p-4 sm:mt-8 sm:gap-6 sm:p-7 sm:shadow-xl lg:grid-cols-[0.9fr_1.1fr]"
								style={{ transformOrigin: "center bottom" }}
							>
								<button
									type="button"
									className="group mx-auto flex min-h-40 w-full flex-col items-center justify-center gap-3 overflow-hidden rounded-3xl border border-green-200 bg-gradient-to-b from-green-50 to-white p-4 transition-all duration-500 focus:outline-none focus:ring-4 focus:ring-green-200 sm:min-h-56 sm:gap-4 sm:p-6"
									onClick={() =>
										setActiveSkill((activeSkill + 1) % skills.length)
									}
									aria-label={`Show next skill after ${activeSkillData.name}`}
								>
									<img
										src={activeSkillData.logo}
										alt=""
										className="h-14 w-14 object-contain transition-transform duration-500 group-hover:scale-110 sm:h-24 sm:w-24"
									/>
									<span
										className={`text-center text-xl font-bold sm:text-2xl ${activeSkillData.color}`}
									>
										{activeSkillData.name}
									</span>
									<span className="rounded-full bg-white px-3 py-1 text-[11px] font-semibold text-gray-500 sm:text-xs sm:shadow-sm">
										{activeSkillData.category}
									</span>
								</button>

								<div className="flex flex-col justify-center">
									<div className="mb-5">
										<p className="text-xs font-semibold uppercase tracking-[0.18em] text-gray-400 sm:text-sm">
											Proficiency
										</p>
										<div className="mt-2 flex items-end gap-2">
											<span className="text-4xl font-bold text-gray-900 sm:text-5xl">
												{activeSkillData.level !== null
													? activeSkillData.level
													: "35"}
											</span>
											<span className="pb-1.5 text-base font-semibold text-gray-400 sm:pb-2 sm:text-lg">
												{activeSkillData.level !== null ? "%" : "% exploring"}
											</span>
										</div>
									</div>
									<div className="h-2.5 w-full overflow-hidden rounded-full bg-gray-100 sm:h-3 sm:shadow-inner">
										<div
											className={`h-full rounded-full transition-all duration-1000 ease-out ${activeSkillData.level === null ? "bg-gradient-to-r from-green-300 via-green-400 to-yellow-500" : "bg-gradient-to-r from-green-400 to-blue-500"}`}
											style={{ width: `${activeSkillData.level ?? 35}%` }}
										/>
									</div>
									<p className="mt-4 text-xs leading-5 text-gray-600 sm:mt-5 sm:text-sm sm:leading-6">
										{activeSkillData.level === null
											? "Currently studying and experimenting with this stack in new builds."
											: "Comfortable using this in real projects, from implementation details to polished UI decisions."}
									</p>
									{activeSkillData.language && (
										<div className="mt-5 flex flex-wrap gap-2">
											{activeSkillData.language.map((tech) => (
												<span
													key={tech}
													className="rounded-full border border-gray-300 bg-white px-3 py-1 text-xs font-semibold text-gray-700"
												>
													{tech}
												</span>
											))}
										</div>
									)}
								</div>
							</div>
						)}
					</div>
				)}
			</div>
		</div>
	);
};

export default Skills;
