import "./App.css";
import React, { useEffect, useRef, useState } from "react";
import PortfolioLayout from "./layout/PortfolioLayout";
import Home from "./components/Home";
import About from "./components/About";
import Skills from "./components/Skills";
import Projects from "./components/Projects";

function RevealSection({ children, delay = 0 }) {
	const sectionRef = useRef(null);
	const [isVisible, setIsVisible] = useState(false);

	useEffect(() => {
		const section = sectionRef.current;

		if (!section) return undefined;

		const observer = new IntersectionObserver(
			([entry]) => {
				if (entry.isIntersecting) {
					setIsVisible(true);
					observer.unobserve(entry.target);
				}
			},
			{ threshold: 0.05, rootMargin: "0px 0px -20px 0px" },
		);

		observer.observe(section);

		return () => observer.disconnect();
	}, []);

	return (
		<div
			ref={sectionRef}
			className={`section-reveal ${isVisible ? "section-reveal--visible" : ""}`}
			style={delay ? { transitionDelay: `${delay}ms` } : undefined}
		>
			{children}
		</div>
	);
}

function App() {
	const [isDarkMode, setIsDarkMode] = useState(() => {
		if (typeof window === "undefined") return true;
		const savedTheme = localStorage.getItem("theme");
		if (savedTheme !== null) {
			return savedTheme === "dark";
		}
		return true;
	});

	useEffect(() => {
		document.documentElement.classList.toggle("dark", isDarkMode);
		localStorage.setItem("theme", isDarkMode ? "dark" : "light");
	}, [isDarkMode]);

	useEffect(() => {
		if ("scrollRestoration" in window.history) {
			window.history.scrollRestoration = "manual";
		}

		window.scrollTo({ top: 0, left: 0, behavior: "instant" });
	}, []);

	return (
		<React.Fragment>
			<div className="animate-bgGradient"></div>

			<PortfolioLayout
				isDarkMode={isDarkMode}
				onToggleDarkMode={() => setIsDarkMode((current) => !current)}
			>
				<Home />
				<RevealSection>
					<About />
				</RevealSection>
				<RevealSection>
					<Skills />
				</RevealSection>
				<RevealSection>
					<Projects />
				</RevealSection>
			</PortfolioLayout>
		</React.Fragment>
	);
}

export default App;
