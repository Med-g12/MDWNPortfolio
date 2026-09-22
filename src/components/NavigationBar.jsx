import { useState, useEffect, useRef } from 'react';
import { Moon, Sun } from "lucide-react";

const NavigationBar = ({ isDarkMode, onToggleDarkMode }) => {
    const [isOpen, setIsOpen] = useState(false);
    const linksRef = useRef([]);

    useEffect(() => {
        linksRef.current.forEach((link, index) => {
            setTimeout(() => {
                if (link) {
                    link.classList.remove('opacity-0', '-translate-y-5');
                }
            }, index * 150); 
        });
    }, []);

    const navItems = ['Home', 'About', 'Skills', 'Projects'];
    return (
        <nav className="fixed top-0 z-50 w-full border-b border-transparent bg-white/80 text-gray-950 shadow-sm backdrop-blur-sm transition-colors duration-300 dark:border-green-300/40 dark:bg-black/35 dark:text-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-5 lg:px-1">
                <div className="relative h-16 flex items-center px-4">
                    <div className="flex-shrink-0">
                        <a href="/" className="text-xl font-bold text-gray-800 transition-colors dark:text-white">
                            MDWN
                        </a>
                    </div>

                    <div className="absolute left-1/2 transform -translate-x-1/2 hidden md:flex space-x-8 text-sm">
                        {navItems.map((item, index) => (
                            <a
                                key={item}
                                href={`#${item.toLowerCase()}`}
                                ref={(el) => (linksRef.current[index] = el)}
                                className="hover:text-gray-900 text-[16px] hover:scale-110 transition opacity-0 -translate-y-5 dark:hover:text-green-200"
                            >
                                {item}
                            </a>
                        ))}
                    </div>

                    <div className="ml-auto hidden items-center gap-3 md:flex">
                        <button
                            type="button"
                            onClick={onToggleDarkMode}
                            className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-300 text-gray-800 transition hover:bg-gray-100 dark:border-green-300/50 dark:text-white dark:hover:bg-white/10"
                            aria-label={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
                        >
                            {isDarkMode ? (
                                <Sun className="h-4 w-4" aria-hidden="true" />
                            ) : (
                                <Moon className="h-4 w-4" aria-hidden="true" />
                            )}
                        </button>
                        <a href="#footer" className="h-full flex items-center">
                            <button className="border py-3 cursor-pointer px-4 text-sm rounded-full hover:bg-gray-100 transition dark:border-green-300/50 dark:hover:bg-white/10">
                                Get Connected
                            </button>
                        </a>
                    </div>

                    <div className="ml-auto flex items-center gap-2 md:hidden">
                        <button
                            type="button"
                            onClick={onToggleDarkMode}
                            className="inline-flex h-10 w-10 items-center justify-center rounded-md text-gray-700 transition hover:text-gray-900 dark:text-white dark:hover:text-green-200"
                            aria-label={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
                        >
                            {isDarkMode ? (
                                <Sun className="h-5 w-5" aria-hidden="true" />
                            ) : (
                                <Moon className="h-5 w-5" aria-hidden="true" />
                            )}
                        </button>
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            type="button"
                            className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-gray-900 focus:outline-none dark:text-white dark:hover:text-green-200"
                        >
                            <svg
                                className="h-6 w-6"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                {isOpen ? (
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                ) : (
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                                )}
                            </svg>
                        </button>
                    </div>
                </div>

            </div>

            {isOpen && (
                <div className="md:hidden px-2 pt-2 pb-3 space-y-1 bg-white text-gray-950 shadow-md transition-colors dark:border-t dark:border-green-300/30 dark:bg-black/35 dark:text-white">
                    <a
                        href="#home"
                        className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 dark:text-white dark:hover:text-green-200"
                    >
                        Home
                    </a>
                    <a
                        href="#about"
                        className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 dark:text-white dark:hover:text-green-200"
                    >
                        About
                    </a>
                    <a
                        href="#projects"
                        className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 dark:text-white dark:hover:text-green-200"
                    >
                        Projects
                    </a>
                    <a
                        href="#contact"
                        className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 dark:text-white dark:hover:text-green-200"
                    >
                        Contact
                    </a>
                </div>
            )}
        </nav>
    )
}

export default NavigationBar


