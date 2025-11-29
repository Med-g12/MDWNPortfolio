import React from 'react';
import pfp from '../assets/portpfp.jpg';
import java from '../assets/javalogo.png'
import python from '../assets/pythonlogo.png'
import csharp from '../assets/csharplogo.png'
import reactlogo from '../assets/reactlogo.png'
import html from '../assets/htmllogo.png'
import css from '../assets/csslogo.png'
import laravel from '../assets/laravellogo.png'
import tailwind from '../assets/tailwindlogo.png'
import figma from '../assets/figmalogo.png'

const Home = () => {
    const carouselItems = [
        { img: java },
        { img: python },
        { img: csharp },
        { img: reactlogo },
        { img: html },
        { img: css },
        { img: tailwind },
        { img: laravel },
        { img: figma },
    ];

    return (
        <>
            <div className="relative flex flex-col lg:flex-row h-full w-full justify-between items-end px-5 sm:px-8 lg:px-0">
                <div className="w-full lg:w-auto text-center lg:text-left">
                    <h1 className="font-extralight text-[88px] leading-[82px]  sm:text-[110px] sm:leading-[100px] md:text-[130px] md:leading-[120px] lg:text-[150px] lg:leading-[145px] mb-6 sm:mb-8">
                        Medwin
                        <br className="block lg:inline" /> Gardose
                    </h1>
                </div>


                <div className="flex flex-col items-center lg:mt-10 lg:gap-60 lg:items-end w-full max-w-md mx-auto lg:mx-0 lg:mb-8 mt-8 lg:mt-0">
                    <img
                        src={pfp}
                        alt="Medwin Gardose"
                        className="w-64 sm:w-72 lg:w-70 rounded-2xl mb-4 shadow-2xl"
                    />
                    <p className="text-center lg:text-right text-sm sm:text-base lg:leading-5 font-semibold leading-relaxed px-4 lg:px-0">
                        I’m Medwin Gardose, <br className="hidden sm:inline lg:hidden" />
                        a web developer crafting modern, <br className="hidden sm:inline" />
                        responsive, and user-friendly websites.
                    </p>
                </div>
            </div>

            <div className="w-full overflow-hidden py-8">
                <div className='border-x border-x-2 border-gray-300'>
                    <div className="flex animate-marquee gap-10 md:gap-16 lg:gap-0">
                        {[...carouselItems, ...carouselItems].map((item, index) => (
                            <div key={index} className="flex-none w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 lg:w-16 lg:h-16 lg:mx-8">
                                <img
                                    src={item.img}
                                    alt=""
                                    className="w-full h-full object-contain select-none pointer-events-none"
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <style jsx>{`
                @keyframes scroll {
                    0% {
                        transform: translateX(0);
                    }
                    100% {
                        transform: translateX(-33.333%);
                    }
                }

                .animate-scroll {
                    display: flex;
                    animation: scroll 18s linear infinite;
                }
            `}</style>
        </>
    );
};

export default Home;
