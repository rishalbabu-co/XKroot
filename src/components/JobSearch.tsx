import { Search, MapPin, Filter, ArrowDownWideNarrow, Briefcase, History, Sparkles } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import type { Job, Profile } from '../types';

interface SearchFilters {
  jobType: string;
  experience: string;
  salary: string;
  remote: boolean;
  category: string;
}

interface SearchHistory {
  query: string;
  timestamp: number;
}

export default function JobSearch() {
  const { currentUser } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const [location, setLocation] = useState('');
  const [filters, setFilters] = useState<SearchFilters>({
    jobType: '',
    experience: '',
    salary: '',
    remote: false,
    category: ''
  });
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [searchHistory, setSearchHistory] = useState<SearchHistory[]>([]);
  const [showHistory, setShowHistory] = useState(false);
  const [recommendations, setRecommendations] = useState<Job[]>([]);

  // Simulated user profile for recommendations
  const [userProfile] = useState<Partial<Profile>>({
    title: 'Senior Software Engineer',
    skills: [
      { name: 'React', level: 90 },
      { name: 'TypeScript', level: 85 },
      { name: 'Node.js', level: 80 }
    ]
  });

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

  // Calculate job relevance score based on user profile
  const calculateRelevanceScore = (job: Job): number => {
    let score = 0;
    
    // Match job title with user's current title
    if (job.title.toLowerCase().includes(userProfile.title?.toLowerCase() || '')) {
      score += 30;
    }

    // Match skills
    userProfile.skills?.forEach(skill => {
      if (job.requirements.some(req => req.toLowerCase().includes(skill.name.toLowerCase()))) {
        score += (skill.level / 100) * 20;
      }
    });

    // Recency bonus (newer jobs score higher)
    const daysAgo = parseInt(job.posted.split(' ')[0]);
    score += Math.max(0, 10 - daysAgo);

    return Math.min(100, score);
  };

  // Save search to history
  const saveToHistory = (query: string) => {
    const newHistory = [
      { query, timestamp: Date.now() },
      ...searchHistory.slice(0, 4)
    ];
    setSearchHistory(newHistory);
    localStorage.setItem('searchHistory', JSON.stringify(newHistory));
  };

  // Load search history on mount
  useEffect(() => {
    const savedHistory = localStorage.getItem('searchHistory');
    if (savedHistory) {
      setSearchHistory(JSON.parse(savedHistory));
    }
  }, []);

  // Update recommendations when filters change
  useEffect(() => {
    // Simulate API call for recommendations
    const getRecommendations = () => {
      // This would typically be an API call
      console.log('Fetching recommendations based on filters:', filters);
    };

    getRecommendations();
  }, [filters]);

  const handleSearch = () => {
    if (searchQuery.trim()) {
      saveToHistory(searchQuery);
      // Trigger search
    }
  };

  return (
    <div className="max-w-7xl mx-auto">
      <div className="bg-gradient-to-br from-gray-900 to-gray-800 dark:from-dark-900 dark:to-dark-800 rounded-2xl shadow-2xl p-8 relative overflow-hidden">
        {/* Decorative Elements */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-full h-full bg-grid-white/[0.1]" />
          <div className="absolute -top-24 -right-24 w-96 h-96 bg-indigo-500 rounded-full filter blur-3xl opacity-20" />
          <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-purple-500 rounded-full filter blur-3xl opacity-20" />
        </div>

        {/* Main Search Area */}
        <div className="relative z-10 space-y-6">
          {/* Search Bar */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
            <div className="md:col-span-5 relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Briefcase className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => setShowHistory(true)}
                onBlur={() => setTimeout(() => setShowHistory(false), 200)}
                placeholder="Job title, keywords, or company"
                className="w-full pl-12 pr-4 py-4 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:ring-2 focus:ring-[#00a70c] focus:border-transparent backdrop-blur-sm"
              />
              {/* Search History Dropdown */}
              {showHistory && searchHistory.length > 0 && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-dark-800 rounded-lg shadow-lg overflow-hidden">
                  {searchHistory.map((item, index) => (
                    <button
                      key={index}
                      onClick={() => setSearchQuery(item.query)}
                      className="w-full px-4 py-2 text-left text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-dark-700 flex items-center space-x-2"
                    >
                      <History className="h-4 w-4 text-gray-400" />
                      <span>{item.query}</span>
                      <span className="text-xs text-gray-400 ml-auto">
                        {new Date(item.timestamp).toLocaleDateString()}
                      </span>
                    </button>
                  ))}
                </div>
              )}
            </div>
            
            <div className="md:col-span-5 relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <MapPin className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="City, state, or 'Remote'"
                className="w-full pl-12 pr-4 py-4 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:ring-2 focus:ring-[#00a70c] focus:border-transparent backdrop-blur-sm"
              />
            </div>

            <button
              onClick={handleSearch}
              className="md:col-span-2 bg-[#00a70c] hover:bg-[#008a0a] text-white px-8 py-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 flex items-center justify-center space-x-2"
            >
              <Search className="h-5 w-5" />
              <span>Search</span>
            </button>
          </div>

          {/* Recommendations */}
          {recommendations.length > 0 && (
            <div className="flex items-center space-x-2 text-gray-300">
              <Sparkles className="h-4 w-4 text-yellow-400" />
              <span className="text-sm">Recommended for you:</span>
              <div className="flex space-x-2">
                {recommendations.map((job, index) => (
                  <button
                    key={index}
                    className="px-3 py-1 rounded-full bg-white/10 hover:bg-white/20 text-sm transition-colors"
                  >
                    {job.title}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Advanced Filters */}
          <div className="flex items-center justify-between">
            <button
              onClick={() => setShowAdvanced(!showAdvanced)}
              className="flex items-center space-x-2 text-gray-300 hover:text-white transition-colors group"
            >
              <Filter className="h-4 w-4" />
              <span>Advanced Filters</span>
              <ArrowDownWideNarrow className={`h-4 w-4 transform transition-transform duration-200 ${showAdvanced ? 'rotate-180' : ''}`} />
            </button>

            <div className="flex space-x-4">
              <select
                value={filters.jobType}
                onChange={(e) => setFilters({...filters, jobType: e.target.value})}
                className="px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-[#00a70c] focus:border-transparent backdrop-blur-sm [&>option]:bg-gray-800 [&>option]:text-white"
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
                className="px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-[#00a70c] focus:border-transparent backdrop-blur-sm [&>option]:bg-gray-800 [&>option]:text-white"
              >
                <option value="">Salary Range</option>
                <option value="0-50k">$0 - $50k</option>
                <option value="50k-100k">$50k - $100k</option>
                <option value="100k-150k">$100k - $150k</option>
                <option value="150k+">$150k+</option>
              </select>
            </div>
          </div>

          {/* Advanced Filters Panel */}
          {showAdvanced && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6 mt-6 border-t border-white/10">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Experience Level
                </label>
                <select
                  value={filters.experience}
                  onChange={(e) => setFilters({...filters, experience: e.target.value})}
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-[#00a70c] focus:border-transparent backdrop-blur-sm [&>option]:bg-gray-800 [&>option]:text-white"
                >
                  <option value="">Any Experience</option>
                  <option value="entry">Entry Level</option>
                  <option value="mid">Mid Level</option>
                  <option value="senior">Senior Level</option>
                  <option value="lead">Lead</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Category
                </label>
                <select
                  value={filters.category}
                  onChange={(e) => setFilters({...filters, category: e.target.value})}
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-[#00a70c] focus:border-transparent backdrop-blur-sm [&>option]:bg-gray-800 [&>option]:text-white"
                >
                  <option value="">All Categories</option>
                  {categories.map((category) => (
                    <option key={category} value={category.toLowerCase()}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex items-center space-x-4">
                <label className="flex items-center space-x-2 text-gray-300">
                  <input
                    type="checkbox"
                    checked={filters.remote}
                    onChange={(e) => setFilters({...filters, remote: e.target.checked})}
                    className="h-4 w-4 text-[#00a70c] focus:ring-[#00a70c] border-white/20 rounded bg-white/10"
                  />
                  <span>Remote Only</span>
                </label>

                <button
                  onClick={() => setFilters({ jobType: '', experience: '', salary: '', remote: false, category: '' })}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Clear Filters
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}