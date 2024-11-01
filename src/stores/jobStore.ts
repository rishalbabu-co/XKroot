import { create } from 'zustand';
import type { Job } from '../types';

interface JobStore {
  jobs: Job[];
  currentIndex: number;
  addJob: (job: Job) => void;
  removeJob: (id: string) => void;
  setCurrentIndex: (index: number) => void;
}

// Initial sample jobs
const INITIAL_JOBS: Job[] = [
  {
    id: '1',
    title: 'Senior Frontend Developer',
    company: 'TechCorp',
    location: 'San Francisco, CA',
    salary: '$120k - $160k',
    type: 'Full-time',
    description: 'Join our team as a Senior Frontend Developer and help build the next generation of our product. You will be working with React, TypeScript, and modern web technologies.',
    requirements: ['5+ years React experience', 'TypeScript expertise', 'GraphQL knowledge', 'Team leadership experience', 'Strong system design skills'],
    posted: '2 days ago',
    logo: 'https://images.unsplash.com/photo-1549923746-c502d488b3ea?w=100&h=100&fit=crop',
    category: 'Engineering',
    tags: ['Frontend', 'React', 'TypeScript'],
    benefits: ['Health Insurance', '401k', 'Remote Work', 'Unlimited PTO', 'Learning Budget'],
    isRemote: true,
    experienceLevel: 'Senior',
    applicants: 45
  },
  {
    id: '2',
    title: 'Full Stack Engineer',
    company: 'StartupX',
    location: 'Remote',
    salary: '$100k - $140k',
    type: 'Remote',
    description: 'Looking for a Full Stack Engineer to join our fast-growing startup. You will be working on challenging problems in the fintech space using modern technologies.',
    requirements: ['3+ years full stack experience', 'Node.js & React', 'PostgreSQL', 'AWS', 'Microservices architecture'],
    posted: '1 week ago',
    logo: 'https://images.unsplash.com/photo-1572044162444-ad60f128bdea?w=100&h=100&fit=crop',
    category: 'Engineering',
    tags: ['Full Stack', 'Node.js', 'React'],
    benefits: ['Equity Package', 'Remote Work', 'Health Insurance', 'Flexible Hours'],
    isRemote: true,
    experienceLevel: 'Mid',
    applicants: 32
  },
  {
    id: '3',
    title: 'UI/UX Designer',
    company: 'DesignLabs',
    location: 'New York, NY',
    salary: '$90k - $120k',
    type: 'Full-time',
    description: 'Join our design team to create beautiful and intuitive user experiences. You will be working closely with product and engineering teams.',
    requirements: ['3+ years UI/UX experience', 'Figma expertise', 'User research experience', 'Design systems', 'Prototyping skills'],
    posted: '3 days ago',
    logo: 'https://images.unsplash.com/photo-1603201667141-5324c62cd9fd?w=100&h=100&fit=crop',
    category: 'Design',
    tags: ['UI', 'UX', 'Figma'],
    benefits: ['Health Insurance', 'Creative Environment', 'Learning Budget', 'Gym Membership'],
    isRemote: false,
    experienceLevel: 'Mid',
    applicants: 28
  }
];

export const useJobStore = create<JobStore>((set) => ({
  jobs: INITIAL_JOBS,
  currentIndex: 0,
  addJob: (job) => set((state) => ({ jobs: [job, ...state.jobs] })),
  removeJob: (id) => set((state) => ({ jobs: state.jobs.filter(job => job.id !== id) })),
  setCurrentIndex: (index) => set({ currentIndex: index })
}));