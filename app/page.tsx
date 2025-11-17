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
import Chatbot from '@/components/Chatbot';

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
      <div className={`fixed inset-0 flex flex-col items-center justify-center z-[9999] ${isDarkMode ? 'bg-[#21272F]' : 'bg-white'}`}>
        <div className="w-64 h-4 bg-gray-200 rounded-full overflow-hidden shadow-md">
          <div
            className="h-full rounded-full transition-all duration-75"
            style={{
              width: `${progress}%`,
              background: isDarkMode ? 'linear-gradient(90deg, #00BD95 0%, #21272F 100%)' : 'linear-gradient(90deg, #21272F 0%, #00BD95 100%)',
            }}
          />
        </div>
        <span className={`mt-4 text-lg font-semibold ${isDarkMode ? 'text-white' : 'text-black'}`}>{progress}%</span>
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
