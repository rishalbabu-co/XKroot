import { useState } from 'react';
import { Search, MapPin, Filter, ArrowDownWideNarrow } from 'lucide-react';
import JobCard from '../components/JobCard';
import { useJobStore } from '../stores/jobStore';
import type { Job } from '../types';

interface SearchFilters {
  jobType: string;
  experience: string;
  salary: string;
  remote: boolean;
  category: string;
}

export default function FindJobs() {
  const { jobs } = useJobStore();
  const [filters, setFilters] = useState<SearchFilters>({
    jobType: '',
    experience: '',
    salary: '',
    remote: false,
    category: ''
  });

  const [showAdvanced, setShowAdvanced] = useState(false);

  const categories = [
    'Technology',
    'Design',
    'Marketing',
    'Sales',
    'Customer Service',
    'Finance',
    'Healthcare',
    'Education'
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-dark-900 pt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Find Your Dream Job
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            Discover opportunities that match your experience and career goals
          </p>
        </div>

        {/* Search and Filters */}
        <div className="bg-white dark:bg-dark-800 rounded-lg shadow-md p-6 mb-8">
          <div className="space-y-4">
            {/* Main Search */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Job title, keywords, or company"
                  className="pl-10 w-full input-primary"
                />
              </div>
              
              <div className="relative">
                <MapPin className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="City, state, or 'Remote'"
                  className="pl-10 w-full input-primary"
                />
              </div>

              <button className="bg-indigo-600 text-white px-6 py-2 rounded-md hover:bg-indigo-700 flex items-center justify-center">
                <Search className="h-5 w-5 mr-2" />
                Search Jobs
              </button>
            </div>

            {/* Quick Filters */}
            <div className="flex items-center justify-between">
              <button
                onClick={() => setShowAdvanced(!showAdvanced)}
                className="flex items-center text-indigo-600 hover:text-indigo-800"
              >
                <Filter className="h-4 w-4 mr-2" />
                Advanced Filters
                <ArrowDownWideNarrow className={`h-4 w-4 ml-1 transform transition-transform ${showAdvanced ? 'rotate-180' : ''}`} />
              </button>
              
              <div className="flex space-x-2">
                <select
                  value={filters.jobType}
                  onChange={(e) => setFilters({...filters, jobType: e.target.value})}
                  className="px-3 py-1 border border-gray-300 rounded-md text-sm"
                >
                  <option value="">Job Type</option>
                  <option value="full-time">Full-time</option>
                  <option value="part-time">Part-time</option>
                  <option value="contract">Contract</option>
                  <option value="remote">Remote</option>
                </select>

                <select
                  value={filters.salary}
                  onChange={(e) => setFilters({...filters, salary: e.target.value})}
                  className="px-3 py-1 border border-gray-300 rounded-md text-sm"
                >
                  <option value="">Salary Range</option>
                  <option value="0-50k">$0 - $50k</option>
                  <option value="50k-100k">$50k - $100k</option>
                  <option value="100k-150k">$100k - $150k</option>
                  <option value="150k+">$150k+</option>
                </select>
              </div>
            </div>

            {/* Advanced Filters */}
            {showAdvanced && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t border-gray-200">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Experience Level
                  </label>
                  <select
                    value={filters.experience}
                    onChange={(e) => setFilters({...filters, experience: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  >
                    <option value="">Any Experience</option>
                    <option value="entry">Entry Level</option>
                    <option value="mid">Mid Level</option>
                    <option value="senior">Senior Level</option>
                    <option value="lead">Lead</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Category
                  </label>
                  <select
                    value={filters.category}
                    onChange={(e) => setFilters({...filters, category: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  >
                    <option value="">All Categories</option>
                    {categories.map((category) => (
                      <option key={category} value={category.toLowerCase()}>
                        {category}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="flex items-center">
                  <label className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={filters.remote}
                      onChange={(e) => setFilters({...filters, remote: e.target.checked})}
                      className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                    />
                    <span className="text-sm text-gray-700">Remote Only</span>
                  </label>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Job Listings */}
        <div className="space-y-6">
          {jobs.map(job => (
            <JobCard key={job.id} job={job} />
          ))}
        </div>
      </div>
    </div>
  );
}