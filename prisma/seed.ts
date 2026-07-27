import { PrismaClient } from "../lib/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import faq from "../public/data/profile_faq.json";

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
const prisma = new PrismaClient({ adapter });

async function main() {
  await prisma.project.createMany({
    data: [
      {
        title: "Portfolio",
        description: "Portfolio_desc",
        href: "https://github.com/Abdlatif-20/Portfolio",
        techStack: ["Next.js", "TailwindCSS", "i18next", "Framer Motion", "React Icons", "React Toastify", "i18next"],
        image: "/projects/portfolio.png",
        category: "Web Development",
        featured: true,
        order: 0,
      },
      {
        title: "MyJoboard",
        description: "MyJoboard_desc",
        href: "https://www.job.myjoboard-ma.com/",
        techStack: ["React", "Tailwind", "Express", "Postgres"],
        live: true,
        image: "/projects/myjoboard.webp",
        category: "Web Development",
        featured: true,
        order: 1,
      },
      {
        title: "rhmetrics",
        description: "rhmetrics_desc",
        href: "https://rhmetrics.ma/",
        techStack: ["React", "Tailwind", "Strapi", "Postgres"],
        live: true,
        image: "/projects/rhmetrics.webp",
        category: "Web Development",
        order: 2,
      },
      {
        title: "Pong Game",
        description: "Pong Game_desc",
        href: "https://github.com/Abdlatif-20/ft_transcendence",
        techStack: ["TypeScript", "Next.js", "Tailwind", "Postgres", "Redis", "WebSockets", "Docker", "Django", "Python", "REST API", "i18next", "Postman"],
        image: "/projects/pong.webp",
        category: "Web Development",
        order: 3,
      },
      {
        title: "Web Server",
        description: "Web Server_desc",
        href: "https://github.com/Abdlatif-20/webserv",
        techStack: ["C++", "HTTP", "Server"],
        image: "/projects/webserver.webp",
        category: "Systems Programming",
        order: 4,
      },
      {
        title: "Inception",
        description: "Inception_desc",
        href: "https://github.com/Abdlatif-20/Inception_42",
        techStack: ["Docker", "nginx", "WordPress", "mySQL"],
        image: "/projects/inception.webp",
        category: "DevOps",
        order: 5,
      },
      {
        title: "Cub3D",
        description: "Cub3D_desc",
        href: "https://github.com/Abdlatif-20/cub3D_42",
        techStack: ["C", "raycasting", "minilibx"],
        image: "/projects/cub3d42.webp",
        category: "Systems Programming",
        order: 6,
      },
    ],
  });

  await prisma.educationItem.createMany({
    data: [
      {
        institution: "1337 (UM6P)",
        degree: "Software Engineering",
        period: "2022 — PRESENT",
        location: "Khouribga, Morocco",
        status: "In Progress",
        note: "I learned various programming languages and computer science concepts through hands-on projects and peer-to-peer learning.",
        skills: ["C/C++", "Algorithms", "System Programming", "Web Development", "Collaboration", "Problem-Solving", "Critical Thinking", "Adaptability", "Self-Learning", "Time Management", "Communication", "Teamwork", "Project Management"],
        order: 0,
      },
      {
        institution: "Faculté des Sciences Ben M'Sik Casablanca",
        degree: "PHYSICAL SCIENCES",
        period: "2021 — 2022",
        location: "Casablanca, Morocco",
        status: "Completed",
        note: "Completed foundational coursework in physics and mathematics, preparing for advanced studies in computer science.",
        skills: ["Physics", "Mathematics"],
        order: 1,
      },
      {
        institution: "Lycée dakhla",
        degree: "Life and Earth Sciences Baccalaureate",
        period: "2019 — 2020",
        location: "Casablanca, Morocco",
        status: "Graduated",
        note: "Graduated with a focus on life and earth sciences, developing analytical and scientific skills.",
        skills: ["Life Sciences", "Earth Sciences", "Analytical Thinking"],
        order: 2,
      },
    ],
  });

  await prisma.experienceCompany.create({
    data: {
      name: "Z.system",
      logo: "/images/logos/zsystems1_logo.jpeg",
      totalDuration: "8 months",
      startDate: "2025/12",
      endDate: "Present",
      order: 0,
      roles: {
        create: [
          {
            title: "Full Stack Developer",
            type: "Full-time",
            period: "2026/04 - Present",
            duration: "1 month",
            location: "Casablanca",
            description: "Worked on the front-end development of the backoffice platform, building responsive interfaces and improving internal tools for better usability and workflow efficiency",
            achievements: [],
            technologies: ["React", "TypeScript", "Tailwind CSS", "Angular", "Git", "Next.js", "React Native", "Express.js", "PostgreSQL", "Spring Boot", "Docker"],
            order: 0,
          },
          {
            title: "Frontend Developer",
            type: "Internship",
            period: "2025/12 - 2026/04",
            duration: "5 months",
            location: "Casablanca",
            description: "Started internship developing responsive web applications using React and TypeScript. Implemented clean component structures, optimized rendering, and contributed to multiple client projects.",
            achievements: [],
            technologies: ["React", "TypeScript", "Tailwind CSS", "Angular", "Git", "Next.js"],
            order: 1,
          },
        ],
      },
    },
  });

  await prisma.experienceCompany.create({
    data: {
      name: "Freelance",
      logo: "/images/logos/fiverr-logo.jpg",
      totalDuration: "Ongoing",
      startDate: "2025",
      endDate: "Present",
      order: 1,
      roles: {
        create: [
          {
            title: "Full Stack Developer",
            type: "Freelance",
            period: "2025 - Present",
            duration: "1+ yr",
            location: "Remote",
            description: "Working as a freelance full-stack developer, creating custom web applications for various clients. Specializing in modern JavaScript frameworks and Python backend development.",
            achievements: [
              "Delivered 4+ successful projects for international clients",
              "Built scalable web applications using Next.js, React, and Django",
              "Maintained 100% client satisfaction with on-time delivery and quality code",
            ],
            technologies: ["React", "Next.js", "TypeScript", "Django", "PostgreSQL", "Tailwind CSS"],
            order: 0,
          },
        ],
      },
    },
  });

  await prisma.experienceCompany.create({
    data: {
      name: "talentech Solutions",
      logo: "/images/logos/talentech.jpeg",
      totalDuration: "7 months",
      startDate: "2025/01",
      endDate: "2025/07",
      order: 2,
      roles: {
        create: [
          {
            title: "Frontend Developer",
            type: "Internship",
            period: "2025/01 - 2025/07",
            duration: "7 months",
            location: "Technopark, Casablanca",
            description: "Developed two complete web platforms from scratch using Next.js, React, and Tailwind CSS, ensuring responsive layouts and smooth user experience.",
            achievements: [
              "Implemented clean component structures and optimized rendering, reducing UI load time and improving overall UX.",
              "Delivered 2 projects with 100% satisfaction rate",
              "Optimized web applications for maximum speed and scalability.",
            ],
            technologies: ["React", "TypeScript", "Tailwind CSS", "Strapi", "Git"],
            order: 0,
          },
        ],
      },
    },
  });

  await prisma.skillCategory.create({
    data: {
      title: "Frontend & Mobile",
      icon: "FaReact",
      color: "from-cyan-500 to-blue-500",
      order: 0,
      skills: {
        create: [
          { name: "HTML", icon: "FaHtml5", level: 95, color: "#E34F26", order: 0 },
          { name: "CSS", icon: "FaCss3Alt", level: 92, color: "#1572B6", order: 1 },
          { name: "TypeScript", icon: "SiTypescript", level: 88, color: "#3178C6", order: 2 },
          { name: "React", icon: "FaReact", level: 90, color: "#61DAFB", order: 3 },
          { name: "React Native", icon: "TbBrandReactNative", level: 90, color: "#61DAFB", order: 4 },
          { name: "Next.js", icon: "RiNextjsFill", level: 85, color: "#000000", order: 5 },
          { name: "Tailwind CSS", icon: "RiTailwindCssFill", level: 90, color: "#06B6D4", order: 6 },
          { name: "i18next", icon: "SiI18Next", level: 75, color: "#26A69A", order: 7 },
          { name: "Angular", icon: "FaAngular", level: 70, color: "#DD0031", order: 8 },
        ],
      },
    },
  });

  await prisma.skillCategory.create({
    data: {
      title: "Backend & APIs",
      icon: "FaPython",
      color: "from-green-500 to-emerald-500",
      order: 1,
      skills: {
        create: [
          { name: "Django", icon: "SiDjango", level: 82, color: "#092E20", order: 0 },
          { name: "Python", icon: "FaPython", level: 86, color: "#3776AB", order: 1 },
          { name: "Express", icon: "SiExpress", level: 70, color: "#000000", order: 2 },
          { name: "REST API", icon: "TbApi", level: 84, color: "#00BD95", order: 3 },
          { name: "PostgreSQL", icon: "BiLogoPostgresql", level: 80, color: "#4169E1", order: 4 },
        ],
      },
    },
  });

  await prisma.skillCategory.create({
    data: {
      title: "Systems & DevOps",
      icon: "FaDocker",
      color: "from-blue-500 to-indigo-500",
      order: 2,
      skills: {
        create: [
          { name: "Docker", icon: "FaDocker", level: 78, color: "#2496ED", order: 0 },
          { name: "C/C++", icon: "PiFileCppFill", level: 82, color: "#00599C", order: 1 },
          { name: "Bash", icon: "VscTerminalBash", level: 80, color: "#4EAA25", order: 2 },
        ],
      },
    },
  });

  await prisma.skillCategory.create({
    data: {
      title: "Tools & Others",
      icon: "FaGithub",
      color: "from-purple-500 to-pink-500",
      order: 3,
      skills: {
        create: [
          { name: "Vim", icon: "DiVim", level: 70, color: "#019733", order: 0 },
          { name: "VSCode", icon: "VscVscode", level: 90, color: "#007ACC", order: 1 },
          { name: "Git/GitHub", icon: "FaGithub", level: 88, color: "#181717", order: 2 },
          { name: "Strapi", icon: "SiStrapi", level: 70, color: "#2F74C0", order: 3 },
          { name: "Postman", icon: "SiPostman", level: 75, color: "#FF6C37", order: 4 },
        ],
      },
    },
  });

  await prisma.socialLink.createMany({
    data: [
      { platform: "LinkedIn", icon: "FaLinkedin", url: "https://www.linkedin.com/in/aben-nei/", username: "aben-nei", color: "#0A66C2", order: 0 },
      { platform: "GitHub", icon: "FaGithub", url: "https://www.github.com/Abdlatif-20", username: "Abdlatif-20", color: "#181717", order: 1 },
      { platform: "Instagram", icon: "FaInstagram", url: "https://www.instagram.com/Abdellatyf_en_neiymy", username: "Abdellatyf_en_neiymy", color: "#E4405F", order: 2 },
    ],
  });

  await prisma.contactInfoItem.createMany({
    data: [
      { icon: "FaEnvelope", label: "Email", value: "ab.enneiymy@gmail.com", link: "mailto:ab.enneiymy@gmail.com", order: 0 },
      { icon: "FaMapMarkerAlt", label: "Location", value: "Casablanca, Morocco", link: null, order: 1 },
    ],
  });

  await prisma.aboutContent.create({
    data: {
      typewriterPhrases: ["Abdellatyf En-neiymy", "Front End Developer"],
      bio: "",
      projectCount: 7,
      yearsCount: 3,
      techCount: 10,
    },
  });

  await prisma.techIcon.createMany({
    data: [
      { name: "React", icon: "FaReact", order: 0 },
      { name: "Next.js", icon: "SiNextdotjs", order: 1 },
      { name: "TypeScript", icon: "SiTypescript", order: 2 },
      { name: "Tailwind", icon: "SiTailwindcss", order: 3 },
    ],
  });

  await prisma.faqItem.createMany({
    data: faq.map((item, index) => ({
      question: item.question,
      answer: item.answer,
      order: index,
    })),
  });

  console.log("Seed complete.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
