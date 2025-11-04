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
    image: "/images/projects/cub3d.svg",
  },
  {
    title: "Web Server",
    description:
      "A lightweight HTTP server built from scratch, focused on handling requests and responses efficiently.",
    href: "https://github.com/Abdlatif-20/webserv",
    techStack: ["C++", "HTTP", "Server"],
    image: "/images/projects/webserver.svg",
  },
  {
    title: "Inception",
    description:
      "Docker-based multi-container setup demonstrating secure service deployment and orchestration.",
    href: "https://github.com/Abdlatif-20/Inception_42",
    techStack: ["Docker", "nginx", "WordPress", "mySQL"],
    image: "/images/projects/inception.svg",
  },
  {
    title: "Pong Game",
    description:
      "A modern take on Pong with multiplayer features, auth, and social elements for an engaging experience.",
    href: "https://github.com/Abdlatif-20/ft_transcendence",
    techStack: ["TypeScript", "Next.js", "Tailwind", "Postgres", "Redis", "WebSockets"],
    image: "/images/projects/pong.svg",
  },
  {
    title: "Portfolio",
    description: "This portfolio site built with Next.js, TailwindCSS and i18n.",
    href: "https://github.com/Abdlatif-20/Portfolio",
    techStack: ["Next.js", "TailwindCSS", "i18next"],
    image: "/images/projects/portfolio.svg",
  },
  {
    title: "rhmetrics",
    description:
      "HR market research platform with multilingual support and data-driven dashboards.",
    href: "https://rhmetrics.ma/",
    techStack: ["React", "Tailwind", "Strapi", "Postgres"],
    live: true,
    image: "/images/projects/rhmetrics.svg",
  },
  {
    title: "MyJoboard",
    description: "Job board platform with search and application features.",
    href: "https://www.job.myjoboard-ma.com/",
    techStack: ["React", "Tailwind", "Express", "Postgres"],
    live: true,
    image: "/images/projects/myjoboard.svg",
  },
];

export default function Projects() {
  const { t } = useTranslation();
  const { isDarkMode } = useDarkMode();
  const [visibleCount, setVisibleCount] = useState(6);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);
  const animationRef = useRef<number | null>(null);
  const lastTimeRef = useRef<number | null>(null);
  const [isPaused, setIsPaused] = useState(false);
  const SCROLL_SPEED = 60; // px per second
  const currentXRef = useRef<number>(0);
  const isPausedRef = useRef<boolean>(false);

  const showMore = () => setVisibleCount((c) => Math.min(projects.length, c + 3));
  const showLess = () => setVisibleCount((c) => Math.max(3, c - 3));
  const [mobileIndex, setMobileIndex] = useState(0);

  const prevMobile = () => setMobileIndex((i) => Math.max(0, i - 1));
  const nextMobile = () => setMobileIndex((i) => Math.min(Math.max(0, visibleCount - 1), i + 1));

  // Auto-scroll logic for the track
  // keep refs in sync with state so the animation loop doesn't restart on hover/pause
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [visibleCount]);

  return (
    <section
      id="projects"
      className={`w-full flex flex-col items-center px-4 py-12 md:py-20 ${
        isDarkMode ? "bg-[#0F1720]" : "bg-transparent"
      }`}
    >
      <div className="max-w-6xl w-full">
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
          <div className="w-full overflow-hidden" ref={wrapperRef} onMouseEnter={() => setIsPaused(true)} onMouseLeave={() => setIsPaused(false)}>
            <div
              ref={trackRef}
              className="flex gap-6 items-stretch whitespace-nowrap will-change-transform"
              style={{ transform: "translateX(0px)" }}
            >
              {[0, 1].map((copy) => (
                <div key={copy} className="flex gap-6">
                  {projects.slice(0, visibleCount).map((p, i) => (
                    <div key={`${copy}-${i}`} className={`inline-block rounded-2xl overflow-hidden ${isDarkMode ? "bg-[#0b1116]" : "bg-white"} shadow-lg`} style={{ minWidth: 280 }}>
                      {p.image && <img src={p.image} alt={p.title} className="w-full h-40 object-cover" />}
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
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>

          {/* Mobile carousel */}
          <div className="md:hidden -mx-4 px-4">
            {/* mobile single view with prev/next controls */}
            <div className="relative">
              {projects.slice(0, visibleCount).map((p, i) => (
                <div
                  key={i}
                  className={`transition-transform duration-300 ${i === mobileIndex ? "block" : "hidden"}`}
                >
                  <div className={`rounded-2xl overflow-hidden ${isDarkMode ? "bg-[#0b1116]" : "bg-white"}`}>
                    {p.image && (
                      <img src={p.image} alt={p.title} className="w-full h-40 object-cover" />
                    )}
                    <div className="p-4">
                      <h3 className={`text-lg font-semibold mb-2 ${isDarkMode ? "text-white" : "text-slate-900"}`}>{t(p.title)}</h3>
                      <p className={`text-sm ${isDarkMode ? "text-slate-300" : "text-slate-700"}`}>{t(p.description)}</p>

                      <div className="mt-2 flex flex-wrap gap-2">
                        {p.techStack?.map((tech, idx) => (
                          <span
                            key={idx}
                            className={`text-xs px-2 py-1 rounded-md font-medium ${
                              isDarkMode ? "bg-slate-800 text-slate-200" : "bg-slate-100 text-slate-800"
                            }`}
                          >
                            {tech}
                          </span>
                        ))}
                      </div>

                      <div className="mt-4 flex items-center gap-3">
                        <a href={p.href} target="_blank" rel="noreferrer" className="text-sm text-[#00BD95] inline-flex items-center gap-2">
                          {p.live ? t("Visit") : t("Repository")} <FaExternalLinkAlt />
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              {/* controls */}
              <div className="absolute inset-x-0 -bottom-6 flex justify-center gap-4">
                <button
                  onClick={prevMobile}
                  aria-label="Previous project"
                  className="px-3 py-2 rounded-full bg-white/90 text-slate-900 shadow-md md:hidden"
                >
                  Prev
                </button>
                <div className="flex items-center gap-2">
                  {projects.slice(0, visibleCount).map((_, dotIdx) => (
                    <button
                      key={dotIdx}
                      onClick={() => setMobileIndex(dotIdx)}
                      aria-label={`Go to project ${dotIdx + 1}`}
                      className={`w-2 h-2 rounded-full ${dotIdx === mobileIndex ? "bg-[#00BD95]" : "bg-slate-300"}`}
                    />
                  ))}
                </div>
                <button
                  onClick={nextMobile}
                  aria-label="Next project"
                  className="px-3 py-2 rounded-full bg-white/90 text-slate-900 shadow-md md:hidden"
                >
                  Next
                </button>
              </div>
            </div>
          </div>

        <div className="mt-8 flex items-center gap-4">
          {visibleCount < projects.length && (
            <button
              onClick={showMore}
              className="px-5 py-2 rounded-full bg-gradient-to-r from-[#00BD95] to-[#00A884] text-white font-semibold shadow-md hover:scale-105 transition-transform"
            >
              {t("Show More")}
            </button>
          )}

          {visibleCount > 3 && (
            <button onClick={showLess} className="px-4 py-2 rounded-full border text-sm">
              {t("Show Less")}
            </button>
          )}
        </div>
      </div>
    </section>
  );
}
