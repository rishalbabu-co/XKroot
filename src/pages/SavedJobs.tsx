import { useState } from 'react';
import { useSavedJobs } from '../hooks/useSavedJobs';
import JobCard from '../components/JobCard';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import type { Job } from '../types';

// Sample jobs data - replace with real data from your backend
const SAMPLE_JOBS: Job[] = [
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

export default function SavedJobs() {
  const navigate = useNavigate();
  const { savedJobs } = useSavedJobs();
  const [searchQuery, setSearchQuery] = useState('');

  // Filter saved jobs based on the search query
  const filteredJobs = SAMPLE_JOBS
    .filter(job => savedJobs.includes(job.id))
    .filter(job => 
      job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.location.toLowerCase().includes(searchQuery.toLowerCase())
    );

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-dark-900 pt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <button
          onClick={() => navigate('/')}
          className="flex items-center text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 mb-8 group"
        >
          <ArrowLeft className="h-5 w-5 mr-2 transition-transform group-hover:-translate-x-1" />
          Back to Jobs
        </button>

        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Saved Jobs
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            {savedJobs.length} jobs saved
          </p>
        </div>

        {/* Search */}
        <div className="mb-8">
          <input
            type="text"
            placeholder="Search saved jobs..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-dark-600 focus:ring-2 focus:ring-indigo-500 focus:border-transparent dark:bg-dark-700 dark:text-white"
          />
        </div>

        {/* Job List */}
        {filteredJobs.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-600 dark:text-gray-400 text-lg">
              {searchQuery ? 'No matching saved jobs found.' : 'No saved jobs yet.'}
            </p>
            <button
              onClick={() => navigate('/jobs')}
              className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
            >
              Browse Jobs
            </button>
          </div>
        ) : (
          <div className="space-y-6">
            {filteredJobs.map(job => (
              <JobCard key={job.id} job={job} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}