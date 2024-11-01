import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { MapPin, Globe, Users, Calendar, ArrowLeft, Mail, Building2, ExternalLink } from 'lucide-react';
import JobCard from '../components/JobCard';
import { useJobStore } from '../stores/jobStore';
import type { Company } from '../types';

// Sample company data - replace with real data from your backend
const COMPANIES: Record<string, Company> = {
  '1': {
    id: '1',
    name: 'TechCorp',
    logo: 'https://images.unsplash.com/photo-1549923746-c502d488b3ea?w=100&h=100&fit=crop',
    description: 'Leading technology company focused on innovative solutions',
    industry: 'Technology',
    size: '1000-5000',
    location: 'San Francisco, CA',
    website: 'https://techcorp.com',
    founded: '2010',
    socialMedia: {
      linkedin: 'https://linkedin.com/company/techcorp',
      twitter: 'https://twitter.com/techcorp'
    },
    benefits: ['Health Insurance', '401k', 'Remote Work', 'Gym Membership'],
    culture: ['Innovation', 'Work-Life Balance', 'Diversity'],
    activeJobCount: 12
  }
};

export default function CompanyDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { jobs } = useJobStore();
  const [activeTab, setActiveTab] = useState<'overview' | 'jobs' | 'culture'>('overview');

  const company = id ? COMPANIES[id] : null;
  const companyJobs = jobs.filter(job => job.company === company?.name);

  if (!company) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-dark-900 pt-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Company Not Found
          </h1>
          <button
            onClick={() => navigate('/companies')}
            className="text-indigo-600 hover:text-indigo-500 flex items-center justify-center space-x-2"
          >
            <ArrowLeft className="h-5 w-5" />
            <span>Back to Companies</span>
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-dark-900 pt-16">
      {/* Header */}
      <div className="bg-white dark:bg-dark-800 border-b border-gray-200 dark:border-dark-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <button
            onClick={() => navigate('/companies')}
            className="flex items-center text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 mb-6 group"
          >
            <ArrowLeft className="h-5 w-5 mr-2 transition-transform group-hover:-translate-x-1" />
            Back to Companies
          </button>

          <div className="flex items-start space-x-6">
            <img
              src={company.logo}
              alt={`${company.name} logo`}
              className="w-24 h-24 rounded-xl object-cover"
            />
            <div className="flex-1">
              <div className="flex justify-between items-start">
                <div>
                  <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                    {company.name}
                  </h1>
                  <p className="text-lg text-gray-600 dark:text-gray-300 mt-1">
                    {company.description}
                  </p>
                </div>
                <a
                  href={company.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm text-sm font-medium text-gray-700 dark:text-gray-200 bg-white dark:bg-dark-700 hover:bg-gray-50 dark:hover:bg-dark-600"
                >
                  <Globe className="h-4 w-4 mr-2" />
                  Visit Website
                </a>
              </div>

              <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="flex items-center text-gray-600 dark:text-gray-400">
                  <MapPin className="h-5 w-5 mr-2" />
                  {company.location}
                </div>
                <div className="flex items-center text-gray-600 dark:text-gray-400">
                  <Users className="h-5 w-5 mr-2" />
                  {company.size} employees
                </div>
                <div className="flex items-center text-gray-600 dark:text-gray-400">
                  <Calendar className="h-5 w-5 mr-2" />
                  Founded {company.founded}
                </div>
                <div className="flex items-center text-gray-600 dark:text-gray-400">
                  <Building2 className="h-5 w-5 mr-2" />
                  {company.industry}
                </div>
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div className="mt-8 border-b border-gray-200 dark:border-dark-700">
            <nav className="-mb-px flex space-x-8">
              <button
                onClick={() => setActiveTab('overview')}
                className={`pb-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'overview'
                    ? 'border-indigo-600 text-indigo-600 dark:border-indigo-400 dark:text-indigo-400'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300'
                }`}
              >
                Overview
              </button>
              <button
                onClick={() => setActiveTab('jobs')}
                className={`pb-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'jobs'
                    ? 'border-indigo-600 text-indigo-600 dark:border-indigo-400 dark:text-indigo-400'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300'
                }`}
              >
                Open Positions ({companyJobs.length})
              </button>
              <button
                onClick={() => setActiveTab('culture')}
                className={`pb-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'culture'
                    ? 'border-indigo-600 text-indigo-600 dark:border-indigo-400 dark:text-indigo-400'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300'
                }`}
              >
                Culture & Benefits
              </button>
            </nav>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'overview' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2 space-y-6">
              <div className="bg-white dark:bg-dark-800 rounded-xl p-6 shadow-lg">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                  About {company.name}
                </h2>
                <p className="text-gray-600 dark:text-gray-300">
                  {company.description}
                </p>
              </div>

              <div className="bg-white dark:bg-dark-800 rounded-xl p-6 shadow-lg">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                  Company Culture
                </h2>
                <div className="flex flex-wrap gap-2">
                  {company.culture.map((value, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-indigo-100 dark:bg-indigo-900 text-indigo-800 dark:text-indigo-200 rounded-full text-sm"
                    >
                      {value}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="bg-white dark:bg-dark-800 rounded-xl p-6 shadow-lg">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                  Contact Information
                </h2>
                <div className="space-y-4">
                  <a
                    href={company.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center text-gray-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400"
                  >
                    <Globe className="h-5 w-5 mr-3" />
                    Website
                    <ExternalLink className="h-4 w-4 ml-2" />
                  </a>
                  <a
                    href={`mailto:careers@${company.website.replace('https://', '')}`}
                    className="flex items-center text-gray-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400"
                  >
                    <Mail className="h-5 w-5 mr-3" />
                    Careers Email
                  </a>
                  {Object.entries(company.socialMedia).map(([platform, url]) => (
                    <a
                      key={platform}
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center text-gray-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400"
                    >
                      <Globe className="h-5 w-5 mr-3" />
                      {platform.charAt(0).toUpperCase() + platform.slice(1)}
                      <ExternalLink className="h-4 w-4 ml-2" />
                    </a>
                  ))}
                </div>
              </div>

              <div className="bg-white dark:bg-dark-800 rounded-xl p-6 shadow-lg">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                  Benefits
                </h2>
                <div className="space-y-2">
                  {company.benefits.map((benefit, index) => (
                    <div
                      key={index}
                      className="flex items-center text-gray-600 dark:text-gray-400"
                    >
                      <span className="w-2 h-2 bg-green-500 rounded-full mr-3"></span>
                      {benefit}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'jobs' && (
          <div className="space-y-6">
            {companyJobs.length === 0 ? (
              <div className="text-center py-12 bg-white dark:bg-dark-800 rounded-xl shadow-lg">
                <Building2 className="mx-auto h-12 w-12 text-gray-400" />
                <h3 className="mt-2 text-lg font-medium text-gray-900 dark:text-white">
                  No open positions
                </h3>
                <p className="mt-1 text-gray-500 dark:text-gray-400">
                  Check back later for new opportunities at {company.name}.
                </p>
              </div>
            ) : (
              companyJobs.map(job => (
                <JobCard key={job.id} job={job} />
              ))
            )}
          </div>
        )}

        {activeTab === 'culture' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white dark:bg-dark-800 rounded-xl p-6 shadow-lg">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                Company Culture
              </h2>
              <div className="space-y-4">
                {company.culture.map((value, index) => (
                  <div
                    key={index}
                    className="p-4 bg-indigo-50 dark:bg-indigo-900/20 rounded-lg"
                  >
                    <h3 className="font-medium text-indigo-800 dark:text-indigo-200">
                      {value}
                    </h3>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white dark:bg-dark-800 rounded-xl p-6 shadow-lg">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                Benefits & Perks
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {company.benefits.map((benefit, index) => (
                  <div
                    key={index}
                    className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg"
                  >
                    <h3 className="font-medium text-green-800 dark:text-green-200">
                      {benefit}
                    </h3>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}