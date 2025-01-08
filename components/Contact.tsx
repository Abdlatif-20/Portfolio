'use client';

import React from 'react'
import { useTranslation } from 'react-i18next';
import { useDarkMode } from './context';
import { useRef } from 'react';
import emailjs from '@emailjs/browser';
import { toast } from 'react-toastify';


const Contact = () => {
  const { t } = useTranslation();
  const { isDarkMode } = useDarkMode();
  const socialMedia = [
    {
      name: 'aben-nei',
      icon: 'in',
      alt: 'LinkedIn',
      link: 'https://www.linkedin.com/in/aben-nei/',
    },
    {
      name: 'Abdlatif-20',
      icon: 'gb',
      alt: 'Github',
      link: 'https://www.github.com/Abdlatif-20',
    },
    {
      name: 'Abdellatyf_en_enneiymy',
      icon: 'ig',
      alt: 'Instagram',
      link: 'https://www.instagram.com/Abdellatyf_en_neiymy',
    },
  ]

  const form = useRef<HTMLFormElement>(null);

  const sendEmail = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!form.current) {
      return;
    }
    const formElements = form.current?.elements as typeof form.current.elements & {
      full_name: HTMLInputElement;
      email: HTMLInputElement;
      message: HTMLTextAreaElement;
    };    const fullName = formElements?.full_name.value;
    const email = formElements?.email.value;
    const message = formElements?.message.value;

    if (!fullName || !email || !message) {
      toast.error('Please fill in all fields');
      return;
    }

    if (form.current) {
      emailjs
      .sendForm('service_8omx4go', 'template_eeg0mof', form.current, {
        publicKey: '0ABzKUxfF6zbu1lkZ',
      })
        .then(
          () => {
            toast.success('Message sent successfully');
            form.current?.reset();
          },
          (error) => {
            toast.error('An error occurred, Please try again later');
          },
        );
    }
  };

  return (
    <div id='contact' className='flex flex-col justify-center items-center w-[95%] lg:w-[80%] min-h-[70vh]'>
      <h1 className='text-[40px] text-shadow-textShadow-green font-bold mb-5 h-[35%] w-full flex justify-center items-center brightness-70'>
        {t("Contact")}
      </h1>
      <div className='flex flex-col justify-between items-center w-full h-full '
        style={{border: `${isDarkMode ? '0.3px solid rgba(255, 255, 255, 0.3)' : '0.3px solid rgba(0, 0, 0, 0.3)'}`
      }}>
        <p className='text-[22px] md:text-[40px] text-shadow-textShadow-green font-bold w-full flex justify-center items-start brightness-70 mt-5 '>
          {t("Drop me a message")}
        </p>
        <div className='flex w-full flex-col md:flex-row justify-start md:items-center h-full'>
          <form ref={form} onSubmit={sendEmail} className='flex flex-col justify-center items-center w-full md:w-1/2 h-[80%]'>
            <input
              className={`w-[80%] h-[50px] my-9 bg-transparent border-b ${ isDarkMode ? 'border-white' : 'border-black' }
              border-opacity-50 text-[20px] ${ isDarkMode ? 'placeholder-white' : 'placeholder-black' }  placeholder-opacity-50 focus:outline-none focus:border-green-500`}
              type='text'
              name='full_name'
              placeholder={t('Full Name')}
            />
            <input
              className={`w-[80%] h-[50px] my-9 bg-transparent border-b ${ isDarkMode ? 'border-white' : 'border-black' } border-opacity-50 text-[20px] ${ isDarkMode ? 'placeholder-white' : 'placeholder-black' }  placeholder-opacity-50 focus:outline-none focus:border-green-500`}
              type='email'
              name='email'
              placeholder={t('E-mail')}
            />
            <textarea
              className={`w-[80%] h-[80px] bg-transparent border-b ${ isDarkMode ? 'border-white' : 'border-black' } border-opacity-50 text-[20px] ${ isDarkMode ? 'placeholder-white' : 'placeholder-black' }  placeholder-opacity-50 focus:outline-none focus:border-green-500`}
              placeholder={t('Message')}
              name='message'
              >
              </textarea>
              <button className="relative bg-[#00BD95] w-[60%] md:w-[40%] py-2 my-10 rounded-lg shadow-btnShadow overflow-hidden group">
              <span className="absolute top-0 left-0 w-full h-full -translate-x-full translate-y-full rotate-[-40deg] rounded bg-gradient-to-br
              from-[#ff8a05] via-[#ff5478] to-[#ff00c6] transition-all duration-500 ease-out group-hover:translate-x-0 group-hover:translate-y-0
                group-hover:rotate-0"></span>
              <h1 className="relative text-md lg:text-2xl font-bold w-full text-white transition-colors duration-300 ease-in-out group-hover:text-white">
                {t("Send")}
              </h1>
            </button>
          </form>
          <div className='flex flex-col md:flex-row justify-center items-center w-full md:w-1/2 h-full'>
          <div className={`border-t my-5 md:my-0 md:border-r border-opacity-50 w-[80%] md:w-auto md:h-[300px]
          ${isDarkMode ? 'border-white' : 'border-black'}
            `}></div>
          <div className='flex md:flex-col justify-around md:justify-center items-start w-full md:w-[80%] h-full mb-5 md:mb-0'>
            {socialMedia.map((social, index) => (
              <div key={index} className='flex justify-around md:justify-start w-full items-center h-[20%] md:m-3'>
                <a href={social.link} target='_blank' rel='noreferrer'>
                <img src={`images/${social.icon}.png`} alt='' className='md:w-[61px] md:h-[56px] w-[50px] h-[45px] brightness-70 hover:brightness-100
                ' />
                </a>
                <p className='text-[20px] md:ml-5 text-shadow-textShadow-green hidden md:block'>{social.name}</p>
              </div>
            ))}
          </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Contact
