"use client";
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDarkMode } from './context';
import { FaGraduationCap, FaCalendar, FaMapMarkerAlt, FaCheckCircle } from 'react-icons/fa';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

type EducationItem = {
  institution: string;
  degree: string;
  period: string;
  note?: string;
  location?: string;
  status?: string;
  skills?: string[];
};

const EDUCATION: EducationItem[] = [
  {
    institution: '1337 (UM6P)',
    degree: "Software Engineering",
    period: '2022 — PRESENT',
    location: 'Khouribga, Morocco',
    status: 'In Progress',
    note: 'I learned various programming languages and computer science concepts through hands-on projects and peer-to-peer learning.',
    skills: ['C/C++', 'Algorithms', 'System Programming', 'Web Development']
  },
  {
    institution: 'Faculté des Sciences Ben M\'Sik Casablanca',
    degree: 'PHYSICAL SCIENCES',
    period: '2021 — 2022',
    location: 'Casablanca, Morocco',
    status: 'Completed',
    note: 'Completed foundational coursework in physics and mathematics, preparing for advanced studies in computer science.',
    skills: ['Physics', 'Mathematics', 'Problem Solving']
  },
  {
    institution: 'Lycée dakhla',
    degree: 'Life and Earth Sciences Baccalaureate',
    period: '2019 — 2020',
    location: 'Casablanca, Morocco',
    status: 'Graduated',
    note: 'Graduated with a focus on life and earth sciences, developing analytical and scientific skills.',
    skills: ['Life Sciences', 'Earth Sciences', 'Analytical Thinking']
  },
];

