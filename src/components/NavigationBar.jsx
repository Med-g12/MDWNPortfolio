import { useState, useEffect, useRef } from 'react';

const NavigationBar = () => {
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
        <nav className="bg-white/80 shadow-sm fixed top-0 w-full z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-5 lg:px-1">
                <div className="relative h-16 flex items-center px-4">
                    <div className="flex-shrink-0">
                        <a href="/" className="text-xl font-bold text-gray-800">
                            MDWN
                        </a>
                    </div>

                    <div className="absolute left-1/2 transform -translate-x-1/2 hidden md:flex space-x-8 text-sm">
                        {navItems.map((item, index) => (
                            <a
                                key={item}
                                href={`#${item.toLowerCase()}`}
                                ref={(el) => (linksRef.current[index] = el)}
                                className="hover:text-gray-900 text-[16px] hover:scale-110 transition opacity-0 -translate-y-5"
                            >
                                {item}
                            </a>
                        ))}
                    </div>

                    <div className="ml-auto hidden md:flex">
                        <a href="#footer" className="h-full flex items-center">
                            <button className="border py-3 cursor-pointer px-4 text-sm rounded-full hover:bg-gray-100 transition">
                                Get Connected
                            </button>
                        </a>
                    </div>

                    <div className="flex md:hidden ml-auto">
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            type="button"
                            className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-gray-900 focus:outline-none"
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
                <div className="md:hidden px-2 pt-2 pb-3 space-y-1 bg-white shadow-md">
                    <a
                        href="#home"
                        className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900"
                    >
                        Home
                    </a>
                    <a
                        href="#about"
                        className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900"
                    >
                        About
                    </a>
                    <a
                        href="#projects"
                        className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900"
                    >
                        Projects
                    </a>
                    <a
                        href="#contact"
                        className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900"
                    >
                        Contact
                    </a>
                </div>
            )}
        </nav>
    )
}

export default NavigationBar