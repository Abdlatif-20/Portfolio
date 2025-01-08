'use client'
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next';
import { useDarkMode } from './context';
import { FaPhoneAlt } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { FaLocationArrow } from "react-icons/fa";

const Footer = () => {
    const { t } = useTranslation();
    const { isDarkMode } = useDarkMode();
    const contact = [
        {
            name: '+212777191684',
            icon: <FaPhoneAlt />,
        },
        {
            name: 'ab.enneiymy@gmail.com',
            icon: <MdEmail
              size={25}
            />,
        },
        {
            name: 'Casablanca, Morocco',
            icon: <FaLocationArrow />,
        }
    ]
  return (
    <div className={`
      flex flex-col justify-around items-center w-full h-[30vh]
      ${isDarkMode ? 'bg-[#21272F] text-gray-400' : 'bg-white text-black'}
    `}>
      <div className='flex justify-center items-center w-full mt-7 md:mt-0'>
        {contact.map((item, index) => (
          <div key={index} className='flex flex-col md:flex-row mx-2 md:mx-0 justify-center items-center min-w-[100px] w-auto h-full'>
            <span className={`
              flex justify-center items-center w-10 h-10
              rounded-lg mx-2
              ${isDarkMode ? 'bg-[#00FF00] text-black' : 'bg-[#00BD95] text-white'}
            `}>
              {item.icon}
            </span>
            <p className={`flex justify-center items-center text-center text-sm sm:text-lg w-full h-full ${isDarkMode ? "bg-[#21272F] text-gray-400" : "text-black"}
            `}>
              {item.name}
            </p>
          </div>
        ))}
        </div>
      <p className={`text-center text-md  ${isDarkMode ? "bg-[#21272F] text-gray-400" : "text-black"}
      `}>
      {t('Designed and Developed by')} Abdellatyf En-Neiymy © {new Date().getFullYear()}.
      </p>
    </div>
  )
}

export default Footer
