import React from "react";
import java from "../assets/javalogo.png";
import python from "../assets/pythonlogo.png";
import csharp from "../assets/csharplogo.png";
import reactlogo from "../assets/reactlogo.png";
import html from "../assets/htmllogo.png";
import css from "../assets/csslogo.png";
import laravel from "../assets/laravellogo.png";
import tailwind from "../assets/tailwindlogo.png";
import figma from "../assets/figmalogo.png";
import nuxt from "../assets/nuxtlogo.svg";
import next from "../assets/next.webp";
import supabase from "../assets/supabase.webp";

const CarouselItem = ({ item }) => (
	<li className="flex-none w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 lg:w-16 lg:h-16 lg:mx-8">
		<img
			src={item.img}
			alt={`${item.name} logo`}
			className="w-full h-full object-contain select-none pointer-events-none"
			loading="lazy"
		/>
	</li>
);

const SkillsCarousel = React.forwardRef((props, ref) => {
	const carouselItems = [
		{ img: java, name: "Java" },
		{ img: python, name: "Python" },
		{ img: csharp, name: "C#" },
		{ img: reactlogo, name: "React" },
		{ img: html, name: "HTML" },
		{ img: css, name: "CSS" },
		{ img: tailwind, name: "Tailwind" },
		{ img: supabase, name: "Supabase" },
		{ img: laravel, name: "Laravel" },
		{ img: figma, name: "Figma" },
		{ img: nuxt, name: "Nuxt" },
		{ img: next, name: "Next" },
	];

	const extendedItems = [...carouselItems, ...carouselItems];

	return (
		<section
			className="w-full overflow-hidden pb-8"
			aria-labelledby="skills-carousel-heading"
		>
			<h2 id="skills-carousel-heading" className="sr-only">
				Technology Stack
			</h2>
			<div
				ref={ref}
				role="region"
				aria-roledescription="carousel"
				className="border-x border-x-2 border-gray-300 opacity-0 translate-y-5 transition-all duration-700 ease-out"
			>
				<ul
					className="flex animate-marquee gap-10 md:gap-16 lg:gap-0 list-none p-0 m-0"
					aria-label="Skills Marquee"
				>
					{extendedItems.map((item, index) => (
						<CarouselItem key={index} item={item} />
					))}
				</ul>
			</div>
		</section>
	);
});

SkillsCarousel.displayName = "SkillsCarousel";

export default SkillsCarousel;
