import React from "react";
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

  const skills = [
    {
      type: "Frontend",
      list: [
        { name: "HTML", icon: <FaHtml5 /> },
        { name: "CSS", icon: <FaCss3Alt /> },
        { name: "TypeScript", icon: <SiTypescript /> },
        { name: "React", icon: <FaReact /> },
        { name: "Next.js", icon: <RiNextjsFill /> },
        { name: "Tailwind CSS", icon: <RiTailwindCssFill /> },
        { name: "i18next", icon: <SiI18Next /> },
      ],
    },
    {
      type: "Backend",
      list: [
        { name: "Django", icon: <SiDjango /> },
        { name: "Python", icon: <FaPython /> },
        { name: "REST API", icon: <TbApi /> },
        { name: "PostgreSQL", icon: <BiLogoPostgresql /> },
      ],
    },
    {
      type: "DevOps",
      list: [{ name: "Docker", icon: <FaDocker /> }],
    },
    {
      type: t("Others"),
      list: [
        { name: "C/C++", icon: <PiFileCppFill /> },
        { name: "Bash", icon: <VscTerminalBash /> },
        { name: "Vim", icon: <DiVim /> },
        { name: "VSCode", icon: <VscVscode /> },
        { name: "Git/GitHub", icon: <FaGithub /> },
      ],
    },
  ];

  return (
    <div
      id="skills"
      className="flex flex-col justify-center items-center w-[90%] min-h-screen"
    >
      <h1 className="text-[40px] text-shadow-textShadow-green font-bold mb-10">
        {t("Skills")}
      </h1>
      <div
        className="flex flex-wrap gap-6 justify-center w-full h-full overflow-x-auto 
          md:flex-wrap md:overflow-visible"
      >
        {skills.map((skill, index) => (
          <div
            key={index}
            className={`relative flex flex-col items-center w-[90%] md:w-[300px] 
              rounded-xl p-6 border bg-opacity-30 shadow-md flex-shrink-0 mb-5 transition-transform transform
              md:hover:scale-95 hover:shadow-xl
              ${isDarkMode ? "bg-[#1e293b]/50 border-white" : "bg-white/50 border-gray-200"}
              backdrop-blur-md`}
          >
            <h2 className="text-[24px] font-semibold text-center text-shadow-textShadow-green mb-4">
              {t(skill.type)}
            </h2>
            <ul className="w-full list-none space-y-4">
              {skill.list.map((item) => (
                <li
                  key={item.name}
                  className="flex items-center gap-3 p-3 rounded-lg transition-colors
                    bg-gray-100/40 dark:bg-gray-800/40 hover:bg-green-300/50 dark:hover:bg-green-700/50"
                >
                  <span className="text-2xl text-green-300 dark:text-green-400">
                    {item.icon}
                  </span>
                  <span className="text-lg text-gray-800 dark:text-gray-200">
                    {t(item.name, item.name)}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Skills;
