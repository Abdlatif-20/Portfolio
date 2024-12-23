'use client';

import React from 'react'
import { useTranslation } from 'react-i18next';

const Contact = () => {
  const { t } = useTranslation();
  const socialMedia = [
    {
      name: 'aben-nei',
      icon: 'in',
      alt: 'LinkedIn',
      link: ' ',
    },
    {
      name: 'Abdlatif-20',
      icon: 'gb',
      alt: 'Github',
      link: ' ',
    },
    {
      name: 'Abdellatyf_en_enneiymy',
      icon: 'ig',
      alt: 'Instagram',
      link: ' ',
    },
  ]
  const Contact = [
    {
      name: '+212777191684',
      icon: 'phone',
      link: ' ',
    },
    {
      name: 'ab.enneiymy@gmail.com',
      icon: 'email',
      link: ' ',
    },
  ]
  return (
    <div id='contact' className='flex flex-col justify-center items-center w-[80%] h-screen '>
      <h1 className='text-[40px] text-shadow-textShadow-green text-white font-bold  h-[35%] w-full flex justify-center items-center brightness-70'>
        {t("Contact")}
      </h1>
      <div className='flex flex-col justify-between items-center w-full h-full ' style={{border: '0.3px solid rgba(255, 255, 255, 0.3)'}}>
        <p className='text-[40px] text-shadow-textShadow-green text-white font-bold   w-full flex justify-center items-start brightness-70 mt-3'>
          {t("Drop me a message")}
        </p>
        <div className='flex w-full justify-start items-center  h-full'>
          <form className='flex flex-col justify-center items-center w-1/2 h-[80%]'>
            <input
              className='w-[80%] h-[50px] my-9 bg-transparent border-b border-white border-opacity-50 text-white text-[20px] placeholder-white placeholder-opacity-50 focus:outline-none focus:border-green-500'
              type='text'
              placeholder={t('Full Name')}
            />
            <input
              className='w-[80%] h-[50px] my-9 bg-transparent border-b border-white border-opacity-50 text-white text-[20px] placeholder-white placeholder-opacity-50 focus:outline-none focus:border-green-500'
              type='email'
              placeholder={t('E-mail')}
            />
            <textarea
              className='w-[80%] h-[80px] bg-transparent border-b border-white border-opacity-50 text-white text-[20px] placeholder-white placeholder-opacity-50 focus:outline-none focus:border-green-500'
              placeholder={t('Message')}></textarea>
              <button className='bg-[#00BD95] text-white w-[40%] py-2 mt-10 rounded-lg shadow-btnShadow'>
                <h1 className='text-md lg:text-2xl font-bold w-full 
                '>
                  {t("Send")}
                </h1>
              </button>
          </form>
          <div className='flex justify-center items-center w-1/2 h-full'>
          <div className='border-r border-white border-opacity-50 h-[70%]'></div>
          <div className='flex flex-col justify-center items-start w-[70%] h-full  '>
            {socialMedia.map((social, index) => (
              <div key={index} className='flex justify-start items-center w-full h-[20%] ml-3 '>
                <img src={`images/${social.icon}.png`} alt='' className='w-[61px] h-[56px]' />
                <p className='text-[20px] text-white ml-5 text-shadow-textShadow-green'>{social.name}</p>
              </div>
            ))}
          </div>
          </div>
        </div>
        <div className='flex flex-col justify-center items-center w-full h-[25%]'>
        <div className='flex justify-center items-center w-full h-[20%] '>
          {Contact.map((contact, index) => (
            <div key={index} className='flex justify-around items-center w-full h-full '>
            <div className='flex justify-start items-center w-[80%] h-full ml-3 '>
              <img src={`images/${contact.icon}.png`} alt='' className='w-[61px] h-[56px]' />
              <p className='text-[20px] text-white ml-5 text-shadow-textShadow-green'>{contact.name}</p>
            </div>
            </div>
          ))}
        </div>
            <div className='flex justify-start items-center w-[45%] h-full ml-3 '>
              <img src={`images/location.png`} alt='' className='w-[61px] h-[56px]' />
              <p className='text-[20px] text-white ml-5 text-shadow-textShadow-green'>Casablanca, Morocco
              </p>
            </div>
        </div>
      </div>
    </div>
  )
}

export default Contact
