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

    

    const sectionButtons = React.useMemo(() => [
        { id: 'about', label: t('About'), target: '#about' },
        { id: 'projects', label: t('Projects'), target: '#projects' },
        { id: 'education', label: t('Education'), target: '#education' },
        { id: 'skills', label: t('Skills'), target: '#skills' },
        { id: 'contact', label: t('Contact'), target: '#contact' },
    ], [t]);

    // Intersection Observer for tracking sections (observe known section ids)
    useEffect(() => {
        // build selector for known sections only (avoids observing unrelated ids)
        const selector = sectionButtons.map((s) => `#${s.id}`).join(',');
        if (!selector) return;
        const sections = document.querySelectorAll(selector);
        if (!sections || sections.length === 0) return;

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setIsActivated(entry.target.id);
                    }
                });
            },
            {
                // account for the fixed header height so section headings are considered in-view
                rootMargin: '-80px 0px -40% 0px',
                threshold: 0.35,
            }
        );

        sections.forEach((section) => observer.observe(section));

        return () => {
            sections.forEach((section) => observer.unobserve(section));
            observer.disconnect();
        };
    }, [sectionButtons, setIsActivated]);

    // Also track focus changes: when a focusable element inside a section receives focus,
    // mark that section as active so keyboard users see the correct nav highlight.
    useEffect(() => {
        const onFocusIn = (e: FocusEvent) => {
            const target = e.target as HTMLElement | null;
            if (!target) return;
            const section = target.closest('[id]') as HTMLElement | null;
            if (section && section.id) {
                // Only activate known sections (avoids activating unrelated ids)
                const known = sectionButtons.some((s) => s.id === section.id);
                if (known) setIsActivated(section.id);
            }
        };

        document.addEventListener('focusin', onFocusIn);
        return () => document.removeEventListener('focusin', onFocusIn);
    }, [sectionButtons]);

    return (
        <header className={`fixed top-0 left-0 right-0 z-50 backdrop-blur-md border-b ${isDarkMode ? 'bg-[#0b1220]/60 text-white border-[#111827]/30' : 'bg-white/70 text-black border-gray-200/60'}`}>
            <div className="max-w-6xl mx-auto px-4 md:px-6 lg:px-8">
                <div className="flex items-center h-[64px] md:h-[80px] justify-between">
                    {/* Brand / Logo */}
                    <div className="flex items-center gap-3">
                        <h1 className="text-lg md:text-2xl font-extrabold tracking-tight select-none bg-gradient-to-r from-green-400 to-blue-500 text-transparent bg-clip-text">
                            Ab.En-neiymy
                        </h1>
                        <span className="text-xs text-muted-foreground hidden md:block">{t('Full Stack Developer')}</span>
                    </div>

                    {/* Center Navigation (desktop) */}
                    <nav aria-label="Primary" className="hidden sm:flex items-center gap-6">
                        {sectionButtons.map(({ id, label, target }) => (
                            <div key={id} className="flex flex-col items-center">
                                <button
                                    onClick={() => {
                                        scrollToSection(target);
                                        setIsActivated(id);
                                    }}
                                    className={`px-2 py-1 text-sm md:text-base font-medium transition-colors focus:outline-none ${isActivated === id ? 'text-[#00BD95]' : isDarkMode ? 'text-white/90' : 'text-black/85'}`}
                                    aria-current={isActivated === id ? 'page' : undefined}
                                >
                                    {label}
                                </button>
                                <div className={`h-1 mt-1 rounded-full w-full transition-all duration-300 ${isActivated === id ? 'bg-[#00BD95]' : 'bg-transparent'}`} />
                            </div>
                        ))}
                    </nav>

                    {/* Actions (lang + theme + mobile toggle) */}
                    <div className="flex items-center gap-4">
                        <div className="hidden sm:flex items-center gap-3">
                            <button
                                onClick={() => {
                                    const newLang = activeLang === 'en' ? 'fr' : 'en';
                                    localStorage.setItem('lang', newLang);
                                    setActiveLang(newLang);
                                    i18n?.changeLanguage(newLang);
                                }}
                                className="px-2 py-1 rounded text-sm font-semibold bg-transparent border border-transparent hover:border-gray-200/30 transition"
                                aria-label="Toggle language"
                            >
                                {activeLang === 'en' ? 'FR' : 'EN'}
                            </button>
                            <button
                                onClick={() => {
                                    setIsDarkMode(!isDarkMode);
                                    localStorage.setItem('darkmode', isDarkMode ? 'false' : 'true');
                                }}
                                className="p-1 rounded focus:ring-2 focus:ring-offset-2"
                                aria-label="Toggle theme"
                            >
                                {isDarkMode ? <MdOutlineLightMode size={22} /> : <MdDarkMode size={22} />}
                            </button>
                        </div>

                        {/* Mobile menu toggle */}
                        <button
                            onClick={() => setShowMenu(!showMenu)}
                            className="sm:hidden p-2 rounded focus:ring-2"
                            aria-label="Open menu"
                            aria-expanded={showMenu}
                        >
                            {showMenu ? <MdOutlineMenuOpen size={26} /> : <IoMdMenu size={26} />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile slide-over menu */}
            <div
                ref={menuRef}
                className={`fixed top-0 right-0 h-screen w-full sm:hidden transform ${showMenu ? 'translate-x-0' : 'translate-x-full'} transition-transform duration-300 ${isDarkMode ? 'bg-[#0b1220] text-white' : 'bg-white text-black'}`}
            >
                <div className="flex flex-col h-full p-6">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-xl font-bold">Menu</h2>
                        <button onClick={() => setShowMenu(false)} aria-label="Close menu" className="p-1">
                            <MdOutlineMenuOpen size={26} />
                        </button>
                    </div>

                    <div className="flex flex-col gap-4">
                        {sectionButtons.map(({ id, label, target }) => (
                            <button
                                key={id}
                                onClick={() => {
                                    scrollToSection(target);
                                    setIsActivated(id);
                                    setShowMenu(false);
                                }}
                                className={`text-lg text-left py-2 ${isActivated === id ? 'text-[#00BD95]' : ''}`}
                            >
                                {label}
                            </button>
                        ))}
                    </div>

                    <div className="mt-auto flex items-center justify-between">
                        <button
                            onClick={() => {
                                const newLang = activeLang === 'en' ? 'fr' : 'en';
                                localStorage.setItem('lang', newLang);
                                setActiveLang(newLang);
                                i18n?.changeLanguage(newLang);
                                setShowMenu(false);
                            }}
                            className="text-base"
                        >
                            {activeLang === 'en' ? 'FR' : 'EN'}
                        </button>
                        <button
                            onClick={() => {
                                setIsDarkMode(!isDarkMode);
                                localStorage.setItem('darkmode', isDarkMode ? 'false' : 'true');
                                setShowMenu(false);
                            }}
                            className="p-1"
                        >
                            {isDarkMode ? <MdOutlineLightMode size={22} /> : <MdDarkMode size={22} />}
                        </button>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;
