"use client";

import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { useDarkMode } from "./context";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { FaBriefcase, FaCalendar, FaMapMarkerAlt, FaExternalLinkAlt, FaBuilding, FaChevronRight } from "react-icons/fa";

const Experience = () => {
  const { t } = useTranslation();
  const { isDarkMode } = useDarkMode();
  const { ref, isVisible } = useScrollAnimation(0.1);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const experiences = [
    {
      title: "Full Stack Developer",
      company: "Freelance",
      companyLogo: "🚀",
      location: "Remote",
      period: "2025 - Present",
      description: "Working as a freelance full-stack developer, creating custom web applications for various clients. Specializing in modern JavaScript frameworks and Python backend development.",
      achievements: [
        "Delivered 10+ successful projects for international clients",
        "Built scalable web applications using Next.js, React, and Django",
        "Maintained 100% client satisfaction with on-time delivery and quality code"
      ],
      technologies: ["React", "Next.js", "TypeScript", "Django", "PostgreSQL", "Tailwind CSS"],
      type: "Freelance"
    },
    {
      title: "Frontend Developer",
      company: "talentech Solutions",
      companyLogo: "💼",
      location: "Technopark, Casablanca",
      period: "2025/01 - 2025/07",
      description: "Developed two complete web platforms from scratch using Next.js, React, and Tailwind CSS, ensuring responsive layouts and smooth user experience.",
      achievements: [
        "Implemented clean component structures and optimized rendering, reducing UI load time and improving overall UX.",
        "Delivered 2 projects with 100% satisfaction rate",
        "Optimized web applications for maximum speed and scalability."
      ],
      technologies: ["React", "TypeScript", "Tailwind CSS", "Strapi", "Git"],
      type: "Internship"
    },
  ];

  return (
    <section
      ref={ref as React.RefObject<HTMLElement>}
      id="experience"
      className={`w-full px-4 py-12 sm:py-16 transition-all duration-1000 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-20"
      }`}
    >
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <header className="mb-8 md:mb-12">
          <h2 className={`text-3xl md:text-4xl font-extrabold ${isDarkMode ? "text-white" : "text-black"}`}>
            {t("Experience")}
          </h2>
          <p className={`mt-2 text-sm md:text-base ${isDarkMode ? "text-slate-300" : "text-slate-600"}`}>
            {t("My professional journey and work experience")}
          </p>
        </header>

        {/* Experience Timeline */}
        <div className="relative">
          {/* Vertical Line - More prominent */}
          <div
            className={`absolute left-0 md:left-6 top-0 bottom-0 w-1 ${
              isDarkMode 
                ? "bg-gradient-to-b from-[#00BD95]/50 via-slate-700 to-transparent" 
                : "bg-gradient-to-b from-[#00BD95]/50 via-slate-300 to-transparent"
            } hidden md:block`}
          />

          {/* Experience Items */}
          <div className="space-y-12 md:space-y-16">
            {experiences.map((exp, index) => (
              <div
                key={index}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                className={`relative transition-all duration-700 ${
                  isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-20"
                }`}
                style={{ transitionDelay: `${index * 200}ms` }}
              >
                {/* Timeline Dot with pulse effect */}
                <div className="absolute left-0 md:left-6 top-8 hidden md:block -translate-x-1/2 z-10">
                  <div
                    className={`relative w-5 h-5 rounded-full transition-all duration-300 ${
                      hoveredIndex === index
                        ? "bg-[#00BD95] scale-125 shadow-lg shadow-[#00BD95]/50"
                        : isDarkMode
                        ? "bg-slate-700 border-2 border-slate-600"
                        : "bg-white border-2 border-slate-300"
                    }`}
                  >
                    {hoveredIndex === index && (
                      <div className="absolute inset-0 rounded-full bg-[#00BD95] animate-ping opacity-75" />
                    )}
                  </div>
                </div>

                {/* Experience Card */}
                <div className="md:ml-16">
                  <div
                    className={`group relative rounded-2xl overflow-hidden transition-all duration-300 ${
                      hoveredIndex === index
                        ? "shadow-xl shadow-[#00BD95]/10 -translate-y-1"
                        : "shadow-md"
                    } ${
                      isDarkMode
                        ? "bg-gradient-to-br from-slate-800/90 via-slate-800/95 to-slate-900 border border-slate-700/50"
                        : "bg-gradient-to-br from-white via-slate-50/50 to-white border border-gray-200"
                    }`}
                  >
                    {/* Animated background gradient on hover */}
                    <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 ${
                      isDarkMode
                        ? "bg-gradient-to-br from-[#00BD95]/5 via-transparent to-transparent"
                        : "bg-gradient-to-br from-[#00BD95]/5 via-transparent to-transparent"
                    }`} />

                    {/* Content */}
                    <div className="relative p-4 md:p-6">
                      {/* Header Section */}
                      <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4 mb-4">
                        <div className="flex gap-3 flex-1">
                          {/* Company Logo */}
                          <div
                            className={`flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center text-2xl shadow-md ${
                              isDarkMode 
                                ? "bg-gradient-to-br from-slate-700 to-slate-800 border border-slate-600" 
                                : "bg-gradient-to-br from-white to-slate-100 border border-slate-200"
                            }`}
                          >
                            {exp.companyLogo}
                          </div>

                          {/* Title and Company */}
                          <div className="flex-1 min-w-0">
                            <div className="flex flex-wrap items-start gap-2 mb-1">
                              <h3
                                className={`text-lg md:text-xl font-bold ${
                                  isDarkMode ? "text-white" : "text-slate-900"
                                }`}
                              >
                                {exp.title}
                              </h3>
                              <span
                                className={`px-2 py-0.5 rounded-full text-xs font-medium whitespace-nowrap ${
                                  exp.type === "Freelance"
                                    ? "bg-purple-500/10 text-purple-500"
                                    : exp.type === "Full-time"
                                    ? "bg-green-500/10 text-green-500"
                                    : "bg-blue-500/10 text-blue-500"
                                }`}
                              >
                                {exp.type}
                              </span>
                            </div>
                            
                            <div className="flex items-center gap-2 mb-2">
                              <FaBuilding className="text-[#00BD95] text-xs flex-shrink-0" />
                              <p className="text-[#00BD95] font-semibold text-base">
                                {exp.company}
                              </p>
                            </div>

                            <div className="flex flex-wrap gap-x-3 gap-y-1 text-xs">
                              <div className={`flex items-center gap-1.5 ${isDarkMode ? "text-slate-400" : "text-slate-600"}`}>
                                <FaCalendar className="text-xs flex-shrink-0" />
                                <span>{exp.period}</span>
                              </div>
                              <div className={`flex items-center gap-1.5 ${isDarkMode ? "text-slate-400" : "text-slate-600"}`}>
                                <FaMapMarkerAlt className="text-xs flex-shrink-0" />
                                <span>{exp.location}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Description */}
                      <p
                        className={`text-xs md:text-sm leading-relaxed mb-4 ${
                          isDarkMode ? "text-slate-300" : "text-slate-600"
                        }`}
                      >
                        {exp.description}
                      </p>

                      {/* Key Achievements */}
                      <div className="mb-4">
                        <h4 className={`text-xs font-semibold mb-2 ${isDarkMode ? "text-slate-200" : "text-slate-700"}`}>
                          Key Achievements
                        </h4>
                        <div className="space-y-1.5">
                          {exp.achievements.map((achievement, i) => (
                            <div key={i} className="flex items-start gap-2">
                              <FaChevronRight className={`text-[#00BD95] text-xs mt-0.5 flex-shrink-0`} />
                              <p className={`text-xs ${isDarkMode ? "text-slate-400" : "text-slate-600"}`}>
                                {achievement}
                              </p>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Technologies */}
                      <div>
                        <h4 className={`text-xs font-semibold mb-2 ${isDarkMode ? "text-slate-200" : "text-slate-700"}`}>
                          Technologies Used
                        </h4>
                        <div className="flex flex-wrap gap-1.5">
                          {exp.technologies.map((tech, techIndex) => (
                            <span
                              key={techIndex}
                              className={`px-3 py-1 rounded-lg text-xs font-medium transition-all ${
                                isDarkMode
                                  ? "bg-slate-700/50 text-slate-300 hover:bg-[#00BD95]/20 hover:text-[#00BD95] border border-slate-600/50"
                                  : "bg-slate-100 text-slate-700 hover:bg-[#00BD95]/10 hover:text-[#00BD95] border border-slate-200"
                              }`}
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Bottom accent line */}
                    <div className={`h-0.5 bg-gradient-to-r from-[#00BD95] via-cyan-500 to-transparent transition-opacity duration-300 ${
                      hoveredIndex === index ? "opacity-100" : "opacity-0"
                    }`} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;
