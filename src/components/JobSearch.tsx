import { Search, MapPin, Briefcase, Filter } from 'lucide-react';
import { useState } from 'react';

export default function JobSearch() {
  const [filters, setFilters] = useState({
    jobType: '',
    experience: '',
    salary: ''
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Job title or keyword"
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            />
          </div>
          
          <div className="relative">
            <MapPin className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Location"
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            />
          </div>

          <button className="bg-indigo-600 text-white px-6 py-2 rounded-md hover:bg-indigo-700 flex items-center justify-center">
            <Search className="h-5 w-5 mr-2" />
            Search Jobs
          </button>
        </div>

        <div className="mt-4 flex flex-wrap gap-4">
          <select
            value={filters.jobType}
            onChange={(e) => setFilters({...filters, jobType: e.target.value})}
            className="px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          >
            <option value="">Job Type</option>
            <option value="full-time">Full-time</option>
            <option value="part-time">Part-time</option>
            <option value="contract">Contract</option>
            <option value="remote">Remote</option>
          </select>

          <select
            value={filters.experience}
            onChange={(e) => setFilters({...filters, experience: e.target.value})}
            className="px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          >
            <option value="">Experience Level</option>
            <option value="entry">Entry Level</option>
            <option value="mid">Mid Level</option>
            <option value="senior">Senior Level</option>
          </select>

          <select
            value={filters.salary}
            onChange={(e) => setFilters({...filters, salary: e.target.value})}
            className="px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          >
            <option value="">Salary Range</option>
            <option value="0-50k">$0 - $50k</option>
            <option value="50k-100k">$50k - $100k</option>
            <option value="100k+">$100k+</option>
          </select>

          <button className="flex items-center text-indigo-600 hover:text-indigo-800">
            <Filter className="h-5 w-5 mr-1" />
            More Filters
          </button>
        </div>
      </div>
    </div>
  );
}