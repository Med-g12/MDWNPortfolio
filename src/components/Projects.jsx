import React from 'react';
import dsc from '../assets/dsc.png';

const Projects = () => {
    const projects = [
        {
            id: 1,
            img: dsc,
            title: "Stickify: DSC",
            tech: "React + Laravel",
            color: "from-green-500 to-green-50",
            purpose: "A school project developed for a real client, focused on delivering a functional and user-friendly application while applying full-stack development skills.",
            role: "Frontend Developer"
        },
    ];

    return (
        <div className="px-5 sm:px-8 lg:px-0">
            <div
                className="py-3 px-6 sm:pr-50 text-lg rounded-full w-fit border-2  transition hover:bg-gray-50"
                style={{ borderImage: 'linear-gradient(to right, #9ca3af, #ffffff) 1' }}
            >
                Projects
            </div>

            <section id="projects" className="mt-8 lg:mt-5 pb-16 lg:pb-20">
                <div className="max-w-7xl mx-auto">
                    <h2 className="text-3xl sm:text-4xl font-bold text-center mb-4">
                        My Projects
                    </h2>
                    <p className="text-center text-gray-600 mb-10 lg:mb-12">
                        Things I've built with love
                    </p>

                    <div className="relative border-t border-t-gray-300 -mx-5 sm:-mx-8 lg:mx-0">
                        <div
                            className="flex gap-5 sm:gap-6 lg:gap-5 overflow-x-auto scroll-smooth py-4
                                       scrollbar scrollbar-thumb-gray-400 scrollbar-track-gray-100
                                       scrollbar-thin hover:scrollbar-thumb-gray-600 transition-all
                                       snap-x snap-mandatory"
                        >
                            {projects.map((project) => (
                                <div
                                    key={project.id}
                                    className="flex-none w-[85vw] sm:w-96 md:w-96 snap-start group"
                                >
                                    <div className="bg-white rounded-2xl shadow-lg overflow-hidden transition-all duration-500 group-hover:shadow-2xl flex flex-col h-full">

                                        <div className={`h-2 bg-gradient-to-r ${project.color}`} />

                                        <div className="p-5 sm:p-7 flex-1 flex flex-col">
                                            <h3 className="text-xl sm:text-2xl font-bold text-gray-800 mb-4">
                                                {project.title}
                                            </h3>

                                            <div className="space-y-4 sm:space-y-5 text-gray-600 flex-1">
                                                <div>
                                                    <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                                                        Purpose
                                                    </p>
                                                    <p className="mt-1 text-sm leading-relaxed">
                                                        {project.purpose}
                                                    </p>
                                                </div>
                                                <div>
                                                    <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                                                        My Role
                                                    </p>
                                                    <p className="mt-1 text-sm font-medium text-indigo-600">
                                                        {project.role}
                                                    </p>
                                                </div>
                                                <div>
                                                    <span className="inline-block px-3 py-1 text-xs font-medium bg-gray-100 text-gray-700 rounded-full">
                                                        {project.tech}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="border-t border-gray-100 mt-auto">
                                            <img
                                                src={project.img}
                                                alt={project.title}
                                                className="w-full h-64 sm:h-72 lg:h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                            />
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