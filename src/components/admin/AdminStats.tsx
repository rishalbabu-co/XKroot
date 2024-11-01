import { Users, Building2, Briefcase, FileText } from 'lucide-react';

interface AdminStatsProps {
  stats: {
    totalUsers: number;
    activeUsers: number;
    totalCompanies: number;
    activeCompanies: number;
    jobPostings: number;
    applications: number;
  };
}

export default function AdminStats({ stats }: AdminStatsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {/* User Stats */}
      <div className="bg-white dark:bg-dark-800 rounded-xl shadow-lg p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
              Total Users
            </p>
            <p className="text-2xl font-bold text-gray-900 dark:text-white">
              {stats.totalUsers.toLocaleString()}
            </p>
          </div>
          <div className="p-3 bg-indigo-100 dark:bg-indigo-900/30 rounded-lg">
            <Users className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
          </div>
        </div>
        <div className="mt-4 flex items-center text-sm">
          <span className="text-green-600 dark:text-green-400 font-medium">
            {Math.round((stats.activeUsers / stats.totalUsers) * 100)}% active
          </span>
          <span className="mx-2 text-gray-500 dark:text-gray-400">•</span>
          <span className="text-gray-600 dark:text-gray-400">
            {stats.activeUsers.toLocaleString()} active users
          </span>
        </div>
      </div>

      {/* Company Stats */}
      <div className="bg-white dark:bg-dark-800 rounded-xl shadow-lg p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
              Total Companies
            </p>
            <p className="text-2xl font-bold text-gray-900 dark:text-white">
              {stats.totalCompanies.toLocaleString()}
            </p>
          </div>
          <div className="p-3 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
            <Building2 className="h-6 w-6 text-purple-600 dark:text-purple-400" />
          </div>
        </div>
        <div className="mt-4 flex items-center text-sm">
          <span className="text-green-600 dark:text-green-400 font-medium">
            {Math.round((stats.activeCompanies / stats.totalCompanies) * 100)}% active
          </span>
          <span className="mx-2 text-gray-500 dark:text-gray-400">•</span>
          <span className="text-gray-600 dark:text-gray-400">
            {stats.activeCompanies.toLocaleString()} active companies
          </span>
        </div>
      </div>

      {/* Job Stats */}
      <div className="bg-white dark:bg-dark-800 rounded-xl shadow-lg p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
              Job Postings
            </p>
            <p className="text-2xl font-bold text-gray-900 dark:text-white">
              {stats.jobPostings.toLocaleString()}
            </p>
          </div>
          <div className="p-3 bg-green-100 dark:bg-green-900/30 rounded-lg">
            <Briefcase className="h-6 w-6 text-green-600 dark:text-green-400" />
          </div>
        </div>
        <div className="mt-4 flex items-center text-sm">
          <span className="text-gray-600 dark:text-gray-400">
            {stats.applications.toLocaleString()} total applications
          </span>
          <span className="mx-2 text-gray-500 dark:text-gray-400">•</span>
          <span className="text-gray-600 dark:text-gray-400">
            {Math.round(stats.applications / stats.jobPostings)} avg. per job
          </span>
        </div>
      </div>
    </div>
  );
}