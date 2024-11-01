export interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  salary: string;
  type: 'Full-time' | 'Part-time' | 'Contract' | 'Remote';
  description: string;
  requirements: string[];
  posted: string;
  logo: string;
  category: string;
  tags: string[];
  benefits: string[];
  isRemote: boolean;
  experienceLevel: 'Entry' | 'Mid' | 'Senior' | 'Lead';
  applicants: number;
}

export interface Company {
  id: string;
  name: string;
  logo: string;
  description: string;
  industry: string;
  size: string;
  location: string;
  website: string;
  founded: string;
  socialMedia: {
    linkedin?: string;
    twitter?: string;
  };
  benefits: string[];
  culture: string[];
  activeJobCount: number;
}

export interface Profile {
  name: string;
  title: string;
  photo: string;
  location: string;
  bio: string;
  email: string;
  phone: string;
  experience: Experience[];
  education: Education[];
  skills: Skill[];
  languages: Language[];
  socialLinks: SocialLinks;
}

export interface Experience {
  company: string;
  position: string;
  duration: string;
  description: string;
}

export interface Education {
  school: string;
  degree: string;
  duration: string;
  gpa: string;
}

export interface Skill {
  name: string;
  level: number;
}

export interface Language {
  name: string;
  level: string;
}

export interface SocialLinks {
  website?: string;
  github?: string;
  linkedin?: string;
}