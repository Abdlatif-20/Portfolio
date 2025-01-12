'use client';
import React, { useEffect, useState, useRef } from 'react';
import { MdOutlineLightMode, MdDarkMode } from "react-icons/md";
import { IoMdMenu } from "react-icons/io";
import '../i18n';
import { useTranslation } from 'react-i18next';
import { useDarkMode } from './context';
import { MdOutlineMenuOpen } from "react-icons/md";

const Header = () => {
    const { isDarkMode, setIsDarkMode } = useDarkMode();
    const [isActivated, setIsActivated] = useState('about');
    const [activeLang, setActiveLang] = useState('');
    const { t, i18n } = useTranslation();
    const [showMenu, setShowMenu] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const lang = localStorage.getItem('lang') || 'en';
        console.log(lang);
        setActiveLang(lang);
        i18n?.changeLanguage(lang);
    }, [i18n]);

    useEffect(() => {
        const darkmode = localStorage.getItem('darkmode');
        if (darkmode) {
            setIsDarkMode(darkmode === 'true');
        }
    }, [setIsDarkMode]);

    // Close the menu if clicking outside
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

    // Scroll to section
    const scrollToSection = (target: string) => {
        const element = document.querySelector(target);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    };

    // Intersection Observer for tracking sections
    useEffect(() => {
        const sections = document.querySelectorAll('div[id]');
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setIsActivated(entry.target.id);
                    }
                });
            },
            { 
                threshold: 0.4,

             }
        );

        sections.forEach((section) => observer.observe(section));

        return () => {
            sections.forEach((section) => observer.unobserve(section));
        };
    }, [setIsActivated]);

    const sectionButtons = [
        { id: 'about', label: t('About'), target: '#about' },
        { id: 'projects', label: t('Projects'), target: '#projects' },
        { id: 'skills', label: t('Skills'), target: '#skills' },
        { id: 'contact', label: t('Contact'), target: '#contact' },
    ];

    return (
        <header className={`flex justify-between items-center w-full h-[60px] md:h-[80px] fixed top-0 z-50 ${isDarkMode ? 'bg-[#21272F] text-white' : 'bg-white text-black'}`}>
            <div className="flex justify-center items-center h-full">
                <h1 className="text-xl sm:text-2xl font-bold ml-3 animate-pulse bg-gradient-to-r from-green-400 to-blue-500 text-transparent bg-clip-text">
                    Ab.En-neiymy
                </h1>
            </div>

            {/* Desktop Navigation */}
            <div className="sm:flex justify-between items-center hidden w-[400px] h-full text-md sm:text-xl">
                {sectionButtons.map(({ id, label, target }) => (
                    <button
                        key={id}
                        className={`cursor-pointer ${isActivated === id ? 'text-[#00BD95]' : isDarkMode ? 'text-white' : 'text-black'}`}
                        onClick={() => {
                            scrollToSection(target);
                            setIsActivated(id);
                        }}
                    >
                        {label}
                    </button>
                ))}
            </div>

            {/* Language Toggle and Dark Mode */}
            <div className="sm:flex hidden justify-around items-center h-full w-[10%]">
                <button
                    onClick={() => {
                        const newLang = activeLang === 'en' ? 'fr' : 'en';
                        localStorage.setItem('lang', newLang);
                        setActiveLang(newLang);
                        i18n?.changeLanguage(newLang);
                    }}
                    className={`text-xl ${isDarkMode ? 'text-white' : 'text-black'}`}
                >
                    {activeLang === 'en' ? 'FR' : 'EN'}
                </button>
                <div
                    onClick={() => {
                        setIsDarkMode(!isDarkMode);
                        localStorage.setItem('darkmode', isDarkMode ? 'false' : 'true');
                    }}
                    className="cursor-pointer"
                >
                    {isDarkMode ? <MdOutlineLightMode size={30} /> : <MdDarkMode size={30} />}
                </div>
            </div>

            {/* Mobile Menu */}
            <div className="flex sm:hidden items-center w-[10%] z-50 cursor-pointer">
                {showMenu ? (
                    <MdOutlineMenuOpen size={30} onClick={() => setShowMenu(false)} />
                ) : (
                    <IoMdMenu size={30} onClick={() => setShowMenu(true)} />
                )}
            </div>
            <div
                ref={menuRef}
                className={`fixed top-0 right-0 h-screen w-[50%] sm:hidden transform ${showMenu ? 'translate-x-0' : 'translate-x-full'} transition-transform duration-300 ${isDarkMode ? 'bg-[#21272F] text-white' : 'bg-white text-black'}`}
            >
                <div className="flex flex-col justify-center items-start h-full p-6">
                    {sectionButtons.map(({ id, label, target }) => (
                        <button
                            key={id}
                            className={`cursor-pointer text-xl mb-4 ${isActivated === id ? 'text-[#00BD95]' : isDarkMode ? 'text-white' : 'text-black'}`}
                            onClick={() => {
                                scrollToSection(target);
                                setIsActivated(id);
                                setShowMenu(false);
                            }}
                        >
                            {label}
                        </button>
                    ))}
                    <div className="flex justify-between items-center w-full mt-6">
                        <button
                            onClick={() => {
                                const newLang = activeLang === 'en' ? 'fr' : 'en';
                                localStorage.setItem('lang', newLang);
                                setActiveLang(newLang);
                                i18n?.changeLanguage(newLang);
                            }}
                            className="text-xl"
                        >
                            {activeLang === 'en' ? 'FR' : 'EN'}
                        </button>
                        <div
                            onClick={() => {
                                setIsDarkMode(!isDarkMode);
                                localStorage.setItem('darkmode', isDarkMode ? 'false' : 'true');
                            }}
                            className="cursor-pointer"
                        >
                            {isDarkMode ? <MdOutlineLightMode size={30} /> : <MdDarkMode size={30} />}
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;
