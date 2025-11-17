"use client";

import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  FaHtml5,
  FaCss3Alt,
  FaReact,
  FaDocker,
  FaGithub,
  FaPython,
  FaStar,
  FaCode,
  FaUserFriends,
} from "react-icons/fa";
import { SiTypescript, SiDjango, SiI18Next } from "react-icons/si";
import { RiNextjsFill, RiTailwindCssFill } from "react-icons/ri";
import { BiLogoPostgresql } from "react-icons/bi";
import { TbApi } from "react-icons/tb";
import { PiFileCppFill } from "react-icons/pi";
import { VscTerminalBash, VscVscode } from "react-icons/vsc";
import { DiVim } from "react-icons/di";
import { useDarkMode } from "./context";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const Skills = () => {
  const { t } = useTranslation();
  const { isDarkMode } = useDarkMode();
  const [mounted, setMounted] = useState(false);
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);
  const { ref, isVisible } = useScrollAnimation(0.1);

  useEffect(() => {
    const id = setTimeout(() => setMounted(true), 60);
    return () => clearTimeout(id);
  }, []);

  const skillCategories = [
    {
      title: "Frontend",
      icon: <FaReact className="text-[#00BD95]" />,
      color: "from-cyan-500 to-blue-500",
      skills: [
        { name: "HTML", icon: <FaHtml5 />, level: 95, color: "#E34F26" },
        { name: "CSS", icon: <FaCss3Alt />, level: 92, color: "#1572B6" },
        { name: "TypeScript", icon: <SiTypescript />, level: 88, color: "#3178C6" },
        { name: "React", icon: <FaReact />, level: 90, color: "#61DAFB" },
        { name: "Next.js", icon: <RiNextjsFill />, level: 85, color: "#000000" },
        { name: "Tailwind CSS", icon: <RiTailwindCssFill />, level: 90, color: "#06B6D4" },
        { name: "i18next", icon: <SiI18Next />, level: 75, color: "#26A69A" },
      ],
    },
    {
      title: "Backend & APIs",
      icon: <FaPython className="text-[#00BD95]" />,
      color: "from-green-500 to-emerald-500",
      skills: [
        { name: "Django", icon: <SiDjango />, level: 82, color: "#092E20" },
        { name: "Python", icon: <FaPython />, level: 86, color: "#3776AB" },
        { name: "REST API", icon: <TbApi />, level: 84, color: "#00BD95" },
        { name: "PostgreSQL", icon: <BiLogoPostgresql />, level: 80, color: "#4169E1" },
      ],
    },
    {
      title: "Systems & DevOps",
      icon: <FaDocker className="text-[#00BD95]" />,
      color: "from-blue-500 to-indigo-500",
      skills: [
        { name: "Docker", icon: <FaDocker />, level: 78, color: "#2496ED" },
        { name: "C/C++", icon: <PiFileCppFill />, level: 82, color: "#00599C" },
        { name: "Bash", icon: <VscTerminalBash />, level: 80, color: "#4EAA25" },
      ],
    },
    {
      title: "Tools & Others",
      icon: <FaGithub className="text-[#00BD95]" />,
      color: "from-purple-500 to-pink-500",
      skills: [
        { name: "Vim", icon: <DiVim />, level: 70, color: "#019733" },
        { name: "VSCode", icon: <VscVscode />, level: 90, color: "#007ACC" },
        { name: "Git/GitHub", icon: <FaGithub />, level: 88, color: "#181717" },
      ],
    },
  ];

  return (
    <section ref={ref as React.RefObject<HTMLElement>} id="skills" className={`w-full px-4 py-12 sm:py-16 transition-all duration-1000 ${
      isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'
    }`}>
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <header className="mb-8 md:mb-12">
          <h2 className={`text-3xl md:text-4xl font-extrabold ${isDarkMode ? "text-white" : "text-black"}`}>
            {t("Skills")}
          </h2>
          <p className={`mt-2 text-sm md:text-base ${isDarkMode ? "text-slate-300" : "text-slate-600"}`}>
            {t("Technologies I use to build reliable, fast and maintainable software.")}
          </p>
        </header>

        {/* Skills Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {skillCategories.map((category, categoryIndex) => (
            <div
              key={category.title}
              className={`group relative rounded-2xl p-6 transition-all duration-700 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-20"
              } ${
                isDarkMode
                  ? "bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700 hover:border-[#00BD95]/50"
                  : "bg-gradient-to-br from-white to-slate-50 border border-gray-200 hover:border-[#00BD95]/50"
              } shadow-lg hover:shadow-2xl`}
              style={{ transitionDelay: `${categoryIndex * 150}ms` }}
            >
              {/* Category Header */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                    isDarkMode ? "bg-slate-700/50" : "bg-slate-100"
                  }`}>
                    <span className="text-2xl">{category.icon}</span>
                  </div>
                  <div>
                    <h3 className={`text-xl font-bold ${isDarkMode ? "text-white" : "text-slate-900"}`}>
                      {t(category.title)}
                    </h3>
                    <p className="text-xs text-slate-400">
                      {category.skills.length} {t("technologies")}
                    </p>
                  </div>
                </div>
              </div>

              {/* Skills List */}
              <div className="space-y-4">
                {category.skills.map((skill, skillIndex) => (
                  <div
                    key={skill.name}
                    onMouseEnter={() => setHoveredSkill(`${category.title}-${skill.name}`)}
                    onMouseLeave={() => setHoveredSkill(null)}
                    className={`group/skill relative rounded-xl p-4 transition-all duration-300 ${
                      hoveredSkill === `${category.title}-${skill.name}`
                        ? isDarkMode
                          ? "bg-slate-700/50 shadow-lg transform -translate-y-1"
                          : "bg-white shadow-lg transform -translate-y-1"
                        : isDarkMode
                          ? "bg-slate-800/30 hover:bg-slate-700/30"
                          : "bg-slate-50/50 hover:bg-white/80"
                    }`}
                  >
                    {/* Skill Info */}
                    <div className="flex items-center gap-3">
                      <span 
                        className="text-3xl transition-transform duration-300 group-hover/skill:scale-110"
                        style={{ 
                          color: hoveredSkill === `${category.title}-${skill.name}` 
                            ? skill.color 
                            : isDarkMode ? "#00BD95" : "#00BD95" 
                        }}
                      >
                        {skill.icon}
                      </span>
                      <span className={`font-semibold ${isDarkMode ? "text-white" : "text-slate-800"}`}>
                        {skill.name}
                      </span>
                    </div>

                    {/* Hover indicator */}
                    {hoveredSkill === `${category.title}-${skill.name}` && (
                      <div className={`absolute top-2 right-2 w-2 h-2 rounded-full bg-[#00BD95] animate-pulse`} />
                    )}
                  </div>
                ))}
              </div>

              {/* Decorative Corner */}
              <div 
                className={`absolute bottom-0 right-0 w-24 h-24 opacity-5 transition-opacity duration-300 group-hover:opacity-10`}
                style={{
                  background: `linear-gradient(135deg, transparent 50%, ${isDarkMode ? "#00BD95" : "#00BD95"} 50%)`,
                }}
              />
            </div>
          ))}
        </div>

        {/* GitHub Stats Card */}
        <div className={`rounded-2xl p-6 ${
          isDarkMode 
            ? "bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700" 
            : "bg-gradient-to-br from-white to-slate-50 border border-gray-200"
        } shadow-lg`}>
          <div className="flex items-center gap-3 mb-6">
            <FaGithub className="text-3xl text-[#00BD95]" />
            <div>
              <h3 className={`text-xl font-bold ${isDarkMode ? "text-white" : "text-slate-900"}`}>
                {t("GitHub Statistics")}
              </h3>
              <p className="text-xs text-slate-400">{t("Live stats from my repositories")}</p>
            </div>
          </div>
          <GitHubStatsCard username="Abdlatif-20" isDarkMode={isDarkMode} />
        </div>
      </div>

      {/* Add shimmer animation */}
      <style jsx>{`
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        .animate-shimmer {
          animation: shimmer 2s infinite;
        }
      `}</style>
    </section>
  );
};

