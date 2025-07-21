'use client';
import Card from '@/components/Card';
import React, { useState, useRef } from 'react'
import { useTranslation } from 'react-i18next';

const projects = [
  {
    title: 'Cub3D',
    description: 'A 3D maze game built using raycasting, allowing players to navigate through a maze and collect items to win the game.',
    href: 'https://github.com/Abdlatif-20/cub3D_42',
    techStack: ['C', 'raycasting', 'minilibx']
  },
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
    techStack: ['nextjs', 'tailwindcss', 'i18next']
  },
  {
    title: 'rhmetrics',
    description: 'a web platform providing HR market research and salary trend insights in Morocco, with multilingual support and data-driven analytics.',
    href: 'https://rhmetrics.ma/',
    techStack: ['reactjs', 'tailwindcss', 'html', 'css', 'postgreSQL', 'strapi']
  },
  {
    title: 'MyJoboard',
    description: 'a user-friendly job board platform enabling candidates to search and apply for jobs',
    href: 'https://www.job.myjoboard-ma.com/',
    techStack: ['reactjs', 'tailwindcss', 'html', 'css', 'postgreSQL', 'expressjs']
  },
  {
    title: 'MyJoboard',
    description: 'a user-friendly job board platform enabling candidates to search and apply for jobs',
    href: 'https://www.job.myjoboard-ma.com/',
    techStack: ['reactjs', 'tailwindcss', 'html', 'css', 'postgreSQL', 'expressjs']
  },
  {
    title: 'MyJoboard',
    description: 'a user-friendly job board platform enabling candidates to search and apply for jobs',
    href: 'https://www.job.myjoboard-ma.com/',
    techStack: ['reactjs', 'tailwindcss', 'html', 'css', 'postgreSQL', 'expressjs']
  },
  {
    title: 'MyJoboard',
    description: 'a user-friendly job board platform enabling candidates to search and apply for jobs',
    href: 'https://www.job.myjoboard-ma.com/',
    techStack: ['reactjs', 'tailwindcss', 'html', 'css', 'postgreSQL', 'expressjs']
  },
  {
    title: 'MyJoboard',
    description: 'a user-friendly job board platform enabling candidates to search and apply for jobs',
    href: 'https://www.job.myjoboard-ma.com/',
    techStack: ['reactjs', 'tailwindcss', 'html', 'css', 'postgreSQL', 'expressjs']
  },
];

const Projects = () => {
  const { t } = useTranslation();
  const [visibleCount, setVisibleCount] = useState(4);
  const projectsRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const hasMore = visibleCount < projects.length;
  const canShowLess = visibleCount > 4;

  const handleShowLess = () => {
    setVisibleCount(c => {
      const newCount = Math.max(4, c - 4);
      setTimeout(() => {
        projectsRef.current?.scrollIntoView({ behavior: 'smooth' });
        // On mobile/tablet, scroll horizontally to the first project
        if (window.innerWidth < 1024) {
          scrollContainerRef.current?.scrollTo({ left: 0, behavior: 'smooth' });
        }
      }, 100);
      return newCount;
    });
  };

  return (
    <div id='projects' ref={projectsRef} className='flex flex-col justify-start items-center w-full lg:w-[70%] min-h-screen'>
      <h1 className='text-[40px] text-shadow-textShadow-green font-bold h-[30vh] w-full flex justify-center items-center brightness-70 shadow-border'>
        {t("Projects")}
      </h1>
      <div ref={scrollContainerRef} className='w-full h-full flex overflow-x-auto md:overflow-visible md:flex-wrap md:justify-around md:items-center space-x-4 md:space-x-0 snap-x snap-mandatory no-scrollbar transition-all duration-500'>
        {projects.slice(0, visibleCount).map((project, index) => (
          <div
            key={index}
            className={`snap-center shrink-0 flex-auto md:flex-initial transition-all duration-500`}
          >
            <Card
              title={t(project.title)}
              description={t(project.description)}
              href={project.href}
              techStack={project.techStack}
            />
          </div>
        ))}
      </div>
      <div className="flex gap-4 mt-8">
        {hasMore && (
          <button
            className='px-6 py-2 rounded bg-gradient-to-r from-green-400 to-blue-500 text-white font-semibold shadow-lg transition-all duration-300 hover:scale-105 focus:outline-none'
            onClick={() => setVisibleCount(c => Math.min(c + 4, projects.length))}
          >
            {t('Show More')}
          </button>
        )}
        {canShowLess && (
          <button
            className='px-6 py-2 rounded bg-gradient-to-r from-red-400 to-pink-500 text-white font-semibold shadow-lg transition-all duration-300 hover:scale-105 focus:outline-none'
            onClick={handleShowLess}
          >
            {t('Show Less')}
          </button>
        )}
      </div>
    </div>
  );
}

export default Projects;
