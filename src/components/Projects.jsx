import React, { useState, useRef, useEffect, useCallback } from "react";
import { ExternalLink, CheckCircle2, ChevronRight } from "lucide-react";
import dsc from "../assets/dsc.png";
import flashify from "../assets/flashify.png";
import rentright from "../assets/rentright.png";

/* ─────────────────────────────────────────────
   ProjectCard — owns its own animation state
───────────────────────────────────────────── */
const ProjectCard = ({
	project,
	isActive,
	showDetails,
	showKnob,
	onCardClick,
	onMouseEnter,
	onMouseLeave,
	onHideDetails,
	onRestoreDetails,
}) => {
	const imgRef = useRef(null);
	const imgContainerRef = useRef(null);

	// All mutable pan/drag state in one ref — avoids re-renders
	const pan = useRef({
		posY: 0,
		direction: 1,
		animationId: null,
		lastTime: null,
		isDown: false,
		dragging: false,
		didDrag: false,
		startX: 0,
		startY: 0,
		startPosY: 0,
	});

	/* ── RAF auto-pan (top→bottom→top, bouncing) ── */
	useEffect(() => {
		const p = pan.current;

		if (!isActive) {
			cancelAnimationFrame(p.animationId);
			p.animationId = null;
			p.posY = 0;
			p.direction = 1;
			p.lastTime = null;
			p.isDown = false;
			p.dragging = false;
			p.didDrag = false;
			if (imgRef.current) imgRef.current.style.objectPosition = "";
			return;
		}

		const SPEED = 0.022; // % per ms → ~4.5s per direction, smooth and consistent

		const tick = (timestamp) => {
			// While user is dragging: freeze auto-pan, update lastTime so no jump on resume
			if (p.dragging || p.isDown) {
				p.lastTime = timestamp;
				p.animationId = requestAnimationFrame(tick);
				return;
			}

			if (p.lastTime === null) p.lastTime = timestamp;
			const dt = Math.min(timestamp - p.lastTime, 32); // cap dt to avoid frame spikes
			p.lastTime = timestamp;

			p.posY += p.direction * SPEED * dt;
			if (p.posY >= 100) {
				p.posY = 100;
				p.direction = -1;
			} else if (p.posY <= 0) {
				p.posY = 0;
				p.direction = 1;
			}

			if (imgRef.current) imgRef.current.style.objectPosition = `50% ${p.posY}%`;
			p.animationId = requestAnimationFrame(tick);
		};

		p.animationId = requestAnimationFrame(tick);
		return () => {
			cancelAnimationFrame(p.animationId);
			p.animationId = null;
		};
	}, [isActive]);

	/* ── Wheel scroll listener for active card ── */
	useEffect(() => {
		const container = imgContainerRef.current;
		if (!container || !isActive) return;

		const onWheel = (e) => {
			e.preventDefault();
			e.stopPropagation();
			const p = pan.current;
			p.posY = Math.max(0, Math.min(100, p.posY + e.deltaY * 0.12));
			p.lastTime = null;
			if (imgRef.current) imgRef.current.style.objectPosition = `50% ${p.posY}%`;
		};

		container.addEventListener("wheel", onWheel, { passive: false });
		return () => container.removeEventListener("wheel", onWheel);
	}, [isActive]);

	/* ── Touch gesture disambiguation for mobile (both horizontal swipe & vertical pan) ── */
	useEffect(() => {
		const imgEl = imgRef.current;
		if (!imgEl || !isActive) return;

		let startX = 0;
		let startY = 0;
		let prevY = 0;
		let lockDirection = null; // null | 'vertical' | 'horizontal'

		const onTouchStart = (e) => {
			if (e.touches.length !== 1) return;
			const touch = e.touches[0];
			startX = touch.clientX;
			startY = touch.clientY;
			prevY = touch.clientY;
			lockDirection = null;
			pan.current.isDown = true;
			pan.current.didDrag = false;
		};

		const onTouchMove = (e) => {
			if (!pan.current.isDown || e.touches.length !== 1) return;
			const touch = e.touches[0];
			const currentX = touch.clientX;
			const currentY = touch.clientY;

			if (lockDirection === null) {
				const totalDx = Math.abs(currentX - startX);
				const totalDy = Math.abs(currentY - startY);

				if (totalDx > totalDy && totalDx > 6) {
					// Horizontal swipe: let carousel scroll natively
					lockDirection = "horizontal";
					pan.current.isDown = false;
					return;
				} else if (totalDy > totalDx && totalDy > 6) {
					// Vertical drag on image: lock into image panning
					lockDirection = "vertical";
					pan.current.dragging = true;
					pan.current.didDrag = true;
					prevY = currentY;
				}
			}

			if (lockDirection === "vertical") {
				if (e.cancelable) e.preventDefault();
				const dy = currentY - prevY;
				prevY = currentY;

				const containerH = Math.max(100, imgContainerRef.current?.offsetHeight || 400);
				const deltaPercent = -(dy / containerH) * 100;

				if (!isNaN(deltaPercent)) {
					pan.current.posY = Math.max(0, Math.min(100, pan.current.posY + deltaPercent));
					if (dy !== 0) {
						pan.current.direction = dy < 0 ? 1 : -1;
					}
					pan.current.lastTime = null;
					if (imgRef.current) {
						imgRef.current.style.objectPosition = `50% ${pan.current.posY}%`;
					}
				}
			}
		};

		const onTouchEnd = () => {
			pan.current.isDown = false;
			pan.current.dragging = false;
			lockDirection = null;
			pan.current.lastTime = null;
		};

		imgEl.addEventListener("touchstart", onTouchStart, { passive: true });
		imgEl.addEventListener("touchmove", onTouchMove, { passive: false });
		imgEl.addEventListener("touchend", onTouchEnd, { passive: true });
		imgEl.addEventListener("touchcancel", onTouchEnd, { passive: true });

		return () => {
			imgEl.removeEventListener("touchstart", onTouchStart);
			imgEl.removeEventListener("touchmove", onTouchMove);
			imgEl.removeEventListener("touchend", onTouchEnd);
			imgEl.removeEventListener("touchcancel", onTouchEnd);
		};
	}, [isActive]);

	/* ── Direct drag handlers (mouse & desktop) ── */
	const handlePointerDown = useCallback(
		(e) => {
			if (!isActive || e.pointerType === "touch") return; // Touch handled by dedicated touch listener
			e.stopPropagation();
			const p = pan.current;
			p.isDown = true;
			p.dragging = false;
			p.didDrag = false;
			p.prevClientY = e.clientY;
			try {
				e.currentTarget.setPointerCapture(e.pointerId);
			} catch (_) {}
		},
		[isActive]
	);

	const handlePointerMove = useCallback((e) => {
		const p = pan.current;
		if (!p.isDown) return;

		const dy = e.clientY - (p.prevClientY ?? e.clientY);
		p.prevClientY = e.clientY;

		if (!p.dragging && Math.abs(dy) > 2) {
			p.dragging = true;
			p.didDrag = true;
			if (imgRef.current) imgRef.current.style.cursor = "grabbing";
		}

		if (p.dragging) {
			e.stopPropagation();
			const containerH = Math.max(100, imgContainerRef.current?.offsetHeight || 400);
			const deltaPercent = -(dy / containerH) * 100;
			if (!isNaN(deltaPercent)) {
				p.posY = Math.max(0, Math.min(100, p.posY + deltaPercent));
				if (dy !== 0) {
					p.direction = dy < 0 ? 1 : -1;
				}
				p.lastTime = null;
				if (imgRef.current) imgRef.current.style.objectPosition = `50% ${p.posY}%`;
			}
		}
	}, []);

	const handlePointerUp = useCallback((e) => {
		if (e.pointerType === "touch") return;
		const p = pan.current;
		p.isDown = false;
		if (p.dragging) {
			p.dragging = false;
			p.lastTime = null;
			if (imgRef.current) imgRef.current.style.cursor = "";
		}
		try {
			e.currentTarget.releasePointerCapture(e.pointerId);
		} catch (_) {}
	}, []);

	const handleImgClick = useCallback(
		(e) => {
			e.stopPropagation();
			if (pan.current.didDrag) {
				pan.current.didDrag = false;
				return; // ignore clicks that followed a drag
			}
			if (isActive && showDetails) onHideDetails(e);
		},
		[isActive, showDetails, onHideDetails]
	);

	return (
		<div
			onMouseEnter={onMouseEnter}
			onMouseLeave={onMouseLeave}
			onClick={onCardClick}
			className="flex-none snap-start cursor-pointer sm:cursor-default w-[74vw] max-w-72 sm:w-96 sm:max-w-none md:w-96"
		>
			<div className="relative h-[35rem] overflow-hidden rounded-2xl border border-gray-200/70 bg-white/75 shadow-md backdrop-blur-sm dark:border-green-300/40 dark:bg-black/35 sm:h-[44rem] sm:shadow-lg">

				{/* Accent bar */}
				<div className={`h-1.5 bg-gradient-to-r sm:h-2 ${project.color}`} />

				{/* Text block — fades out when active */}
				<div
					className={`relative z-10 flex flex-col p-4 sm:p-7 shrink-0 transition-opacity duration-300 ${isActive ? "opacity-0 pointer-events-none" : "opacity-100"}`}
				>
					<h3 className="mb-2 text-lg font-bold text-gray-800 dark:text-white sm:mb-3 sm:text-2xl">
						{project.title}
					</h3>
					<div className="space-y-3 text-gray-600 dark:text-gray-300 sm:space-y-5">
						<div>
							<p className="text-[11px] font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400 sm:text-xs">Purpose</p>
							<p className="mt-1 text-xs leading-relaxed sm:text-sm line-clamp-3">{project.purpose}</p>
						</div>
						<div>
							<p className="text-[11px] font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400 sm:text-xs">My Role</p>
							<p className="mt-1 text-xs font-medium text-indigo-600 sm:text-sm">{project.role}</p>
						</div>
						<div>
							<span className="inline-block max-w-full truncate rounded-full bg-gray-100 px-2.5 py-1 text-[11px] font-medium text-gray-700 dark:bg-white/10 dark:text-gray-200 sm:px-3 sm:text-xs">
								{project.tech}
							</span>
						</div>
					</div>
				</div>

				{/* Image container — expands to fill on active */}
				<div
					ref={imgContainerRef}
					className={`absolute inset-x-0 bottom-16 z-20 overflow-hidden transition-[top] duration-500 ease-out border-gray-200/70 dark:border-green-300/30 ${isActive ? "top-0 border-0 pointer-events-auto" : "top-[45%] border-y pointer-events-none"}`}
				>
					<img
						ref={imgRef}
						src={project.img}
						alt={project.title}
						draggable={false}
						onPointerDown={handlePointerDown}
						onPointerMove={handlePointerMove}
						onPointerUp={handlePointerUp}
						onPointerCancel={handlePointerUp}
						onClick={handleImgClick}
						className={`w-full h-full object-cover select-none ${isActive ? "cursor-grab active:cursor-grabbing" : ""}`}
					/>
					{/* Scroll/drag hint overlay */}
					{isActive && (
						<div className="pointer-events-none absolute bottom-2 left-1/2 -translate-x-1/2 rounded-full bg-black/40 px-2.5 py-1 text-[10px] text-white/90 backdrop-blur-sm opacity-70">
							Scroll or drag to explore
						</div>
					)}
				</div>

				{/* Bottom bar */}
				<div className="absolute inset-x-0 bottom-0 z-30 flex h-16 items-center justify-between gap-2 border-t border-transparent bg-white/90 px-4 backdrop-blur-sm dark:border-green-300/30 dark:bg-black/35 sm:px-7">
					<span
						className={`rounded-full px-2.5 py-1 text-[11px] font-semibold sm:px-3 sm:text-xs ${project.status === "Live"
								? "bg-emerald-50 text-emerald-700"
								: project.status === "In Progress" || project.status === "Ongoing"
									? "bg-amber-50 text-amber-700"
									: "bg-slate-100 text-slate-600 dark:bg-white/10 dark:text-gray-300"
							}`}
					>
						{project.status}
					</span>
					{project.liveUrl ? (
						<a
							href={project.liveUrl}
							target="_blank"
							rel="noreferrer"
							onClick={(e) => e.stopPropagation()}
							className="inline-flex items-center gap-1.5 rounded-full bg-gray-900 px-2.5 py-1 text-[11px] font-semibold text-white transition hover:bg-indigo-600 dark:bg-white dark:text-black dark:hover:bg-gray-200 sm:px-3 sm:text-xs"
							aria-label={`Open ${project.title} live site`}
						>
							Live Site
							<ExternalLink className="h-3 w-3" aria-hidden="true" />
						</a>
					) : (
						<span className="text-[11px] font-medium text-gray-400 dark:text-gray-500 sm:text-xs">
							No live link yet
						</span>
					)}
				</div>

				{/* Details panel — slides in as absolute overlay */}
				<div
					className={`absolute inset-y-0 right-0 z-40 w-44 overflow-hidden border-l border-gray-200/70 bg-white/95 dark:border-green-300/20 dark:bg-black/85 backdrop-blur-sm transition-[transform,opacity] duration-500 ease-out ${showDetails ? "translate-x-0 opacity-100" : "translate-x-full opacity-0"}`}
				>
					<div
						className="flex flex-col h-full p-3.5 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-200 dark:scrollbar-thumb-gray-700"
						style={{ minWidth: "11rem" }}
						onClick={(e) => e.stopPropagation()}
					>
						<h4 className="text-sm font-bold text-gray-900 dark:text-white mb-0.5">{project.title}</h4>
						<p className="text-[10px] font-medium text-indigo-600 dark:text-indigo-400 mb-3">{project.role}</p>
						<p className="text-[11px] font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-2">Features</p>
						<ul className="space-y-2 text-[11px] text-gray-600 dark:text-gray-300 flex-1">
							{project.features.map((feature, idx) => (
								<li key={idx} className="flex items-start gap-1.5">
									<CheckCircle2 className="h-3 w-3 text-emerald-500 shrink-0 mt-0.5" />
									<span className="leading-snug">{feature}</span>
								</li>
							))}
						</ul>
						<div className="mt-3 pt-3 border-t border-gray-100 dark:border-white/10">
							<span className="inline-block rounded-full bg-gray-100 px-2 py-0.5 text-[10px] font-medium text-gray-700 dark:bg-white/10 dark:text-gray-200">
								{project.tech}
							</span>
						</div>
					</div>
				</div>

				{/* Knob — appears when details are hidden */}
				<button
					onClick={onRestoreDetails}
					className={`absolute right-0 top-1/2 -translate-y-1/2 z-50 flex items-center justify-center h-14 w-7 rounded-l-full bg-white/95 dark:bg-gray-900/90 border border-r-0 border-gray-200/80 dark:border-white/20 shadow-lg backdrop-blur-sm transition-[transform,opacity] duration-300 ease-out hover:w-9 ${showKnob ? "translate-x-0 opacity-100" : "translate-x-full opacity-0 pointer-events-none"}`}
					aria-label="Show project details"
				>
					<ChevronRight className="h-3.5 w-3.5 text-gray-500 dark:text-gray-400 -rotate-180" />
				</button>
			</div>
		</div>
	);
};

