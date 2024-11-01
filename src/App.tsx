import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { ThemeProvider } from './contexts/ThemeContext';
import ProtectedRoute from './components/ProtectedRoute';
import Navbar from './components/Navbar';
import AuthForm from './components/AuthForm';
import JobSearch from './components/JobSearch';
import JobCard from './components/JobCard';
import ThemeToggle from './components/ThemeToggle';
import type { Job } from './types';

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
    logo: 'https://images.unsplash.com/photo-1549923746-c502d488b3ea?w=100&h=100&fit=crop'
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
    logo: 'https://images.unsplash.com/photo-1572044162444-ad60f128bdea?w=100&h=100&fit=crop'
  }
];

function JobBoard() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-dark-900 transition-colors duration-200">
      <Navbar />
      <main className="pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
            Find Your Dream Job
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
            Discover opportunities that match your experience and career goals
          </p>
          
          <JobSearch />
          
          <div className="mt-8 space-y-6">
            {SAMPLE_JOBS.map(job => (
              <JobCard key={job.id} job={job} />
            ))}
          </div>
        </div>
      </main>
      <div className="fixed bottom-6 left-6 z-50">
        <ThemeToggle />
      </div>
    </div>
  );
}

export function App() {
  return (
    <ThemeProvider>
      <Router>
        <AuthProvider>
          <Routes>
            <Route path="/login" element={<AuthForm mode="login" />} />
            <Route path="/signup" element={<AuthForm mode="signup" />} />
            <Route path="/" element={
              <ProtectedRoute>
                <JobBoard />
              </ProtectedRoute>
            } />
          </Routes>
        </AuthProvider>
      </Router>
    </ThemeProvider>
  );
}