"use client";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { useDarkMode } from "@/components/context";
import { FaExternalLinkAlt, FaGithub, FaGlobe, FaCode, FaServer, FaReact } from "react-icons/fa";
import { SiDocker, SiNextdotjs, SiCplusplus } from "react-icons/si";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import Image from 'next/image';

type Project = {
  title: string;
  description: string;
  href: string;
  techStack?: string[];
  live?: boolean;
  image?: string;
  category?: string;
  featured?: boolean;
};

const projects: Project[] = [
  {
    title: "Portfolio",
    description: "Portfolio_desc",
    href: "https://github.com/Abdlatif-20/Portfolio",
    techStack: ["Next.js", "TailwindCSS", "i18next", "Framer Motion", "React Icons", "React Toastify", "i18next"],
    image: "/projects/portfolio.png",
    category: "Web Development",
    featured: true,
  },
  {
    title: "MyJoboard",
    description: "MyJoboard_desc",
    href: "https://www.job.myjoboard-ma.com/",
    techStack: ["React", "Tailwind", "Express", "Postgres"],
    live: true,
    image: "/projects/myjoboard.webp",
    category: "Web Development",
    featured: true,
  },
  {
    title: "rhmetrics",
    description: "rhmetrics_desc",
    href: "https://rhmetrics.ma/",
    techStack: ["React", "Tailwind", "Strapi", "Postgres"],
    live: true,
    image: "/projects/rhmetrics.webp",
    category: "Web Development",
  },
  {
    title: "Pong Game",
    description: "Pong Game_desc",
    href: "https://github.com/Abdlatif-20/ft_transcendence",
    techStack: ["TypeScript", "Next.js", "Tailwind", "Postgres", "Redis", "WebSockets", "Docker", "Django", "Python", "REST API", "i18next", "Postman"],
    image: "/projects/pong.webp",
    category: "Web Development",
    
  },
  {
    title: "Web Server",
    description: "Web Server_desc",
    href: "https://github.com/Abdlatif-20/webserv",
    techStack: ["C++", "HTTP", "Server"],
    image: "/projects/webserver.webp",
    category: "Systems Programming",
  },
  {
    title: "Inception",
    description: "Inception_desc",
    href: "https://github.com/Abdlatif-20/Inception_42",
    techStack: ["Docker", "nginx", "WordPress", "mySQL"],
    image: "/projects/inception.webp",
    category: "DevOps",
  },
  {
    title: "Cub3D",
    description: "Cub3D_desc",
    href: "https://github.com/Abdlatif-20/cub3D_42",
    techStack: ["C", "raycasting", "minilibx"],
    image: "/projects/cub3d42.webp",
    category: "Systems Programming",
  },
];

const categories = ["All", "Web Development", "Systems Programming", "DevOps"];

