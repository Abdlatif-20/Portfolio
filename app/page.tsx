'use client';
import About from "@/components/About";
import Contact from "@/components/Contact";
import Projects from "@/components/Projects";
import Skills from "@/components/Skills";
import { useEffect, useState } from "react";
import { FaArrowCircleUp } from "react-icons/fa";


export default function Home() {
  const [isScrolling, setIsScrolling] = useState(false);

  const [theme, setTheme] = useState("dark");
  useEffect(() => {
    const localTheme = localStorage.getItem("theme");
    console.log(localTheme);
    if (localTheme) {
      setTheme(localTheme);
    }
  }
  , [theme]);
  useEffect(() => {
  window.onscroll = () => {
    window.scrollY > 500 ? setIsScrolling(true) : setIsScrolling(false)
  }
  }
  , [])

  return (
    <div className={`flex flex-col justify-center items-center w-full h-full 
    ${theme == "dark" ? "bg-[#21272F] text-white" : "bg-white text-black"}
    `}>
    <About />
    <Projects />
    <Skills />
    <Contact />
    {isScrolling && <div className='fixed bottom-5 right-5 cursor-pointer' onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}>
        <FaArrowCircleUp className='text-[#00BD95] text-4xl' />
       </div>
    }
    </div>
  );
}
