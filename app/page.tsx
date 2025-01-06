'use client';
import About from "@/components/About";
import Contact from "@/components/Contact";
import { useDarkMode } from "@/components/context";
import Projects from "@/components/Projects";
import Skills from "@/components/Skills";
import { useEffect, useState } from "react";
import { FaArrowCircleUp } from "react-icons/fa";
import React from 'react';
import { FloatingWhatsApp } from 'react-floating-whatsapp';

export default function Home() {
  const [isScrolling, setIsScrolling] = useState(false);
  const { isDarkMode } = useDarkMode();

  useEffect(() => {
    window.onscroll = () => {
      window.scrollY > 500 ? setIsScrolling(true) : setIsScrolling(false);
    };

    const chatBox = document.querySelector(".floating-whatsapp-chatbox");
    if (chatBox) {
      chatBox.removeAttribute("aria-hidden");
    }
  }, []);

  return (
    <div
      className={`flex flex-col justify-center items-center w-full h-full font-iosevka
        ${isDarkMode ? 'bg-[#21272F] text-white' : 'bg-white text-black'}
      `}
    >
      <About />
      <Projects />
      <Skills />
      <Contact />
      <FloatingWhatsApp
        phoneNumber="+212777191684"
        accountName="Abdellatyf en-neiymy"
        darkMode={true}
        notificationDelay={10}
        notificationSoundSrc="/sound/nottfication.mp3"
        statusMessage="Typically replies within 30 minutes"
        avatar="images/aben-nei.jpg"
        chatMessage="Hello, how can I help you?"
      />
      {isScrolling && (
        <div
          className="fixed bottom-9 right-28 cursor-pointer"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        >
          <FaArrowCircleUp className="text-[#00BD95] text-4xl" />
        </div>
      )}
    </div>
  );
}
