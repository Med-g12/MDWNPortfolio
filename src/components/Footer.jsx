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
        <div id="footer" className="bg-black science-gothic py-5 sm:py-8 lg:py-5 px-5 sm:px-8 lg:px-10 text-white">
            <div className="flex flex-col lg:flex-row justify-between items-center lg:items-end gap-8 lg:gap-0">
                <h1 className="text-4xl sm:text-bas sm:text-5xl lg:text-6xl mt-12 lg:mt-20 font-semibold text-green-200 text-center lg:text-left">
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
                                <p className="font-semibold text-green-200 text-[13px] mb-2">Contact:</p>
                                <div className="flex flex-col justify-start gap-2">
                                    <a
                                        href="mailto:garmed172@gmail.com"
                                        className="hover:text-green-300 transition-colors duration-300"
                                    >
                                        garmed172@gmail.com
                                    </a>
                                </div>
                            </div>

                            <div className="flex flex-col justify-start gap-2">
                                <p className="font-semibold text-green-200 text-[13px] mb-2">Connect:</p>
                                <a
                                    href="https://www.instagram.com/grdsemdwn/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="hover:text-green-300 transition-colors duration-300"
                                >
                                    Instagram
                                </a>
                                <a
                                    href="https://www.facebook.com/mdwn21"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="hover:text-green-300 transition-colors duration-300"
                                >
                                    Facebook
                                </a>
                                <a
                                    href="https://x.com/mdwn2211"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="hover:text-green-300 transition-colors duration-300"
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

            <p className="text-center mt-12 lg:mt-16 text-sm text-gray-500 font-light">
                © {currentYear} Medwin Gardose. All rights reserved.
            </p>
        </div>
    );
};

export default Footer;