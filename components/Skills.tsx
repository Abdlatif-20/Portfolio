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

const Skills = () => {
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
      type: "Others",
      list: [
        { name: "C/C++", icon: <PiFileCppFill /> },
        { name: "Bash", icon: <VscTerminalBash /> },
        { name: "Vim", icon: <DiVim /> },
        { name: "VSCode", icon: <VscVscode /> },
        { name: "Git/GitHub", icon: <FaGithub /> },
      ],
    },
  ];

  const { t } = useTranslation();

  return (
    <div
      id="skills"
      className="flex flex-col justify-center items-center w-[90%] mt-10 md:w-[700px]
        lg:w-[800px] min-h-screen">
      <h1 className="text-[40px] text-shadow-textShadow-green font-bold mb-5">
        {t("Skills")}
      </h1>
      <div className="flex flex-wrap w-full h-full gap-4 justify-center">
        {skills.map((skill, index) => (
          <div
            key={index}
            className="flex flex-col justify-center items-center w-full sm:w-[300px] h-auto
              text-white rounded-lg bg-[#1A3D3A] p-5 m-5 shadow-md transition-transform
              transform hover:scale-105 hover:z-10">
            <h2 className="text-[30px] font-bold  text-shadow-textShadow-green mb-4">
              {t(skill.type)}
            </h2>
            <ul className="list-none text-[20px]">
              {skill.list.map((item) => (
                <li
                  key={item.name}
                  className="flex items-center space-x-2 text-gray-200"
                >
                  <span aria-label={item.name}>{item.icon}</span>
                  <span>{t(item.name, item.name)}</span>
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
