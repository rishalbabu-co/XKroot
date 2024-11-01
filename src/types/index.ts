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

export interface Profile {
  id?: string;
  userId?: string;
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
  id?: string;
  company: string;
  position: string;
  duration: string;
  description: string;
}

export interface Education {
  id?: string;
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

export interface Notification {
  id: string;
  userId: string;
  type: 'message' | 'application' | 'recommendation';
  title: string;
  message: string;
  link: string;
  read: boolean;
  createdAt: string;
}