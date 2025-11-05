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
} from "react-icons/fa";
import { SiTypescript, SiDjango, SiI18Next } from "react-icons/si";
import { RiNextjsFill, RiTailwindCssFill } from "react-icons/ri";
import { BiLogoPostgresql } from "react-icons/bi";
import { TbApi } from "react-icons/tb";
import { PiFileCppFill } from "react-icons/pi";
import { VscTerminalBash, VscVscode } from "react-icons/vsc";
import { DiVim } from "react-icons/di";
import { useDarkMode } from "./context";

const Skills = () => {
  const { t } = useTranslation();
  const { isDarkMode } = useDarkMode();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const id = setTimeout(() => setMounted(true), 60);
    return () => clearTimeout(id);
  }, []);

  // Add explicit proficiency levels to make animated bars
  const groups = [
    {
      title: "Frontend",
      skills: [
        { name: "HTML", icon: <FaHtml5 />, level: 95 },
        { name: "CSS", icon: <FaCss3Alt />, level: 92 },
        { name: "TypeScript", icon: <SiTypescript />, level: 88 },
        { name: "React", icon: <FaReact />, level: 90 },
        { name: "Next.js", icon: <RiNextjsFill />, level: 85 },
        { name: "Tailwind CSS", icon: <RiTailwindCssFill />, level: 90 },
        { name: "i18next", icon: <SiI18Next />, level: 75 },
      ],
    },
    {
      title: "Backend & APIs",
      skills: [
        { name: "Django", icon: <SiDjango />, level: 82 },
        { name: "Python", icon: <FaPython />, level: 86 },
        { name: "REST API", icon: <TbApi />, level: 84 },
        { name: "PostgreSQL", icon: <BiLogoPostgresql />, level: 80 },
      ],
    },
    {
      title: "Systems & DevOps",
      skills: [
        { name: "Docker", icon: <FaDocker />, level: 78 },
        { name: "C/C++", icon: <PiFileCppFill />, level: 82 },
        { name: "Bash", icon: <VscTerminalBash />, level: 80 },
      ],
    },
    {
      title: t("Tools & Others"),
      skills: [
        { name: "Vim", icon: <DiVim />, level: 70 },
        { name: "VSCode", icon: <VscVscode />, level: 90 },
        { name: "Git/GitHub", icon: <FaGithub />, level: 88 },
      ],
    },
  ];

  return (
    <section id="skills" className={`w-full py-20 bg-transparent"}`}>
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex md:flex-row flex-col items-center justify-between mb-10">
          <h2 className={`text-3xl md:text-4xl font-extrabold ${isDarkMode ? "text-white" : "text-black"}`}>
            {t("Skills")}
          </h2>
          <p className={`text-sm ${isDarkMode ? "text-slate-300" : "text-slate-700"}`}>
            {t("Technologies I use to build reliable, fast and maintainable software.")}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Profile / User card on the left (col-span 1 on md) */}
          <div
            className={`hidden md:flex flex-col items-center gap-4 p-6 rounded-2xl shadow-lg select-none transform transition-all ${
              mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
            } ${isDarkMode ? "bg-[#071827]/60 border border-slate-700" : "bg-white/60 border border-gray-100"}`}
            style={{ backdropFilter: "blur(8px)" }}
          >
            {/* GitHub statistics card */}
            <GitHubStatsCard username="Abdlatif-20" isDarkMode={isDarkMode} />
          </div>

          {/* Skills grid — occupies 2 columns on md */}
          <div className="md:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-5">
            {groups.map((group, gi) => (
              <div
                key={group.title}
                className={`p-5 rounded-2xl shadow-md transform transition-all ${
                  mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
                } ${isDarkMode ? "bg-[#0b1116]/70 border border-slate-700" : "bg-white/80 border border-gray-100"}`}
                style={{ transitionDelay: `${gi * 90}ms`, backdropFilter: "blur(6px)" }}
              >
                <div className="flex items-center justify-between mb-4">
                  <h4 className={`text-lg font-semibold ${isDarkMode ? "text-white" : "text-slate-900"}`}>{t(group.title)}</h4>
                  <span className="text-xs text-slate-400">{group.skills.length} {t("items")}</span>
                </div>

                <div className="flex flex-col gap-3">
                  {group.skills.map((s, si) => (
                    <div key={s.name} className="flex flex-col">
                      <div className="flex items-center justify-between gap-3">
                        <div className="flex items-center gap-3">
                          <span className="text-2xl text-green-300 dark:text-green-400">{s.icon}</span>
                          <span className={`font-medium ${isDarkMode ? "text-white" : "text-slate-800"}`}>{t(s.name)}</span>
                        </div>
                        <div className="text-xs text-slate-400">{s.level}%</div>
                      </div>

                      <div className="w-full h-2 mt-2 rounded-full bg-slate-200/40 overflow-hidden">
                        <div
                          className={`h-full rounded-full transition-all duration-900 ease-out ${isDarkMode ? "bg-gradient-to-r from-green-500 to-cyan-400" : "bg-gradient-to-r from-[#00BD95] to-[#00A884]"}`}
                          style={{ width: mounted ? `${s.level}%` : "0%", transitionDelay: `${gi * 70 + si * 40}ms` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;

// --- GitHubStatsCard (client-side) ---
function GitHubStatsCard({ username, isDarkMode }: { username: string; isDarkMode: boolean }) {
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

        // fetch up to 100 repos (good for most users). For >100 you'd need pagination.
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

  return (
    <div className="w-full text-center">
      {loading ? (
        <div className="py-8">
          <div className="animate-pulse h-12 w-12 rounded-full mx-auto bg-slate-300/40" />
          <p className="mt-3 text-xs text-slate-400">Loading GitHub stats…</p>
        </div>
      ) : error ? (
        <div className="p-4">
          <p className="text-xs text-red-400">{error}</p>
          <a href={`https://github.com/${username}`} target="_blank" rel="noopener noreferrer" className="text-xs underline mt-2 inline-block">
            View on GitHub
          </a>
        </div>
      ) : data ? (
        <div className="flex flex-col items-center gap-3">
          <img src={data.avatar_url} alt={data.name} className="w-20 h-20 rounded-full object-cover" />
          <div>
            <a href={`https://github.com/${username}`} target="_blank" rel="noopener noreferrer" className={`font-semibold ${isDarkMode ? "text-white" : "text-slate-900"}`}>
              {data.name}
            </a>
            {data.bio && <p className="text-xs text-slate-400">{data.bio}</p>}
          </div>

          <div className="w-full grid grid-cols-3 gap-2 mt-2 text-xs">
            <div className="p-2 rounded-md bg-slate-100/40 ">
              <div className="font-semibold">{data.public_repos}</div>
              <div className="text-slate-500 text-[11px]">Repos</div>
            </div>
            <div className="p-2 rounded-md bg-slate-100/40">
              <div className="font-semibold">{data.totalStars}</div>
              <div className="text-slate-500 text-[11px]">Stars</div>
            </div>
            <div className="p-2 rounded-md bg-slate-100/40">
              <div className="font-semibold">{data.followers}</div>
              <div className="text-slate-500 text-[11px]">Followers</div>
            </div>
          </div>

          {data.topLanguage && (
            <div className="mt-3 text-xs text-slate-400">Top language: <span className="font-medium text-slate-700 dark:text-slate-200">{data.topLanguage}</span></div>
          )}

          <div className="mt-3 w-full">
            {/* small generated card as visual flair (third-party image service) */}
            <img src={`https://github-readme-stats.vercel.app/api?username=${username}&show_icons=true&hide_border=true&theme=${isDarkMode ? "dark" : "default"}`} alt="github-stats" className="w-full rounded-md" />
          </div>
        </div>
      ) : null}
    </div>
  );
}
