"use client";
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useDarkMode } from './context';

type EducationItem = {
  institution: string;
  degree: string;
  period: string;
  note?: string;
};

const EDUCATION: EducationItem[] = [
  {
    institution: '1337 (UM6P)',
    degree: "Software Engineering",
    period: '2022 — PRESENT',
    note: 'I learned various programming languages and computer science concepts through hands-on projects and peer-to-peer learning.',
},
{
  institution: 'Faculté des Sciences Ben M\'Sik Casablanca',
  degree: 'PHYSICAL SCIENCES',
  period: '2021 — 2022',
  note: 'Completed foundational coursework in physics and mathematics, preparing for advanced studies in computer science.',
},
{
  institution: 'Lycée dakhla',
  degree: 'Life and Earth Sciences Baccalaureate',
  period: '2019 — 2020',
  note: 'Graduated with a focus on life and earth sciences, developing analytical and scientific skills.',
},
];

export default function Education() {
  const { isDarkMode } = useDarkMode();
  const { t } = useTranslation();

  return (
    <section className={`w-full max-w-4xl px-4 py-12 sm:py-16`} id="education">
      <div className="mx-auto ">
        {/* <h2 className={`text-2xl sm:text-3xl font-bold mb-6 ${isDarkMode ? 'text-white' : 'text-black'}`}>
          Education
        </h2> */}
        <header className="mb-8 md:mb-12">
          <h2 className={`text-3xl md:text-4xl font-extrabold ${isDarkMode ? "text-white" : "text-black"}`}>
            {t("Education")}
          </h2>
          <p className={`mt-2 text-sm md:text-base ${isDarkMode ? "text-slate-300" : "text-slate-600"}`}>
            {t(
              "A summary of my academic background and qualifications."
            )}
          </p>
        </header>
        <div className="space-y-4 border-l-4 pl-1 border-green-500">
          {EDUCATION.map((edu, idx) => (
            <div
              key={idx}
              className={`p-4 flex flex-col sm:flex-row sm:items-center justify-between transition-colors `}
            >
              <div>
                <div className='flex'>
                    <div className='bg-green-500 w-2 h-2 rounded-full mr-2 mt-2'></div>
                    <h3 className="text-lg font-semibold">{edu.institution}</h3>
                </div>
                <p className="text-sm opacity-80">{edu.degree}</p>
                <p className="text-sm mt-1 text-green-500">{edu.period}</p>
                {edu.note && (
                  <p className={`mt-2 text-sm ${isDarkMode ? 'text-slate-300' : 'text-slate-700'}`}>
                    {t(edu.note)}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
