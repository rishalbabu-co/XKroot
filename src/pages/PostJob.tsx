import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Briefcase, DollarSign, MapPin, Clock, Building2 } from 'lucide-react';
import type { Job } from '../types';
import { useJobStore } from '../stores/jobStore';

export default function PostJob() {
  const navigate = useNavigate();
  const { addJob } = useJobStore();
  const [loading, setLoading] = useState(false);
  const [job, setJob] = useState<Partial<Job>>({
    title: '',
    company: '',
    location: '',
    type: 'Full-time',
    salary: '',
    description: '',
    requirements: [],
    benefits: [],
    experienceLevel: 'Mid',
    isRemote: false,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const newJob: Job = {
        id: Date.now().toString(),
        title: job.title!,
        company: job.company!,
        location: job.location!,
        type: job.type as Job['type'],
        salary: job.salary!,
        description: job.description!,
        requirements: job.requirements!,
        benefits: job.benefits || [],
        posted: 'Just now',
        logo: 'https://images.unsplash.com/photo-1549923746-c502d488b3ea?w=100&h=100&fit=crop',
        category: 'Technology',
        tags: [],
        isRemote: job.isRemote!,
        experienceLevel: job.experienceLevel as Job['experienceLevel'],
        applicants: 0
      };

      // Add the job to the store
      addJob(newJob);
      
      // Navigate back to jobs page
      navigate('/jobs');
    } catch (error) {
      console.error('Error posting job:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleRequirementsChange = (value: string) => {
    const requirements = value.split(',').map(req => req.trim()).filter(Boolean);
    setJob(prev => ({ ...prev, requirements }));
  };

  const handleBenefitsChange = (value: string) => {
    const benefits = value.split(',').map(benefit => benefit.trim()).filter(Boolean);
    setJob(prev => ({ ...prev, benefits }));
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-dark-900 pt-20 pb-12">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white dark:bg-dark-800 rounded-lg shadow-lg p-6 md:p-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
            Post a New Job
          </h1>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Basic Information */}
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Job Title*
                </label>
                <div className="relative">
                  <Briefcase className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  <input
                    required
                    type="text"
                    value={job.title}
                    onChange={e => setJob(prev => ({ ...prev, title: e.target.value }))}
                    placeholder="e.g. Senior Frontend Developer"
                    className="pl-10 w-full input-primary"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Company Name*
                </label>
                <div className="relative">
                  <Building2 className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  <input
                    required
                    type="text"
                    value={job.company}
                    onChange={e => setJob(prev => ({ ...prev, company: e.target.value }))}
                    placeholder="Your company name"
                    className="pl-10 w-full input-primary"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Location*
                  </label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                    <input
                      required
                      type="text"
                      value={job.location}
                      onChange={e => setJob(prev => ({ ...prev, location: e.target.value }))}
                      placeholder="e.g. San Francisco, CA"
                      className="pl-10 w-full input-primary"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Salary Range*
                  </label>
                  <div className="relative">
                    <DollarSign className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                    <input
                      required
                      type="text"
                      value={job.salary}
                      onChange={e => setJob(prev => ({ ...prev, salary: e.target.value }))}
                      placeholder="e.g. $100k - $130k"
                      className="pl-10 w-full input-primary"
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Job Type*
                  </label>
                  <select
                    required
                    value={job.type}
                    onChange={e => setJob(prev => ({ ...prev, type: e.target.value as Job['type'] }))}
                    className="w-full input-primary"
                  >
                    <option value="Full-time">Full-time</option>
                    <option value="Part-time">Part-time</option>
                    <option value="Contract">Contract</option>
                    <option value="Remote">Remote</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Experience Level*
                  </label>
                  <select
                    required
                    value={job.experienceLevel}
                    onChange={e => setJob(prev => ({ ...prev, experienceLevel: e.target.value as Job['experienceLevel'] }))}
                    className="w-full input-primary"
                  >
                    <option value="Entry">Entry Level</option>
                    <option value="Mid">Mid Level</option>
                    <option value="Senior">Senior Level</option>
                    <option value="Lead">Lead</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Detailed Information */}
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Job Description*
                </label>
                <textarea
                  required
                  value={job.description}
                  onChange={e => setJob(prev => ({ ...prev, description: e.target.value }))}
                  rows={5}
                  placeholder="Describe the role, responsibilities, and ideal candidate..."
                  className="w-full input-primary"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Requirements* (comma-separated)
                </label>
                <textarea
                  required
                  value={job.requirements?.join(', ')}
                  onChange={e => handleRequirementsChange(e.target.value)}
                  rows={3}
                  placeholder="e.g. React, 5+ years experience, Team leadership"
                  className="w-full input-primary"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Benefits (comma-separated)
                </label>
                <textarea
                  value={job.benefits?.join(', ')}
                  onChange={e => handleBenefitsChange(e.target.value)}
                  rows={3}
                  placeholder="e.g. Health insurance, 401k, Remote work options"
                  className="w-full input-primary"
                />
              </div>

              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="remote"
                  checked={job.isRemote}
                  onChange={e => setJob(prev => ({ ...prev, isRemote: e.target.checked }))}
                  className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                />
                <label htmlFor="remote" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
                  This is a remote position
                </label>
              </div>
            </div>

            <div className="flex justify-end space-x-4">
              <button
                type="button"
                onClick={() => navigate(-1)}
                className="btn-secondary"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className="btn-primary"
              >
                {loading ? 'Posting...' : 'Post Job'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}