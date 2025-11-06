'use client';
import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import Typewriter from 'typewriter-effect/dist/core';
import { useDarkMode } from './context';

const About = () => {
  const { t } = useTranslation();
  const {isDarkMode} = useDarkMode();

  useEffect(() => {
    new Typewriter('#text_name', {
      strings: [
        "Abdellatyf En-neiymy",
        t("Front End Developer"),
      ],
      autoStart: true,
      loop: true,
      deleteSpeed: 30,
      delay: 100,
    });
  }, [t]);

  return (
    <section id="about" className="flex flex-col justify-center items-center w-full  px-4 py-12 sm:py-16 lg:py-32 md:mt-5">
      <h1 className={`text-[40px] text-shadow-textShadow-green font-bold max-sm:min-h-[150px]
        mt-5 md:mt-0 w-full flex justify-center items-center brightness-70`}>
        {t("About")}
      </h1>
      <div className="flex flex-col sm:flex-row justify-around items-center w-[80%] sm:w-full h-full">
        <div className="flex flex-col order-2 sm:order-1 justify-center ml-5 lg:ml-0 items-center sm:items-start w-full sm:w-[50%] h-full">
          <h1 className="text-4xl lg:text-5xl w-full mt-5 md:mt-0">
            {t("Hello")}, <span className="text-[#00BD95]">{t("I'm")}</span>
          </h1>
          <p className="text-xl xl:text-3xl my-5 w-full text-[#00BD95] font-bold" id="text_name"></p>
          <p className="text-lg lg:text-xl xl:text-2xl mx-1 sm:min-w-[300px] max-w-[700px]">
            {t("I'm a passionate Front-End Developer dedicated to building elegant, performant, and responsive web interfaces. With hands-on experience using React, Next.js, and Tailwind CSS, I focus on transforming ideas into intuitive and visually engaging user experiences.")}
          </p>
          <div className="flex w-[270px] sm:w-[200px] items-center justify-center">
            <button className="bg-[#00BD95] w-full py-2 mt-10 rounded-lg shadow-btnShadow
            transform hover:scale-105 transition-transform duration-300 ease-in-out
            ">
              <a className="text-xl lg:text-2xl font-bold w-full"
                href="/resume/my-cv.pdf"
                target="_blank">
                {t("My Resume")}
              </a>
            </button>
          </div>
        </div>
        <div className="order-1 sm:order-2 w-[80%] md:w-[350px] md:mb-12 lg:w-[500px] flex items-center justify-center">
          <div className={`relative group rounded-full p-1 shadow-2xl transition-transform transform motion-safe:hover:scale-105`}>
            {/* animated conic-gradient ring (appears on hover) */}
            <div className="absolute -inset-1 rounded-full pointer-events-none flex items-center justify-center">
              <span
                className="absolute inset-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{
                  background: isDarkMode
                    ? 'conic-gradient(from 0deg, #0ea5a4, #3b82f6, #8b5cf6, #0ea5a4)'
                    : 'conic-gradient(from 0deg, #00BD95, #0066ff, #8b5cf6, #00BD95)',
                  filter: 'blur(4px)',
                  animation: 'spin 6s linear infinite, hue 8s linear infinite',
                }}
              />
              <span
                className="absolute inset-1 rounded-full opacity-100 group-hover:opacity-0 transition-opacity duration-700"
                style={{
                  background: isDarkMode
                    ? 'conic-gradient(from 0deg, #3b82f6, #0ea5a4, #06b6d4, #3b82f6)'
                    : 'conic-gradient(from 0deg, #0066ff, #00BD95, #06b6d4, #0066ff)',
                  filter: 'blur(3px)',
                  animation: 'spin 9s linear reverse infinite, hue 10s linear reverse infinite',
                }}
              />
            </div>

            <div className={`rounded-full bg-${isDarkMode ? '[#071827]' : 'white'} overflow-hidden w-[260px] h-[260px] md:w-[320px] md:h-[320px] lg:w-[420px] lg:h-[420px] flex items-center justify-center relative z-10`}> 
              {/* invisible overlay to intercept right-click/drag so the image isn't easily saved */}
              <div
                aria-hidden
                className="absolute inset-0 z-20"
                onContextMenu={(e) => e.preventDefault()}
                onMouseDown={(e) => e.preventDefault()}
                onTouchStart={(e) => e.preventDefault()}
              />
              <img
                src="images/mee.png"
                alt="aben-nei"
                draggable={false}
                onDragStart={(e) => e.preventDefault()}
                onContextMenu={(e) => e.preventDefault()}
                className="rounded-full w-full h-full object-cover block select-none [-webkit-user-drag:none]"
              />
            </div>
            {/* subtle inner ring */}
            <span className="pointer-events-none absolute inset-0 rounded-full ring-1 ring-white/10" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
