"use client";

import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import Image from 'next/image';
import { useDarkMode } from "./context";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { usePublicContent } from "@/hooks/usePublicContent";
import { Icon } from "@/lib/icon-registry";

type Skill = { id?: string; name: string; icon: string; level: number; color: string };
type SkillCategory = { id?: string; title: string; icon: string; color: string; skills: Skill[] };

const Skills = () => {
  const { t } = useTranslation();
  const { isDarkMode } = useDarkMode();
  const [mounted, setMounted] = useState(false);
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);
  const [activeCategoryIndex, setActiveCategoryIndex] = useState(0);
  const { ref, isVisible } = useScrollAnimation(0.1);
  const { data: fetchedCategories } = usePublicContent<SkillCategory[]>("skill-categories");
  const skillCategories = fetchedCategories ?? [];

  useEffect(() => {
    const id = setTimeout(() => setMounted(true), 60);
    return () => clearTimeout(id);
  }, []);

  const SkillCard = ({ 
    category, 
    categoryIndex, 
    isDarkMode, 
    isVisible, 
    hoveredSkill, 
    setHoveredSkill, 
    t 
  }: any) => (
    <div
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
            <span className="text-2xl text-[#00BD95]"><Icon name={category.icon} /></span>
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
        {category.skills.map((skill: any) => (
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
                <Icon name={skill.icon} />
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
          backgroundImage: `linear-gradient(135deg, transparent 50%, ${isDarkMode ? "#00BD95" : "#00BD95"} 50%)`,
        }}
      />
    </div>
  );

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

        {/* Skills Grid - Mobile: Single Card with Navigation, Desktop: Grid */}
        {skillCategories.length > 0 && (
          <div className="mb-8">
            {/* Mobile Navigation - Category Tabs (Visible on small devices) */}
            <div className="md:hidden flex items-center justify-center gap-2 mb-6 overflow-x-auto pb-2 scrollbar-hide">
              {skillCategories.map((category, index) => (
                <button
                  key={category.title}
                  onClick={() => setActiveCategoryIndex(index)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg font-semibold transition-all duration-300 whitespace-nowrap flex-shrink-0 ${
                    index === activeCategoryIndex
                      ? "bg-[#00BD95] text-black shadow-lg [&_svg]:text-black"
                      : isDarkMode
                        ? "bg-slate-800 text-white hover:bg-slate-700"
                        : "bg-slate-200 text-black hover:bg-slate-300"
                  }`}
                  title={t(category.title)}
                >
                  <span className="text-3xl sm:text-lg"><Icon name={category.icon} /></span>
                  <span className="hidden sm:inline text-sm">{t(category.title)}</span>
                </button>
              ))}
            </div>

            {/* Desktop Grid - Visible on md and above */}
            <div className="hidden md:grid grid-cols-1 lg:grid-cols-2 gap-6">
              {skillCategories.map((category, categoryIndex) => (
                <SkillCard
                  key={category.title}
                  category={category}
                  categoryIndex={categoryIndex}
                  isDarkMode={isDarkMode}
                  isVisible={isVisible}
                  hoveredSkill={hoveredSkill}
                  setHoveredSkill={setHoveredSkill}
                  t={t}
                />
              ))}
            </div>

            {/* Mobile Single Card - Visible only on small devices */}
            <div className="md:hidden">
              <SkillCard
                key={skillCategories[activeCategoryIndex]?.title}
                category={skillCategories[activeCategoryIndex] ?? skillCategories[0]}
                categoryIndex={0}
                isDarkMode={isDarkMode}
                isVisible={isVisible}
                hoveredSkill={hoveredSkill}
                setHoveredSkill={setHoveredSkill}
                t={t}
              />
            </div>
          </div>
        )}
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
