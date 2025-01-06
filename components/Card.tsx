'use client';
import React from "react";
import { PinContainer } from "./ui/3d-pin";
import { useDarkMode } from "./context";

interface CardProps {
  title: string;
  description: string;
  href: string;
  techStack?: string[];
}

const Card: React.FC<CardProps> = ({ title, description, href, techStack }) => {
  const {isDarkMode} = useDarkMode();

  return (
    <div className="h-[400px] w-[300px] mx-8 flex items-center justify-center">
      <PinContainer title={title} href={href}>
        <div className={`flex flex-col p-4 tracking-tight sm:basis-1/2 w-[20rem] h-[20rem] rounded-[30px]
        ${isDarkMode
           ? "text-slate-100/50"
           : "text-slate-900"}
          `}>
          <h3
            className={`max-w-xs pb-2 m-0 font-bold text-base  text-center ${
              isDarkMode
                ? "text-slate-100"
                : "text-slate-900"
            }`}
          >
            {title}
          </h3>
          <div className="text-base m-0 p-0 font-normal text-center">
            <span className={`
              ${isDarkMode ? "text-slate-300" : "text-slate-700"}
              `}>{description}</span>
          </div>
          <div className="flex flex-1 w-full items-center justify-center flex-wrap ">
          {techStack && techStack.map((tech, index) => (
            <p key={index} className={`text-xs m-1 px-2 py-1 rounded-[10px] ${isDarkMode ? "bg-slate-900 text-slate-100" : "bg-slate-100 text-slate-900"}`}>
              {tech}
            </p>
          ))}
        </div>
        </div>
      </PinContainer>
    </div>
  );
};

export default Card;
