import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Users, Building2, Activity, BarChart2 } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import AdminStats from '../../components/admin/AdminStats';
import UserActivityChart from '../../components/admin/UserActivityChart';
import UserManagement from '../../components/admin/UserManagement';
import CompanyManagement from '../../components/admin/CompanyManagement';
import { trackEvent } from '../../lib/analytics';

export default function AdminDashboard() {
  const navigate = useNavigate();
  const { currentUser, isAdmin } = useAuth();
  const [activeTab, setActiveTab] = useState<'overview' | 'users' | 'companies'>('overview');
  const [stats, setStats] = useState({
    totalUsers: 0,
    activeUsers: 0,
    totalCompanies: 0,
    activeCompanies: 0,
    jobPostings: 0,
    applications: 0
  });

  useEffect(() => {
    // Check admin status
    if (!currentUser || !isAdmin) {
      navigate('/login');
      return;
    }

    // Track admin dashboard view
    trackEvent('admin_dashboard_view', {
      userId: currentUser.uid,
      timestamp: new Date().toISOString()
    });

    // Fetch dashboard stats
    fetchDashboardStats();
  }, [currentUser, isAdmin, navigate]);

  const fetchDashboardStats = async () => {
    try {
      // This would typically be an API call to your backend
      // For now, we'll use mock data
      setStats({
        totalUsers: 1250,
        activeUsers: 890,
        totalCompanies: 145,
        activeCompanies: 120,
        jobPostings: 450,
        applications: 2800
      });
    } catch (error) {
      console.error('Error fetching dashboard stats:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-dark-900 pt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Admin Dashboard
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Manage users, companies, and monitor platform activity
          </p>
        </div>

        {/* Stats Overview */}
        <AdminStats stats={stats} />

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
              <Activity className="h-5 w-5 inline-block mr-2" />
              Overview
            </button>
            <button
              onClick={() => setActiveTab('users')}
              className={`pb-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'users'
                  ? 'border-indigo-600 text-indigo-600 dark:border-indigo-400 dark:text-indigo-400'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300'
              }`}
            >
              <Users className="h-5 w-5 inline-block mr-2" />
              Users
            </button>
            <button
              onClick={() => setActiveTab('companies')}
              className={`pb-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'companies'
                  ? 'border-indigo-600 text-indigo-600 dark:border-indigo-400 dark:text-indigo-400'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300'
              }`}
            >
              <Building2 className="h-5 w-5 inline-block mr-2" />
              Companies
            </button>
          </nav>
        </div>

        {/* Tab Content */}
        <div className="mt-8">
          {activeTab === 'overview' && (
            <div className="space-y-6">
              <div className="bg-white dark:bg-dark-800 rounded-xl shadow-lg p-6">
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                  <BarChart2 className="h-5 w-5 mr-2 text-indigo-600" />
                  User Activity
                </h2>
                <UserActivityChart />
              </div>
            </div>
          )}

          {activeTab === 'users' && (
            <UserManagement />
          )}

          {activeTab === 'companies' && (
            <CompanyManagement />
          )}
        </div>
      </div>
    </div>
  );
}