/* ─────────────────────────────────────────────
   Projects — parent manages shared state
───────────────────────────────────────────── */
const Projects = () => {
	const [hoveredId, setHoveredId] = useState(null);
	const [mobileOpenId, setMobileOpenId] = useState(null);
	const [detailsHiddenIds, setDetailsHiddenIds] = useState(new Set());

	const hideDetails = useCallback((id, e) => {
		e.stopPropagation();
		setDetailsHiddenIds((prev) => new Set([...prev, id]));
	}, []);

	const restoreDetails = useCallback((id, e) => {
		e.stopPropagation();
		setDetailsHiddenIds((prev) => {
			const next = new Set(prev);
			next.delete(id);
			return next;
		});
	}, []);

	const handleMouseEnter = useCallback((id) => setHoveredId(id), []);

	const handleMouseLeave = useCallback((id) => {
		setHoveredId(null);
		setDetailsHiddenIds((prev) => {
			const next = new Set(prev);
			next.delete(id);
			return next;
		});
	}, []);

	const handleCardClick = useCallback((id) => {
		setMobileOpenId((prev) => {
			if (prev === id) {
				setDetailsHiddenIds((hPrev) => {
					const next = new Set(hPrev);
					next.delete(id);
					return next;
				});
				return null;
			}
			return id;
		});
	}, []);

	const projects = [
		{
			id: 1,
			img: dsc,
			title: "Stickify: DSC",
			tech: "React + Laravel",
			color: "from-yellow-400 to-yellow-50",
			purpose:
				"A school project developed for a real client, focused on delivering a functional and user-friendly application while applying full-stack development skills.",
			features: [
				"Display client's sticker products and services catalog",
				"Appointment booking system for car wrapping & installations",
				"Custom sticker design request and quote calculation",
				"Real-time customer support and live chat",
				"Business operations management (artist, staff, admin, and subadmin interaction)",
			],
			role: "Frontend + Backend Developer",
			status: "In Progress",
		},
		{
			id: 2,
			img: flashify,
			title: "Flashify",
			tech: "Vue + Laravel + Tailwind CSS",
			color: "from-cyan-500 to-cyan-50",
			purpose:
				"A flashcard study website designed to help students review topics, practice active recall, and make studying more focused and effective.",
			features: [
				"Create custom flashcard decks for studying",
				"Interactive card UI with smooth 3D flip effect",
				"Study hints display to guide active recall",
				"Question input and answer reveal at the back of the card",
			],
			role: "Frontend Developer",
			status: "Live",
			liveUrl: "https://flashify-preview.vercel.app/",
		},
		{
			id: 3,
			img: rentright,
			title: "RentRight",
			tech: "Next.js + Supabase",
			color: "from-blue-600 to-blue-50",
			purpose:
				"A comprehensive rental and property management platform (website & upcoming app) for apartments, commercial buildings, condominiums, and rentable spaces.",
			features: [
				"Tenant portal to search and rent available living or commercial spaces",
				"Automated billing due dates & payment schedules",
				"Maintenance requests (cleaning, roof repair, property attention)",
				"Incident & noise reporting for neighboring units",
				"Comprehensive owner dashboard for buildings, units, and floorplans",
				"Display buildings & apartments with inclusions (water, electricity, WiFi) and fees",
				"Interactive building and property location mapping",
			],
			role: "Full-Stack Developer",
			status: "Ongoing",
		},
	];

	return (
		<div id="projects" className="px-5 sm:px-8 lg:px-0">
			<div
				className="py-3 px-6 sm:pr-50 text-lg rounded-full w-fit border-2 transition"
				style={{ borderImage: "linear-gradient(to right, #9ca3af, transparent) 1" }}
			>
				Projects
			</div>

			<section className="mt-8 lg:mt-5 pb-16 lg:pb-20">
				<div className="max-w-7xl mx-auto">
					<h2 className="text-3xl sm:text-4xl font-bold text-center mb-4">My Projects</h2>
					<p className="mb-10 text-center text-gray-600 dark:text-gray-300 lg:mb-12">
						Things I've built so far
					</p>

					<div className="relative border-t border-t-gray-300 -mx-5 px-5 sm:-mx-8 sm:px-8 lg:mx-0 lg:px-0">
						<div
							className="flex gap-4 sm:gap-6 lg:gap-5 overflow-x-auto py-4 scrollbar scrollbar-thumb-gray-400 scrollbar-track-gray-100 scrollbar-thin hover:scrollbar-thumb-gray-600 transition-all"
							style={{ WebkitOverflowScrolling: "touch" }}
						>
							{projects.map((project) => {
								const id = project.id;
								const isActive = hoveredId === id || mobileOpenId === id;
								const isDetailsHidden = detailsHiddenIds.has(id);
								return (
									<ProjectCard
										key={id}
										project={project}
										isActive={isActive}
										showDetails={isActive && !isDetailsHidden}
										showKnob={isActive && isDetailsHidden}
										onCardClick={() => handleCardClick(id)}
										onMouseEnter={() => handleMouseEnter(id)}
										onMouseLeave={() => handleMouseLeave(id)}
										onHideDetails={(e) => hideDetails(id, e)}
										onRestoreDetails={(e) => restoreDetails(id, e)}
									/>
								);
							})}
						</div>
					</div>
				</div>
			</section>
		</div>
	);
};

export default Projects;