export default function Education() {
  const { isDarkMode } = useDarkMode();
  const { t } = useTranslation();
  const [expandedIndex, setExpandedIndex] = useState<number | null>(0);
  const { ref, isVisible } = useScrollAnimation(0.1);

  return (
    <section ref={ref as React.RefObject<HTMLElement>} className={`w-full px-4 py-12 sm:py-16 transition-all duration-1000 ${
      isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'
    }`} id="education">
      <div className="max-w-6xl mx-auto">
        <header className="mb-8 md:mb-12">
          <h2 className={`text-3xl md:text-4xl font-extrabold ${isDarkMode ? "text-white" : "text-black"}`}>
            {t("Education")}
          </h2>
          <p className={`mt-2 text-sm md:text-base ${isDarkMode ? "text-slate-300" : "text-slate-600"}`}>
            {t("A summary of my academic background and qualifications.")}
          </p>
        </header>

        {/* Timeline Container */}
        <div className="relative">
          {/* Vertical Line */}
          <div className={`absolute left-0 md:left-1/2 transform md:-translate-x-1/2 h-full w-1 ${
            isDarkMode ? 'bg-gradient-to-b from-[#00BD95] via-cyan-600 to-slate-700' : 'bg-gradient-to-b from-[#00BD95] via-cyan-500 to-slate-300'
          }`} />

          {/* Education Items */}
          <div className="space-y-8 md:space-y-12">
            {EDUCATION.map((edu, idx) => (
              <div
                key={idx}
                className={`relative flex items-center transition-all duration-700 ${
                  idx % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                } ${
                  isVisible 
                    ? 'opacity-100 translate-x-0' 
                    : idx % 2 === 0 
                      ? 'opacity-0 -translate-x-20' 
                      : 'opacity-0 translate-x-20'
                }`}
                style={{ transitionDelay: `${idx * 200}ms` }}
              >
                {/* Timeline Dot */}
                <div className="absolute left-0 md:left-1/2 transform md:-translate-x-1/2 z-10">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center shadow-lg ${
                    edu.status === 'In Progress' 
                      ? 'bg-gradient-to-br from-[#00BD95] to-cyan-600 animate-pulse' 
                      : isDarkMode 
                        ? 'bg-slate-800 border-2 border-[#00BD95]' 
                        : 'bg-white border-2 border-[#00BD95]'
                  }`}>
                    <FaGraduationCap className="text-white text-xl" />
                  </div>
                </div>

                {/* Content Card */}
                <div className={`ml-16 md:ml-0 w-full md:w-[calc(50%-3rem)] ${
                  idx % 2 === 0 ? 'md:pr-8' : 'md:pl-8'
                }`}>
                  <div
                    onClick={() => setExpandedIndex(expandedIndex === idx ? null : idx)}
                    className={`group relative rounded-2xl p-6 transition-all duration-300 cursor-pointer ${
                      expandedIndex === idx 
                        ? 'shadow-2xl transform -translate-y-1'
                        : 'shadow-lg hover:shadow-xl hover:-translate-y-0.5'
                    } ${
                      isDarkMode 
                        ? 'bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700 hover:border-[#00BD95]/50' 
                        : 'bg-gradient-to-br from-white to-slate-50 border border-gray-200 hover:border-[#00BD95]/50'
                    }`}
                  >
                    {/* Status Badge */}
                    {edu.status && (
                      <div className={`absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-semibold ${
                        edu.status === 'In Progress'
                          ? 'bg-[#00BD95]/20 text-[#00BD95] border border-[#00BD95]/30'
                          : edu.status === 'Completed'
                            ? isDarkMode
                              ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30'
                              : 'bg-blue-100 text-blue-600 border border-blue-200'
                            : isDarkMode
                              ? 'bg-green-500/20 text-green-400 border border-green-500/30'
                              : 'bg-green-100 text-green-600 border border-green-200'
                      }`}>
                        {t(edu.status)}
                      </div>
                    )}

                    {/* Institution */}
                    <h3 className={`text-xl font-bold mb-2 pr-24 ${
                      isDarkMode ? 'text-white' : 'text-slate-900'
                    }`}>
                      {edu.institution}
                    </h3>

                    {/* Degree */}
                    <p className={`text-lg font-semibold mb-3 ${
                      isDarkMode ? 'text-[#00BD95]' : 'text-[#00BD95]'
                    }`}>
                      {edu.degree}
                    </p>

                    {/* Period & Location */}
                    <div className="flex flex-wrap gap-4 mb-4 text-sm">
                      <div className={`flex items-center gap-2 ${
                        isDarkMode ? 'text-slate-400' : 'text-slate-600'
                      }`}>
                        <FaCalendar className="text-[#00BD95]" />
                        <span>{edu.period}</span>
                      </div>
                      {edu.location && (
                        <div className={`flex items-center gap-2 ${
                          isDarkMode ? 'text-slate-400' : 'text-slate-600'
                        }`}>
                          <FaMapMarkerAlt className="text-[#00BD95]" />
                          <span>{edu.location}</span>
                        </div>
                      )}
                    </div>

                    {/* Description - Expandable */}
                    {edu.note && (
                      <div className={`overflow-hidden transition-all duration-300 ${
                        expandedIndex === idx ? 'max-h-96' : 'max-h-0'
                      }`}>
                        <p className={`text-sm leading-relaxed mb-4 ${
                          isDarkMode ? 'text-slate-300' : 'text-slate-700'
                        }`}>
                          {t(edu.note)}
                        </p>

                        {/* Skills */}
                        {edu.skills && edu.skills.length > 0 && (
                          <div>
                            <p className={`text-xs font-semibold mb-2 ${
                              isDarkMode ? 'text-slate-400' : 'text-slate-600'
                            }`}>
                              {t('Key Learning Areas')}:
                            </p>
                            <div className="flex flex-wrap gap-2">
                              {edu.skills.map((skill, skillIdx) => (
                                <span
                                  key={skillIdx}
                                  className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                                    isDarkMode 
                                      ? 'bg-slate-700 text-slate-200 hover:bg-[#00BD95] hover:text-white' 
                                      : 'bg-slate-100 text-slate-700 hover:bg-[#00BD95] hover:text-white'
                                  }`}
                                >
                                  {skill}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    )}

                    {/* Expand Indicator */}
                    <div className={`mt-4 pt-4 border-t flex items-center justify-between ${
                      isDarkMode ? 'border-slate-700' : 'border-slate-200'
                    }`}>
                      <span className={`text-xs font-medium ${
                        isDarkMode ? 'text-slate-400' : 'text-slate-600'
                      }`}>
                        {expandedIndex === idx ? t('Click to collapse') : t('Click to expand')}
                      </span>
                      <div className={`transform transition-transform duration-300 ${
                        expandedIndex === idx ? 'rotate-180' : ''
                      }`}>
                        <svg className={`w-5 h-5 ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </div>
                    </div>

                    {/* Decorative Corner */}
                    <div className={`absolute bottom-0 right-0 w-16 h-16 opacity-5 transition-opacity duration-300 group-hover:opacity-10 ${
                      isDarkMode ? 'bg-[#00BD95]' : 'bg-slate-900'
                    }`}
                      style={{
                        clipPath: "polygon(100% 0, 100% 100%, 0 100%)"
                      }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
