import { useState } from 'react';
import { Search, Building2, MapPin, Users, Briefcase, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import type { Company } from '../types';

// Sample company data
const COMPANIES: Company[] = [
  {
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
  },
  {
    id: '2',
    name: 'StartupX',
    logo: 'https://images.unsplash.com/photo-1572044162444-ad60f128bdea?w=100&h=100&fit=crop',
    description: 'Fast-growing fintech startup revolutionizing payments',
    industry: 'Fintech',
    size: '100-500',
    location: 'New York, NY',
    website: 'https://startupx.com',
    founded: '2018',
    socialMedia: {
      linkedin: 'https://linkedin.com/company/startupx',
      twitter: 'https://twitter.com/startupx'
    },
    benefits: ['Unlimited PTO', 'Stock Options', 'Remote Work'],
    culture: ['Fast-paced', 'Entrepreneurial', 'Collaborative'],
    activeJobCount: 8
  },
  {
    id: '3',
    name: 'DesignLabs',
    logo: 'https://images.unsplash.com/photo-1603201667141-5324c62cd9fd?w=100&h=100&fit=crop',
    description: 'Creative design agency crafting beautiful digital experiences',
    industry: 'Design',
    size: '50-100',
    location: 'Austin, TX',
    website: 'https://designlabs.com',
    founded: '2015',
    socialMedia: {
      linkedin: 'https://linkedin.com/company/designlabs',
      twitter: 'https://twitter.com/designlabs'
    },
    benefits: ['Flexible Hours', 'Learning Budget', 'Health Insurance'],
    culture: ['Creative', 'User-Focused', 'Inclusive'],
    activeJobCount: 5
  }
];

export default function Companies() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedIndustry, setSelectedIndustry] = useState('');

  const industries = [...new Set(COMPANIES.map(company => company.industry))];

  const filteredCompanies = COMPANIES.filter(company => {
    const matchesSearch = company.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         company.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesIndustry = !selectedIndustry || company.industry === selectedIndustry;
    return matchesSearch && matchesIndustry;
  });

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
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Discover Great Places to Work
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            Explore top companies hiring now
          </p>
        </div>

        {/* Search and Filter */}
        <div className="bg-white dark:bg-dark-800 rounded-lg shadow-md p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search companies..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 w-full input-primary"
              />
            </div>
            
            <select
              value={selectedIndustry}
              onChange={(e) => setSelectedIndustry(e.target.value)}
              className="w-full input-primary"
            >
              <option value="">All Industries</option>
              {industries.map(industry => (
                <option key={industry} value={industry}>{industry}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white dark:bg-dark-800 rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Total Companies</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{COMPANIES.length}</p>
              </div>
              <Building2 className="h-8 w-8 text-indigo-600" />
            </div>
          </div>
          
          <div className="bg-white dark:bg-dark-800 rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Active Jobs</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {COMPANIES.reduce((sum, company) => sum + company.activeJobCount, 0)}
                </p>
              </div>
              <Briefcase className="h-8 w-8 text-indigo-600" />
            </div>
          </div>
          
          <div className="bg-white dark:bg-dark-800 rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Industries</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{industries.length}</p>
              </div>
              <Users className="h-8 w-8 text-indigo-600" />
            </div>
          </div>
        </div>

        {/* Companies List */}
        <div className="space-y-6">
          {filteredCompanies.map(company => (
            <div
              key={company.id}
              className="bg-white dark:bg-dark-800 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200"
            >
              <div className="p-6">
                <div className="flex items-start space-x-4">
                  <img
                    src={company.logo}
                    alt={`${company.name} logo`}
                    className="w-16 h-16 rounded-lg object-cover"
                  />
                  <div className="flex-1">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                          {company.name}
                        </h3>
                        <p className="text-gray-600 dark:text-gray-300 mt-1">
                          {company.description}
                        </p>
                      </div>
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200">
                        {company.industry}
                      </span>
                    </div>

                    <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div className="flex items-center text-gray-600 dark:text-gray-400">
                        <MapPin className="h-4 w-4 mr-2" />
                        <span className="text-sm">{company.location}</span>
                      </div>
                      <div className="flex items-center text-gray-600 dark:text-gray-400">
                        <Users className="h-4 w-4 mr-2" />
                        <span className="text-sm">{company.size} employees</span>
                      </div>
                      <div className="flex items-center text-gray-600 dark:text-gray-400">
                        <Building2 className="h-4 w-4 mr-2" />
                        <span className="text-sm">Founded {company.founded}</span>
                      </div>
                      <div className="flex items-center text-gray-600 dark:text-gray-400">
                        <Briefcase className="h-4 w-4 mr-2" />
                        <span className="text-sm">{company.activeJobCount} open positions</span>
                      </div>
                    </div>

                    <div className="mt-4">
                      <div className="flex flex-wrap gap-2">
                        {company.benefits.map((benefit, index) => (
                          <span
                            key={index}
                            className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                          >
                            {benefit}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-6 flex items-center justify-between">
                  <a
                    href={company.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-300"
                  >
                    Visit Website
                  </a>
                  <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                    View Open Positions
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}