'use client';
import React, { useEffect, useState, useRef } from 'react';
import { MdOutlineLightMode, MdDarkMode } from "react-icons/md";
import { IoMdMenu, IoMdClose } from "react-icons/io";
import { HiHome } from "react-icons/hi";
import { FaCode, FaGraduationCap, FaTools, FaEnvelope } from "react-icons/fa";
import '../i18n';
import { useTranslation } from 'react-i18next';
import { useDarkMode } from './context';

const Header = () => {
    const { isDarkMode, setIsDarkMode } = useDarkMode();
    const [isActivated, setIsActivated] = useState('about');
    const [activeLang, setActiveLang] = useState('');
    const [isScrolled, setIsScrolled] = useState(false);
    const { t, i18n } = useTranslation();
    const [showMenu, setShowMenu] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const lang = localStorage.getItem('lang') || 'en';
        setActiveLang(lang);
        i18n?.changeLanguage(lang);
    }, [i18n]);

    useEffect(() => {
        const darkmode = localStorage.getItem('darkmode');
        if (darkmode) {
            setIsDarkMode(darkmode === 'true');
        }
    }, [setIsDarkMode]);

    // Handle scroll effect for header
    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

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

    // Scroll-based section tracking
    useEffect(() => {
        const handleScroll = () => {
            const sections = Array.from(document.querySelectorAll('section[id], div[id="contact"]')) as HTMLElement[];
            const scrollPosition = window.scrollY + 150; // Account for header height
            
            // Find which section we're currently in
            let currentSection = 'about';
            
            for (let i = sections.length - 1; i >= 0; i--) {
                const section = sections[i];
                const sectionTop = section.offsetTop;
                
                if (scrollPosition >= sectionTop) {
                    currentSection = section.id;
                    break;
                }
            }
            
            setIsActivated(currentSection);
        };

        // Initial check
        handleScroll();
        
        // Add scroll listener with throttle
        let ticking = false;
        const onScroll = () => {
            if (!ticking) {
                window.requestAnimationFrame(() => {
                    handleScroll();
                    ticking = false;
                });
                ticking = true;
            }
        };

        window.addEventListener('scroll', onScroll);
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    const sectionButtons = [
        { id: 'about', label: t('About'), target: '#about', icon: <HiHome size={18} /> },
        { id: 'projects', label: t('Projects'), target: '#projects', icon: <FaCode size={16} /> },
        { id: 'education', label: t('Education'), target: '#education', icon: <FaGraduationCap size={16} /> },
        { id: 'skills', label: t('Skills'), target: '#skills', icon: <FaTools size={16} /> },
        { id: 'contact', label: t('Contact'), target: '#contact', icon: <FaEnvelope size={16} /> },
    ];

    return (
        <header 
            className={`flex justify-between items-center w-full h-[70px] fixed top-0 z-50 px-4 lg:px-8 transition-all duration-300
                ${isScrolled 
                    ? isDarkMode 
                        ? 'bg-[#21272F]/95 backdrop-blur-md shadow-lg border-b border-slate-700/50' 
                        : 'bg-white/95 backdrop-blur-md shadow-lg border-b border-gray-200/50'
                    : isDarkMode 
                        ? 'bg-[#21272F]' 
                        : 'bg-white'
                }
                ${isDarkMode ? 'text-white' : 'text-black'}
            `}
        >
            {/* Logo */}
            <div className="flex justify-center items-center h-full">
                <button 
                    onClick={() => scrollToSection('#about')}
                    className="group flex items-center gap-3 transition-all duration-300"
                >
                    {/* Icon Logo */}
                    <div className="relative">
                        <div className={`absolute inset-0 rounded-xl blur-lg opacity-50 group-hover:opacity-75 transition-opacity duration-300
                            bg-gradient-to-br from-[#00BD95] via-cyan-500 to-blue-500`} 
                        />
                        <div className={`relative w-10 h-10 lg:w-12 lg:h-12 rounded-xl flex items-center justify-center font-bold text-lg lg:text-xl
                            bg-gradient-to-br from-[#00BD95] via-cyan-500 to-blue-500 text-white shadow-lg
                            group-hover:scale-110 group-hover:rotate-3 transition-all duration-300`}>
                            <span className="drop-shadow-lg">AE</span>
                        </div>
                    </div>
                    
                    {/* Text Logo (hidden on mobile) */}
                    <div className="hidden sm:flex flex-col leading-tight">
                        <span className={`text-sm lg:text-base font-bold ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                            Abdellatyf
                        </span>
                        <span className="text-xs lg:text-sm text-[#00BD95] font-semibold">
                            En-neiymy
                        </span>
                    </div>
                </button>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-1">
                {sectionButtons.map(({ id, label, target, icon }) => (
                    <button
                        key={id}
                        className={`relative flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300
                            ${isDarkMode 
                                ? 'text-slate-300 hover:text-white hover:bg-slate-800/50' 
                                : 'text-slate-600 hover:text-black hover:bg-gray-100'
                            }
                        `}
                        onClick={() => {
                            scrollToSection(target);
                        }}
                    >
                        {icon}
                        <span>{label}</span>
                    </button>
                ))}
            </nav>

            {/* Actions: Language & Dark Mode */}
            <div className="hidden lg:flex items-center gap-3">
                {/* Language Switcher */}
                <div className={`flex items-center gap-1 p-1 rounded-lg ${isDarkMode ? 'bg-slate-800' : 'bg-gray-100'}`}>
                    <button
                        onClick={() => {
                            localStorage.setItem('lang', 'en');
                            setActiveLang('en');
                            i18n?.changeLanguage('en');
                        }}
                        className={`px-3 py-1.5 rounded-md text-sm font-medium transition-all duration-200
                            ${activeLang === 'en' 
                                ? 'bg-[#00BD95] text-white shadow-sm' 
                                : isDarkMode 
                                    ? 'text-slate-400 hover:text-white' 
                                    : 'text-slate-600 hover:text-black'
                            }
                        `}
                    >
                        EN
                    </button>
                    <button
                        onClick={() => {
                            localStorage.setItem('lang', 'fr');
                            setActiveLang('fr');
                            i18n?.changeLanguage('fr');
                        }}
                        className={`px-3 py-1.5 rounded-md text-sm font-medium transition-all duration-200
                            ${activeLang === 'fr' 
                                ? 'bg-[#00BD95] text-white shadow-sm' 
                                : isDarkMode 
                                    ? 'text-slate-400 hover:text-white' 
                                    : 'text-slate-600 hover:text-black'
                            }
                        `}
                    >
                        FR
                    </button>
                </div>

                {/* Dark Mode Toggle */}
                <button
                    onClick={() => {
                        setIsDarkMode(!isDarkMode);
                        localStorage.setItem('darkmode', isDarkMode ? 'false' : 'true');
                    }}
                    className={`p-2.5 rounded-lg transition-all duration-300
                        ${isDarkMode 
                            ? 'bg-slate-800 hover:bg-slate-700 text-yellow-400' 
                            : 'bg-gray-100 hover:bg-gray-200 text-slate-700'
                        }
                    `}
                    aria-label="Toggle dark mode"
                >
                    {isDarkMode ? <MdOutlineLightMode size={22} /> : <MdDarkMode size={22} />}
                </button>
            </div>

            {/* Mobile Menu Button */}
            <button 
                className="lg:hidden p-2 rounded-lg transition-colors"
                onClick={() => setShowMenu(!showMenu)}
                aria-label="Toggle menu"
            >
                {showMenu ? <IoMdClose size={28} /> : <IoMdMenu size={28} />}
            </button>

            {/* Mobile Menu Overlay */}
            {showMenu && (
                <div 
                    className="fixed inset-0 bg-black/50 backdrop-blur-sm lg:hidden z-40"
                    onClick={() => setShowMenu(false)}
                />
            )}

            {/* Mobile Menu Panel */}
            <div
                ref={menuRef}
                className={`fixed top-0 right-0 h-screen w-[280px] lg:hidden transform transition-transform duration-300 ease-in-out z-50
                    ${showMenu ? 'translate-x-0' : 'translate-x-full'}
                    ${isDarkMode ? 'bg-[#21272F] border-l border-slate-700' : 'bg-white border-l border-gray-200'}
                `}
            >
                <div className="flex flex-col h-full p-6">
                    {/* Mobile Menu Header */}
                    <div className="flex items-center justify-between mb-8 pb-4 border-b border-slate-700/50">
                        <h2 className={`text-lg font-bold ${isDarkMode ? 'text-white' : 'text-black'}`}>
                            Menu
                        </h2>
                        <button 
                            onClick={() => setShowMenu(false)}
                            className="p-2 rounded-lg hover:bg-slate-800/50 transition-colors"
                        >
                            <IoMdClose size={24} />
                        </button>
                    </div>

                    {/* Mobile Navigation Links */}
                    <nav className="flex-1 flex flex-col gap-2">
                        {sectionButtons.map(({ id, label, target, icon }) => (
                            <button
                                key={id}
                                className={`flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-all duration-200 border-l-4 border-transparent
                                    ${isDarkMode 
                                        ? 'text-slate-300 hover:bg-slate-800/50' 
                                        : 'text-slate-600 hover:bg-gray-100'
                                    }
                                `}
                                onClick={() => {
                                    scrollToSection(target);
                                    setShowMenu(false);
                                }}
                            >
                                <span>{icon}</span>
                                <span className="font-medium">{label}</span>
                            </button>
                        ))}
                    </nav>

                    {/* Mobile Menu Footer */}
                    <div className={`pt-6 pb-32 border-t ${isDarkMode ? 'border-slate-700' : 'border-gray-200'}`}>
                        {/* Language Selector */}
                        <div className="mb-4">
                            <p className={`text-xs font-semibold mb-2 ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                                {t('Language')}
                            </p>
                            <div className={`flex gap-2 p-1 rounded-lg ${isDarkMode ? 'bg-slate-800' : 'bg-gray-100'}`}>
                                <button
                                    onClick={() => {
                                        localStorage.setItem('lang', 'en');
                                        setActiveLang('en');
                                        i18n?.changeLanguage('en');
                                    }}
                                    className={`flex-1 px-3 py-2 rounded-md text-sm font-medium transition-all
                                        ${activeLang === 'en' 
                                            ? 'bg-[#00BD95] text-white' 
                                            : isDarkMode 
                                                ? 'text-slate-400' 
                                                : 'text-slate-600'
                                        }
                                    `}
                                >
                                    English
                                </button>
                                <button
                                    onClick={() => {
                                        localStorage.setItem('lang', 'fr');
                                        setActiveLang('fr');
                                        i18n?.changeLanguage('fr');
                                    }}
                                    className={`flex-1 px-3 py-2 rounded-md text-sm font-medium transition-all
                                        ${activeLang === 'fr' 
                                            ? 'bg-[#00BD95] text-white' 
                                            : isDarkMode 
                                                ? 'text-slate-400' 
                                                : 'text-slate-600'
                                        }
                                    `}
                                >
                                    Français
                                </button>
                            </div>
                        </div>

                        {/* Dark Mode Toggle */}
                        <button
                            onClick={() => {
                                setIsDarkMode(!isDarkMode);
                                localStorage.setItem('darkmode', isDarkMode ? 'false' : 'true');
                            }}
                            className={`w-full flex items-center justify-between px-4 py-3 rounded-lg transition-all
                                ${isDarkMode 
                                    ? 'bg-slate-800 hover:bg-slate-700' 
                                    : 'bg-gray-100 hover:bg-gray-200'
                                }
                            `}
                        >
                            <span className="font-medium text-sm">
                                {isDarkMode ? t('Light Mode') : t('Dark Mode')}
                            </span>
                            {isDarkMode ? <MdOutlineLightMode size={22} /> : <MdDarkMode size={22} />}
                        </button>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;
