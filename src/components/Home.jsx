
import { useEffect, useRef } from 'react';
import pfp from '../assets/portpfp.jpg';
import SkillsCarousel from './SkillsCarousel';

const Home = () => {
    const headingRef = useRef(null);
    const profileRef = useRef(null);
    const carouselRef = useRef(null);

    useEffect(() => {
        const timer = setTimeout(() => {
            if (headingRef.current) {
                headingRef.current.classList.remove('opacity-0', '-translate-x-5');
            }
        }, 100);
        return () => clearTimeout(timer);
    }, []);

    useEffect(() => {
        const timer = setTimeout(() => {
            if (profileRef.current) {
                profileRef.current.classList.remove('opacity-0', 'translate-x-5');
            }
        }, 100);
        return () => clearTimeout(timer);
    }, []);

    useEffect(() => {
        const timer = setTimeout(() => {
            if (carouselRef.current) {
                carouselRef.current.classList.remove('opacity-0', 'translate-y-5');
            }
        }, 100);
        return () => clearTimeout(timer);
    }, []);

    return (
        <main id="home" className="mt-20 lg:mt-10">
            <header className="relative flex flex-col lg:flex-row h-full w-full justify-between items-end px-5 sm:px-8 lg:px-0">
                <div ref={headingRef} className="w-full lg:w-auto text-center lg:text-left opacity-0 -translate-x-5 transition-all duration-700 ease-out animate-on-load">
                    <h1 className="font-extralight text-[68px] leading-[62px] sm:leading-[100px] sm:text-sm md:text-[130px] md:leading-[120px] lg:text-[150px] lg:leading-[145px] sm:mb-8">
                        Medwin
                        <br className="block lg:inline" /> Gardose
                    </h1>
                </div>

                <section ref={profileRef} className="flex flex-col items-center lg:mt-10 lg:gap-60 lg:items-end w-full max-w-md mx-auto lg:mx-0 lg:mb-8 mt-8 lg:mt-0 opacity-0 translate-x-5 transition-all duration-700 ease-out">
                    <img
                        src={pfp}
                        alt="Medwin Gardose"
                        className="w-64 sm:w-72 lg:w-70 rounded-2xl mb-4 shadow-2xl"
                    />
                    <p className="text-center lg:text-right text-sm sm:text-base lg:leading-5 font-semibold leading-relaxed px-4 lg:px-0">
                        I’m Medwin Gardose, <br className="hidden sm:inline" />
                        a web developer crafting modern, <br className="hidden sm:inline" />
                        responsive, and user-friendly websites.
                    </p>
                </section>
            </header>

            <SkillsCarousel ref={carouselRef} />
        </main>
    );
};

export default Home;

