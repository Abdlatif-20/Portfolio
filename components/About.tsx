'use client';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import Typewriter from 'typewriter-effect/dist/core';
import { useDarkMode } from './context';
import { FaGithub, FaLinkedin, FaEnvelope, FaDownload, FaCode, FaReact, FaServer, FaNode, FaGit, FaDocker } from 'react-icons/fa';
import { SiNextdotjs, SiTailwindcss, SiTypescript, SiPostgresql } from 'react-icons/si';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

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
  const techScrollRef = React.useRef<HTMLDivElement>(null);
  const scrollIntervalRef = React.useRef<NodeJS.Timeout | null>(null);
  const scrollAmountRef = React.useRef(0);

  useEffect(() => {
    setMounted(true);
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

  const socialLinks = [
    { icon: <FaGithub size={24} />, href: "https://github.com/Abdlatif-20", label: "GitHub" },
    { icon: <FaLinkedin size={24} />, href: "https://www.linkedin.com/in/aben-nei/", label: "LinkedIn" },
    { icon: <FaEnvelope size={24} />, href: "mailto:ab.enneiymy@gmail.com", label: "Email" },
  ];

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

      <div className="relative z-10 flex flex-col lg:flex-row justify-between items-center w-full max-w-6xl mx-auto gap-12 lg:gap-20">
        {/* Left Content */}
        <div className={`flex flex-col order-2 lg:order-1 justify-center items-center lg:items-start w-full lg:w-[55%] transition-all duration-700 delay-200 ${
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
          <h1 className={`text-4xl lg:text-5xl xl:text-6xl font-bold mb-4 ${
            isDarkMode ? 'text-white' : 'text-slate-900'
          }`}>
            {t("Hello")}, <span className="text-[#00BD95]">{t("I'm")}</span>
          </h1>
          {/* Typewriter Name */}
          <div className="h-16 mb-4">
            <p className="text-2xl lg:text-3xl xl:text-4xl font-bold text-[#00BD95]" id="text_name"></p>
          </div>
          {/* Description */}
          <p className={`text-base lg:text-lg leading-relaxed mb-8 max-w-2xl ${
            isDarkMode ? 'text-slate-300' : 'text-slate-600'
          }`}>
            {t("I'm a passionate Front-End Developer dedicated to building elegant, performant, and responsive web interfaces. With hands-on experience using React, Next.js, and Tailwind CSS, I focus on transforming ideas into intuitive and visually engaging user experiences.")}
          </p>
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
          <div className="flex gap-4">
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
          </div>
        </div>
        {/* Right Content - Image & Tech Stack */}
        <div className={`order-1 lg:order-2 w-full mt-6 lg:mt-0 lg:w-[45%] flex flex-col items-center gap-8 transition-all duration-700 delay-400 ${
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
                <img
                  src="images/mee.png"
                  alt="Abdellatyf En-neiymy"
                  className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
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

      {/* CSS for animations */}
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
