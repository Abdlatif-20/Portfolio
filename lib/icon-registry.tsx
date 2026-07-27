import React from "react";
import {
  FaHtml5,
  FaCss3Alt,
  FaReact,
  FaDocker,
  FaGithub,
  FaPython,
  FaAngular,
  FaLinkedin,
  FaInstagram,
  FaEnvelope,
  FaMapMarkerAlt,
  FaPhone,
  FaServer,
  FaNode,
  FaGit,
  FaTerminal,
  FaDownload,
  FaCode,
  FaGraduationCap,
  FaBriefcase,
  FaTools,
} from "react-icons/fa";
import {
  SiTypescript,
  SiDjango,
  SiI18Next,
  SiStrapi,
  SiPostman,
  SiExpress,
  SiNextdotjs,
  SiTailwindcss,
  SiPostgresql,
} from "react-icons/si";
import { RiNextjsFill, RiTailwindCssFill } from "react-icons/ri";
import { BiLogoPostgresql } from "react-icons/bi";
import { TbApi, TbBrandReactNative } from "react-icons/tb";
import { PiFileCppFill } from "react-icons/pi";
import { VscTerminalBash, VscVscode } from "react-icons/vsc";
import { DiVim } from "react-icons/di";
import { HiHome } from "react-icons/hi";

export const iconRegistry: Record<string, React.ComponentType<{ className?: string; size?: number }>> = {
  FaHtml5,
  FaCss3Alt,
  FaReact,
  FaDocker,
  FaGithub,
  FaPython,
  FaAngular,
  FaLinkedin,
  FaInstagram,
  FaEnvelope,
  FaMapMarkerAlt,
  FaPhone,
  FaServer,
  FaNode,
  FaGit,
  FaTerminal,
  FaDownload,
  FaCode,
  FaGraduationCap,
  FaBriefcase,
  FaTools,
  SiTypescript,
  SiDjango,
  SiI18Next,
  SiStrapi,
  SiPostman,
  SiExpress,
  SiNextdotjs,
  SiTailwindcss,
  SiPostgresql,
  RiNextjsFill,
  RiTailwindCssFill,
  BiLogoPostgresql,
  TbApi,
  TbBrandReactNative,
  PiFileCppFill,
  VscTerminalBash,
  VscVscode,
  DiVim,
  HiHome,
};

export const iconNames = Object.keys(iconRegistry);

export function Icon({
  name,
  className,
  size,
}: {
  name: string;
  className?: string;
  size?: number;
}) {
  const Component = iconRegistry[name];
  if (!Component) return null;
  return <Component className={className} size={size} />;
}
