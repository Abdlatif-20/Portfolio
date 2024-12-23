'use client';
import React from 'react'
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
const Skills = () => {
  const skills = [
    { src: 'images/nextjs.png', alt: 'Next.js' },
    { src: 'images/js.png', alt: 'JavaScript/TypeScript' },
    { src: 'images/html.png', alt: 'HTML' },
    { src: 'images/css.png', alt: 'CSS' },
    { src: 'images/docker.png', alt: 'Docker' },
    { src: 'images/dj.png', alt: 'django' },
    { src: 'images/py.png', alt: 'Python' },
    { src: 'images/cpp.png', alt: 'C++' },
    { src: 'images/postgreSql.png', alt: 'PostgreSQL' },
    { src: 'images/git.png', alt: 'Git' },
    { src: 'images/figma.png', alt: 'Figma' },
    { src: 'images/react.png', alt: 'React' },
  ];
  const [isHovered, setIsHovered] = useState(false);
  const { t } = useTranslation();
  return (
    <div id='skills' className='flex flex-col justify-center items-center w-[40%] h-screen '>
    <h1 className='text-[40px] text-shadow-textShadow-green text-white font-bold  h-[50%] w-full flex justify-center items-center brightness-70'>
      {t("Skills")}
    </h1>
    <div className='flex flex-wrap justify-between items-center w-full h-full'>
      {skills.map((skill, index) => (
        <div key={index} className='flex justify-center items-center p-10'
        onMouseEnter={() => skill.alt === 'JavaScript/TypeScript' && setIsHovered(true)}
        onMouseLeave={() => skill.alt === 'JavaScript/TypeScript' && setIsHovered(false)}
        >
          <img title={skill.alt}
          src={isHovered && skill.alt === 'JavaScript/TypeScript' ? 'images/ts.png' : skill.src}
          alt={skill.alt} className='w-full h-auto' />
        </div>
      ))}
    </div>
  </div>
  )
}

export default Skills
