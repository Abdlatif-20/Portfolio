'use client'
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useDarkMode } from './context';
import { FaPhoneAlt, FaGithub, FaLinkedin, FaInstagram, FaChevronUp } from 'react-icons/fa';
import { MdEmail } from 'react-icons/md';
import { FaLocationArrow } from 'react-icons/fa';

const Footer = () => {
  const { t } = useTranslation();
  const { isDarkMode } = useDarkMode();

  const contact = [
    { label: t('Phone'), value: '+212777191684', href: 'tel:+212777191684', icon: <FaPhoneAlt /> },
    { label: t('Email'), value: 'ab.enneiymy@gmail.com', href: 'mailto:ab.enneiymy@gmail.com', icon: <MdEmail size={20} /> },
    { label: t('Location'), value: 'Casablanca, Morocco', href: '#', icon: <FaLocationArrow /> },
  ];

  const quickLinks = [
    { name: t('About'), href: '/' },
    { name: t('Projects'), href: '#projects' },
    { name: t('Education'), href: '#education' },
    { name: t('Skills'), href: '#skills' },
    { name: t('Contact'), href: '#contact' },
  ];

  const social = [
    { name: 'GitHub', href: 'https://github.com/Abdlatif-20', icon: <FaGithub /> },
    { name: 'LinkedIn', href: 'https://www.linkedin.com/in/aben-nei/', icon: <FaLinkedin /> },
    { name: 'Instagram', href: 'https://www.instagram.com/Abdellatyf_en_neiymy', icon: <FaInstagram /> },
  ];

  const scrollToTop = () => {
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <footer className={`w-full py-10 ${isDarkMode ? 'bg-slate-900 text-slate-300' : 'bg-slate-50 text-slate-800'} border-t ${isDarkMode ? 'border-slate-800' : 'border-slate-200'}`}>
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Contact */}
          <div className="flex flex-col gap-4">
            <h3 className={`text-lg font-bold mb-2 tracking-wide ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>{t('Contact')}</h3>
            <div className="flex flex-col gap-3">
              {contact.map((c, idx) => (
                <a key={idx} href={c.href} className="flex items-center gap-3 group hover:scale-[1.03] transition-transform" aria-label={`${c.label}: ${c.value}`}
                  style={{ textDecoration: 'none' }}>
                  <span className={`p-3 rounded-xl shadow-md transition-all duration-300 group-hover:bg-[#00BD95] group-hover:text-white ${isDarkMode ? 'bg-slate-800 text-white' : 'bg-white text-[#00BD95]'}`}>{c.icon}</span>
                  <div className="text-sm">
                    <div className="font-semibold group-hover:text-[#00BD95] transition-colors">{c.value}</div>
                    <div className="text-xs text-slate-400">{c.label}</div>
                  </div>
                </a>
              ))}
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h3 className={`text-lg font-bold mb-2 tracking-wide ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>{t('Quick links')}</h3>
            <ul className="mt-3 grid grid-cols-2 gap-2 text-sm">
              {quickLinks.map((l, i) => (
                <li key={i}>
                  <a href={l.href} className="px-3 py-2 rounded-lg bg-slate-100/40 hover:bg-[#00BD95] hover:text-white transition-colors font-medium block text-center shadow-sm">{l.name}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Social + back to top */}
          <div className="flex flex-col items-start md:items-end gap-4">
            <h3 className={`text-lg font-bold mb-2 tracking-wide ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>{t('Follow')}</h3>
            <div className="flex gap-3">
              {social.map((s, i) => (
                <a key={i} href={s.href} target="_blank" rel="noreferrer" className="p-3 rounded-xl shadow-md bg-slate-100/40 hover:bg-[#00BD95] hover:text-white transition-all duration-300 group flex items-center justify-center text-xl"
                  aria-label={s.name}>
                  <span className="group-hover:animate-spin-slow transition-transform duration-300">{s.icon}</span>
                </a>
              ))}
            </div>
            <div className="mt-4 flex items-center gap-2">
              <button onClick={scrollToTop} aria-label="Back to top" className="p-2 rounded-full bg-gradient-to-r from-[#00BD95] to-[#00A884] text-white hover:shadow-lg transition-shadow">
                <FaChevronUp />
              </button>
              <div className="text-xs text-slate-400">{t('Back to top')}</div>
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center gap-3 pt-6 border-t border-slate-200/10">
          <p className="text-sm font-medium tracking-wide flex items-center gap-2">
            <span className="bg-gradient-to-r from-[#00BD95] to-[#00A884] text-white px-2 py-1 rounded-lg mr-2">AE</span>
            {t('Designed and Developed by')} Abdellatyf En-Neiymy © {new Date().getFullYear()}.
          </p>
          <p className="text-sm text-slate-400 flex items-center gap-2">
            <span className="inline-block w-3 h-3 rounded-full bg-[#00BD95] mr-2"></span>
            {t('Built with Next.js • Tailwind CSS')}
          </p>
        </div>
      </div>
      <style jsx>{`
        @keyframes spin-slow {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        .animate-spin-slow {
          animation: spin-slow 2.5s linear infinite;
        }
      `}</style>
    </footer>
  );
};

export default Footer;
