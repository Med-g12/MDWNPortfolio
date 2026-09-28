import { useState, useEffect, useRef } from 'react';
import { Moon, Sun } from "lucide-react";

const NavigationBar = ({ isDarkMode, onToggleDarkMode }) => {
    const [isOpen, setIsOpen] = useState(false);
    const linksRef = useRef([]);
    const navRef = useRef(null);
    const menuCardRef = useRef(null);

    useEffect(() => {
        linksRef.current.forEach((link, index) => {
            setTimeout(() => {
                if (link) {
                    link.classList.remove('opacity-0', '-translate-y-5');
                }
            }, index * 150); 
        });
    }, []);

    useEffect(() => {
        const handleClickOutside = (event) => {
            const clickedInsideNav = navRef.current && navRef.current.contains(event.target);
            const clickedInsideMenu = menuCardRef.current && menuCardRef.current.contains(event.target);

            if (!clickedInsideNav && !clickedInsideMenu) {
                setIsOpen(false);
            }
        };

        if (isOpen) {
            document.addEventListener('mousedown', handleClickOutside);
            document.addEventListener('touchstart', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
            document.removeEventListener('touchstart', handleClickOutside);
        };
    }, [isOpen]);

    const navItems = ['Home', 'About', 'Skills', 'Projects'];

    return (
        <>
            <nav
                ref={navRef}
                className="fixed top-0 z-50 w-full border-b border-transparent bg-white/80 text-gray-950 shadow-sm backdrop-blur-sm transition-colors duration-300 dark:border-green-300/40 dark:bg-black/35 dark:text-white"
                style={{ backdropFilter: 'blur(4px)', WebkitBackdropFilter: 'blur(4px)' }}
            >
                <div className="max-w-7xl mx-auto px-4 sm:px-5 lg:px-1">
                    <div className="relative h-16 flex items-center px-4">
                        <div className="flex-shrink-0">
                            <a href="/" className="text-xl font-bold text-gray-800 transition-colors dark:text-white">
                                MDWN
                            </a>
                        </div>

                        <div className="absolute left-1/2 transform -translate-x-1/2 hidden lg:flex space-x-8 text-sm">
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

                        <div className="ml-auto hidden items-center gap-3 lg:flex">
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

                        <div className="ml-auto flex items-center gap-2 lg:hidden">
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
                                onClick={() => setIsOpen((prev) => !prev)}
                                type="button"
                                className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-gray-900 focus:outline-none dark:text-white dark:hover:text-green-200"
                                aria-expanded={isOpen}
                                aria-label="Toggle navigation menu"
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
            </nav>

            {/* Mobile/Tablet Glass Card Menu */}
            {isOpen && (
                <div
                    ref={menuCardRef}
                    className="fixed right-0 top-16 z-50 w-56 animate-nav-expand rounded-none rounded-bl-2xl border-b border-l border-gray-200/50 bg-white/90 p-3 text-gray-950 shadow-xl backdrop-blur-md transition-colors duration-300 dark:border-green-300/40 dark:bg-black/80 dark:text-white lg:hidden"
                    style={{ backdropFilter: 'blur(8px)', WebkitBackdropFilter: 'blur(8px)' }}
                >
                    <div className="flex flex-col space-y-1">
                        {navItems.map((item, index) => (
                            <a
                                key={item}
                                href={`#${item.toLowerCase()}`}
                                onClick={() => setIsOpen(false)}
                                style={{ animationDelay: `${index * 50 + 60}ms` }}
                                className="animate-tab-slide-left flex items-center px-3.5 py-2.5 rounded-xl text-sm font-medium text-gray-700 transition hover:bg-black/5 hover:text-gray-950 dark:text-gray-200 dark:hover:bg-white/10 dark:hover:text-green-300"
                            >
                                {item}
                            </a>
                        ))}
                        <div
                            style={{ animationDelay: `${navItems.length * 50 + 60}ms` }}
                            className="animate-tab-slide-left mt-1 pt-2 border-t border-gray-200/50 dark:border-green-300/30"
                        >
                            <a
                                href="#footer"
                                onClick={() => setIsOpen(false)}
                                className="block w-full py-2.5 px-3 text-center text-sm font-medium rounded-full border border-gray-300 hover:bg-gray-100/80 text-gray-800 transition dark:border-green-300/50 dark:text-white dark:hover:bg-white/10"
                            >
                                Get Connected
                            </a>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default NavigationBar;