export default function Projects() {
  const { t } = useTranslation();
  const { isDarkMode } = useDarkMode();
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [hoveredProject, setHoveredProject] = useState<number | null>(null);
  const [expandedTech, setExpandedTech] = useState<number | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const projectsPerPage = 6;
  const { ref, isVisible } = useScrollAnimation(0.1);

  const filteredProjects = selectedCategory === "All" 
    ? projects 
    : projects.filter(p => p.category === selectedCategory);

  // Calculate pagination
  const totalPages = Math.ceil(filteredProjects.length / projectsPerPage);
  const startIndex = (currentPage - 1) * projectsPerPage;
  const endIndex = startIndex + projectsPerPage;
  const currentProjects = filteredProjects.slice(startIndex, endIndex);

  // Reset to page 1 when category changes
  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    setCurrentPage(1);
    scrollToProjects();
  };

  // Scroll to projects section
  const scrollToProjects = () => {
    const projectsSection = document.getElementById('projects');
    if (projectsSection) {
      const offset = 100; // Account for fixed header
      const elementPosition = projectsSection.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;
      
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  // Handle page change with scroll
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    scrollToProjects();
  };

  return (
    <section
      ref={ref as React.RefObject<HTMLElement>}
      id="projects"
      className={`w-full flex flex-col items-center px-4 py-12 md:py-20 bg-transparent transition-all duration-1000 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'
      }`}
    >
      <div className="max-w-6xl w-full mx-auto">
        {/* Header with Stats */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between mb-8 md:mb-12 gap-4">
          <div>
            <h2 className={`text-3xl md:text-4xl font-extrabold ${isDarkMode ? "text-white" : "text-black"}`}>
              {t("Projects")}
            </h2>
            <p className={`mt-2 text-sm md:text-base ${isDarkMode ? "text-slate-300" : "text-slate-600"}`}>
              {t(
                "Selected projects that showcase my skills in systems programming, web development and container orchestration."
              )}
            </p>
          </div>
          
          {/* Quick Stats */}
          <div className="flex gap-4">
            <div className={`text-center px-4 py-2 rounded-lg ${isDarkMode ? "bg-slate-800" : "bg-slate-100"}`}>
              <div className={`text-2xl font-bold ${isDarkMode ? "text-[#00BD95]" : "text-[#00BD95]"}`}>
                {projects.length}
              </div>
              <div className={`text-xs ${isDarkMode ? "text-slate-400" : "text-slate-600"}`}>
                {t("Projects")}
              </div>
            </div>
            <div className={`text-center px-4 py-2 rounded-lg ${isDarkMode ? "bg-slate-800" : "bg-slate-100"}`}>
              <div className={`text-2xl font-bold ${isDarkMode ? "text-[#00BD95]" : "text-[#00BD95]"}`}>
                {projects.filter(p => p.live).length}
              </div>
              <div className={`text-xs ${isDarkMode ? "text-slate-400" : "text-slate-600"}`}>
                {t("Live")}
              </div>
            </div>
          </div>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap gap-2 mb-8">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => handleCategoryChange(category)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 transform hover:scale-105
                ${selectedCategory === category
                  ? "bg-[#00BD95] text-white shadow-lg"
                  : isDarkMode
                    ? "bg-slate-800 text-slate-300 hover:bg-slate-700"
                    : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                }
              `}
            >
              {t(category)}
            </button>
          ))}
        </div>

        {/* Professional Grid Layout */}
        <div
          className="w-full"
        >
          <div
            className="flex md:flex-row flex-nowrap gap-6 overflow-x-auto md:overflow-x-auto lg:grid lg:grid-cols-3 lg:gap-6 scroll-snap-x pb-4"
            style={{ WebkitOverflowScrolling: 'touch' }}
          >
            {currentProjects.map((project, index) => (
              <div
                key={index}
                className={`min-w-[80vw] md:min-w-[48vw] lg:min-w-0 transition-all duration-700 scroll-snap-align-start ${
                  isVisible 
                    ? 'opacity-100 translate-y-0' 
                    : 'opacity-0 translate-y-20'
                }`}
                style={{ transitionDelay: `${index * 150}ms` }}
              >
                <ProjectCard 
                  project={project} 
                  isDarkMode={isDarkMode} 
                  t={t}
                  isHovered={hoveredProject === index}
                  onHover={() => setHoveredProject(index)}
                  onLeave={() => setHoveredProject(null)}
                  projectIndex={index}
                  expandedTech={expandedTech}
                  setExpandedTech={setExpandedTech}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-2 mt-12">
            {/* Previous Button */}
            <button
              onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
              className={`px-4 py-2 rounded-lg font-medium text-sm transition-all duration-300 transform hover:scale-105
                ${currentPage === 1
                  ? isDarkMode
                    ? "bg-slate-800 text-slate-600 cursor-not-allowed"
                    : "bg-slate-100 text-slate-400 cursor-not-allowed"
                  : isDarkMode
                    ? "bg-slate-800 text-white hover:bg-[#00BD95]"
                    : "bg-slate-200 text-slate-900 hover:bg-[#00BD95] hover:text-white"
                }
              `}
            >
              {t("Previous")}
            </button>

            {/* Page Numbers */}
            <div className="flex gap-2">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <button
                  key={page}
                  onClick={() => handlePageChange(page)}
                  className={`w-10 h-10 rounded-lg font-medium text-sm transition-all duration-300 transform hover:scale-110
                    ${currentPage === page
                      ? "bg-[#00BD95] text-white shadow-lg scale-110"
                      : isDarkMode
                        ? "bg-slate-800 text-slate-300 hover:bg-slate-700"
                        : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                    }
                  `}
                >
                  {page}
                </button>
              ))}
            </div>

            {/* Next Button */}
            <button
              onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))}
              disabled={currentPage === totalPages}
              className={`px-4 py-2 rounded-lg font-medium text-sm transition-all duration-300 transform hover:scale-105
                ${currentPage === totalPages
                  ? isDarkMode
                    ? "bg-slate-800 text-slate-600 cursor-not-allowed"
                    : "bg-slate-100 text-slate-400 cursor-not-allowed"
                  : isDarkMode
                    ? "bg-slate-800 text-white hover:bg-[#00BD95]"
                    : "bg-slate-200 text-slate-900 hover:bg-[#00BD95] hover:text-white"
                }
              `}
            >
              {t("Next")}
            </button>
          </div>
        )}

        {/* No Results */}
        {filteredProjects.length === 0 && (
          <div className={`text-center py-12 ${isDarkMode ? "text-slate-400" : "text-slate-600"}`}>
            <p className="text-lg">{t("No projects found in this category")}</p>
          </div>
        )}
      </div>
    </section>
  );
}

// Project Card Component
function ProjectCard({ 
  project, 
  isDarkMode, 
  t, 
  isHovered, 
  onHover, 
  onLeave,
  projectIndex,
  expandedTech,
  setExpandedTech
}: { 
  project: Project; 
  isDarkMode: boolean; 
  t: any;
  isHovered: boolean;
  onHover: () => void;
  onLeave: () => void;
  projectIndex: number;
  expandedTech: number | null;
  setExpandedTech: (index: number | null) => void;
}) {
  return (
    <div
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
      className={`group relative rounded-2xl overflow-hidden transition-all duration-500 transform
        ${isHovered ? "-translate-y-3 shadow-2xl" : "hover:-translate-y-2 hover:shadow-xl"}
        ${project.featured 
          ? isDarkMode 
            ? "bg-gradient-to-br from-[#0b1116] via-[#0b1116] to-slate-900 border-2 border-[#00BD95]/30" 
            : "bg-gradient-to-br from-white via-white to-slate-50 border-2 border-[#00BD95]/30"
          : isDarkMode 
            ? "bg-[#0b1116] border border-slate-800 hover:border-slate-700" 
            : "bg-white border border-gray-200 hover:border-gray-300"
        }
      `}
    >
      {/* Featured Badge */}
      {project.featured && (
        <div className="absolute top-3 left-3 z-20 flex items-center gap-1 px-3 py-1 rounded-full bg-gradient-to-r from-[#00BD95] to-cyan-500 shadow-lg">
          <span className="text-xs font-bold text-white">⭐ {t("Featured")}</span>
        </div>
      )}

      {/* Project Image */}
      <div className="relative h-48 overflow-hidden bg-gradient-to-br from-slate-800 to-slate-900">
        {project.image && (
          <>
            <Image
              src={project.image} 
              alt={project.title} 
              layout="fill"
              objectFit="cover"
              priority={project.featured}
              className={`transition-all duration-700 ${
                isHovered ? "scale-110 blur-[2px]" : "scale-100"
              }`}
            />
            <div className={`absolute inset-0 bg-gradient-to-t transition-opacity duration-500 ${
              isDarkMode 
                ? "from-[#0b1116] via-[#0b1116]/50 to-transparent" 
                : "from-white via-white/50 to-transparent"
            } ${isHovered ? "opacity-80" : "opacity-0"}`} />
          </>
        )}
        
        {/* Live Badge */}
        {project.live && (
          <div className="absolute top-3 right-3 z-20 flex items-center gap-1 px-3 py-1 rounded-full bg-green-500/90 backdrop-blur-sm shadow-lg">
            <span className="w-2 h-2 bg-white rounded-full animate-pulse" />
            <span className="text-xs font-semibold text-white">{t("Live")}</span>
          </div>
        )}
        
        {/* Overlay Buttons */}
        <div className={`absolute inset-0 flex items-center justify-center gap-3 transition-opacity duration-300 ${
          isHovered ? "opacity-100" : "opacity-0"
        }`}>
          <a
            href={project.href}
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 rounded-full bg-[#00BD95] text-white shadow-lg transform hover:scale-110 transition-all duration-300 hover:rotate-12"
            aria-label={`Open ${project.title}`}
            onClick={(e) => e.stopPropagation()}
          >
            {project.live ? <FaGlobe size={20} /> : <FaGithub size={20} />}
          </a>
        </div>
      </div>

      {/* Project Content */}
      <div className={`p-5 transition-colors duration-500 ${
        isHovered 
          ? isDarkMode
            ? "bg-gradient-to-br from-[#0d6b5e] to-[#0a5d5d]"
            : "bg-gradient-to-br from-[#00BD95] to-cyan-600"
          : isDarkMode ? "bg-[#0b1116]" : "bg-white"
      }`}>
        {/* Category Tag */}
        {project.category && (
          <div className="mb-2">
            <span className={`text-xs font-semibold px-2 py-1 rounded ${
              isHovered ? "text-white" : isDarkMode ? "text-[#00BD95]" : "text-[#00BD95]"
            }`}>
              {t(project.category)}
            </span>
          </div>
        )}

        {/* Title */}
        <h3 className={`text-lg font-bold mb-2 transition-colors duration-300 ${
          isHovered ? "text-white" : isDarkMode ? "text-white" : "text-slate-900"
        }`}>
          {t(project.title)}
        </h3>

        {/* Description */}
        <p className={`text-sm mb-4 line-clamp-2 transition-colors duration-300 ${
          isHovered ? "text-white/90" : isDarkMode ? "text-slate-400" : "text-slate-600"
        }`}>
          {t(project.description)}
        </p>

        {/* Tech Stack */}
        <div className="flex flex-wrap gap-2 mb-4">
          {project.techStack?.slice(0, expandedTech === projectIndex ? undefined : 3).map((tech, techIdx) => (
            <span
              key={techIdx}
              className={`text-xs px-3 py-1 rounded-full font-medium transition-all duration-200 transform hover:scale-105 ${
                isHovered
                  ? "bg-white/20 text-white backdrop-blur-sm"
                  : isDarkMode 
                    ? "bg-slate-800 text-slate-300 hover:bg-[#00BD95] hover:text-white" 
                    : "bg-slate-100 text-slate-700 hover:bg-[#00BD95] hover:text-white"
              }`}
            >
              {tech}
            </span>
          ))}
          {project.techStack && project.techStack.length > 3 && expandedTech !== projectIndex && (
            <button
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setExpandedTech(projectIndex);
              }}
              className={`text-xs px-3 py-1 rounded-full font-medium transition-all duration-200 hover:scale-105 cursor-pointer ${
                isHovered 
                  ? "bg-white/20 text-white backdrop-blur-sm hover:bg-white/30"
                  : isDarkMode 
                    ? "bg-slate-800 text-slate-400 hover:bg-[#00BD95] hover:text-white" 
                    : "bg-slate-100 text-slate-600 hover:bg-[#00BD95] hover:text-white"
              }`}
              title="Show all technologies"
            >
              +{project.techStack.length - 3}
            </button>
          )}
          {expandedTech === projectIndex && project.techStack && project.techStack.length > 3 && (
            <button
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setExpandedTech(null);
              }}
              className={`text-xs px-3 py-1 rounded-full font-medium transition-all duration-200 hover:scale-105 cursor-pointer ${
                isHovered 
                  ? "bg-white/20 text-white backdrop-blur-sm hover:bg-white/30"
                  : isDarkMode 
                    ? "bg-slate-800 text-slate-400 hover:bg-[#00BD95] hover:text-white" 
                    : "bg-slate-100 text-slate-600 hover:bg-[#00BD95] hover:text-white"
              }`}
              title="Show less"
            >
              −
            </button>
          )}
        </div>

        {/* View Project Link */}
        <a
          href={project.href}
          target="_blank"
          rel="noopener noreferrer"
          className={`group/btn w-full flex items-center justify-center gap-2 py-2.5 rounded-lg font-medium text-sm transition-all duration-300 transform hover:scale-[1.02] relative overflow-hidden ${
            isHovered
              ? "bg-slate-900 text-white shadow-lg"
              : isDarkMode
                ? "bg-slate-800 text-white hover:bg-slate-700"
                : "bg-slate-100 text-slate-900 hover:bg-slate-200"
          }`}
        >
          <span className="relative z-10">{project.live ? t("Visit Website") : t("View Code")}</span>
          <FaExternalLinkAlt size={12} className="relative z-10 transition-transform duration-300 group-hover/btn:translate-x-1" />
          
          {/* Button shine effect */}
          <span className="absolute inset-0 -translate-x-full group-hover/btn:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12" />
        </a>
      </div>

      {/* Decorative Corner */}
      <div className={`absolute bottom-0 right-0 w-24 h-24 transition-all duration-500
        ${isHovered ? "opacity-30" : "opacity-10"}
        ${isDarkMode ? "bg-[#00BD95]" : "bg-slate-900"}
      `}
        style={{
          clipPath: "polygon(100% 0, 100% 100%, 0 100%)"
        }}
      />

      {/* Animated border glow for featured projects */}
      {project.featured && (
        <div className="absolute inset-0 rounded-2xl pointer-events-none">
          <div className={`absolute inset-0 rounded-2xl transition-opacity duration-500 ${
            isHovered ? "opacity-100" : "opacity-0"
          }`}
            style={{
              background: "linear-gradient(45deg, #00BD95, #06b6d4, #00BD95)",
              filter: "blur(8px)",
              zIndex: -1
            }}
          />
        </div>
      )}
    </div>
  );
}
