'use client';
import React, { useEffect, useState, useRef } from 'react';
import { MdOutlineLightMode, MdDarkMode } from "react-icons/md";
import { IoMdMenu, IoMdClose } from "react-icons/io";
import { HiHome } from "react-icons/hi";
import { FaCode, FaGraduationCap, FaTools, FaBriefcase, FaEnvelope } from "react-icons/fa";
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
    const headerRef = useRef<HTMLElement | null>(null);

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
        { 
            id: 'education',
            label: isActivated === 'experience' ? t('Experience') : t('Education'),
            target: isActivated === 'experience' ? '#experience' : '#education',
            icon: isActivated === 'experience' ? <FaBriefcase size={16} /> : <FaGraduationCap size={16} />
        },
        { id: 'skills', label: t('Skills'), target: '#skills', icon: <FaTools size={16} /> },
        { id: 'contact', label: t('Contact'), target: '#contact', icon: <FaEnvelope size={16} /> },
    ];

    return (
        <header 
            className={`flex justify-between items-center w-full h-[60px] sm:h-[70px] fixed top-0 z-50 px-3 sm:px-4 md:px-6 lg:px-8 transition-all duration-300
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
            <div className="flex justify-center items-center h-full flex-shrink-0">
                <button 
                    onClick={() => scrollToSection('#about')}
                    className="group flex items-center gap-1 sm:gap-2 md:gap-3 transition-all duration-300"
                >
                    {/* Icon Logo - Developer Style */}
                    <div className="relative">
                        <div className={`absolute inset-0 rounded-lg blur-lg opacity-40 group-hover:opacity-70 transition-opacity duration-300
                            bg-gradient-to-br from-[#00BD95] via-cyan-500 to-blue-600`} 
                        />
                        <div className={`relative md:hidden w-10 h-10 lg:w-12 lg:h-12 rounded-lg flex flex-col items-center justify-center font-mono text-xs sm:text-xs lg:text-sm font-bold
                            bg-gradient-to-br from-slate-900 to-slate-800 text-transparent bg-clip-text
                            border border-[#00BD95]/30 shadow-lg
                            group-hover:scale-110 group-hover:border-[#00BD95]/60 transition-all duration-300
                            overflow-hidden`}>
                            {/* Background gradient animation */}
                            <div className="absolute inset-0 bg-gradient-to-br from-[#00BD95]/10 to-blue-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                            {/* Code brackets style */}
                            <div className="relative z-10 flex items-center justify-center h-full w-full">
                              <span className="text-[#00BD95]">&lt;</span>
                              <span className="mx-0.5 text-white text-[12px] sm:text-xs">AE</span>
                              <span className="text-blue-400">/&gt;</span>
                            </div>
                        </div>
                    </div>
                    
                    {/* Text Logo (hidden on mobile, shown from sm) */}
                    <div className="hidden md:flex flex-col leading-tight md:mr-3">
                        <span className={`text-xs sm:text-sm lg:text-base font-bold font-mono ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                            <span className="text-[#00BD95]">&lt;</span>AE<span className="text-blue-500">/&gt;</span>
                        </span>
                        <span className="hidden md:block text-[10px] lg:text-xs text-slate-500 font-mono">
                            Developer
                        </span>
                    </div>
                </button>
            </div>

            {/* Desktop Navigation - Show on medium screens and above */}
            <nav className="hidden md:flex items-center gap-1 lg:gap-2 flex-1 justify-center">
                {sectionButtons.map(({ id, label, target, icon }) => (
                    <button
                        key={id}
                        className={`relative group flex items-center gap-2 px-3 lg:px-4 py-2 lg:py-2.5 rounded-lg text-xs xl:text-sm font-mono font-medium transition-all duration-300 overflow-hidden
                            ${(id === 'education' && (isActivated === 'education' || isActivated === 'experience')) || (isActivated === id)
                                ? isDarkMode 
                                    ? 'bg-[#00BD95]/20 text-[#00BD95] border border-[#00BD95]/50 shadow-lg shadow-[#00BD95]/20' 
                                    : 'bg-[#00BD95]/10 text-[#00BD95] border border-[#00BD95]/30 shadow-lg shadow-[#00BD95]/10'
                                : isDarkMode 
                                    ? 'text-slate-400 hover:text-white border border-slate-700/50 hover:border-[#00BD95]/50 hover:bg-slate-800/50' 
                                    : 'text-slate-600 hover:text-black border border-slate-300/50 hover:border-[#00BD95]/50 hover:bg-slate-100/50'
                            }
                        `}
                        onClick={() => {
                            scrollToSection(target);
                        }}
                    >
                        {/* Active indicator line */}
                        {((id === 'education' && (isActivated === 'education' || isActivated === 'experience')) || (isActivated === id)) && (
                            <div className="absolute bottom-0 left-0 h-1 w-full bg-gradient-to-r from-[#00BD95] to-cyan-500"></div>
                        )}
                        
                        {/* Bracket style */}
                        <span className={`hidden lg:inline ${(id === 'education' && (isActivated === 'education' || isActivated === 'experience')) || (isActivated === id) ? 'text-[#00BD95]' : isDarkMode ? 'text-slate-500' : 'text-slate-400'}`}>{'{'}</span>
                        <span className="flex items-center gap-1">
                            <span className="opacity-70 text-sm lg:text-base">{icon}</span>
                            <span className="hidden md:inline">{label}</span>
                        </span>
                        <span className={`hidden lg:inline ${(id === 'education' && (isActivated === 'education' || isActivated === 'experience')) || (isActivated === id) ? 'text-cyan-400' : isDarkMode ? 'text-slate-500' : 'text-slate-400'}`}>{'}'}</span>
                    </button>
                ))}
            </nav>

            {/* Actions: Language & Dark Mode - Show on medium screens and above */}
            <div className="hidden md:flex items-center gap-2 lg:gap-3 flex-shrink-0">
                {/* Language Switcher - Dev Style */}
                <div className={`flex items-center gap-0 p-1 rounded-lg border font-mono text-[10px] lg:text-xs font-bold ${isDarkMode ? 'bg-slate-900/50 border-slate-700/50' : 'bg-slate-50/50 border-slate-300/50'}`}>
                    <button
                        onClick={() => {
                            localStorage.setItem('lang', 'en');
                            setActiveLang('en');
                            i18n?.changeLanguage('en');
                        }}
                        className={`px-2 lg:px-3 py-1.5 lg:py-2 rounded-md transition-all duration-200 relative
                            ${activeLang === 'en' 
                                ? isDarkMode
                                    ? 'bg-[#00BD95]/20 text-[#00BD95] border border-[#00BD95]/50 shadow-lg shadow-[#00BD95]/20'
                                    : 'bg-[#00BD95]/10 text-[#00BD95] border border-[#00BD95]/30 shadow-lg shadow-[#00BD95]/10'
                                : isDarkMode 
                                    ? 'text-slate-400 hover:text-white' 
                                    : 'text-slate-600 hover:text-black'
                            }
                        `}
                    >
                        <span className="hidden sm:inline">&lt;</span>EN<span className="hidden sm:inline">&gt;</span>
                    </button>
                    <div className={`w-px h-4 lg:h-6 ${isDarkMode ? 'bg-slate-700/50' : 'bg-slate-300/50'}`}></div>
                    <button
                        onClick={() => {
                            localStorage.setItem('lang', 'fr');
                            setActiveLang('fr');
                            i18n?.changeLanguage('fr');
                        }}
                        className={`px-2 lg:px-3 py-1.5 lg:py-2 rounded-md transition-all duration-200 relative
                            ${activeLang === 'fr' 
                                ? isDarkMode
                                    ? 'bg-[#00BD95]/20 text-[#00BD95] border border-[#00BD95]/50 shadow-lg shadow-[#00BD95]/20'
                                    : 'bg-[#00BD95]/10 text-[#00BD95] border border-[#00BD95]/30 shadow-lg shadow-[#00BD95]/10'
                                : isDarkMode 
                                    ? 'text-slate-400 hover:text-white' 
                                    : 'text-slate-600 hover:text-black'
                            }
                        `}
                    >
                        <span className="hidden sm:inline">&lt;</span>FR<span className="hidden sm:inline">&gt;</span>
                    </button>
                </div>

                {/* Dark Mode Toggle - Dev Style */}
                <button
                    onClick={() => {
                        setIsDarkMode(!isDarkMode);
                        localStorage.setItem('darkmode', isDarkMode ? 'false' : 'true');
                    }}
                    className={`p-2 lg:p-2.5 rounded-lg transition-all duration-300 border font-mono text-xs lg:text-sm font-bold
                        ${isDarkMode 
                            ? 'bg-slate-900/50 border-slate-700/50 text-yellow-400 hover:border-[#00BD95]/50 hover:bg-[#00BD95]/10 hover:text-[#00BD95]' 
                            : 'bg-slate-50/50 border-slate-300/50 text-slate-700 hover:border-[#00BD95]/50 hover:bg-[#00BD95]/10 hover:text-[#00BD95]'
                        }
                    `}
                    aria-label="Toggle dark mode"
                >
                    <span>{isDarkMode ? '☀️' : '🌙'}</span>
                </button>
            </div>

            {/* Mobile Menu Button - Dev Style Navigation Menu */}
            <button 
                className={`md:hidden p-2 sm:p-2.5 rounded-lg transition-all duration-300 flex-shrink-0 border font-mono font-bold text-sm
                    ${showMenu
                        ? isDarkMode
                            ? 'bg-[#00BD95]/20 text-[#00BD95] border-[#00BD95]/50'
                            : 'bg-[#00BD95]/10 text-[#00BD95] border-[#00BD95]/30'
                        : isDarkMode
                            ? 'border-slate-700/50 text-slate-400 hover:border-[#00BD95]/50 hover:bg-[#00BD95]/10 hover:text-[#00BD95]'
                            : 'border-slate-300/50 text-slate-600 hover:border-[#00BD95]/50 hover:bg-[#00BD95]/10 hover:text-[#00BD95]'
                    }
                `}
                onClick={() => setShowMenu(!showMenu)}
                aria-label="Toggle navigation menu"
                title="Navigation Menu"
            >
                <span className="flex items-center gap-1 tracking-tight">
                    {showMenu ? (
                        <>
                            <span>&lt;</span>
                            <span className={`transition-opacity duration-300 ${showMenu ? 'opacity-100' : 'opacity-0'}`}>/</span>
                            <span>&gt;</span>
                        </>
                    ) : (
                        <>
                            <span>&lt;</span>
                            <span className={`transition-opacity duration-300 ${!showMenu ? 'opacity-100' : 'opacity-0'}`}>≡</span>
                            <span>&gt;</span>
                        </>
                    )}
                </span>
            </button>

            {/* Mobile Menu Overlay - Only on small devices */}
            {showMenu && (
                <div 
                    className="fixed inset-0 bg-black/50 backdrop-blur-sm md:hidden z-40"
                    onClick={() => setShowMenu(false)}
                />
            )}

            {/* Mobile Menu Panel - Only on small devices */}
            <div
                ref={menuRef}
                className={`fixed top-0 right-0 h-screen w-[75vw] sm:w-[280px] md:hidden transform transition-transform duration-300 ease-in-out z-50
                    ${showMenu ? 'translate-x-0' : 'translate-x-full'}
                    ${isDarkMode ? 'bg-[#21272F] border-l border-slate-700' : 'bg-white border-l border-gray-200'}
                `}
            >
                <div className="flex flex-col h-full p-4 sm:p-6">
                    {/* Mobile Menu Header */}
                    <div className="flex items-center justify-between mb-6 sm:mb-8 pb-3 sm:pb-4 border-b border-slate-700/50">
                        <h2 className={`text-base sm:text-lg font-bold ${isDarkMode ? 'text-white' : 'text-black'}`}>
                            Menu
                        </h2>
                        <button 
                            onClick={() => setShowMenu(false)}
                            className={`p-2 rounded-lg border font-mono font-bold text-sm transition-all duration-300
                                ${isDarkMode 
                                    ? 'border-slate-700/50 text-slate-400 hover:border-[#00BD95]/50 hover:bg-[#00BD95]/10 hover:text-[#00BD95]' 
                                    : 'border-slate-300/50 text-slate-600 hover:border-[#00BD95]/50 hover:bg-[#00BD95]/10 hover:text-[#00BD95]'
                                }
                            `}
                            title="Close menu"
                        >
                            <span className="flex items-center gap-1 tracking-tight">
                                <span>&lt;</span>
                                <span>/</span>
                                <span>&gt;</span>
                            </span>
                        </button>
                    </div>

                    {/* Mobile Navigation Links */}
                    <nav className="flex-1 flex flex-col gap-1 sm:gap-2">
                        {sectionButtons.map(({ id, label, target, icon }) => (
                            <button
                                key={id}
                                className={`relative group flex items-center gap-2 sm:gap-3 px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg text-left text-xs sm:text-sm transition-all duration-200 font-mono font-medium overflow-hidden
                                    ${(id === 'education' && (isActivated === 'education' || isActivated === 'experience')) || (isActivated === id)
                                        ? isDarkMode 
                                            ? 'bg-[#00BD95]/20 text-[#00BD95] border border-[#00BD95]/50 shadow-lg shadow-[#00BD95]/20' 
                                            : 'bg-[#00BD95]/10 text-[#00BD95] border border-[#00BD95]/30 shadow-lg shadow-[#00BD95]/10'
                                        : isDarkMode 
                                            ? 'text-slate-300 hover:text-white border border-slate-700/50 hover:border-[#00BD95]/50 hover:bg-slate-800/50' 
                                            : 'text-slate-600 hover:text-black border border-slate-300/50 hover:border-[#00BD95]/50 hover:bg-slate-100/50'
                                    }
                                `}
                                onClick={() => {
                                    scrollToSection(target);
                                    setShowMenu(false);
                                }}
                            >
                                {/* Active indicator line */}
                                {((id === 'education' && (isActivated === 'education' || isActivated === 'experience')) || (isActivated === id)) && (
                                    <div className="absolute bottom-0 left-0 h-1 w-full bg-gradient-to-r from-[#00BD95] to-cyan-500"></div>
                                )}
                                
                                {/* Bracket style */}
                                <span className={`hidden sm:inline text-xs ${(id === 'education' && (isActivated === 'education' || isActivated === 'experience')) || (isActivated === id) ? 'text-[#00BD95]' : isDarkMode ? 'text-slate-500' : 'text-slate-400'}`}>{'{'}</span>
                                <span className="flex items-center gap-1 sm:gap-2">
                                    <span className="text-sm sm:text-base opacity-70">{icon}</span>
                                    <span className="font-medium">{label}</span>
                                </span>
                                <span className={`hidden sm:inline text-xs ${(id === 'education' && (isActivated === 'education' || isActivated === 'experience')) || (isActivated === id) ? 'text-cyan-400' : isDarkMode ? 'text-slate-500' : 'text-slate-400'}`}>{'}'}</span>
                            </button>
                        ))}
                    </nav>

                    {/* Mobile Menu Footer */}
                    <div className={`pt-4 sm:pt-6 pb-24 sm:pb-32 border-t ${isDarkMode ? 'border-slate-700' : 'border-gray-200'}`}>
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
                                    className={`flex-1 px-3 py-2 rounded-md text-xs font-mono font-bold transition-all
                                        ${activeLang === 'en' 
                                            ? 'bg-[#00BD95] text-white' 
                                            : isDarkMode 
                                                ? 'text-slate-400' 
                                                : 'text-slate-600'
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
                                    className={`flex-1 px-3 py-2 rounded-md text-xs font-mono font-bold transition-all
                                        ${activeLang === 'fr' 
                                            ? 'bg-[#00BD95] text-white' 
                                            : isDarkMode 
                                                ? 'text-slate-400' 
                                                : 'text-slate-600'
                                        }
                                    `}
                                >
                                    FR
                                </button>
                            </div>
                        </div>

                        {/* Dark Mode Toggle */}
                        <button
                            onClick={() => {
                                setIsDarkMode(!isDarkMode);
                                localStorage.setItem('darkmode', isDarkMode ? 'false' : 'true');
                                setShowMenu(false);
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