export default Skills;

// --- GitHubStatsCard (client-side) ---
function GitHubStatsCard({ username, isDarkMode }: { username: string; isDarkMode: boolean }) {
  const { t } = useTranslation();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<{
    avatar_url?: string;
    name?: string;
    bio?: string;
    followers?: number;
    public_repos?: number;
    totalStars?: number;
    topLanguage?: string | null;
  } | null>(null);

  useEffect(() => {
    let mounted = true;
    async function fetchGitHub() {
      try {
        setLoading(true);
        const uRes = await fetch(`https://api.github.com/users/${username}`);
        if (!uRes.ok) throw new Error(`GitHub user fetch failed: ${uRes.status}`);
        const u = await uRes.json();

        const rRes = await fetch(`https://api.github.com/users/${username}/repos?per_page=100`);
        if (!rRes.ok) throw new Error(`GitHub repos fetch failed: ${rRes.status}`);
        const repos = await rRes.json();

        let totalStars = 0;
        const langCount: Record<string, number> = {};
        for (const repo of repos) {
          totalStars += repo.stargazers_count || 0;
          if (repo.language) langCount[repo.language] = (langCount[repo.language] || 0) + 1;
        }
        const topLanguage = Object.keys(langCount).length ? Object.entries(langCount).sort((a, b) => b[1] - a[1])[0][0] : null;

        if (!mounted) return;
        setData({
          avatar_url: u.avatar_url,
          name: u.name || u.login,
          bio: u.bio || null,
          followers: u.followers,
          public_repos: u.public_repos,
          totalStars,
          topLanguage,
        });
      } catch (err: any) {
        console.error(err);
        if (!mounted) return;
        setError(err.message || "Failed to fetch GitHub data");
      } finally {
        if (mounted) setLoading(false);
      }
    }
    fetchGitHub();
    return () => {
      mounted = false;
    };
  }, [username]);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="flex flex-col items-center gap-4">
          <div className="relative">
            <div className={`w-16 h-16 rounded-full border-4 ${
              isDarkMode ? "border-slate-700" : "border-slate-200"
            } border-t-[#00BD95] animate-spin`} />
          </div>
          <p className="text-sm text-slate-400">{t("Loading GitHub stats...")}</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={`p-6 rounded-xl text-center ${
        isDarkMode ? "bg-red-500/10 border border-red-500/30" : "bg-red-50 border border-red-200"
      }`}>
        <p className="text-sm text-red-400 mb-2">{error}</p>
        <a 
          href={`https://github.com/${username}`} 
          target="_blank" 
          rel="noopener noreferrer" 
          className="text-sm text-[#00BD95] hover:underline"
        >
          {t("View on GitHub")}
        </a>
      </div>
    );
  }

  if (!data) return null;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {/* Profile Card */}
      <div className={`rounded-xl p-6 text-center ${
        isDarkMode ? "bg-slate-800/50" : "bg-white"
      }`}>
        <div className="relative inline-block mb-4">
          <img 
            src={data.avatar_url} 
            alt={data.name} 
            className="w-24 h-24 rounded-full object-cover ring-4 ring-[#00BD95]/20"
          />
          <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-[#00BD95] rounded-full flex items-center justify-center">
            <FaGithub className="text-white text-sm" />
          </div>
          <div className="mt-3 w-full flex justify-center">
            <a href={`https://github.com/${username}`} target="_blank" rel="noopener noreferrer" className="inline-block px-4 py-2 rounded-md bg-[#00BD95]/80 text-white text-sm font-medium hover:brightness-90 transition">View on GitHub</a>
          </div>
        </div>
        <a 
          href={`https://github.com/${username}`} 
          target="_blank" 
          rel="noopener noreferrer" 
          className={`font-bold text-lg hover:text-[#00BD95] transition-colors ${
            isDarkMode ? "text-white" : "text-slate-900"
          }`}
        >
          {data.name}
        </a>
        {data.bio && (
          <p className="text-xs text-slate-400 mt-2 line-clamp-2">{data.bio}</p>
        )}
        {data.topLanguage && (
          <div className="mt-4 px-3 py-1 rounded-full bg-[#00BD95]/10 text-[#00BD95] text-xs font-medium inline-block">
            {data.topLanguage}
          </div>
        )}
      </div>

      {/* Stats Cards */}
      <div className="md:col-span-2 grid grid-cols-3 gap-4">
        <div className={`rounded-xl p-6 text-center transition-all hover:scale-105 ${
          isDarkMode 
            ? "bg-gradient-to-br from-blue-500/20 to-blue-600/20 border border-blue-500/30" 
            : "bg-gradient-to-br from-blue-50 to-blue-100 border border-blue-200"
        }`}>
          <FaCode className="text-3xl mx-auto mb-2 text-blue-500" />
          <div className={`text-3xl font-bold mb-1 ${isDarkMode ? "text-white" : "text-slate-900"}`}>
            {data.public_repos}
          </div>
          <div className="text-xs text-slate-400">{t("Repositories")}</div>
        </div>

        <div className={`rounded-xl p-6 text-center transition-all hover:scale-105 ${
          isDarkMode 
            ? "bg-gradient-to-br from-yellow-500/20 to-yellow-600/20 border border-yellow-500/30" 
            : "bg-gradient-to-br from-yellow-50 to-yellow-100 border border-yellow-200"
        }`}>
          <FaStar className="text-3xl mx-auto mb-2 text-yellow-500" />
          <div className={`text-3xl font-bold mb-1 ${isDarkMode ? "text-white" : "text-slate-900"}`}>
            {data.totalStars}
          </div>
          <div className="text-xs text-slate-400">{t("Total Stars")}</div>
        </div>

        <div className={`rounded-xl p-6 text-center transition-all hover:scale-105 ${
          isDarkMode 
            ? "bg-gradient-to-br from-purple-500/20 to-purple-600/20 border border-purple-500/30" 
            : "bg-gradient-to-br from-purple-50 to-purple-100 border border-purple-200"
        }`}>
          <FaUserFriends className="text-3xl mx-auto mb-2 text-purple-500" />
          <div className={`text-3xl font-bold mb-1 ${isDarkMode ? "text-white" : "text-slate-900"}`}>
            {data.followers}
          </div>
          <div className="text-xs text-slate-400">{t("Followers")}</div>
        </div>
      </div>
    </div>
  );
}
