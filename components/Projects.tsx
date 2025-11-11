"use client";
import React, { useRef, useState, useEffect } from "react";
import Card from "@/components/Card";
import { useTranslation } from "react-i18next";
import { useDarkMode } from "@/components/context";
import { FaExternalLinkAlt } from "react-icons/fa";

type Project = {
  title: string;
  description: string;
  href: string;
  techStack?: string[];
  live?: boolean;
  image?: string;
};

const projects: Project[] = [
  {
    title: "Cub3D",
    description:
      "A 3D maze game built using raycasting, allowing players to navigate through a maze and collect items to win the game.",
    href: "https://github.com/Abdlatif-20/cub3D_42",
    techStack: ["C", "raycasting", "minilibx"],
    image: "/projects/cub3d42.png",
  },
  {
    title: "Web Server",
    description:
      "A lightweight HTTP server built from scratch, focused on handling requests and responses efficiently.",
    href: "https://github.com/Abdlatif-20/webserv",
    techStack: ["C++", "HTTP", "Server"],
    image: "/projects/webserver.png",
  },
  {
    title: "Inception",
    description:
      "Docker-based multi-container setup demonstrating secure service deployment and orchestration.",
    href: "https://github.com/Abdlatif-20/Inception_42",
    techStack: ["Docker", "nginx", "WordPress", "mySQL"],
    image: "/projects/inception.png",
  },
  {
    title: "Pong Game",
    description:
      "A modern take on Pong with multiplayer features, auth, and social elements for an engaging experience.",
    href: "https://github.com/Abdlatif-20/ft_transcendence",
    techStack: ["TypeScript", "Next.js", "Tailwind", "Postgres", "Redis", "WebSockets"],
    image: "/projects/pong.jpg",
  },
  {
    title: "Portfolio",
    description: "This portfolio site built with Next.js, TailwindCSS and i18n.",
    href: "https://github.com/Abdlatif-20/Portfolio",
    techStack: ["Next.js", "TailwindCSS", "i18next"],
    image: "/projects/portfolio.svg",
  },
  {
    title: "rhmetrics",
    description:
      "HR market research platform with multilingual support and data-driven dashboards.",
    href: "https://rhmetrics.ma/",
    techStack: ["React", "Tailwind", "Strapi", "Postgres"],
    live: true,
    image: "/projects/rhmetrics.png",
  },
  {
    title: "MyJoboard",
    description: "Job board platform with search and application features.",
    href: "https://www.job.myjoboard-ma.com/",
    techStack: ["React", "Tailwind", "Express", "Postgres"],
    live: true,
    image: "/projects/myjoboard.svg",
  },
];

