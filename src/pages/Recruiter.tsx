import { useState } from 'react';
import { Search, Briefcase, GraduationCap, MapPin, Filter, Users, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import type { Profile } from '../types';
import CandidateCard from '../components/CandidateCard';

// Sample candidate data
const CANDIDATES: Profile[] = [
  {
    id: '1',
    userId: 'user1',
    name: 'Sarah Chen',
    title: 'Senior Frontend Developer',
    photo: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop',
    location: 'San Francisco, CA',
    about: 'Passionate frontend developer with 6+ years of experience building scalable web applications. Specialized in React and TypeScript.',
    experience: [
      {
        id: 'exp1',
        company: 'TechCorp',
        title: 'Senior Frontend Developer',
        location: 'San Francisco, CA',
        startDate: '2020-01',
        current: true,
        description: 'Leading frontend development for enterprise applications',
        skills: ['React', 'TypeScript', 'GraphQL']
      }
    ],
    education: [
      {
        id: 'edu1',
        school: 'University of California, Berkeley',
        degree: 'B.S. Computer Science',
        field: 'Computer Science',
        startDate: '2014',
        endDate: '2018'
      }
    ],
    skills: [
      { name: 'React', level: 'Expert', endorsements: 24 },
      { name: 'TypeScript', level: 'Expert', endorsements: 18 },
      { name: 'GraphQL', level: 'Advanced', endorsements: 12 }
    ],
    languages: [
      { name: 'English', level: 'Native' },
      { name: 'Mandarin', level: 'Fluent' }
    ],
    portfolio: [
      {
        id: 'port1',
        title: 'E-commerce Platform',
        description: 'Built a full-featured e-commerce platform',
        link: 'https://github.com/sarahchen/ecommerce',
        image: 'https://example.com/portfolio1.jpg',
        tags: ['React', 'Node.js', 'MongoDB']
      }
    ],
    preferences: {
      desiredTitle: ['Senior Frontend Developer', 'Lead Frontend Developer'],
      desiredLocation: ['San Francisco', 'Remote'],
      remotePreference: 'Hybrid',
      minSalary: 140000,
      jobTypes: ['Full-time'],
      industries: ['Technology', 'Finance']
    }
  },
  {
    id: '2',
    userId: 'user2',
    name: 'Michael Rodriguez',
    title: 'Full Stack Engineer',
    photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop',
    location: 'Austin, TX',
    about: 'Full stack developer specializing in Node.js and React. Experience with cloud infrastructure and microservices architecture.',
    experience: [
      {
        id: 'exp2',
        company: 'StartupX',
        title: 'Full Stack Engineer',
        location: 'Austin, TX',
        startDate: '2019-06',
        current: true,
        description: 'Developing full stack applications using modern technologies',
        skills: ['Node.js', 'React', 'AWS']
      }
    ],
    education: [
      {
        id: 'edu2',
        school: 'University of Texas',
        degree: 'M.S. Software Engineering',
        field: 'Software Engineering',
        startDate: '2017',
        endDate: '2019'
      }
    ],
    skills: [
      { name: 'Node.js', level: 'Expert', endorsements: 20 },
      { name: 'React', level: 'Advanced', endorsements: 15 },
      { name: 'AWS', level: 'Advanced', endorsements: 10 }
    ],
    languages: [
      { name: 'English', level: 'Native' },
      { name: 'Spanish', level: 'Fluent' }
    ],
    portfolio: [
      {
        id: 'port2',
        title: 'Cloud Management Dashboard',
        description: 'AWS resource management dashboard',
        link: 'https://github.com/mrodriguez/cloud-dashboard',
        image: 'https://example.com/portfolio2.jpg',
        tags: ['React', 'AWS', 'TypeScript']
      }
    ],
    preferences: {
      desiredTitle: ['Senior Full Stack Engineer', 'Technical Lead'],
      desiredLocation: ['Austin', 'Remote'],
      remotePreference: 'Remote',
      minSalary: 130000,
      jobTypes: ['Full-time', 'Contract'],
      industries: ['Technology', 'Startups']
    }
  }
];

export default function Recruiter() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    jobTitle: '',
    location: '',
    experience: '',
    skills: ''
  });
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);

  const filteredCandidates = CANDIDATES.filter(candidate => {
    const matchesSearch = candidate.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         candidate.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         candidate.about.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesJobTitle = !filters.jobTitle || 
                           candidate.preferences.desiredTitle.some(title => 
                             title.toLowerCase().includes(filters.jobTitle.toLowerCase()));
    
    const matchesLocation = !filters.location ||
                           candidate.location.toLowerCase().includes(filters.location.toLowerCase()) ||
                           candidate.preferences.desiredLocation.some(loc => 
                             loc.toLowerCase().includes(filters.location.toLowerCase()));
    
    const matchesSkills = !filters.skills ||
                         candidate.skills.some(skill => 
                           skill.name.toLowerCase().includes(filters.skills.toLowerCase()));

    return matchesSearch && matchesJobTitle && matchesLocation && matchesSkills;
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
            Find Top Talent
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            Connect with qualified candidates actively seeking new opportunities
          </p>
        </div>

        {/* Search and Filters */}
        <div className="bg-white dark:bg-dark-800 rounded-lg shadow-md p-6 mb-8">
          <div className="space-y-4">
            {/* Main Search */}
            <div className="relative">
              <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search candidates by name, title, or skills..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 w-full input-primary"
              />
            </div>

            {/* Quick Filters */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="relative">
                <Briefcase className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Job Title"
                  value={filters.jobTitle}
                  onChange={(e) => setFilters(prev => ({ ...prev, jobTitle: e.target.value }))}
                  className="pl-10 w-full input-primary"
                />
              </div>

              <div className="relative">
                <MapPin className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Location"
                  value={filters.location}
                  onChange={(e) => setFilters(prev => ({ ...prev, location: e.target.value }))}
                  className="pl-10 w-full input-primary"
                />
              </div>

              <div className="relative">
                <GraduationCap className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Skills"
                  value={filters.skills}
                  onChange={(e) => setFilters(prev => ({ ...prev, skills: e.target.value }))}
                  className="pl-10 w-full input-primary"
                />
              </div>
            </div>

            {/* Advanced Filters Toggle */}
            <div className="flex justify-between items-center">
              <button
                onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
                className="flex items-center text-indigo-600 hover:text-indigo-500"
              >
                <Filter className="h-4 w-4 mr-2" />
                Advanced Filters
              </button>
              <span className="text-sm text-gray-600 dark:text-gray-400">
                {filteredCandidates.length} candidates found
              </span>
            </div>
          </div>
        </div>

        {/* Candidates List */}
        <div className="space-y-6">
          {filteredCandidates.map(candidate => (
            <CandidateCard key={candidate.id} candidate={candidate} />
          ))}
        </div>
      </div>
    </div>
  );
}