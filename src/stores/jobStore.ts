import { create } from 'zustand';
import type { Job } from '../types';

interface JobStore {
  jobs: Job[];
  addJob: (job: Job) => void;
  removeJob: (id: string) => void;
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
    description: 'We are looking for a Senior Frontend Developer to join our team and help build the next generation of our product.',
    requirements: ['React', 'TypeScript', 'GraphQL', 'CSS-in-JS', 'Testing'],
    posted: '2 days ago',
    logo: 'https://images.unsplash.com/photo-1549923746-c502d488b3ea?w=100&h=100&fit=crop',
    category: 'Engineering',
    tags: ['Frontend', 'React', 'TypeScript'],
    benefits: ['Health Insurance', '401k', 'Remote Work'],
    isRemote: false,
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
    description: 'Join our fast-growing startup and work on challenging problems in the fintech space.',
    requirements: ['Node.js', 'React', 'PostgreSQL', 'AWS', 'Docker'],
    posted: '1 week ago',
    logo: 'https://images.unsplash.com/photo-1572044162444-ad60f128bdea?w=100&h=100&fit=crop',
    category: 'Engineering',
    tags: ['Full Stack', 'Node.js', 'React'],
    benefits: ['Unlimited PTO', 'Stock Options', 'Remote Work'],
    isRemote: true,
    experienceLevel: 'Mid',
    applicants: 32
  }
];

export const useJobStore = create<JobStore>((set) => ({
  jobs: INITIAL_JOBS,
  addJob: (job) => set((state) => ({ jobs: [job, ...state.jobs] })),
  removeJob: (id) => set((state) => ({ jobs: state.jobs.filter(job => job.id !== id) })),
}));