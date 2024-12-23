'use client';
import React from 'react'
import { useTranslation } from 'react-i18next';

const About = () => {
  const { t } = useTranslation();
  return (
    <div id='about' className='flex flex-col justify-center items-center w-[70%] h-screen '>
      <h1 className='text-[40px] text-shadow-textShadow-green text-white font-bold h-[50%] w-full flex justify-center items-center brightness-70'>
        {t("About")}
      </h1>
      <div className='flex justify-between items-center w-full h-full '>
        <div className='flex flex-col justify-center items-start w-[50%] ml-10 h-full'>
            <h1 className='text-5xl'>{t("Hello")}, <span className='text-[#00BD95]'>{t("I'm")}</span></h1>
            <p className='text-3xl my-5 text-[#00BD95]'>Abdellatyf En-neiymy</p>
            <p className='text-2xl'>{t("I'm a full-stack web developer, I have a passion for web development and love to create websites and web applications that are visually appealing and provide a great user experience.")}</p>
            <div className='flex w-[40%] items-center justify-center'>
              <button className='bg-[#00BD95] text-white w-full py-2 mt-10 rounded-lg shadow-btnShadow'>
                <h1 className='text-md lg:text-2xl font-bold w-full 
                '>
                  {t("My Resume")}</h1>
              </button>
               </div>
        </div>
        <img className='w-[40%] h-full'
        src="images/Me.png" alt="" />
      </div>
    </div>
  )
}

export default About
