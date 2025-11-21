'use client'
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useDarkMode } from './context';
import { FaChevronUp, FaReact } from 'react-icons/fa';
import { SiNextdotjs, SiTailwindcss, SiTypescript } from 'react-icons/si';

const Footer = () => {
  const { t } = useTranslation();
  const { isDarkMode } = useDarkMode();

  const scrollToTop = () => {
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <footer className={`w-full py-12 ${isDarkMode ? 'bg-[#21272F] text-slate-300' : 'bg-white text-slate-800'} border-t ${isDarkMode ? 'border-slate-800' : 'border-slate-200'}`}>
      <div className="max-w-6xl mx-auto px-4">
        {/* Main Footer Content */}
        <div className={`rounded-lg overflow-hidden mb-8 border ${isDarkMode ? 'bg-slate-900/50 border-slate-800' : 'bg-slate-50 border-slate-200'}`}>
          {/* Terminal-like Header */}
          <div className={`px-4 py-3 flex items-center gap-2 border-b ${isDarkMode ? 'bg-slate-800 border-slate-700' : 'bg-slate-100 border-slate-200'}`}>
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
            <span className={`ml-2 font-mono text-xs font-bold ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
              footer.tsx
            </span>
          </div>

          {/* Content */}
          <div className={`px-6 py-8 font-mono text-sm space-y-6 ${isDarkMode ? 'bg-slate-950' : 'bg-white'}`}>
            {/* Code comment */}
            <div className={`${isDarkMode ? 'text-green-400' : 'text-green-600'}`}>
              {`// ${t('Built with passion and modern technologies')}`}
            </div>

            {/* Technology Stack */}
            <div>
              <div className={`${isDarkMode ? 'text-cyan-400' : 'text-blue-600'} mb-3`}>
                {'const stack = ['}
              </div>
              <div className="flex flex-wrap gap-4 ml-4 mb-3">
                <div className="flex items-center gap-2">
                  <SiNextdotjs size={20} className={isDarkMode ? 'text-white' : 'text-black'} />
                  <span className={isDarkMode ? 'text-slate-300' : 'text-slate-700'}>Next.js</span>
                </div>
                <div className="flex items-center gap-2">
                  <SiTailwindcss size={20} className="text-cyan-400" />
                  <span className={isDarkMode ? 'text-slate-300' : 'text-slate-700'}>Tailwind CSS</span>
                </div>
                <div className="flex items-center gap-2">
                  <SiTypescript size={20} className="text-blue-500" />
                  <span className={isDarkMode ? 'text-slate-300' : 'text-slate-700'}>TypeScript</span>
                </div>
              </div>
              <div className={`${isDarkMode ? 'text-cyan-400' : 'text-blue-600'}`}>
                {'];'}
              </div>
            </div>

            {/* Divider */}
            <div className={`${isDarkMode ? 'border-slate-700' : 'border-slate-300'} border-t`}></div>

            {/* Copyright Section */}
            <div className={`flex flex-col md:flex-row md:items-center md:justify-between gap-4 ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
              <div className="text-xs">
                <div className={`${isDarkMode ? 'text-slate-300' : 'text-slate-800'} mb-1`}>
                  {`© 2024 Abdellatyf En-Neiymy. ${t('All rights reserved')}.`}
                </div>
                <div className="text-xs">
                  {`${t('Designed & Developed with ')} `}<span className="text-[#00BD95]">{' <3 '}</span>{` ${t('by AE')}`}
                </div>
              </div>

              {/* Back to Top Button */}
              <button 
                onClick={scrollToTop}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg font-mono text-xs font-bold transition-all duration-300 transform hover:scale-105 ${
                  isDarkMode 
                    ? 'bg-gradient-to-r from-[#00BD95] to-cyan-500 text-white hover:shadow-lg hover:shadow-[#00BD95]/50' 
                    : 'bg-gradient-to-r from-[#00BD95] to-cyan-500 text-white hover:shadow-lg hover:shadow-[#00BD95]/50'
                }`}
                aria-label={t('Back to top')}
              >
                <span>{t('Back to top')}</span>
                <FaChevronUp size={14} />
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Status Bar */}
        <div className={`flex items-center justify-between text-xs font-mono ${isDarkMode ? 'text-slate-500' : 'text-slate-500'}`}>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-[#00BD95] animate-pulse"></div>
            <span>{t('status: ready')}</span>
          </div>
          <span>{new Date().getFullYear()} • v1.0.0</span>
        </div>
      </div>

      <style jsx>{`
        @keyframes spin-slow {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        .animate-spin-slow {
          animation: spin-slow 2.5s linear infinite;
        }
      `}</style>
    </footer>
  );
};

export default Footer;
