import { Project, Skill, TimelineItem } from './types';

export const PROJECTS: Project[] = [
  {
    id: 1,
    title: "SHAMIM-CHAT",
    description: "A real-time chat application built with modern web technologies.",
    longDescription: "SHAMIM-CHAT is a full-featured messaging platform that supports real-time communication, user authentication, and a responsive UI. Built with React and Node.js, it demonstrates expertise in WebSockets and state management.",
    tags: ["React", "Node.js", "Socket.io", "MongoDB"],
    category: "Web",
    image: "https://picsum.photos/seed/chat/800/600",
    github: "https://github.com/shamim-ahmad-ahnaf/SHAMIM-CHAT",
    live: "https://github.com/shamim-ahmad-ahnaf/SHAMIM-CHAT"
  },
  {
    id: 2,
    title: "Attendance-Pro",
    description: "A professional attendance management system for organizations.",
    longDescription: "Attendance-Pro simplifies the tracking of student or employee attendance. It features a clean dashboard, reporting tools, and secure data storage, making it an essential tool for administrative efficiency.",
    tags: ["JavaScript", "HTML", "CSS", "Firebase"],
    category: "Web",
    image: "https://picsum.photos/seed/attendance/800/600",
    github: "https://github.com/shamim-ahmad-ahnaf/Attendance-Pro",
    live: "https://github.com/shamim-ahmad-ahnaf/Attendance-Pro"
  },
  {
    id: 3,
    title: "NoorTime",
    description: "An Islamic utility app for prayer times and religious guidance.",
    longDescription: "NoorTime provides accurate prayer timings, Qibla direction, and other Islamic resources. It is designed with a focus on accessibility and a serene user experience, catering to the needs of the Muslim community.",
    tags: ["React", "Tailwind", "API Integration"],
    category: "Web",
    image: "https://picsum.photos/seed/islamic/800/600",
    github: "https://github.com/shamim-ahmad-ahnaf/NoorTime",
    live: "https://github.com/shamim-ahmad-ahnaf/NoorTime"
  },
  {
    id: 4,
    title: "BookVerse",
    description: "A digital library and book discovery platform.",
    longDescription: "BookVerse allows users to explore a vast collection of books, manage their reading lists, and discover new titles. It features a robust search system and a visually appealing layout for book enthusiasts.",
    tags: ["React", "Node.js", "Express", "MongoDB"],
    category: "Web",
    image: "https://picsum.photos/seed/books/800/600",
    github: "https://github.com/shamim-ahmad-ahnaf/BookVerse",
    live: "https://github.com/shamim-ahmad-ahnaf/BookVerse"
  }
];

export const SKILLS: Skill[] = [
  { name: "React / Next.js", level: 90, category: "Frontend", isCore: true },
  { name: "JavaScript (ES6+)", level: 95, category: "Frontend", isCore: true },
  { name: "Tailwind CSS", level: 95, category: "Frontend" },
  { name: "Node.js", level: 85, category: "Backend", isCore: true },
  { name: "Express.js", level: 85, category: "Backend" },
  { name: "MongoDB", level: 80, category: "Database", isCore: true },
  { name: "Firebase", level: 80, category: "Backend" },
  { name: "Git / GitHub", level: 90, category: "Tools" },
  { name: "English Communication", level: 85, category: "Soft Skills" }
];

export const TIMELINE: TimelineItem[] = [
  {
    year: "2024 - Present",
    title: "Web Development & English Mastery",
    company: "Self-Directed Learning",
    description: "Intensive focus on mastering Full Stack Web Development (MERN stack) and advanced English communication skills.",
    type: "education"
  },
  {
    year: "2023",
    title: "Dawah (Madrasa Completion)",
    company: "Madrasa Education",
    description: "Successfully completed the Dawah course, gaining deep knowledge in Islamic studies and traditional education.",
    type: "education"
  }
];
