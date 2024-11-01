import { Menu, Search, User, Briefcase, Bell } from 'lucide-react';
import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import ThemeToggle from './ThemeToggle';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  async function handleLogout() {
    try {
      await logout();
      navigate('/login');
    } catch (error) {
      console.error('Failed to log out:', error);
    }
  }

  return (
    <nav className="bg-white dark:bg-dark-800 shadow-lg fixed w-full top-0 z-50 transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Briefcase className="h-8 w-8 text-indigo-600" />
            <span className="ml-2 text-xl font-bold text-gray-900 dark:text-white">XKroot</span>
          </div>

          <div className="hidden md:flex items-center space-x-8">
            <a href="/jobs" className="text-gray-700 dark:text-gray-200 hover:text-indigo-600 dark:hover:text-indigo-400">Find Jobs</a>
            <a href="/companies" className="text-gray-700 dark:text-gray-200 hover:text-indigo-600 dark:hover:text-indigo-400">Companies</a>
            
            {currentUser && (
              <>
                <a href="/profile" className="text-gray-700 dark:text-gray-200 hover:text-indigo-600 dark:hover:text-indigo-400">Profile</a>
                <div className="relative">
                  <Bell className="h-6 w-6 text-gray-500 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 cursor-pointer" />
                  <span className="absolute -top-1 -right-1 h-4 w-4 bg-red-500 rounded-full flex items-center justify-center text-xs text-white">
                    2
                  </span>
                </div>
              </>
            )}
            
            <ThemeToggle />
            
            {currentUser ? (
              <div className="flex items-center space-x-4">
                <button onClick={handleLogout} className="text-gray-700 dark:text-gray-200 hover:text-indigo-600 dark:hover:text-indigo-400">
                  Logout
                </button>
                <button className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700">
                  Post a Job
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <button onClick={() => navigate('/login')} className="text-gray-700 dark:text-gray-200 hover:text-indigo-600 dark:hover:text-indigo-400">
                  Login
                </button>
                <button onClick={() => navigate('/signup')} className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700">
                  Sign Up
                </button>
              </div>
            )}
          </div>

          <div className="md:hidden flex items-center space-x-4">
            <ThemeToggle />
            <button onClick={() => setIsOpen(!isOpen)}>
              <Menu className="h-6 w-6 text-gray-500 dark:text-gray-400" />
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden bg-white dark:bg-dark-800 transition-colors duration-200">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <a href="/jobs" className="block px-3 py-2 text-gray-700 dark:text-gray-200 hover:text-indigo-600 dark:hover:text-indigo-400">Find Jobs</a>
            <a href="/companies" className="block px-3 py-2 text-gray-700 dark:text-gray-200 hover:text-indigo-600 dark:hover:text-indigo-400">Companies</a>
            {currentUser && (
              <a href="/profile" className="block px-3 py-2 text-gray-700 dark:text-gray-200 hover:text-indigo-600 dark:hover:text-indigo-400">Profile</a>
            )}
            {currentUser ? (
              <>
                <button onClick={handleLogout} className="block w-full text-left px-3 py-2 text-gray-700 dark:text-gray-200 hover:text-indigo-600 dark:hover:text-indigo-400">
                  Logout
                </button>
                <button className="w-full mt-2 bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700">
                  Post a Job
                </button>
              </>
            ) : (
              <>
                <button onClick={() => navigate('/login')} className="block w-full text-left px-3 py-2 text-gray-700 dark:text-gray-200 hover:text-indigo-600 dark:hover:text-indigo-400">
                  Login
                </button>
                <button onClick={() => navigate('/signup')} className="w-full mt-2 bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700">
                  Sign Up
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}