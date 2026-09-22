import React, { useState } from "react";
import { ExternalLink } from "lucide-react";
import dsc from "../assets/dsc.png";
import flashify from "../assets/flashify.png";

const Projects = () => {
	const [expandedProjectId, setExpandedProjectId] = useState(null);

	const projects = [
		{
			id: 1,
			img: dsc,
			title: "Stickify: DSC",
			tech: "React + Laravel",
			color: "from-green-500 to-green-50",
			purpose:
				"A school project developed for a real client, focused on delivering a functional and user-friendly application while applying full-stack development skills.",
			role: "Frontend + Backend Developer",
			status: "In Progress",
		},
		{
			id: 2,
			img: flashify,
			title: "Flashify",
			tech: "Vue + Laravel + Tailwind CSS",
			color: "from-yellow-500 to-yellow-50",
			purpose:
				"A flashcard study website designed to help students review topics, practice active recall, and make studying more focused and effective.",
			role: "Frontend Developer",
			status: "Live",
			liveUrl: "https://flashify-preview.vercel.app/",
			disableImagePan: true,
		},
	];

	return (
		<div id="projects" className="px-5 sm:px-8 lg:px-0">
			<div
				className="py-3 px-6 sm:pr-50 text-lg rounded-full w-fit border-2 transition"
				style={{
					borderImage: "linear-gradient(to right, #9ca3af, transparent) 1",
				}}
			>
				Projects
			</div>

			<section className="mt-8 lg:mt-5 pb-16 lg:pb-20">
				<div className="max-w-7xl mx-auto">
					<h2 className="text-3xl sm:text-4xl font-bold text-center mb-4">
						My Projects
					</h2>
					<p className="text-center text-gray-600 mb-10 lg:mb-12">
						Things I've built so far
					</p>

					<div className="relative border-t border-t-gray-300 sm:-mx-8 lg:mx-0">
						<div
							className="flex gap-4 sm:gap-6 lg:gap-5 overflow-x-auto scroll-smooth py-4 sm:px-8 lg:px-0
                                       scrollbar scrollbar-thumb-gray-400 scrollbar-track-gray-100
                                       scrollbar-thin hover:scrollbar-thumb-gray-600 transition-all
                                       snap-x snap-mandatory"
						>
							{projects.map((project) => (
								<div
									key={project.id}
									className="flex-none w-[74vw] max-w-72 sm:w-96 sm:max-w-none md:w-96 snap-start group"
								>
									<div className="relative h-[35rem] overflow-hidden rounded-2xl border border-gray-200/70 bg-white/75 shadow-md backdrop-blur-sm sm:h-[44rem] sm:shadow-lg">
										<div className={`h-1.5 bg-gradient-to-r sm:h-2 ${project.color}`} />

										<div className="relative z-10 flex h-full flex-col p-4 transition-opacity duration-300 group-hover:opacity-0 sm:p-7">
											<h3 className="mb-2 text-lg font-bold text-gray-800 sm:mb-3 sm:text-2xl">
												{project.title}
											</h3>

											<div className="flex-1 space-y-3 text-gray-600 sm:space-y-5">
												<div>
													<p className="text-[11px] font-semibold uppercase tracking-wider text-gray-500 sm:text-xs">
														Purpose
													</p>
													<p className="mt-1 text-xs leading-relaxed sm:text-sm">
														{project.purpose}
													</p>
												</div>
												<div>
													<p className="text-[11px] font-semibold uppercase tracking-wider text-gray-500 sm:text-xs">
														My Role
													</p>
													<p className="mt-1 text-xs font-medium text-indigo-600 sm:text-sm">
														{project.role}
													</p>
												</div>
												<div>
													<span className="inline-block rounded-full bg-gray-100 px-2.5 py-1 text-[11px] font-medium text-gray-700 sm:px-3 sm:text-xs">
														{project.tech}
													</span>
												</div>
											</div>
										</div>

										<div
											className={`absolute inset-x-0 bottom-16 z-20 overflow-y-auto overflow-x-hidden overscroll-contain border-y border-gray-200/70 bg-white/80 transition-[height] duration-700 ease-out scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100 sm:overflow-hidden sm:group-hover:h-[calc(100%-4rem)] ${expandedProjectId === project.id ? "h-[calc(100%-4rem)]" : "h-1/2"}`}
											onScroll={() => setExpandedProjectId(project.id)}
											onTouchMove={() => setExpandedProjectId(project.id)}
										>
											<img
												src={project.img}
												alt={project.title}
												className={`min-h-full w-full object-cover object-top transition-[height] duration-700 ease-out sm:h-full ${project.disableImagePan ? "" : "sm:group-hover:h-[140%] sm:group-hover:animate-[project-image-pan_8s_ease-in-out_infinite_alternate]"}`}
											/>
										</div>

										<div className="absolute inset-x-0 bottom-0 z-30 flex h-16 items-center justify-between gap-2 bg-white/90 px-4 backdrop-blur-sm sm:px-7">
											<span
												className={`rounded-full px-2.5 py-1 text-[11px] font-semibold sm:px-3 sm:text-xs ${
													project.status === "Live"
														? "bg-emerald-50 text-emerald-700"
														: project.status === "In Progress"
															? "bg-amber-50 text-amber-700"
															: "bg-slate-100 text-slate-600"
												}`}
											>
												{project.status}
											</span>

											{project.liveUrl ? (
												<a
													href={project.liveUrl}
													target="_blank"
													rel="noreferrer"
													className="inline-flex items-center gap-1.5 rounded-full bg-gray-900 px-2.5 py-1 text-[11px] font-semibold text-white transition hover:bg-indigo-600 sm:px-3 sm:text-xs"
													aria-label={`Open ${project.title} live site`}
												>
													Live Site
													<ExternalLink className="h-3 w-3" aria-hidden="true" />
												</a>
											) : (
												<span className="text-[11px] font-medium text-gray-400 sm:text-xs">
													No live link
												</span>
											)}
										</div>
									</div>
								</div>
							))}
						</div>
					</div>
				</div>
			</section>
		</div>
	);
};

export default Projects;