export default function Projects() {
  const { t } = useTranslation();
  const { isDarkMode } = useDarkMode();
  // show all projects by default
  const visibleCount = projects.length;
  const containerRef = useRef<HTMLDivElement | null>(null);
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);
  const singleWidthRef = useRef<number>(0);
  const cardStepRef = useRef<number>(0);
  const animationRef = useRef<number | null>(null);
  const lastTimeRef = useRef<number | null>(null);
  const [isPaused, setIsPaused] = useState(false);
  const SCROLL_SPEED = 60; // px per second
  const currentXRef = useRef<number>(0);
  const isPausedRef = useRef<boolean>(false);

  // removed showMore/showLess controls — all projects are visible

  useEffect(() => {
    isPausedRef.current = isPaused;
  }, [isPaused]);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    // width of one sequence (first child)
    const firstGroup = track.children[0] as HTMLElement | undefined;
    if (!firstGroup) return;
    const singleWidth = firstGroup.getBoundingClientRect().width;
    singleWidthRef.current = singleWidth;

    // determine single card step (distance between two adjacent cards)
    const firstCard = firstGroup.querySelector('a') as HTMLElement | null;
    if (firstCard) {
      const cards = Array.from(firstGroup.querySelectorAll('a')) as HTMLElement[];
      if (cards.length >= 2) {
        const step = Math.abs(cards[1].getBoundingClientRect().left - cards[0].getBoundingClientRect().left);
        cardStepRef.current = step;
      } else {
        cardStepRef.current = singleWidth / Math.max(1, Math.min(projects.length, visibleCount));
      }
    }

  // don't reset currentXRef here so pause/resume is seamless
    const step = (time: number) => {
      if (lastTimeRef.current == null) lastTimeRef.current = time;
      const dt = time - (lastTimeRef.current || time);
      lastTimeRef.current = time;
      if (!isPausedRef.current) {
        currentXRef.current -= (SCROLL_SPEED * dt) / 1000;
        if (Math.abs(currentXRef.current) >= singleWidth) {
          // wrap
          currentXRef.current += singleWidth;
        }
        track.style.transform = `translateX(${currentXRef.current}px)`;
      }
      animationRef.current = requestAnimationFrame(step);
    };

    animationRef.current = requestAnimationFrame(step);
    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
      animationRef.current = null;
      lastTimeRef.current = null;
    };
    // run once (layout changes will naturally keep things correct)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // manual scroll handlers (left/right)
  const scrollBy = (delta: number) => {
    const track = trackRef.current;
    const singleWidth = singleWidthRef.current || 0;
    if (!track) return;
    currentXRef.current += delta;
    // wrap similarly to the animation logic
    if (singleWidth > 0) {
      if (Math.abs(currentXRef.current) >= singleWidth) {
        // bring back into range
        if (currentXRef.current < 0) currentXRef.current += singleWidth;
        else currentXRef.current -= singleWidth;
      }
    }
    track.style.transform = `translateX(${currentXRef.current}px)`;
  };

  const onLeft = () => {
    // move content right to reveal previous items
    const step = cardStepRef.current || 420;
    scrollBy(Math.abs(step));
  };

  const onRight = () => {
    const step = cardStepRef.current || 420;
    scrollBy(-Math.abs(step));
  };

  // keyboard control when wrapper is focused
  const onWrapperKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowLeft') {
      e.preventDefault();
      onLeft();
    } else if (e.key === 'ArrowRight') {
      e.preventDefault();
      onRight();
    }
  };

  return (
    <section
      id="projects"
      className={`w-full flex flex-col items-center px-4 py-12 md:py-20 bg-transparent
      }`}
    >
      <div className="max-w-7xl w-full">
        <header className="mb-8 md:mb-12">
          <h2 className={`text-3xl md:text-4xl font-extrabold ${isDarkMode ? "text-white" : "text-black"}`}>
            {t("Projects")}
          </h2>
          <p className={`mt-2 text-sm md:text-base ${isDarkMode ? "text-slate-300" : "text-slate-600"}`}>
            {t(
              "Selected projects that showcase my skills in systems programming, web development and container orchestration."
            )}
          </p>
        </header>

        {/* responsive grid on md+, horizontal carousel on small screens */}
          {/* Auto-scrolling single-line projects strip */}
          <div className="w-full overflow-hidden relative" ref={wrapperRef} onMouseEnter={() => setIsPaused(true)} onMouseLeave={() => setIsPaused(false)} onKeyDown={onWrapperKeyDown} tabIndex={0} aria-label="Projects carousel">
            {/* left / right controls */}
            <button
              aria-label="Previous projects"
              onClick={onLeft}
              className="absolute left-2 top-1/2 -translate-y-1/2 z-40 p-2 rounded-full bg-white/80 dark:bg-black/60 shadow-md hover:scale-105 transition-transform hover:bg-green-400/60"
            >
              ‹
            </button>
            <button
              aria-label="Next projects"
              onClick={onRight}
              className="absolute right-2 top-1/2 -translate-y-1/2 z-40 p-2 rounded-full bg-white/80 dark:bg-black/60 shadow-md
              hover:scale-105 transition-transform hover:bg-green-400/60"
            >
              ›
            </button>
            <div
              ref={trackRef}
              className="flex gap-6 items-stretch whitespace-nowrap will-change-transform"
              style={{ transform: "translateX(0px)" }}
            >
              {[0, 1].map((copy) => (
                <div key={copy} className="flex gap-6 ">
                  {projects.slice(0, visibleCount).map((p, i) => (
                        <a
                          key={`${copy}-${i}`}
                          href={p.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`inline-block rounded-2xl overflow-hidden w-[400px] ${isDarkMode ? "bg-[#0b1116]" : "bg-white"} shadow-lg hover:scale-[1.01] transition-transform focus:outline-none focus:ring-2 focus:ring-offset-2`}
                          aria-label={`${p.title} - open in a new tab`}
                        >
                          <div className="relative">
                            {p.image && <img src={p.image} alt={p.title} className="w-full h-40 object-cover" />}
                            <span className="absolute top-2 right-2 bg-black/50 text-white rounded-full p-1">
                              <FaExternalLinkAlt size={12} />
                            </span>
                          </div>
                          <div className="p-3">
                            <h3 className={`text-base font-semibold ${isDarkMode ? "text-white" : "text-slate-900"}`}>{t(p.title)}</h3>
                            <p className={`text-xs mt-1 ${isDarkMode ? "text-slate-300" : "text-slate-700"}`}>{t(p.description)}</p>
                            <div className="mt-2 flex flex-wrap gap-2">
                              {p.techStack?.map((tech, idx) => (
                                <span key={idx} className={`text-xs px-2 py-1 rounded-md font-medium ${isDarkMode ? "bg-slate-800 text-slate-200" : "bg-slate-100 text-slate-800"}`}>
                                  {tech}
                                </span>
                              ))}
                            </div>
                          </div>
                        </a>
                      ))}
                </div>
              ))}
            </div>
          </div>

        {/* all projects are shown; show more / show less controls removed */}
      </div>
    </section>
  );
}
