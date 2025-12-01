import React from 'react';

const Skills = () => {
    const skills = [
        { name: 'Figma', level: 90, color: 'text-green-500' },
        { name: 'HTML/CSS', level: 95, color: 'text-pink-500' },
        { name: 'Tailwind CSS', level: 90, color: 'text-cyan-500' },
        { name: 'Laravel', level: 50, color: 'text-red-500' },
        { name: 'PHP', level: 50, color: 'text-purple-600' },
        { name: 'React.js', level: 65, color: 'text-blue-500' },
        { name: 'C#', level: 40, color: 'text-blue-300' },
        { name: 'Java', level: 50, color: 'text-orange-500' },
        { name: 'Python', level: 70, color: 'text-yellow-500' },
        {
            name: 'Currently exploring',
            level: null,
            color: 'text-gray-500',
            language: ['Laravel', 'React', 'Vue.js', 'Tailwind CSS'],
        }
    ];

    return (
        <div id="skills" className="my-20 lg:my-40 px-5 sm:px-8 lg:px-0">
            <div
                className="py-3 px-6 lg:pr-50 text-lg rounded-full w-fit border-2 transition"
                style={{
                    borderImage: 'linear-gradient(to right, #9ca3af, transparent) 1',
                }}
            >
                Skills
            </div>

            <div className=" max-w-5xl mx-auto mt-8 lg:mt-5 p-6 sm:p-8 lg:p-10 bg-gray-50/80 backdrop-blur-sm rounded-3xl border border-gray-200/50 shadow-xl">
                <h2 className="text-center text-3xl sm:text-4xl font-bold text-gray-800 mb-10 lg:mb-12">
                    What I Can Do
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-x-12 lg:gap-x-30 gap-y-8 lg:gap-y-10">
                    {skills.map((skill, index) => (
                        <div key={index} className="space-y-3">
                            <div className="flex justify-between items-center text-sm font-medium">
                                <span className={`font-semibold ${skill.color}`}>
                                    {skill.name}
                                </span>
                                {skill.level !== null ? (
                                    <span className="text-gray-600 font-medium">{skill.level}%</span>
                                ) : (
                                    <span className="text-gray-400 italic text-xs">exploring →</span>
                                )}
                            </div>

                            <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden shadow-inner">
                                {skill.level !== null ? (
                                    <div
                                        className="h-full bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full transition-all duration-1000 ease-out shadow-md"
                                        style={{ width: `${skill.level}%` }}
                                    />
                                ) : (
                                    <div className="h-full bg-gradient-to-r from-green-300 via-green-400 to-yellow-500 rounded-full animate-pulse" />
                                )}
                            </div>

                            {skill.language && (
                                <div className="flex flex-wrap gap-2 mt-4">
                                    {skill.language.map((tech) => (
                                        <span
                                            key={tech}
                                            className="px-3 py-1.5 text-xs font-semibold bg-white text-gray-700 rounded-full border border-gray-300 shadow-sm"
                                        >
                                            {tech}
                                        </span>
                                    ))}
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Skills;