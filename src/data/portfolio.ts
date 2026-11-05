/**
 * ============================================================
 *  PORTFOLIO CONTENT — edit this file to fill in your info.
 *  Everything on the site is rendered from this object.
 *  Images/PDFs go in /public and are referenced as "/file.ext".
 * ============================================================
 */
import type { PortfolioData } from '../types'

export const portfolio: PortfolioData = {
  profile: {
    name: 'Your Name',
    handle: 'you',
    roles: ['Software Engineer', 'Embedded Systems Developer', 'Electronics Enthusiast', 'Problem Solver'],
    tagline: 'I build things at the intersection of code and circuits — from firmware to full-stack.',
    location: 'City, Country',
    email: 'you@example.com',
    resumeUrl: '', // e.g. '/resume.pdf'
    avatarUrl: '', // e.g. '/avatar.jpg'
    available: true,
    socials: [
      { label: 'GitHub', href: 'https://github.com/your-username', icon: 'github' },
      { label: 'LinkedIn', href: 'https://linkedin.com/in/your-username', icon: 'linkedin' },
      { label: 'Email', href: 'mailto:you@example.com', icon: 'mail' },
    ],
  },

  about: {
    paragraphs: [
      'Write a short intro about yourself here — who you are, what you study or work on, and what excites you about CS and electronics.',
      'Add a second paragraph about your interests, what you are currently learning, or what kind of opportunities you are looking for.',
    ],
    stats: [
      { label: 'Projects', value: '00' },
      { label: 'Years Coding', value: '00' },
      { label: 'PCBs Designed', value: '00' },
      { label: 'Coffee / day', value: '∞' },
    ],
    specs: [
      { key: 'Focus', value: 'Embedded + Software' },
      { key: 'Languages', value: 'C, C++, Python, TypeScript' },
      { key: 'Favourite MCU', value: 'STM32 / ESP32' },
      { key: 'Editor', value: 'VS Code / Neovim' },
    ],
  },

  skills: [
    {
      title: 'Programming',
      domain: 'cs',
      skills: [
        { name: 'C / C++', level: 80 },
        { name: 'Python', level: 75 },
        { name: 'TypeScript', level: 70 },
      ],
    },
    {
      title: 'Web & Tools',
      domain: 'cs',
      skills: [
        { name: 'React', level: 70 },
        { name: 'Git / Linux', level: 75 },
        { name: 'Docker', level: 50 },
      ],
    },
    {
      title: 'Embedded',
      domain: 'electronics',
      skills: [
        { name: 'Arduino / ESP32', level: 80 },
        { name: 'STM32 / ARM', level: 60 },
        { name: 'RTOS', level: 45 },
      ],
    },
    {
      title: 'Hardware Design',
      domain: 'electronics',
      skills: [
        { name: 'PCB Design (KiCad)', level: 65 },
        { name: 'Circuit Analysis', level: 70 },
        { name: 'Verilog / FPGA', level: 40 },
      ],
    },
  ],

  projects: [
    {
      id: 'project-1',
      title: 'Project One',
      summary: 'One-line summary of a software project.',
      description: 'A longer description of the project: the problem, your approach, and the outcome.',
      category: 'software',
      tech: ['React', 'TypeScript', 'Node.js'],
      repoUrl: '',
      liveUrl: '',
      featured: true,
      year: '2026',
      highlights: ['Key result or feature #1', 'Key result or feature #2'],
    },
    {
      id: 'project-2',
      title: 'Project Two',
      summary: 'One-line summary of an embedded project.',
      category: 'embedded',
      tech: ['ESP32', 'C++', 'MQTT'],
      featured: true,
      year: '2026',
    },
    {
      id: 'project-3',
      title: 'Project Three',
      summary: 'One-line summary of a hardware / PCB project.',
      category: 'hardware',
      tech: ['KiCad', 'Analog', 'SPICE'],
      year: '2025',
    },
    {
      id: 'project-4',
      title: 'Project Four',
      summary: 'One-line summary of a research / academic project.',
      category: 'research',
      tech: ['Python', 'MATLAB'],
      year: '2025',
    },
  ],

  experience: [
    {
      role: 'Role Title',
      org: 'Company / Lab / Club',
      period: 'Jan 2026 — Present',
      location: 'Remote',
      points: ['What you did and the impact it had.', 'Another accomplishment.'],
      tech: ['C', 'Python'],
    },
    {
      role: 'Previous Role',
      org: 'Organisation',
      period: '2025',
      points: ['What you did and the impact it had.'],
    },
  ],

  education: [
    {
      degree: 'B.Tech / B.E. in Your Branch',
      institution: 'Your University',
      period: '20XX — 20XX',
      score: 'CGPA: X.XX',
      coursework: ['Data Structures', 'Digital Electronics', 'Microprocessors', 'Signals & Systems'],
    },
  ],

  achievements: [
    { title: 'Certification Name', issuer: 'Issuer', date: '2026', type: 'certification', url: '' },
    { title: 'Hackathon / Competition', issuer: 'Event', date: '2025', type: 'hackathon' },
    { title: 'Award Name', issuer: 'Organisation', date: '2025', type: 'award' },
  ],
}
