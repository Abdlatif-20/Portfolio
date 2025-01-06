'use client';
import React, { useEffect, useState, useRef } from 'react';
import Link from 'next/link';
import { MdOutlineLightMode } from "react-icons/md";
import { MdDarkMode } from "react-icons/md";
import '../i18n';
import { useTranslation } from 'react-i18next';
import { useDarkMode } from './context';
import { IoMdMenu } from "react-icons/io";

const Header = () => {
    const { isDarkMode, setIsDarkMode } = useDarkMode();
    const [isActivated, setIsActivated] = useState('about');
    const [activeLang, setActiveLang] = useState('');
    const { t, i18n } = useTranslation();
    const [showMenu, setShowMenu] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null); // Reference for the menu

    useEffect(() => {
        const lang = localStorage.getItem('lang');
        if (lang) {
            i18n?.changeLanguage(lang);
            setActiveLang(lang);
        }
    }, [i18n, activeLang]);

    const handleLinkClick = () => {
        setShowMenu(false);
    };

    useEffect(() => {
        const darkmode = localStorage.getItem('darkmode');
        if (darkmode) {
            setIsDarkMode(darkmode === 'true');
        }
    }, [setIsDarkMode]);

    // Add event listener for clicks outside the menu
    useEffect(() => {
        const handleOutsideClick = (event: any) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setShowMenu(false);
            }
        };

        if (showMenu) {
            document.addEventListener('mousedown', handleOutsideClick);
        }

        return () => {
            document.removeEventListener('mousedown', handleOutsideClick);
        };
    }, [showMenu]);

    return (
        <header className={`flex justify-between items-center w-full h-[60px] md:h-[80px] md:min-w-[500px] fixed top-0 z-50
            ${isDarkMode ? 'bg-[#21272F] text-white' : 'bg-white text-black'}
            `}
        >
            <div className='flex justify-center items-center h-full'>
                <h1 className={`text-xl sm:text-2xl font-bold ml-3 animate-pulse bg-gradient-to-r from-green-400 to-blue-500 text-transparent bg-clip-text
                `}>
                    Ab.En-neiymy
                </h1>
            </div>

            <div className='sm:flex justify-between items-center hidden w-[400px] h-full text-md sm:text-xl'>
                <Link className={`cursor-pointer ${isActivated == 'about' ? `text-[#00BD95]` : `${isDarkMode ? "text-white" : "text-black"}`}
                `}
                    onClick={() => setIsActivated('about')}
                    href='#about'>
                    {t("About")}
                </Link>
                <Link className={`cursor-pointer ${isActivated == 'project' ? `text-[#00BD95]` : `${isDarkMode ? "text-white" : "text-black"}`}
                `}
                    onClick={() => setIsActivated('project')}
                    href='#projects'>
                    {t("Projects")}
                </Link>
                <Link className={`cursor-pointer ${isActivated == 'skills' ? `text-[#00BD95]` : `${isDarkMode ? "text-white" : "text-black"}`}
                `}
                    onClick={() => setIsActivated('skills')}
                    href='#skills'>
                    {t("Skills")}
                </Link>
                <Link className={`cursor-pointer ${isActivated == 'contact' ? `text-[#00BD95]` : `${isDarkMode ? "text-white" : "text-black"}`}
                `}
                    onClick={() => setIsActivated('contact')}
                    href='#contact'>
                    {t("Contact")}
                </Link>
            </div>
            <div className='sm:flex hidden justify-around items-center h-full w-[10%]'>
                <button onClick={() => {
                    localStorage.setItem('lang', activeLang === 'en' ? 'fr' : 'en');
                    setActiveLang(activeLang === 'en' ? 'fr' : 'en');
                }}
                    className={`text-xl
    ${isDarkMode ? "text-white" : "text-black"}
    `}>
                    {activeLang === 'en' ? 'FR' : 'EN'}
                </button>
                <div onClick={() => {
                    setIsDarkMode(!isDarkMode);
                    localStorage.setItem('darkmode', isDarkMode ? 'false' : 'true');
                }}
                    className={`flex justify-center items-center cursor-pointer
    ${isDarkMode ? "text-white" : "text-black"}
    `}>
                    {isDarkMode ? <MdOutlineLightMode size={30} /> : <MdDarkMode size={30} />}
                </div>
            </div>
            <div className="flex justify-center items-center h-full w-[10%] sm:hidden">
                <IoMdMenu onClick={() => setShowMenu(!showMenu)} size={30} />
            </div>
            <div
                ref={menuRef}
                className={`fixed top-0 right-0 h-screen w-[50%]  z-50 transform ${
                    showMenu ? 'translate-x-0' : 'translate-x-full'
                } transition-transform duration-300 md:hidden
                ${isDarkMode ? 'bg-[#21272F] text-white' : 'bg-white text-black'}
                `}
            >
                <div className="flex flex-col justify-center items-start h-full p-6">
                    <Link
                        className="cursor-pointer text-xl mb-4"
                        href="#about"
                        onClick={handleLinkClick}
                    >
                        {t('About')}
                    </Link>
                    <Link
                        className="cursor-pointer text-xl mb-4"
                        href="#projects"
                        onClick={handleLinkClick}
                    >
                        {t('Projects')}
                    </Link>
                    <Link
                        className="cursor-pointer text-xl mb-4"
                        href="#skills"
                        onClick={handleLinkClick}
                    >
                        {t('Skills')}
                    </Link>
                    <Link
                        className="cursor-pointer text-xl mb-4"
                        href="#contact"
                        onClick={handleLinkClick}
                    >
                        {t('Contact')}
                    </Link>
                    <div className='
        flex justify-between items-center w-[50%]
        '>
                        <button
                            onClick={() => {
                                const newLang = activeLang === 'en' ? 'fr' : 'en';
                                localStorage.setItem('lang', newLang);
                                setActiveLang(newLang);
                            }}
                            className="text-xl cursor-pointer"
                        >
                            {activeLang === 'en' ? 'FR' : 'EN'}
                        </button>
                        <div
                            onClick={() => {
                                setIsDarkMode(!isDarkMode);
                                localStorage.setItem('darkmode', isDarkMode ? 'false' : 'true');
                            }}
                            className="flex justify-center items-center cursor-pointer"
                        >
                            {isDarkMode ? (
                                <MdOutlineLightMode size={30} />
                            ) : (
                                <MdDarkMode size={30} />
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;
