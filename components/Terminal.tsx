'use client';
import React, { useEffect, useState, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { useDarkMode } from './context';
import { FaTimes, FaMinus, FaExpand } from 'react-icons/fa';

interface TerminalProps {
  showTerminal: boolean;
  setShowTerminal: (show: boolean) => void;
}

export default function Terminal({ showTerminal, setShowTerminal }: TerminalProps) {
  const { t } = useTranslation();
  const { isDarkMode } = useDarkMode();
  const [isTerminalMinimized, setIsTerminalMinimized] = useState(false);
  const [isTerminalMaximized, setIsTerminalMaximized] = useState(false);
  const [isTerminalFloating, setIsTerminalFloating] = useState(false);
  const [terminalInput, setTerminalInput] = useState('');
  const [terminalHistory, setTerminalHistory] = useState<string[]>([]);
  const [terminalPosition, setTerminalPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const terminalContentRef = useRef<HTMLDivElement>(null);

  // Initialize terminal history with translations
  useEffect(() => {
    setTerminalHistory([
      ` ${t('Welcome to My Terminal')}`,
      '',
      t('Hello! I\'m Abdellatyf En-Neiymy'),
      t('This is an interactive terminal where you can learn more about me.'),
      '',
      t('Type help to see available commands or just explore around!'),
      ''
    ]);
  }, [t]);

  // Center terminal on screen when opened
  useEffect(() => {
    if (showTerminal) {
      // Center terminal on screen
      const centerX = (window.innerWidth - 600) / 2;
      const centerY = (window.innerHeight - 500) / 2;
      setTerminalPosition({ x: Math.max(0, centerX), y: Math.max(0, centerY) });
      
      if (terminalContentRef.current) {
        setTimeout(() => {
          if (terminalContentRef.current) {
            terminalContentRef.current.scrollTop = 0;
          }
        }, 0);
      }
    }
  }, [showTerminal]);

  // Scroll terminal to bottom when new message is added
  useEffect(() => {
    if (terminalContentRef.current) {
      setTimeout(() => {
        if (terminalContentRef.current) {
          terminalContentRef.current.scrollTop = terminalContentRef.current.scrollHeight;
        }
      }, 0);
    }
  }, [terminalHistory]);

  // Handle Escape key to close terminal
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && showTerminal) {
        resetTerminal();
      }
    };
    
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [showTerminal]);

  // Handle drag functionality
  const handleMouseDown = (e: React.MouseEvent) => {
    if (isTerminalMaximized) return;
    setIsDragging(true);
    setDragStart({
      x: e.clientX - terminalPosition.x,
      y: e.clientY - terminalPosition.y
    });
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;
      
      setTerminalPosition({
        x: e.clientX - dragStart.x,
        y: e.clientY - dragStart.y
      });
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, dragStart]);

  const executeCommand = () => {
    const command = terminalInput.trim().toLowerCase();
    const newHistory = [...terminalHistory, `$ ${terminalInput}`];
    
    let response = '';
    
    switch(command) {
      case 'help':
        response = `${t('Available commands:')}
  about - ${t('Show about me')}
  education - ${t('Show education background')}
  skills - ${t('List my skills')}
  contact - ${t('Show contact information')}
  projects - ${t('List recent projects')}
  open to work - ${t('Show my availability')}
  clear - ${t('Clear the terminal')}
  exit - ${t('Close the terminal')}
  
${t('Tip: Press Escape key to close terminal anytime')}`;
        break;
      case 'about':
        response = t('I am Abdellatyf En-Neiymy, a Front-End Developer specializing in building responsive and user-friendly web applications using React, Next.js, and Tailwind CSS.');
        break;
      case 'education':
        response = t('I\'m Currently Studying Software Engineering at 1337 School in Khouribga, Morocco. I have completed various courses and projects that have strengthened my skills in web development and programming.');
        break;
      case 'skills':
        response = `${t('My Skills in Front-End Development:')}
- React
- Next.js
- TypeScript
- Tailwind CSS
- JavaScript
- HTML & CSS

${t('And also familiar with Back-End basics:')}
- Django
- PostgreSQL
- Git & GitHub
- Docker`;
        break;
      case 'contact':
        response = t('You can reach me at Email: ab.enneiymy@gmail.com | GitHub: github.com/Abdlatif-20 | LinkedIn: linkedin.com/in/aben-nei/ | Whatsapp: +212777191684');
        break;
      case 'projects':
        response = `${t('Recent Projects:')}
1. ${t('Portfolio Website - A personal portfolio built with Next.js and Tailwind CSS.')}
2. ${t('PongGame - A classic pong game using Nextjs and TypeScript in front end and Django in back end.')}
3. ${t('HR Stats for Employees - An HR management dashboard built with React and Chart.js.')}
${t('You can find more on my Projects section')}`;
        break;
      case 'open to work':
        response = t('I am currently open to full-time, part-time, and freelance opportunities. Feel free to contact me for collaborations or job offers!');
        break;
      case 'exit':
        resetTerminal();
        return;
      case 'clear':
        setTerminalHistory([`$ ${t('Terminal cleared')}`]);
        setTerminalInput('');
        return;
      default:
        response = command ? `${t('Command not found. Type help for available commands.')}` : '';
    }
    
    if (response) {
      newHistory.push(response);
    }
    
    setTerminalHistory(newHistory);
    setTerminalInput('');
  };

  const handleTerminalCommand = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      executeCommand();
    }
  };

  const resetTerminal = () => {
    setShowTerminal(false);
    setIsTerminalMinimized(false);
    setIsTerminalMaximized(false);
    setIsTerminalFloating(false);
    setTerminalPosition({ x: 0, y: 0 });
    setIsDragging(false);
    setTerminalHistory([
      ` ${t('Welcome to My Terminal')}`,
      '',
      t('Hello! I\'m Abdellatyf En-Neiymy'),
      t('This is an interactive terminal where you can learn more about me.'),
      '',
      t('Type help to see available commands or just explore around!'),
      ''
    ]);
    setTerminalInput('');
  };

  if (!showTerminal) return null;

  return (
    <div 
      className={`fixed inset-0 z-[9998] ${
        isTerminalMaximized ? 'bg-black' : 'bg-black/50 backdrop-blur-sm pointer-events-none'
      }`}
    >
      <div 
        style={!isTerminalMaximized ? {
          position: 'fixed',
          left: `${terminalPosition.x}px`,
          top: `${terminalPosition.y}px`,
          transform: 'none'
        } : {}}
        className={`${!isTerminalMaximized ? 'pointer-events-auto' : ''} ${
          isTerminalMinimized 
            ? 'w-[95vw] md:w-[300px] h-[50px] rounded-lg' 
            : isTerminalMaximized 
            ? 'w-screen h-screen rounded-none absolute inset-0' 
            : 'w-[95vw] md:w-[80vw] lg:w-[600px] h-[500px] rounded-lg'
        } shadow-2xl flex flex-col overflow-hidden ${
          isDarkMode ? 'bg-slate-900 border border-slate-700' : 'bg-white border border-slate-200'
        } ${isTerminalMaximized ? 'border-none' : ''} ${isDragging ? 'cursor-grabbing' : ''}`}
      >
        {/* Terminal Header */}
        <div 
          onMouseDown={handleMouseDown}
          className={`px-4 py-3 flex items-center justify-between border-b ${
            isDarkMode ? 'bg-slate-800 border-slate-700' : 'bg-slate-50 border-slate-200'
          } ${!isTerminalMaximized ? 'cursor-grab active:cursor-grabbing' : 'cursor-default'}`}
        >
          <div className="flex items-center gap-2">
            <button
              onClick={() => resetTerminal()}
              className="w-4 h-4 rounded-full bg-red-500 hover:bg-red-600 transition-colors flex items-center justify-center group"
              title={t('Close')}
            >
              <FaTimes size={8} className="text-white group-hover:scale-110 transition-transform" />
            </button>
            <button
              onClick={() => {
                setIsTerminalFloating(!isTerminalFloating);
                if (!isTerminalFloating) {
                  setShowTerminal(false);
                }
              }}
              className="w-4 h-4 rounded-full bg-yellow-500 hover:bg-yellow-600 transition-colors flex items-center justify-center group"
              title={t('Minimize')}
            >
              <FaMinus size={8} className="text-white group-hover:scale-110 transition-transform" />
            </button>
            <button
              onClick={() => setIsTerminalMaximized(!isTerminalMaximized)}
              className="w-4 h-4 rounded-full bg-green-500 hover:bg-green-600 transition-colors flex items-center justify-center group"
              title={t('Maximize')}
            >
              <FaExpand size={8} className="text-white group-hover:scale-110 transition-transform" />
            </button>
            <span className={`ml-3 font-mono text-sm font-bold ${
              isDarkMode ? 'text-slate-300' : 'text-slate-700'
            }`}>{t('Interactive Terminal')}</span>
          </div>
          <button
            onClick={() => resetTerminal()}
            className={`p-1 rounded hover:bg-slate-700 transition-colors ${
              isDarkMode ? 'text-slate-400 hover:text-white' : 'text-slate-600 hover:text-black'
            }`}
          >
            ✕
          </button>
        </div>

        {/* Terminal Content */}
        {!isTerminalMinimized && (
          <>
            <div 
              ref={terminalContentRef}
              className={`flex-1 overflow-y-auto p-4 font-mono text-sm space-y-1 ${
              isDarkMode ? 'bg-slate-950 text-slate-200' : 'bg-slate-50 text-slate-800'
            }`}>
              {terminalHistory.map((line, idx) => (
                <div key={idx} className={line.includes('//') ? (isDarkMode ? 'text-green-400' : 'text-green-600') : ''}>
                  {line.split('\n').map((subline, subidx) => (
                    <div key={subidx}>{subline}</div>
                  ))}
                </div>
              ))}
            </div>

            {/* Terminal Input */}
            <div className={`px-4 py-3 border-t flex items-center gap-2 ${
              isDarkMode ? 'bg-slate-900 border-slate-700' : 'bg-slate-100 border-slate-200'
            }`}>
              <span className="text-[#00BD95] font-mono font-bold">$</span>
              <input
                id="terminal-input"
                type="text"
                value={terminalInput}
                onChange={(e) => setTerminalInput(e.target.value)}
                onKeyDown={handleTerminalCommand}
                autoFocus
                placeholder={t('Type command...')}
                className={`flex-1 bg-transparent outline-none font-mono ${
                  isDarkMode ? 'text-white placeholder-slate-500' : 'text-slate-900 placeholder-slate-400'
                }`}
              />
              <button
                onClick={executeCommand}
                disabled={!terminalInput.trim()}
                className={`p-2 rounded-md transition-all duration-200 ${
                  terminalInput.trim()
                    ? 'bg-[#00BD95] hover:bg-cyan-600 text-white cursor-pointer'
                    : isDarkMode
                    ? 'bg-slate-800 text-slate-600 cursor-not-allowed'
                    : 'bg-slate-200 text-slate-400 cursor-not-allowed'
                }`}
                title={t('Send command')}
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 5l7 7-7 7M5 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
