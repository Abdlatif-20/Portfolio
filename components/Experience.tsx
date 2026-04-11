"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useTranslation } from "react-i18next";
import { useDarkMode } from "./context";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { FaBriefcase, FaCalendar, FaMapMarkerAlt, FaExternalLinkAlt, FaBuilding, FaChevronRight, FaChevronDown } from "react-icons/fa";

const Experience = () => {
  const { t } = useTranslation();
  const { isDarkMode } = useDarkMode();
  const { ref, isVisible } = useScrollAnimation(0.1);
  const [hoveredCompanyIndex, setHoveredCompanyIndex] = useState<number | null>(null);
  const [expandedCompanies, setExpandedCompanies] = useState<{ [key: string]: boolean }>({
    "Z.system": true,
    "Freelance": true,
    "talentech Solutions": true,
  });

  const companies = [
    {
      name: "Z.system",
      logo: "/images/logos/zsystems1_logo.jpeg",
      totalDuration: t("4 months"),
      startDate: "2025/12",
      endDate: "Present",
      roles: [
        {
          title: t("Full Stack Developer"),
          type: t("Full-time"),
          period: t("2026/04 - Present"),
          duration: t("1 month"),
          location: t("Casablanca"),
          description: t("Worked on the front-end development of the backoffice platform, building responsive interfaces and improving internal tools for better usability and workflow efficiency"),
          achievements: [
            // t("Leading frontend architecture and best practices implementation"),
            // t("Mentoring junior developers and code review"),
            // t("Driving performance optimization initiatives"),
            // t("Contributing to technical decision-making and project planning")
          ],
          technologies: ["React", "TypeScript", "Tailwind CSS", "Angular", "Git", "Next.js", "React Native", "Express.js", "PostgreSQL", "Spring Boot", "Docker"],
        },
        {
          title: t("Frontend Developer"),
          type: t("Internship"),
          period: t("2025/12 - 2026/04"),
          duration: t("5 months"),
          location: t("Casablanca"),
          description: t("Started internship developing responsive web applications using React and TypeScript. Implemented clean component structures, optimized rendering, and contributed to multiple client projects."),
          achievements: [
            // t("Implemented clean component structures and optimized rendering, reducing UI load time"),
            // t("Delivered 2 projects with 100% client satisfaction rate"),
            // t("Promoted to full-time role based on exceptional performance and contributions"),
            // t("Optimized web applications for maximum speed and scalability")
          ],
          technologies: ["React", "TypeScript", "Tailwind CSS", "Angular", "Git", "Next.js", ]
        },
      ]
    },
    {
      name: "Freelance",
      logo: "/images/logos/fiverr-logo.jpg",
      totalDuration: t("Ongoing"),
      startDate: "2025",
      endDate: "Present",
      roles: [
        {
          title: t("Full Stack Developer"),
          type: t("Freelance"),
          period: t("2025 - Present"),
          duration: t("1+ yr"),
          location: t("Remote"),
          description: t("Working as a freelance full-stack developer, creating custom web applications for various clients. Specializing in modern JavaScript frameworks and Python backend development."),
          achievements: [
            t("Delivered 4+ successful projects for international clients"),
            t("Built scalable web applications using Next.js, React, and Django"),
            t("Maintained 100% client satisfaction with on-time delivery and quality code")
          ],
          technologies: ["React", "Next.js", "TypeScript", "Django", "PostgreSQL", "Tailwind CSS"],
        },
      ]
    },
    {
      name: "talentech Solutions",
      logo: "/images/logos/talentech.jpeg",
      totalDuration: t("7 months"),
      startDate: "2025/01",
      endDate: "2025/07",
      roles: [
        {
          title: t("Frontend Developer"),
          type: t("Internship"),
          period: t("2025/01 - 2025/07"),
          duration: t("7 months"),
          location: t("Technopark, Casablanca"),
          description: t("Developed two complete web platforms from scratch using Next.js, React, and Tailwind CSS, ensuring responsive layouts and smooth user experience."),
          achievements: [
            t("Implemented clean component structures and optimized rendering, reducing UI load time and improving overall UX."),
            t("Delivered 2 projects with 100% satisfaction rate"),
            t("Optimized web applications for maximum speed and scalability.")
          ],
          technologies: ["React", "TypeScript", "Tailwind CSS", "Strapi", "Git"],
        },
      ]
    },
  ];

  const toggleCompanyExpanded = (companyName: string) => {
    setExpandedCompanies(prev => ({
      ...prev,
      [companyName]: !prev[companyName]
    }));
  };

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
          {/* Vertical Line */}
          <div
            className={`absolute left-0 md:left-6 top-0 bottom-0 w-1 ${
              isDarkMode 
                ? "bg-gradient-to-b from-[#00BD95]/50 via-slate-700 to-transparent" 
                : "bg-gradient-to-b from-[#00BD95]/50 via-slate-300 to-transparent"
            } hidden md:block`}
          />

          {/* Companies */}
          <div className="space-y-12 md:space-y-16">
            {companies.map((company, companyIndex) => (
              <div
                key={companyIndex}
                onMouseEnter={() => setHoveredCompanyIndex(companyIndex)}
                onMouseLeave={() => setHoveredCompanyIndex(null)}
                className={`relative transition-all duration-700 ${
                  isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-20"
                }`}
                style={{ transitionDelay: `${companyIndex * 200}ms` }}
              >
                {/* Timeline Dot */}
                <div className="absolute left-0 md:left-6 top-8 hidden md:block -translate-x-1/2 z-10">
                  <div
                    className={`relative w-5 h-5 rounded-full transition-all duration-300 ${
                      hoveredCompanyIndex === companyIndex
                        ? "bg-[#00BD95] scale-125 shadow-lg shadow-[#00BD95]/50"
                        : isDarkMode
                        ? "bg-slate-700 border-2 border-slate-600"
                        : "bg-white border-2 border-slate-300"
                    }`}
                  >
                    {hoveredCompanyIndex === companyIndex && (
                      <div className="absolute inset-0 rounded-full bg-[#00BD95] animate-ping opacity-75" />
                    )}
                  </div>
                </div>

                {/* Company Card */}
                <div className="md:ml-16">
                  {/* Company Header */}
                  <div
                    onClick={() => toggleCompanyExpanded(company.name)}
                    className={`group relative rounded-2xl overflow-hidden transition-all duration-300 cursor-pointer ${
                      hoveredCompanyIndex === companyIndex
                        ? "shadow-xl shadow-[#00BD95]/10 -translate-y-1"
                        : "shadow-md"
                    } ${
                      isDarkMode
                        ? "bg-gradient-to-br from-slate-800/90 via-slate-800/95 to-slate-900 border border-slate-700/50"
                        : "bg-gradient-to-br from-white via-slate-50/50 to-white border border-gray-200"
                    }`}
                  >
                    <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 ${
                      isDarkMode
                        ? "bg-gradient-to-br from-[#00BD95]/5 via-transparent to-transparent"
                        : "bg-gradient-to-br from-[#00BD95]/5 via-transparent to-transparent"
                    }`} />

                    <div className="relative p-4 md:p-6">
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex gap-3 flex-1">
                          {/* Company Logo */}
                          <div
                            className={`flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center overflow-hidden shadow-md ${
                              isDarkMode 
                                ? "bg-gradient-to-br from-slate-700 to-slate-800 border border-slate-600" 
                                : "bg-gradient-to-br from-white to-slate-100 border border-slate-200"
                            }`}
                          >
                            <Image
                              src={company.logo}
                              alt={`${company.name} logo`}
                              width={48}
                              height={48}
                              className="w-full h-full object-cover"
                              onError={(e) => {
                                e.currentTarget.style.display = "none";
                              }}
                            />
                          </div>

                          {/* Company Info */}
                          <div className="flex-1 min-w-0">
                            <h3 className={`text-lg md:text-xl font-bold ${isDarkMode ? "text-white" : "text-slate-900"}`}>
                              {company.name}
                            </h3>
                            <p className={`text-sm ${isDarkMode ? "text-slate-400" : "text-slate-600"}`}>
                              {company.totalDuration}
                            </p>
                          </div>
                        </div>

                        {/* Expand/Collapse Toggle */}
                        <button className={`p-2 rounded-lg transition-all ${
                          isDarkMode 
                            ? "hover:bg-slate-700/50" 
                            : "hover:bg-slate-100"
                        }`}>
                          <FaChevronDown className={`transition-transform duration-300 ${
                            expandedCompanies[company.name] ? "rotate-180" : ""
                          } ${isDarkMode ? "text-slate-400" : "text-slate-600"}`} />
                        </button>
                      </div>
                    </div>

                    <div className={`h-0.5 bg-gradient-to-r from-[#00BD95] via-cyan-500 to-transparent transition-opacity duration-300 ${
                      hoveredCompanyIndex === companyIndex ? "opacity-100" : "opacity-0"
                    }`} />
                  </div>

                  {/* Roles (Expandable) */}
                  {expandedCompanies[company.name] && (
                    <div className="mt-4 space-y-4 md:space-y-6">
                      {company.roles.map((role, roleIndex) => (
                        <div
                          key={roleIndex}
                          className={`relative md:ml-0 transition-all duration-500 ${
                            isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-20"
                          }`}
                          style={{ transitionDelay: `${companyIndex * 200 + roleIndex * 100 + 100}ms` }}
                        >
                          {/* Role Card */}
                          <div
                            className={`relative rounded-xl overflow-hidden transition-all duration-300 ${
                              isDarkMode
                                ? "bg-slate-800/50 border border-slate-700/50"
                                : "bg-slate-50/50 border border-slate-200"
                            }`}
                          >
                            <div className="p-4 md:p-5">
                              {/* Role Title */}
                              <div className="flex flex-wrap items-start gap-2 mb-3">
                                <h4 className={`text-base md:text-lg font-bold ${isDarkMode ? "text-white" : "text-slate-900"}`}>
                                  {role.title}
                                </h4>
                                <span
                                  className={`px-2 py-0.5 rounded-full text-xs font-medium whitespace-nowrap ${
                                    role.type === "Freelance"
                                      ? "bg-purple-500/10 text-purple-500"
                                      : role.type === "Full-time"
                                      ? "bg-green-500/10 text-green-500"
                                      : "bg-blue-500/10 text-blue-500"
                                  }`}
                                >
                                  {role.type}
                                </span>
                              </div>

                              {/* Period and Location */}
                              <div className="flex flex-wrap gap-x-4 gap-y-2 mb-3 text-xs">
                                <div className={`flex items-center gap-1.5 ${isDarkMode ? "text-slate-400" : "text-slate-600"}`}>
                                  <FaCalendar className="text-xs flex-shrink-0" />
                                  <span>{role.period}</span>
                                </div>
                                <div className={`flex items-center gap-1.5 ${isDarkMode ? "text-slate-400" : "text-slate-600"}`}>
                                  <FaMapMarkerAlt className="text-xs flex-shrink-0" />
                                  <span>{role.location}</span>
                                </div>
                              </div>

                              {/* Description */}
                              <p className={`text-xs md:text-sm leading-relaxed mb-3 ${isDarkMode ? "text-slate-300" : "text-slate-600"}`}>
                                {role.description}
                              </p>

                              {/* Key Achievements */}
                              <div className="mb-3">
                                <h5 className={`text-xs font-semibold mb-2 ${isDarkMode ? "text-slate-200" : "text-slate-700"}`}>
                                  {role.achievements.length > 0 &&
                                    t("Key Achievements")
                                  }
                                </h5>
                                <div className="space-y-1.5">
                                  {role.achievements.map((achievement, i) => (
                                    <div key={i} className="flex items-start gap-2">
                                      <FaChevronRight className="text-[#00BD95] text-xs mt-0.5 flex-shrink-0" />
                                      <p className={`text-xs ${isDarkMode ? "text-slate-400" : "text-slate-600"}`}>
                                        {achievement}
                                      </p>
                                    </div>
                                  ))}
                                </div>
                              </div>

                              {/* Technologies */}
                              <div>
                                <h5 className={`text-xs font-semibold mb-2 ${isDarkMode ? "text-slate-200" : "text-slate-700"}`}>
                                  {t("Technologies Used")}
                                </h5>
                                <div className="flex flex-wrap gap-1.5">
                                  {role.technologies.map((tech, techIndex) => (
                                    <span
                                      key={techIndex}
                                      className={`px-2.5 py-1 rounded-md text-xs font-medium transition-all ${
                                        isDarkMode
                                          ? "bg-slate-700/50 text-slate-300 hover:bg-[#00BD95]/20 hover:text-[#00BD95] border border-slate-600/50"
                                          : "bg-slate-200 text-slate-700 hover:bg-[#00BD95]/10 hover:text-[#00BD95] border border-slate-300"
                                      }`}
                                    >
                                      {tech}
                                    </span>
                                  ))}
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
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
