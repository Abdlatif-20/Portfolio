'use client';
import Card from '@/components/Card';
import React from 'react'
import { useTranslation } from 'react-i18next';

const projects = [
  {
    title: 'Web Server',
    description: 'A lightweight HTTP server built from scratch, focused on handling requests and responses efficiently, simulating real-world web server behavior.'
  },
  {
    title: 'Inception',
    description: 'A Docker-based project showcasing virtualization by creating a multi-container setup for hosting various services securely.'
  },
  {
    title: 'Pong Game',
    description: 'A modern twist on the classic Pong game, combining multiplayer functionality with user authentication and social features for an immersive experience.'
  },
  {
    title: 'Portfolio',
    description: 'A personal portfolio showcasing my work as a full-stack developer.'
  }
];

const Projects = () => {
 const { t } = useTranslation();
  return (
    <div id='projects' className='flex flex-col justify-center items-center w-[70%] h-screen '>
      <h1 className='text-[40px] text-shadow-textShadow-green text-white font-bold  h-[50%] w-full flex justify-center items-center brightness-70'>
        {t("Projects")}
      </h1>
      <div className='flex flex-wrap justify-around items-center w-full h-full '>
        {projects.map((project, index) => (
          <Card key={index} title={t(project.title)} description={t(project.description)} />
        ))}
      </div>
    </div>
  )
}

export default Projects
