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
        t("Full Stack Developer"),
      ],
      autoStart: true,
      loop: true,
      deleteSpeed: 30,
      delay: 100,
    });
  }, [t]);

  return (
    <div id="about" className="flex flex-col justify-center items-center w-full min-h-screen">
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
            {t("I'm a full-stack web developer, I have a passion for web development and love to create websites and web applications that are visually appealing and provide a great user experience.")}
          </p>
          <div className="flex w-[270px] sm:w-[200px] items-center justify-center">
            <button className="bg-[#00BD95] w-full py-2 mt-10 rounded-lg shadow-btnShadow
            transform hover:scale-105 transition-transform duration-300 ease-in-out
            ">
              <a className="text-xl lg:text-2xl font-bold w-full"
                href="https://drive.google.com/file/d/1ijRNAdF3O1SOUFYIYhcA_XIS0PF8gsBP/view?usp=sharing"
                target="_blank">
                {t("My Resume")}
              </a>
            </button>
          </div>
        </div>
        <img className="order-1 sm:order-2 w-[80%] md:w-[350px] md:mb-12 lg:w-[500px] h-auto"
          src={isDarkMode ? "images/Mee.png" : "images/Me.png"}
          alt="aben-nei"
        />
      </div>
    </div>
  );
};

export default About;
