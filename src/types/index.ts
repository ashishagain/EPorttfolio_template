export type ProjectCategory = 'software' | 'hardware' | 'embedded' | 'research'

export interface SocialLink {
  label: string
  href: string
  icon: 'github' | 'linkedin' | 'mail' | 'twitter' | 'globe' | 'file'
}

export interface Profile {
  name: string
  /** Short handle shown in the terminal prompt, e.g. "ashish" */
  handle: string
  /** Rotating titles typed out in the hero */
  roles: string[]
  tagline: string
  location: string
  email: string
  /** Path inside /public, e.g. "/resume.pdf" */
  resumeUrl?: string
  /** Path inside /public, e.g. "/avatar.jpg" */
  avatarUrl?: string
  available: boolean
  socials: SocialLink[]
}

export interface AboutInfo {
  paragraphs: string[]
  /** Quick stats rendered as readouts */
  stats: { label: string; value: string }[]
  /** Fun "spec sheet" key/value pairs */
  specs: { key: string; value: string }[]
}

export interface SkillGroup {
  title: string
  domain: 'cs' | 'electronics'
  skills: { name: string; level: number /* 0-100 */ }[]
}

export interface Project {
  id: string
  title: string
  summary: string
  /** Longer description shown in the details modal */
  description?: string
  category: ProjectCategory
  tech: string[]
  /** Path inside /public, e.g. "/projects/robot.jpg" */
  image?: string
  repoUrl?: string
  liveUrl?: string
  featured?: boolean
  year?: string
  highlights?: string[]
}

export interface ExperienceItem {
  role: string
  org: string
  period: string
  location?: string
  points: string[]
  tech?: string[]
}

export interface EducationItem {
  degree: string
  institution: string
  period: string
  score?: string
  coursework?: string[]
}

export interface Achievement {
  title: string
  issuer: string
  date: string
  type: 'certification' | 'award' | 'publication' | 'hackathon'
  url?: string
}

export interface PortfolioData {
  profile: Profile
  about: AboutInfo
  skills: SkillGroup[]
  projects: Project[]
  experience: ExperienceItem[]
  education: EducationItem[]
  achievements: Achievement[]
}
