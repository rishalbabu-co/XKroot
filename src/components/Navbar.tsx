import { Menu, Search, User, Briefcase, ChevronDown, LogOut, Bookmark, Settings } from 'lucide-react';
import { useState, useRef } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useLocation, Link, useNavigate } from 'react-router-dom';
import NotificationBell from './notifications/NotificationBell';
import { useOnClickOutside } from '../hooks/useOnClickOutside';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const { currentUser, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const profileMenuRef = useRef<HTMLDivElement>(null);

  useOnClickOutside(profileMenuRef, () => setShowProfileMenu(false));

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login');
    } catch (error) {
      console.error('Failed to log out:', error);
    }
  };

  const isActive = (path: string) => {
    if (path === '/jobs' && (location.pathname === '/' || location.pathname === '/jobs')) {
      return 'text-indigo-600 dark:text-indigo-400 font-bold';
    }
    return location.pathname === path ? 
      'text-indigo-600 dark:text-indigo-400 font-bold' : 
      'text-gray-700 dark:text-gray-200 hover:text-indigo-600 dark:hover:text-indigo-400';
  };

  return (
    <nav className="bg-white dark:bg-dark-800 shadow-lg fixed w-full top-0 z-50 transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <svg version="1.0" xmlns="http://www.w3.org/2000/svg"
                width="50.000000pt" height="50.000000pt" viewBox="0 0 2000.000000 2000.000000"
                preserveAspectRatio="xMidYMid meet">
                {/* SVG path data */}
              </svg>
              <span className="ml-2 text-xl font-bold text-gray-900 dark:text-white">XKroot</span>
            </Link>
          </div>

          <div className="hidden md:flex items-center space-x-8">
            <Link 
              to="/jobs" 
              className={`${isActive('/jobs')} transition-colors duration-200`}
            >
              Find Jobs
            </Link>
            <Link 
              to="/companies" 
              className={`${isActive('/companies')} transition-colors duration-200`}
            >
              Companies
            </Link>
            <Link 
              to="/recruiter" 
              className={`${isActive('/recruiter')} transition-colors duration-200`}
            >
              Find Talent
            </Link>
            
            {currentUser && (
              <>
                <NotificationBell />
                <div ref={profileMenuRef} className="relative">
                  <button
                    onClick={() => setShowProfileMenu(!showProfileMenu)}
                    className="flex items-center space-x-1 text-gray-700 dark:text-gray-200 hover:text-indigo-600 dark:hover:text-indigo-400"
                  >
                    <User className="h-5 w-5" />
                    <ChevronDown className={`h-4 w-4 transform transition-transform ${showProfileMenu ? 'rotate-180' : ''}`} />
                  </button>

                  {showProfileMenu && (
                    <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-dark-800 rounded-xl shadow-lg py-1 ring-1 ring-black ring-opacity-5">
                      <Link
                        to="/profile"
                        className="flex items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-dark-700"
                        onClick={() => setShowProfileMenu(false)}
                      >
                        <User className="h-4 w-4 mr-3" />
                        Profile
                      </Link>
                      <Link
                        to="/saved-jobs"
                        className="flex items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-dark-700"
                        onClick={() => setShowProfileMenu(false)}
                      >
                        <Bookmark className="h-4 w-4 mr-3" />
                        Saved Jobs
                      </Link>
                      <Link
                        to="/settings"
                        className="flex items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-dark-700"
                        onClick={() => setShowProfileMenu(false)}
                      >
                        <Settings className="h-4 w-4 mr-3" />
                        Settings
                      </Link>
                      <button
                        onClick={handleLogout}
                        className="flex items-center w-full px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-dark-700"
                      >
                        <LogOut className="h-4 w-4 mr-3" />
                        Logout
                      </button>
                    </div>
                  )}
                </div>
              </>
            )}
            
            {currentUser ? (
              <button 
                onClick={() => navigate('/post-job')}
                className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition-colors duration-200"
              >
                Post a Job
              </button>
            ) : (
              <div className="flex items-center space-x-4">
                <Link 
                  to="/login" 
                  className={`${isActive('/login')} transition-colors duration-200`}
                >
                  Login
                </Link>
                <Link 
                  to="/signup" 
                  className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition-colors duration-200"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>

          <div className="md:hidden flex items-center">
            <button onClick={() => setIsOpen(!isOpen)}>
              <Menu className="h-6 w-6 text-gray-500 dark:text-gray-400" />
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden bg-white dark:bg-dark-800 transition-colors duration-200">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link 
              to="/jobs" 
              className={`block px-3 py-2 ${isActive('/jobs')} transition-colors duration-200`}
            >
              Find Jobs
            </Link>
            <Link 
              to="/companies" 
              className={`block px-3 py-2 ${isActive('/companies')} transition-colors duration-200`}
            >
              Companies
            </Link>
            <Link 
              to="/recruiter" 
              className={`block px-3 py-2 ${isActive('/recruiter')} transition-colors duration-200`}
            >
              Find Talent
            </Link>
            {currentUser && (
              <>
                <Link 
                  to="/profile" 
                  className={`block px-3 py-2 ${isActive('/profile')} transition-colors duration-200`}
                >
                  Profile
                </Link>
                <Link 
                  to="/saved-jobs" 
                  className={`block px-3 py-2 ${isActive('/saved-jobs')} transition-colors duration-200`}
                >
                  Saved Jobs
                </Link>
                <Link 
                  to="/settings" 
                  className={`block px-3 py-2 ${isActive('/settings')} transition-colors duration-200`}
                >
                  Settings
                </Link>
              </>
            )}
            {currentUser ? (
              <>
                <button 
                  onClick={handleLogout}
                  className="block w-full text-left px-3 py-2 text-gray-700 dark:text-gray-200 hover:text-indigo-600 dark:hover:text-indigo-400"
                >
                  Logout
                </button>
                <button 
                  onClick={() => navigate('/post-job')}
                  className="w-full mt-2 bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition-colors duration-200"
                >
                  Post a Job
                </button>
              </>
            ) : (
              <>
                <Link 
                  to="/login" 
                  className={`block px-3 py-2 ${isActive('/login')} transition-colors duration-200`}
                >
                  Login
                </Link>
                <Link 
                  to="/signup" 
                  className="w-full mt-2 bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition-colors duration-200"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}