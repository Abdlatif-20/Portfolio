'use client';
import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { MdOutlineLightMode } from "react-icons/md";
import { MdDarkMode } from "react-icons/md";
import '../i18n';
import { useTranslation } from 'react-i18next';


const Header = () => {
    const [isDarkMode, setIsDarkMode] = useState(false);
    const [isActivated, setIsActivated] = useState('about');
    const [activeLang, setActiveLang] = useState('');
    const { t, i18n } = useTranslation();
    const [theme, setTheme] = useState("dark");

    useEffect(() => {
        const lang = localStorage.getItem('lang');
        if (lang) {
            i18n?.changeLanguage(lang);
            setActiveLang(lang)
        }
        const localTheme = localStorage.getItem('theme');
        if (localTheme) {
            setIsDarkMode(localTheme === 'dark');
            setTheme(localTheme);
        }
    }
    , [i18n, activeLang, theme]);

  return (
    <header className='flex justify-between items-center  w-[90%] h-[80px] '
    >
    <div className=' flex justify-center items-center h-full
    '>
        <img src="
        images/logo.png
        "
         alt="logo" />
    </div>
    <div className='flex justify-between items-center w-1/3 h-full text-xl'>
        <Link className={`cursor-pointer ${isActivated == 'about' ? `${theme == "dark" ? "text-[#00BD95]" : "text-white"}` : `${theme == "dark" ? "text-white" : "text-black"}`}
        `}
        onClick={() => setIsActivated('about')}
         href='#about'>
            {t("About")}
        </Link>
        <Link className={`cursor-pointer ${isActivated == 'project' ? `${theme == "dark" ? "text-[#00BD95]" : "text-white"}` : `${theme == "dark" ? "text-white" : "text-black"}`}
        `}
        onClick={() => setIsActivated('project')} 
        href='#projects'>
            {t("Projects")}
        </Link>
        <Link className={`cursor-pointer ${isActivated == 'skills' ? `${theme == "dark" ? "text-[#00BD95]" : "text-white"}` : `${theme == "dark" ? "text-white" : "text-black"}`}
        `}
        onClick={() => setIsActivated('skills')}
        href='#skills'>
            {t("Skills")}
        </Link>
        <Link className={`cursor-pointer ${isActivated == 'contact' ? `${theme == "dark" ? "text-[#00BD95]" : "text-white"}` : `${theme == "dark" ? "text-white" : "text-black"}`}
        `}
        onClick={() => setIsActivated('contact')} 
        href='#contact'>
            {t("Contact")}
        </Link>
    </div>
    <div className='flex justify-around items-center h-full w-[10%]'>
    <button onClick={() => {
        localStorage.setItem('lang', activeLang === 'en' ? 'fr' : 'en');
        setActiveLang(activeLang === 'en' ? 'fr' : 'en');
    }}
    className={`text-xl
    ${theme == "dark" ? "text-white" : "text-black"}
    `}>
        {activeLang === 'en' ? 'EN' : 'FR'}
    </button>
    <div onClick={() => {setIsDarkMode(!isDarkMode);
    localStorage.setItem('theme', isDarkMode ? 'light' : 'dark');
    setTheme(isDarkMode ? 'light' : 'dark');
    }}
    className={`flex justify-center items-center cursor-pointer
    ${theme == "dark" ? "text-white" : "text-black"}
    `}>
        {isDarkMode ? <MdDarkMode size={30} /> : <MdOutlineLightMode size={30} />}
    </div>
    </div>

</header>
  )
}

export default Header
