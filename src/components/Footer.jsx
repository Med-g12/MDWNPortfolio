import React, { useState, useEffect } from "react";
import img from '../assets/footerimg.jpg';

const Footer = () => {
    const [davaoTime, setDavaoTime] = useState("");

    useEffect(() => {
        const updateTime = () => {
            const now = new Date();
            const options = {
                hour: "2-digit",
                minute: "2-digit",
                hour12: true,
                timeZone: "Asia/Manila",
            };
            setDavaoTime(now.toLocaleTimeString("en-US", options));
        };

        updateTime();
        const interval = setInterval(updateTime, 1000);

        return () => clearInterval(interval);
    }, []);

    const currentYear = new Date().getFullYear();

    return (
        <div id="footer" className="science-gothic bg-black px-5 py-5 text-white transition-colors duration-300 sm:px-8 sm:py-8 lg:px-10 lg:py-5">
            <div className="flex flex-col lg:flex-row justify-between items-center lg:items-end gap-8 lg:gap-0">
                <h1 className="mt-12 text-center text-4xl font-semibold text-green-200 sm:text-bas sm:text-5xl lg:mt-20 lg:text-left lg:text-6xl">
                    Feel free to reach out.
                </h1>
                <div className="font-extralight leading-4 text-center lg:text-right">
                    <p className="text-green-200">Davao City, Philippines</p>
                    <p>{davaoTime}</p>
                </div>
            </div>

            <div className="mt-12 lg:mt-20">
                <div className="flex flex-col lg:flex-row justify-between items-center lg:items-start gap-12 lg:gap-0">
                    <div className="w-full lg:w-auto text-center lg:text-left">
                        <p className="w-full lg:w-200 tracking-wide font-light text-justify text-sm sm:text-base">
                            You can get in touch with me or follow my work through any of the links provided below. I’m always open to new opportunities, collaborations, or just a friendly hello.
                        </p>
                        <div className="flex flex-col sm:flex-row justify-center lg:justify-start gap-8 lg:gap-50 mt-8 lg:mt-20">
                            <div>
                                <p className="mb-2 text-[13px] font-semibold text-green-200">Contact:</p>
                                <div className="flex flex-col justify-start gap-2">
                                    <a
                                        href="mailto:garmed172@gmail.com"
                                        className="transition-colors duration-300 hover:text-green-300"
                                    >
                                        garmed172@gmail.com
                                    </a>
                                </div>
                            </div>

                            <div className="flex flex-col justify-start gap-2">
                                <p className="mb-2 text-[13px] font-semibold text-green-200">Connect:</p>
                                <a
                                    href="https://www.instagram.com/grdsemdwn/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="transition-colors duration-300 hover:text-green-300"
                                >
                                    Instagram
                                </a>
                                <a
                                    href="https://www.facebook.com/mdwn21"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="transition-colors duration-300 hover:text-green-300"
                                >
                                    Facebook
                                </a>
                                <a
                                    href="https://x.com/mdwn2211"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="transition-colors duration-300 hover:text-green-300"
                                >
                                    X
                                </a>
                            </div>
                        </div>
                    </div>

                    <img
                        src={img}
                        alt="Medwin Gardose"
                        className="w-48 sm:w-56 lg:w-auto h-48 sm:h-56 lg:h-60 rounded-xl shadow-2xl hover:shadow-green-500/20 transition-shadow duration-500"
                    />
                </div>
            </div>

            <p className="mt-12 text-center text-sm font-light text-gray-500 lg:mt-16">
                © {currentYear} Medwin Gardose. All rights reserved.
            </p>
        </div>
    );
};

export default Footer;
