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
	useEffect(() => {
		if ("scrollRestoration" in window.history) {
			window.history.scrollRestoration = "manual";
		}

		window.scrollTo({ top: 0, left: 0, behavior: "instant" });
	}, []);

	return (
		<React.Fragment>
			<div className="animate-bgGradient"></div>

			<PortfolioLayout>
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
