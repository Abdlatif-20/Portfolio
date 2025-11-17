'use client';

import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDarkMode } from './context';
import { useRef } from 'react';
import emailjs from '@emailjs/browser';
import { toast } from 'react-toastify';
import { FaLinkedin, FaGithub, FaInstagram, FaEnvelope, FaPhone, FaMapMarkerAlt, FaPaperPlane } from 'react-icons/fa';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

const Contact = () => {
  const { t } = useTranslation();
  const { isDarkMode } = useDarkMode();
  const [isSending, setIsSending] = useState(false);
  const [focusedInput, setFocusedInput] = useState<string | null>(null);
  const { ref, isVisible } = useScrollAnimation(0.1);

  const socialMedia = [
    {
      name: 'LinkedIn',
      username: 'aben-nei',
      icon: <FaLinkedin />,
      link: 'https://www.linkedin.com/in/aben-nei/',
      color: '#0A66C2',
    },
    {
      name: 'GitHub',
      username: 'Abdlatif-20',
      icon: <FaGithub />,
      link: 'https://www.github.com/Abdlatif-20',
      color: '#181717',
    },
    {
      name: 'Instagram',
      username: 'Abdellatyf_en_neiymy',
      icon: <FaInstagram />,
      link: 'https://www.instagram.com/Abdellatyf_en_neiymy',
      color: '#E4405F',
    },
  ];

  const contactInfo = [
    {
      icon: <FaEnvelope />,
      label: 'Email',
      value: 'ab.enneiymy@gmail.com',
      link: 'mailto:ab.enneiymy@gmail.com',
    },
    {
      icon: <FaMapMarkerAlt />,
      label: 'Location',
      value: 'Casablanca, Morocco',
      link: null,
    },
  ];

  const form = useRef<HTMLFormElement>(null);

  const sendEmail = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!form.current) return;

    const formElements = form.current?.elements as typeof form.current.elements & {
      full_name: HTMLInputElement;
      email: HTMLInputElement;
      message: HTMLTextAreaElement;
    };
    
    const fullName = formElements?.full_name.value;
    const email = formElements?.email.value;
    const message = formElements?.message.value;

    if (!fullName || !email || !message) {
      toast.error(t('Please fill in all fields'));
      return;
    }

    setIsSending(true);
    
    try {
      await emailjs.sendForm('service_8omx4go', 'template_eeg0mof', form.current, {
        publicKey: '0ABzKUxfF6zbu1lkZ',
      });
      toast.success(t('Message sent successfully'));
      form.current?.reset();
    } catch (error) {
      toast.error(t('An error occurred, Please try again later'));
    } finally {
      setIsSending(false);
    }
  };

  return (
    <section ref={ref as React.RefObject<HTMLElement>} id='contact' className={`w-full px-4 py-12 sm:py-16 transition-all duration-1000 ${
      isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'
    }`}>
      <div className='max-w-6xl mx-auto'>
        {/* Header */}
        <header className="mb-8 md:mb-12">
          <h2 className={`text-3xl md:text-4xl font-extrabold ${isDarkMode ? "text-white" : "text-black"}`}>
            {t("Contact")}
          </h2>
          <p className={`mt-2 text-sm md:text-base ${isDarkMode ? "text-slate-300" : "text-slate-600"}`}>
            {t("Let's work together on your next project")}
          </p>
        </header>

        <div className='grid grid-cols-1 lg:grid-cols-3 gap-6'>
          {/* Contact Info Cards */}
          <div className={`space-y-6 transition-all duration-700 delay-100 ${
            isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-20'
          }`}>
            {/* Contact Information */}
            <div className={`rounded-2xl p-6 ${
              isDarkMode 
                ? "bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700" 
                : "bg-gradient-to-br from-white to-slate-50 border border-gray-200"
            } shadow-lg`}>
              <h3 className={`text-lg font-bold mb-4 ${isDarkMode ? "text-white" : "text-slate-900"}`}>
                {t("Contact Information")}
              </h3>
              <div className="space-y-4">
                {contactInfo.map((info, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${
                      isDarkMode ? "bg-[#00BD95]/20 text-[#00BD95]" : "bg-[#00BD95]/10 text-[#00BD95]"
                    }`}>
                      <span className="text-lg">{info.icon}</span>
                    </div>
                    <div className="flex-1">
                      <p className={`text-xs font-medium ${isDarkMode ? "text-slate-400" : "text-slate-600"}`}>
                        {t(info.label)}
                      </p>
                      {info.link ? (
                        <a 
                          href={info.link}
                          className={`text-sm font-semibold hover:text-[#00BD95] transition-colors ${
                            isDarkMode ? "text-white" : "text-slate-900"
                          }`}
                        >
                          {info.value}
                        </a>
                      ) : (
                        <p className={`text-sm font-semibold ${isDarkMode ? "text-white" : "text-slate-900"}`}>
                          {info.value}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Social Media */}
            <div className={`rounded-2xl p-6 ${
              isDarkMode 
                ? "bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700" 
                : "bg-gradient-to-br from-white to-slate-50 border border-gray-200"
            } shadow-lg`}>
              <h3 className={`text-lg font-bold mb-4 ${isDarkMode ? "text-white" : "text-slate-900"}`}>
                {t("Connect with me")}
              </h3>
              <div className="space-y-3">
                {socialMedia.map((social, index) => (
                  <a
                    key={index}
                    href={social.link}
                    target='_blank'
                    rel='noreferrer'
                    className={`flex items-center gap-3 p-3 rounded-xl transition-all duration-300 group ${
                      isDarkMode 
                        ? "bg-slate-800/50 hover:bg-slate-700/50" 
                        : "bg-slate-50 hover:bg-white hover:shadow-md"
                    }`}
                  >
                    <div 
                      className="w-10 h-10 rounded-lg flex items-center justify-center text-white text-xl transition-transform duration-300 group-hover:scale-110"
                      style={{ backgroundColor: social.color }}
                    >
                      {social.icon}
                    </div>
                    <div className="flex-1">
                      <p className={`font-semibold text-sm ${isDarkMode ? "text-white" : "text-slate-900"}`}>
                        {social.name}
                      </p>
                      <p className="text-xs text-slate-400">@{social.username}</p>
                    </div>
                    <svg 
                      className={`w-5 h-5 transition-transform duration-300 group-hover:translate-x-1 ${
                        isDarkMode ? "text-slate-400" : "text-slate-600"
                      }`} 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className={`lg:col-span-2 transition-all duration-700 delay-300 ${
            isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-20'
          }`}>
            <div className={`rounded-2xl p-8 ${
              isDarkMode 
                ? "bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700" 
                : "bg-gradient-to-br from-white to-slate-50 border border-gray-200"
            } shadow-lg`}>
              <h3 className={`text-2xl font-bold mb-2 ${isDarkMode ? "text-white" : "text-slate-900"}`}>
                {t("Drop me a message")}
              </h3>
              <p className={`text-sm mb-8 ${isDarkMode ? "text-slate-400" : "text-slate-600"}`}>
                {t("I'll get back to you as soon as possible")}
              </p>

              <form ref={form} onSubmit={sendEmail} className='space-y-6'>
                {/* Full Name Input */}
                <div>
                  <label 
                    htmlFor="full_name"
                    className={`block text-sm font-medium mb-2 ${isDarkMode ? "text-slate-300" : "text-slate-700"}`}
                  >
                    {t('Full Name')}
                  </label>
                  <input
                    id="full_name"
                    type='text'
                    name='full_name'
                    onFocus={() => setFocusedInput('name')}
                    onBlur={() => setFocusedInput(null)}
                    className={`w-full px-4 py-3 rounded-xl transition-all duration-300 ${
                      isDarkMode 
                        ? "bg-slate-700/50 border-2 border-slate-600 text-white placeholder-slate-400" 
                        : "bg-white border-2 border-slate-200 text-slate-900 placeholder-slate-400"
                    } ${
                      focusedInput === 'name' ? "border-[#00BD95] ring-4 ring-[#00BD95]/20" : ""
                    } focus:outline-none`}
                    placeholder={t('Enter your full name')}
                  />
                </div>

                {/* Email Input */}
                <div>
                  <label 
                    htmlFor="email"
                    className={`block text-sm font-medium mb-2 ${isDarkMode ? "text-slate-300" : "text-slate-700"}`}
                  >
                    {t('Email')}
                  </label>
                  <input
                    id="email"
                    type='email'
                    name='email'
                    onFocus={() => setFocusedInput('email')}
                    onBlur={() => setFocusedInput(null)}
                    className={`w-full px-4 py-3 rounded-xl transition-all duration-300 ${
                      isDarkMode 
                        ? "bg-slate-700/50 border-2 border-slate-600 text-white placeholder-slate-400" 
                        : "bg-white border-2 border-slate-200 text-slate-900 placeholder-slate-400"
                    } ${
                      focusedInput === 'email' ? "border-[#00BD95] ring-4 ring-[#00BD95]/20" : ""
                    } focus:outline-none`}
                    placeholder={t('your.email@example.com')}
                  />
                </div>

                {/* Message Textarea */}
                <div>
                  <label 
                    htmlFor="message"
                    className={`block text-sm font-medium mb-2 ${isDarkMode ? "text-slate-300" : "text-slate-700"}`}
                  >
                    {t('Message')}
                  </label>
                  <textarea
                    id="message"
                    name='message'
                    rows={6}
                    onFocus={() => setFocusedInput('message')}
                    onBlur={() => setFocusedInput(null)}
                    className={`w-full px-4 py-3 rounded-xl transition-all duration-300 resize-none ${
                      isDarkMode 
                        ? "bg-slate-700/50 border-2 border-slate-600 text-white placeholder-slate-400" 
                        : "bg-white border-2 border-slate-200 text-slate-900 placeholder-slate-400"
                    } ${
                      focusedInput === 'message' ? "border-[#00BD95] ring-4 ring-[#00BD95]/20" : ""
                    } focus:outline-none`}
                    placeholder={t('Tell me about your project...')}
                  />
                </div>

                {/* Submit Button */}
                <button 
                  type="submit"
                  disabled={isSending}
                  className={`w-full py-4 rounded-xl font-bold text-white transition-all duration-300 flex items-center justify-center gap-3 ${
                    isSending
                      ? "bg-slate-400 cursor-not-allowed"
                      : "bg-gradient-to-r from-[#00BD95] to-cyan-600 hover:shadow-xl hover:scale-[1.02] active:scale-[0.98]"
                  }`}
                >
                  {isSending ? (
                    <>
                      <div className="w-5 h-5 border-3 border-white border-t-transparent rounded-full animate-spin" />
                      {t('Sending...')}
                    </>
                  ) : (
                    <>
                      <FaPaperPlane />
                      {t("Send Message")}
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
