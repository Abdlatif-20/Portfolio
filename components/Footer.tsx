'use client'
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next';

const Footer = () => {
    const { t } = useTranslation();
    const [theme, setTheme] = useState("dark");
    useEffect(() => {
      const localTheme = localStorage.getItem("theme");
      console.log(localTheme);
      if (localTheme) {
        setTheme(localTheme);
      }
    }
    , [theme]);
  return (
    <p className={`text-center text-md h-12 pt-5 ${theme == "dark" ? "bg-[#21272F] text-gray-400" : "text-black"}
    `}>
    {t('Designed and Developed by')} Abdellatyf En-Neiymy © {new Date().getFullYear()}.
    </p>
  )
}

export default Footer
