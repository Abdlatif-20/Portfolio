'use client';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import Typewriter from 'typewriter-effect/dist/core';
import { useDarkMode } from './context';
import { FaGithub, FaLinkedin, FaEnvelope, FaDownload, FaCode, FaReact, FaServer, FaNode, FaGit, FaDocker, FaTerminal, FaTimes, FaMinus, FaExpand } from 'react-icons/fa';
import { SiNextdotjs, SiTailwindcss, SiTypescript, SiPostgresql } from 'react-icons/si';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import Image from 'next/image';
const About = ({ showResumeModal, setShowResumeModal }: { showResumeModal: boolean; setShowResumeModal: (show: boolean) => void }) => {
  const { t } = useTranslation();
  const { isDarkMode } = useDarkMode();
  const [mounted, setMounted] = useState(false);
  const { ref, isVisible } = useScrollAnimation(0.1);
  const [autoScroll, setAutoScroll] = useState(true);
  const [isPaused, setIsPaused] = useState(false);
  const [projectCount, setProjectCount] = useState(0);
  const [yearsCount, setYearsCount] = useState(0);
  const [techCount, setTechCount] = useState(0);
  const [showTerminal, setShowTerminal] = useState(false);
  const [isTerminalMinimized, setIsTerminalMinimized] = useState(false);
  const [isTerminalMaximized, setIsTerminalMaximized] = useState(false);
  const [isTerminalFloating, setIsTerminalFloating] = useState(false);
  const [terminalInput, setTerminalInput] = useState('');
  const [terminalHistory, setTerminalHistory] = useState<string[]>([]);

  // Initialize terminal history with translations
  useEffect(() => {
    setTerminalHistory([
      ` ${t('Welcome to My Terminal')}`,
      '',
      t('Hello! I\'m Abdellatyf En-Neiymy'),
      t('This is an interactive terminal where you can learn more about me.'),
      '',
      t('Type help to see available commands or just explore around!'),
      ''
    ]);
  }, [t]);
  const techScrollRef = React.useRef<HTMLDivElement>(null);
  const scrollIntervalRef = React.useRef<NodeJS.Timeout | null>(null);
  const scrollAmountRef = React.useRef(0);
  const terminalContentRef = React.useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
    // Defer typewriter animation to improve LCP
    const timer = setTimeout(() => {
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
    }, 300); // Delay by 300ms to prioritize other content
    
    return () => clearTimeout(timer);
  }, [t]);

  // Auto-count animation for stats
  useEffect(() => {
    if (!isVisible) return;

    const animationDuration = 1500; // 1.5 seconds
    const startTime = Date.now();

    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / animationDuration, 1);

      setProjectCount(Math.floor(progress * 7));
      setYearsCount(Math.floor(progress * 3));
      setTechCount(Math.floor(progress * 10));

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    animate();
  }, [isVisible]);

  // Optimized auto-scroll tech stack
  useEffect(() => {
    if (!autoScroll || !techScrollRef.current || isPaused) return;

    const scrollContainer = techScrollRef.current;
    const scrollSpeed = 1; // pixels per frame - optimized
    const maxScroll = scrollContainer.scrollWidth - scrollContainer.clientWidth;

    // Only auto-scroll if there's content to scroll
    if (maxScroll <= 0) return;

    // Clear existing interval
    if (scrollIntervalRef.current) {
      clearInterval(scrollIntervalRef.current);
    }

    scrollIntervalRef.current = setInterval(() => {
      if (scrollContainer) {
        scrollAmountRef.current += scrollSpeed;
        
        // Reset to start when reaching the end with smooth transition
        if (scrollAmountRef.current >= maxScroll) {
          scrollAmountRef.current = 0;
        }
        
        scrollContainer.scrollLeft = scrollAmountRef.current;
      }
    }, 50); // Optimized interval for smoother scrolling

    return () => {
      if (scrollIntervalRef.current) {
        clearInterval(scrollIntervalRef.current);
      }
    };
  }, [autoScroll, isPaused]);

  // Scroll terminal to top when opened
  useEffect(() => {
    if (showTerminal && terminalContentRef.current) {
      setTimeout(() => {
        if (terminalContentRef.current) {
          terminalContentRef.current.scrollTop = 0;
        }
      }, 0);
    }
  }, [showTerminal]);

  // Scroll terminal to bottom when new message is added
  useEffect(() => {
    if (terminalContentRef.current) {
      setTimeout(() => {
        if (terminalContentRef.current) {
          terminalContentRef.current.scrollTop = 0;
        }
      }, 0);
    }
  }, [terminalHistory]);

  const socialLinks = [
    { icon: <FaGithub size={24} />, href: "https://github.com/Abdlatif-20", label: "GitHub" },
    { icon: <FaLinkedin size={24} />, href: "https://www.linkedin.com/in/aben-nei/", label: "LinkedIn" },
    { icon: <FaEnvelope size={24} />, href: "mailto:ab.enneiymy@gmail.com", label: "Email" },
  ];

  const handleTerminalCommand = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key !== 'Enter') return;
    
    const command = terminalInput.trim().toLowerCase();
    const newHistory = [...terminalHistory, `$ ${terminalInput}`];
    
    let response = '';
    
    switch(command) {
      case 'help':
        response = `${t('Available commands:')}
  about - ${t('Show about me')}
  education - ${t('Show education background')}
  skills - ${t('List my skills')}
  contact - ${t('Show contact information')}
  projects - ${t('List recent projects')}
  open to work - ${t('Show my availability')}
  clear - ${t('Clear the terminal')}
  exit - ${t('Close the terminal')}`;
        break;
      case 'about':
        response = t('I am Abdellatyf En-Neiymy, a Front-End Developer specializing in building responsive and user-friendly web applications using React, Next.js, and Tailwind CSS.');
        break;
      case 'education':
        response = t('I\'m Currently Studying Software Engineering at 1337 School in Khouribga, Morocco. I have completed various courses and projects that have strengthened my skills in web development and programming.');
        break;
      case 'skills':
        response = `${t('My Skills in Front-End Development:')}
- React
- Next.js
- TypeScript
- Tailwind CSS
- JavaScript
- HTML & CSS

${t('And also familiar with Back-End basics:')}
- Django
- PostgreSQL
- Git & GitHub
- Docker`;
        break;
      case 'contact':
        response = t('You can reach me at Email: ab.enneiymy@gmail.com | GitHub: github.com/Abdlatif-20 | LinkedIn: linkedin.com/in/aben-nei/ | Whatsapp: +212777191684');
        break;
      case 'projects':
        response = `${t('Recent Projects:')}
1. ${t('Portfolio Website - A personal portfolio built with Next.js and Tailwind CSS.')}
2. ${t('PongGame - A classic pong game using Nextjs and TypeScript in front end and Django in back end.')}
3. ${t('HR Stats for Employees - An HR management dashboard built with React and Chart.js.')}
${t('You can find more on my Projects section')}`;
        break;
      case 'open to work':
        response = t('I am currently open to full-time, part-time, and freelance opportunities. Feel free to contact me for collaborations or job offers!');
        break;
      case 'exit':
        resetTerminal();
        return;
      case 'clear':
        setTerminalHistory([`$ ${t('Terminal cleared')}`]);
        setTerminalInput('');
        return;
      default:
        response = command ? `${t('Command not found. Type help for available commands.')}` : '';
    }
    
    if (response) {
      newHistory.push(response);
    }
    
    setTerminalHistory(newHistory);
    setTerminalInput('');
  };

  const resetTerminal = () => {
    setShowTerminal(false);
    setIsTerminalMinimized(false);
    setIsTerminalMaximized(false);
    setIsTerminalFloating(false);
    setTerminalHistory([
      ` ${t('Welcome to My Terminal')}`,
      '',
      t('Hello! I\'m Abdellatyf En-Neiymy'),
      t('This is an interactive terminal where you can learn more about me.'),
      '',
      t('Type help to see available commands or just explore around!'),
      ''
    ]);
    setTerminalInput('');
  };

  const techIcons = [
    { icon: <FaReact size={32} />, name: "React" },
    { icon: <SiNextdotjs size={32} />, name: "Next.js" },
    { icon: <SiTypescript size={32} />, name: "TypeScript" },
    { icon: <SiTailwindcss size={32} />, name: "Tailwind" },
  ];

  return (
    <section ref={ref as React.RefObject<HTMLElement>} id="about" className={`relative flex flex-col justify-center items-center w-full px-4 py-16 sm:py-20 lg:py-32 overflow-hidden transition-all duration-1000 ${
      isDarkMode ? 'bg-[#21272F]' : 'bg-white'
    } ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}`}>
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className={`absolute top-20 left-10 w-72 h-72 rounded-full blur-3xl opacity-20 ${
          isDarkMode ? 'bg-[#00BD95]' : 'bg-cyan-400'
        }`} />
        <div className={`absolute bottom-20 right-10 w-96 h-96 rounded-full blur-3xl opacity-20 ${
          isDarkMode ? 'bg-blue-600' : 'bg-blue-400'
        }`} />
      </div>

      <div className="relative z-10 flex flex-col lg:flex-row justify-between items-start w-full max-w-6xl mx-auto gap-12 lg:gap-20">
        {/* Left Content */}
        <div className={`flex flex-col order-2 lg:order-1 justify-start items-center lg:items-start w-full lg:w-[55%] transition-all duration-700 delay-200 ${
          isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-20'
        }`}>
          {/* Badge */}
          <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6 ${
            isDarkMode ? 'bg-[#00BD95]/10 border border-[#00BD95]/30' : 'bg-[#00BD95]/10 border border-[#00BD95]/30'
          }`}>
            <span className="w-2 h-2 bg-[#00BD95] rounded-full animate-pulse" />
            <span className={`text-sm font-medium ${isDarkMode ? 'text-[#00BD95]' : 'text-[#00BD95]'}`}>
              {t("Availability")}: {t("Open to full-time, part-time and freelance opportunities")}
            </span>
          </div>
          {/* Greeting */}
          <div className="mb-2">
            <h1 className={`text-3xl lg:text-3xl font-mono font-bold mb-0 ${
              isDarkMode ? 'text-white' : 'text-slate-900'
            }`}>
              <span className={isDarkMode ? 'text-blue-400' : 'text-blue-600'}>function</span> <span className={isDarkMode ? 'text-cyan-300' : 'text-cyan-600'}>hello</span><span className={isDarkMode ? 'text-slate-400' : 'text-slate-500'}>()</span> <span className={isDarkMode ? 'text-orange-400' : 'text-orange-500'}>{`{`}</span>
            </h1>
          </div>
          {/* Typewriter Name */}
          <div className="h-16 mb-2">
            <p className="text-2xl lg:text-4xl font-mono font-bold" id="text_name" style={{
              background: 'linear-gradient(135deg, #0066ff, #00BD95)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              color: 'transparent'
            }}></p>
          </div>
          {/* Closing bracket */}
          <div className="mb-4">
            <h2 className={`text-4xl lg:text-4xl font-mono font-bold ${
              isDarkMode ? 'text-orange-400' : 'text-orange-500'
            }`}>
              <span className={isDarkMode ? 'text-slate-400' : 'text-slate-500'}>/</span><span className={isDarkMode ? 'text-orange-400' : 'text-orange-500'}>{`}`}</span>
            </h2>
            
          </div>
          {/* Description */}
          <div className={`text-base lg:text-lg leading-relaxed mb-8 max-w-2xl p-4 lg:p-6 rounded-lg font-mono border-l-4 ${
            isDarkMode 
              ? 'bg-slate-900/40 border-l-[#00BD95] text-slate-200 shadow-lg shadow-[#00BD95]/10' 
              : 'bg-slate-50 border-l-cyan-500 text-slate-700 shadow-lg shadow-cyan-500/10'
          }`}>
            <div className="space-y-2">
              <div className="text-[#00BD95] text-sm lg:text-base">
                <span className={isDarkMode ? 'text-blue-400' : 'text-blue-600'}>const</span> <span className={isDarkMode ? 'text-purple-300' : 'text-purple-600'}>aboutMe</span> <span className={isDarkMode ? 'text-slate-400' : 'text-slate-500'}>=</span> <span className={isDarkMode ? 'text-orange-400' : 'text-orange-500'}>{`{`}</span>
              </div>
              <div className="text-sm lg:text-base ml-4 space-y-1">
                <div>
                  <span className={isDarkMode ? 'text-slate-400' : 'text-slate-500'}>// </span>
                  <span className={isDarkMode ? 'text-green-400' : 'text-green-600'}>{t('I\'m a passionate Front-End Developer')}</span>
                </div>
                <div>
                  <span className={isDarkMode ? 'text-slate-400' : 'text-slate-500'}>// </span>
                  <span className={isDarkMode ? 'text-green-400' : 'text-green-600'}>{t('Building elegant, performant web experiences')}</span>
                </div>
                <div>
                  <span className={isDarkMode ? 'text-slate-400' : 'text-slate-500'}>// </span>
                  <span className={isDarkMode ? 'text-green-400' : 'text-green-600'}>{t('with React, Next.js & Tailwind CSS')}</span>
                </div>
                <div>
                  <span className={isDarkMode ? 'text-slate-400' : 'text-slate-500'}>// </span>
                  <span className={isDarkMode ? 'text-green-400' : 'text-green-600'}>{t('Transforming ideas into intuitive UX/UI')}</span>
                </div>
              </div>
              <div className="text-[#00BD95] text-sm lg:text-base">
                <span className={isDarkMode ? 'text-orange-400' : 'text-orange-500'}>{`}`}</span><span className={isDarkMode ? 'text-slate-400' : 'text-slate-500'}>;</span>
              </div>
            </div>
          </div>
          {/* Quick Stats */}
          <div className="grid grid-cols-3 gap-4 w-full max-w-md mb-8">
            <div className={`text-center p-4 rounded-xl ${
              isDarkMode ? 'bg-slate-800/50' : 'bg-slate-100'
            }`}>
              <div className="text-2xl font-bold text-[#00BD95]">{projectCount}+</div>
              <div className={`text-xs ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>{t("Projects")}</div>
            </div>
            <div className={`text-center p-4 rounded-xl ${
              isDarkMode ? 'bg-slate-800/50' : 'bg-slate-100'
            }`}>
              <div className="text-2xl font-bold text-[#00BD95]">{yearsCount}+</div>
              <div className={`text-xs ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>{t("Years")}</div>
            </div>
            <div className={`text-center p-4 rounded-xl ${
              isDarkMode ? 'bg-slate-800/50' : 'bg-slate-100'
            }`}>
              <div className="text-2xl font-bold text-[#00BD95]">{techCount}+</div>
              <div className={`text-xs ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>{t("Technologies")}</div>
            </div>
          </div>
          {/* CTAs */}
          <div className="flex flex-wrap gap-4 mb-8">
            <button
              onClick={() => setShowResumeModal(true)}
              className="group relative px-6 py-3 rounded-lg font-semibold text-white bg-gradient-to-r from-[#00BD95] to-cyan-600 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 overflow-hidden"
            >
              <span className="relative z-10 flex items-center gap-2">
                <FaDownload size={18} />
                {t("My Resume")}
              </span>
              <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
            </button>
            <button
              onClick={() => setShowTerminal(!showTerminal)}
              className={`group relative px-6 py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 flex items-center gap-2 ${
                isDarkMode 
                  ? 'bg-slate-800 text-white hover:bg-slate-700 border border-[#00BD95]/30' 
                  : 'bg-slate-100 text-slate-900 hover:bg-slate-200 border border-[#00BD95]/30'
              }`}
            >
              <FaTerminal size={18} />
              {t('Terminal')}
            </button>
            <a
              href="#contact"
              className={`px-6 py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 ${
                isDarkMode 
                  ? 'bg-slate-800 text-white hover:bg-slate-700' 
                  : 'bg-slate-100 text-slate-900 hover:bg-slate-200'
              }`}
            >
              {t("Contact me")}
            </a>
          </div>
          {/* Social Links */}
          <div className="flex gap-4 relative">
            {socialLinks.map((social, index) => (
              <a
                key={index}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.label}
                className={`p-3 rounded-full transition-all duration-300 transform hover:scale-110 hover:-translate-y-1 ${
                  isDarkMode 
                    ? 'bg-slate-800 text-slate-300 hover:bg-[#00BD95] hover:text-white' 
                    : 'bg-slate-100 text-slate-700 hover:bg-[#00BD95] hover:text-white'
                }`}>
                {social.icon}
              </a>
            ))}
            
            {/* Floating Terminal Icon */}
            {isTerminalFloating && (
              <button
                onClick={() => {
                  setShowTerminal(true);
                  setIsTerminalFloating(false);
                }}
                className={`p-3 rounded-full transition-all duration-300 transform hover:scale-110 hover:-translate-y-1 animate-bounce ${
                  isDarkMode 
                    ? 'bg-slate-800 text-slate-300 hover:bg-[#00BD95] hover:text-white' 
                    : 'bg-slate-100 text-slate-700 hover:bg-[#00BD95] hover:text-white'
                }`}
                title={t('Click to open terminal')}
              >
                <FaTerminal size={24} />
              </button>
            )}
          </div>
        </div>
        {/* Right Content - Image & Tech Stack */}
        <div className={`order-1 lg:order-2 w-full mt-12 lg:mt-20 lg:w-[45%] flex flex-col items-center gap-8 transition-all duration-700 delay-400 ${
          isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-20'
        }`}>
          {/* Profile Image with Enhanced Design */}
          <div className="relative group">
            {/* Animated background rings */}
            <div className="absolute -inset-4 rounded-full opacity-75 blur-2xl group-hover:opacity-100 transition-opacity duration-500"
              style={{
                background: isDarkMode
                  ? 'conic-gradient(from 0deg, #00BD95, #06b6d4, #3b82f6, #8b5cf6, #00BD95)'
                  : 'conic-gradient(from 0deg, #00BD95, #06b6d4, #0066ff, #8b5cf6, #00BD95)',
                animation: 'spin 8s linear infinite',
              }}
            />
            
            {/* Main image container */}
            <div className={`relative rounded-full p-2 ${
              isDarkMode ? 'bg-[#21272F]' : 'bg-white'
            } shadow-2xl`}>
              <div className="relative w-64 h-64 md:w-80 md:h-80 lg:w-96 lg:h-96 rounded-full overflow-hidden border-4 border-[#00BD95]/30">
                <Image
                  src="/images/mee.webp"
                  alt="Abdellatyf En-neiymy"
                  layout="fill"
                  objectFit="cover"
                  priority={true}
                  quality={85}
                  className="transform group-hover:scale-110 transition-transform duration-500"
                />
              </div>
            </div>

            {/* Floating tech icons */}
            {techIcons.map((tech, index) => (
              <div
                key={index}
                className={`absolute ${
                  index === 0 ? 'top-0 left-0' :
                  index === 1 ? 'top-0 right-0' :
                  index === 2 ? 'bottom-0 left-0' :
                  'bottom-0 right-0'
                } p-3 rounded-full shadow-lg ${
                  isDarkMode ? 'bg-slate-800 text-[#00BD95]' : 'bg-white text-[#00BD95]'
                } transform hover:scale-110 transition-all duration-300 cursor-pointer`}
                style={{
                  animation: `float ${3 + index * 0.5}s ease-in-out infinite`,
                  animationDelay: `${index * 0.2}s`
                }}
                title={tech.name}
              >
                {tech.icon}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Interactive Terminal Modal */}
      {showTerminal && (
        <div 
          className={`fixed inset-0 z-[9998] flex items-center justify-center ${
            isTerminalMaximized ? 'bg-black' : 'bg-black/50 backdrop-blur-sm'
          }`}
          onClick={() => !isTerminalMaximized && setShowTerminal(false)}
        >
          <div 
            className={`transform transition-all ${
              isTerminalMinimized 
                ? 'w-[95vw] md:w-[300px] h-[50px] rounded-lg' 
                : isTerminalMaximized 
                ? 'w-screen h-screen rounded-none' 
                : 'w-[95vw] md:w-[80vw] lg:w-[600px] h-[500px] rounded-lg'
            } shadow-2xl flex flex-col overflow-hidden ${
              isDarkMode ? 'bg-slate-900 border border-slate-700' : 'bg-white border border-slate-200'
            } ${isTerminalMaximized ? 'border-none' : ''}`}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Terminal Header */}
            <div className={`px-4 py-3 flex items-center justify-between border-b ${
              isDarkMode ? 'bg-slate-800 border-slate-700' : 'bg-slate-50 border-slate-200'
            }`}>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => resetTerminal()}
                  className="w-4 h-4 rounded-full bg-red-500 hover:bg-red-600 transition-colors flex items-center justify-center group"
                  title={t('Close')}
                >
                  <FaTimes size={8} className="text-white group-hover:scale-110 transition-transform" />
                </button>
                <button
                  onClick={() => {
                    setIsTerminalFloating(!isTerminalFloating);
                    if (!isTerminalFloating) {
                      setShowTerminal(false);
                    }
                  }}
                  className="w-4 h-4 rounded-full bg-yellow-500 hover:bg-yellow-600 transition-colors flex items-center justify-center group"
                  title={t('Minimize')}
                >
                  <FaMinus size={8} className="text-white group-hover:scale-110 transition-transform" />
                </button>
                <button
                  onClick={() => setIsTerminalMaximized(!isTerminalMaximized)}
                  className="w-4 h-4 rounded-full bg-green-500 hover:bg-green-600 transition-colors flex items-center justify-center group"
                  title={t('Maximize')}
                >
                  <FaExpand size={8} className="text-white group-hover:scale-110 transition-transform" />
                </button>
                <span className={`ml-3 font-mono text-sm font-bold ${
                  isDarkMode ? 'text-slate-300' : 'text-slate-700'
                }`}>{t('Interactive Terminal')}</span>
              </div>
            <button
              onClick={() => resetTerminal()}
              className={`p-1 rounded hover:bg-slate-700 transition-colors ${
                isDarkMode ? 'text-slate-400 hover:text-white' : 'text-slate-600 hover:text-black'
              }`}
            >
              ✕
            </button>
            </div>

            {/* Terminal Content */}
            {!isTerminalMinimized && (
              <>
                <div 
                  ref={terminalContentRef}
                  className={`flex-1 overflow-y-auto p-4 font-mono text-sm space-y-1 ${
                  isDarkMode ? 'bg-slate-950 text-slate-200' : 'bg-slate-50 text-slate-800'
                }`}>
                  {terminalHistory.map((line, idx) => (
                    <div key={idx} className={line.includes('//') ? (isDarkMode ? 'text-green-400' : 'text-green-600') : ''}>
                      {line.split('\n').map((subline, subidx) => (
                        <div key={subidx}>{subline}</div>
                      ))}
                    </div>
                  ))}
                </div>

                {/* Terminal Input */}
                <div className={`px-4 py-3 border-t flex items-center gap-2 ${
                  isDarkMode ? 'bg-slate-900 border-slate-700' : 'bg-slate-100 border-slate-200'
                }`}>
                  <span className="text-[#00BD95] font-mono font-bold">$</span>
                  <input
                    type="text"
                    value={terminalInput}
                    onChange={(e) => setTerminalInput(e.target.value)}
                    onKeyDown={handleTerminalCommand}
                    autoFocus
                    placeholder={t('Type command...')}
                    className={`flex-1 bg-transparent outline-none font-mono ${
                      isDarkMode ? 'text-white placeholder-slate-500' : 'text-slate-900 placeholder-slate-400'
                    }`}
                  />
                </div>
              </>
            )}
          </div>
        </div>
      )}
      <style jsx>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-10px);
          }
        }
        @keyframes spin {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateY(10px) scale(0.9);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
        @keyframes pulse {
          0%, 100% {
            opacity: 0.5;
          }
          50% {
            opacity: 1;
          }
        }
        @keyframes shimmer {
          0% {
            background-position: -1000px 0;
          }
          100% {
            background-position: 1000px 0;
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.2s ease-out;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </section>
  );
};

export default About;
