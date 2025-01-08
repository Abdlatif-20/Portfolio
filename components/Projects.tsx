'use client';
import Card from '@/components/Card';
import React from 'react'
import { useTranslation } from 'react-i18next';

const projects = [
  {
    title: 'Web Server',
    description: 'A lightweight HTTP server built from scratch, focused on handling requests and responses efficiently, simulating real-world web server behavior.',
    href: 'https://github.com/Abdlatif-20/webserv',
    techStack: ['Cpp', 'HTTP', 'Server']
  },
  {
    title: 'Inception',
    description: 'A Docker-based project showcasing virtualization by creating a multi-container setup for hosting various services securely.',
    href: 'https://github.com/Abdlatif-20/Inception_42',
    techStack: ['Docker', 'nginx', 'WordPress', 'mySQL']
  },
  {
    title: 'Pong Game',
    description: 'A modern twist on the classic Pong game, combining multiplayer functionality with user authentication and social features for an immersive experience.',
    href: 'https://github.com/Abdlatif-20/ft_transcendence',
    techStack: ['typescript', 'html', 'css', 'nextjs', 'django', 'tailwindCss', 'postgreSQL', 'Redis', 'Websockets', 'Docker', 'Nginx', 'i18next']
  },
  {
    title: 'Portfolio',
    description: 'A personal portfolio showcasing my work as a full-stack developer.',
    href: 'https://github.com/Abdlatif-20/Portfolio',
    techStack: ['nextjs', 'tailwind', 'i18next']
  }
];

const Projects = () => {
 const { t } = useTranslation();
  return (
    <div id='projects' className='flex flex-col justify-start items-center w-full lg:w-[70%] min-h-screen'>
      <h1 className='text-[40px] text-shadow-textShadow-green font-bold h-[30vh] w-full flex justify-center items-center brightness-70 shadow-border'>
        {t("Projects")}
      </h1>
      <div className='w-full h-full flex overflow-x-auto md:flex-wrap md:justify-around md:items-center space-x-4 snap-x snap-mandatory no-scrollbar
      '>
        {projects.map((project, index) => (
          <div key={index} className='snap-center shrink-0 flex-auto md:flex-initial'>
            <Card
              title={t(project.title)}
              description={t(project.description)}
              href={project.href}
              techStack={project.techStack}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default Projects;
