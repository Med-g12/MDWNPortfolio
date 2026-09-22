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
			{ threshold: 0.15 },
		);

		observer.observe(section);

		return () => observer.disconnect();
	}, []);

	return (
		<div
			ref={sectionRef}
			className={`section-reveal ${isVisible ? "section-reveal--visible" : ""}`}
			style={{ transitionDelay: `${delay}ms` }}
		>
			{children}
		</div>
	);
}

function App() {
	const [isDarkMode, setIsDarkMode] = useState(() => {
		if (typeof window === "undefined") return false;
		return window.matchMedia("(prefers-color-scheme: dark)").matches;
	});

	useEffect(() => {
		document.documentElement.classList.toggle("dark", isDarkMode);
	}, [isDarkMode]);

	useEffect(() => {
		const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
		const handleThemeChange = (event) => setIsDarkMode(event.matches);

		mediaQuery.addEventListener("change", handleThemeChange);

		return () => mediaQuery.removeEventListener("change", handleThemeChange);
	}, []);

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
				<RevealSection>
					<Home />
				</RevealSection>
				<RevealSection delay={100}>
					<About />
				</RevealSection>
				<RevealSection delay={100}>
					<Skills />
				</RevealSection>
				<RevealSection delay={100}>
					<Projects />
				</RevealSection>
			</PortfolioLayout>
		</React.Fragment>
	);
}

export default App;
