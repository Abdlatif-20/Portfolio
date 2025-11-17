'use client';
import About from "@/components/About";
import Contact from "@/components/Contact";
import { useDarkMode } from "@/components/context";
import Projects from "@/components/Projects";
import Skills from "@/components/Skills";
import Education from "@/components/Education";
import { useEffect, useState } from "react";
import { FaArrowCircleUp } from "react-icons/fa";
import React from 'react';
import { FloatingWhatsApp } from 'react-floating-whatsapp';
import './globals.css';

export default function Home() {
  const [isScrolling, setIsScrolling] = useState(false);
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);
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
      <About />
      <Projects />
  <Education />
      <Skills />
      <Contact />
      {/* Chatbot floating icon layered above the WhatsApp button */}
      {/* <Chatbot /> */}
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
      {/* {isScrolling && (
        <div
          className="animate-bounce fixed bottom-[8%] left-4 cursor-pointer z-50"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        >
          <FaArrowCircleUp className="text-[#00BD95] text-4xl" />
        </div>
      )} */}
    </div>
  );
}
