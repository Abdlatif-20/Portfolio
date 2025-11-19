'use client';
import About from "@/components/About";
import Contact from "@/components/Contact";
import { useDarkMode } from "@/components/context";
import Projects from "@/components/Projects";
import Skills from "@/components/Skills";
import Education from "@/components/Education";
import Experience from "@/components/Experience";
import { useEffect, useState } from "react";
import { FaArrowCircleUp, FaDownload } from "react-icons/fa";
import React from 'react';
import { FloatingWhatsApp } from 'react-floating-whatsapp';
import { useTranslation } from 'react-i18next';
import './globals.css';

export default function Home() {
  const [isScrolling, setIsScrolling] = useState(false);
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const [showResumeModal, setShowResumeModal] = useState(false);
  const { isDarkMode } = useDarkMode();

  useEffect(() => {
    // Animate progress bar from 0 to 100% over 1.5 seconds
    let interval: NodeJS.Timeout;
    if (loading) {
      let current = 0;
      interval = setInterval(() => {
        current += 2; // 2% every 30ms ~ 1.5s total
        if (current >= 100) {
          current = 100;
          setProgress(current);
          setLoading(false);
          clearInterval(interval);
        } else {
          setProgress(current);
        }
      }, 30);
    }
    window.onscroll = () => {
      window.scrollY > 500 ? setIsScrolling(true) : setIsScrolling(false);
    };
    const chatBox = document.querySelector(".floating-whatsapp-chatbox");
    if (chatBox) {
      chatBox.removeAttribute("aria-hidden");
    }
    return () => clearInterval(interval);
  }, [loading]);

  if (loading) {
    return (
      <div className={`fixed inset-0 flex flex-col items-center justify-center z-[9999] ${isDarkMode ? 'bg-gradient-to-br from-[#071827] via-[#0b1220] to-[#21272F]' : 'bg-gradient-to-br from-white via-slate-50 to-slate-100'}`}>
        {/* Animated Logo/Icon */}
        <div className="mb-8 relative">
          <div className="absolute inset-0 animate-ping opacity-20">
            <div className="w-20 h-20 rounded-full bg-[#00BD95]"></div>
          </div>
          <div className="relative w-20 h-20 rounded-full bg-gradient-to-br from-[#00BD95] to-cyan-600 flex items-center justify-center shadow-2xl animate-pulse">
            <span className="text-3xl font-bold text-white">AE</span>
          </div>
        </div>

        {/* Loading Text */}
        <h2 className={`text-2xl font-bold mb-2 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
          Loading Portfolio
        </h2>
        <p className={`text-sm mb-8 ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
          Please wait...
        </p>

        {/* Modern Progress Bar Container */}
        <div className="w-80 relative">
          {/* Progress Bar Background */}
          <div className={`h-2 rounded-full overflow-hidden ${isDarkMode ? 'bg-slate-800' : 'bg-slate-200'} shadow-inner`}>
            {/* Animated Progress Bar */}
            <div
              className="h-full rounded-full transition-all duration-300 relative overflow-hidden"
              style={{
                width: `${progress}%`,
                background: 'linear-gradient(90deg, #00BD95 0%, #06b6d4 50%, #00BD95 100%)',
                backgroundSize: '200% 100%',
                animation: 'shimmer 2s infinite linear',
              }}
            >
              {/* Shine effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer"></div>
            </div>
          </div>

          {/* Progress Percentage */}
          <div className="flex justify-between items-center mt-3">
            <span className={`text-xs font-medium ${isDarkMode ? 'text-slate-500' : 'text-slate-400'}`}>
              Loading assets...
            </span>
            <span className={`text-sm font-bold ${isDarkMode ? 'text-[#00BD95]' : 'text-[#00BD95]'}`}>
              {progress}%
            </span>
          </div>
        </div>

        {/* Animated Dots */}
        <div className="flex gap-2 mt-6">
          <div className={`w-2 h-2 rounded-full ${isDarkMode ? 'bg-[#00BD95]' : 'bg-[#00BD95]'} animate-bounce`} style={{ animationDelay: '0ms' }}></div>
          <div className={`w-2 h-2 rounded-full ${isDarkMode ? 'bg-[#00BD95]' : 'bg-[#00BD95]'} animate-bounce`} style={{ animationDelay: '150ms' }}></div>
          <div className={`w-2 h-2 rounded-full ${isDarkMode ? 'bg-[#00BD95]' : 'bg-[#00BD95]'} animate-bounce`} style={{ animationDelay: '300ms' }}></div>
        </div>

        {/* CSS Animations */}
        <style jsx>{`
          @keyframes shimmer {
            0% { background-position: 200% 0; }
            100% { background-position: -200% 0; }
          }
          .animate-shimmer {
            animation: shimmer-slide 2s infinite;
          }
          @keyframes shimmer-slide {
            0% { transform: translateX(-100%); }
            100% { transform: translateX(100%); }
          }
        `}</style>
      </div>
    );
  }

  return (
    <div
      className={`flex flex-col justify-center items-center w-full
        ${isDarkMode ? 'bg-[#21272F] text-white' : 'bg-white text-black'}
      `}
    >
      <About showResumeModal={showResumeModal} setShowResumeModal={setShowResumeModal} />
      <Projects />
      <Education />
      <Experience />
      <Skills />
      <Contact />

      {/* Resume Modal - Full Screen Floating - Global */}
      {showResumeModal && (
        <div 
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/80 backdrop-blur-md animate-fadeIn"
          onClick={() => setShowResumeModal(false)}
        >
          <div 
            className={`relative w-[95vw] md:w-[70vw] lg:w-[60vw] h-[95vh] rounded-2xl shadow-2xl overflow-hidden transform transition-all duration-300 scale-100 ${
              isDarkMode ? 'bg-slate-900 border border-slate-700' : 'bg-white border border-gray-200'
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header - Floating */}
            <div className={`absolute top-0 left-0 right-0 z-10 flex items-center justify-between p-4 md:p-6 backdrop-blur-xl ${
              isDarkMode ? 'bg-slate-900/90 border-b border-slate-700/50' : 'bg-white/90 border-b border-slate-200/50'
            }`}>
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                  isDarkMode ? 'bg-[#00BD95]/20' : 'bg-[#00BD95]/10'
                }`}>
                  <FaDownload className="text-[#00BD95] text-lg" />
                </div>
                <div>
                  <h3 className={`text-xl md:text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                    My Resume
                  </h3>
                  <p className={`text-xs md:text-sm ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                    Full curriculum vitae
                  </p>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <a
                  href="/resume/my-cv.pdf"
                  download
                  className="group flex items-center gap-2 px-4 py-2 rounded-xl bg-[#00BD95] text-white hover:bg-cyan-600 transition-all duration-200 shadow-lg hover:shadow-xl hover:scale-105"
                  title="Download Resume"
                >
                  <FaDownload size={16} />
                  <span className="hidden md:inline text-sm font-medium">Download</span>
                </a>
                <button
                  onClick={() => setShowResumeModal(false)}
                  className={`p-3 rounded-xl transition-all duration-200 hover:scale-105 ${
                    isDarkMode 
                      ? 'hover:bg-slate-800 text-slate-400 hover:text-white' 
                      : 'hover:bg-slate-100 text-slate-600 hover:text-slate-900'
                  }`}
                  aria-label="Close modal"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>

            {/* PDF Viewer - Full Height */}
            <div className="w-full h-full pt-20 md:pt-24">
              <embed
                src="/resume/my-cv.pdf#toolbar=0&navpanes=0&scrollbar=1&view=FitH&page=1"
                type="application/pdf"
                className="w-full h-full"
                style={{ border: 'none' }}
              />
            </div>

            {/* Floating Action Buttons */}
            <div className="absolute bottom-6 right-6 flex flex-col gap-3">
              <button
                onClick={() => window.open('/resume/my-cv.pdf', '_blank')}
                className={`p-4 rounded-full shadow-2xl backdrop-blur-xl transition-all duration-200 hover:scale-110 ${
                  isDarkMode 
                    ? 'bg-slate-800/90 text-white hover:bg-slate-700' 
                    : 'bg-white/90 text-slate-900 hover:bg-slate-100'
                }`}
                title="Open in new tab"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.2s ease-out;
        }
      `}</style>

      <FloatingWhatsApp
      phoneNumber="+212777191684"
      accountName="Abdellatyf en-neiymy"
      darkMode={true}
      notificationDelay={10}
      statusMessage="Typically replies within 30 minutes"
      avatar="images/mee.png"
      chatMessage="Hello, how can I help you?"
      allowEsc={true}
      style={{
      }}
      buttonStyle={{
        bottom: '5%',
      }}
    />
    </div>
  );
}
