import { useState, useEffect } from 'react';
import { Search, Edit2, Trash2, Building2, CheckCircle, XCircle } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { trackEvent } from '../../lib/analytics';

interface Company {
  id: string;
  name: string;
  email: string;
  status: 'active' | 'inactive';
  industry: string;
  size: string;
  jobCount: number;
  joinDate: string;
}

export default function CompanyManagement() {
  const { currentUser } = useAuth();
  const [companies, setCompanies] = useState<Company[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCompany, setSelectedCompany] = useState<Company | null>(null);

  useEffect(() => {
    fetchCompanies();
  }, []);

  const fetchCompanies = async () => {
    try {
      // This would typically be an API call to your backend
      // For now, we'll use mock data
      const mockCompanies: Company[] = [
        {
          id: '1',
          name: 'TechCorp',
          email: 'hr@techcorp.com',
          status: 'active',
          industry: 'Technology',
          size: '1000-5000',
          jobCount: 15,
          joinDate: '2023-12-01T00:00:00Z'
        },
        {
          id: '2',
          name: 'StartupX',
          email: 'careers@startupx.com',
          status: 'active',
          industry: 'Fintech',
          size: '50-200',
          jobCount: 8,
          joinDate: '2024-01-15T00:00:00Z'
        }
      ];
      setCompanies(mockCompanies);
    } catch (error) {
      console.error('Error fetching companies:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (companyId: string, newStatus: 'active' | 'inactive') => {
    try {
      // This would typically be an API call to your backend
      setCompanies(companies.map(company => 
        company.id === companyId ? { ...company, status: newStatus } : company
      ));

      trackEvent('admin_company_status_change', {
        adminId: currentUser?.uid,
        companyId,
        newStatus,
        timestamp: new Date().toISOString()
      });
    } catch (error) {
      console.error('Error updating company status:', error);
    }
  };

  const handleDeleteCompany = async (companyId: string) => {
    if (!window.confirm('Are you sure you want to delete this company?')) return;

    try {
      // This would typically be an API call to your backend
      setCompanies(companies.filter(company => company.id !== companyId));

      trackEvent('admin_company_delete', {
        adminId: currentUser?.uid,
        companyId,
        timestamp: new Date().toISOString()
      });
    } catch (error) {
      console.error('Error deleting company:', error);
    }
  };

  const filteredCompanies = companies.filter(company =>
    company.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    company.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-dark-800 rounded-xl shadow-lg">
      {/* Search Bar */}
      <div className="p-4 border-b border-gray-200 dark:border-dark-700">
        <div className="relative">
          <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search companies..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 w-full px-4 py-2 border border-gray-300 dark:border-dark-600 rounded-lg focus:ring-2 focus:ring-indigo-500 dark:bg-dark-700"
          />
        </div>
      </div>

      {/* Companies Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 dark:bg-dark-700">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Company
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Industry
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Size
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Job Posts
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Join Date
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-dark-700">
            {filteredCompanies.map((company) => (
              <tr key={company.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div>
                    <div className="text-sm font-medium text-gray-900 dark:text-white">
                      {company.name}
                    </div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                      {company.email}
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    company.status === 'active'
                      ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                      : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                  }`}>
                    {company.status === 'active' ? (
                      <CheckCircle className="h-4 w-4 mr-1" />
                    ) : (
                      <XCircle className="h-4 w-4 mr-1" />
                    )}
                    {company.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                  {company.industry}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                  {company.size}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                  {company.jobCount}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                  {new Date(company.joinDate).toLocaleDateString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <div className="flex items-center justify-end space-x-2">
                    <button
                      onClick={() => handleStatusChange(
                        company.id,
                        company.status === 'active' ? 'inactive' : 'active'
                      )}
                      className={`p-1 rounded-full ${
                        company.status === 'active'
                          ? 'text-red-600 hover:bg-red-100 dark:hover:bg-red-900/30'
                          : 'text-green-600 hover:bg-green-100 dark:hover:bg-green-900/30'
                      }`}
                    >
                      {company.status === 'active' ? (
                        <Building2 className="h-5 w-5" />
                      ) : (
                        <CheckCircle className="h-5 w-5" />
                      )}
                    </button>
                    <button
                      onClick={() => setSelectedCompany(company)}
                      className="p-1 text-indigo-600 hover:bg-indigo-100 dark:hover:bg-indigo-900/30 rounded-full"
                    >
                      <Edit2 className="h-5 w-5" />
                    </button>
                    <button
                      onClick={() => handleDeleteCompany(company.id)}
                      className="p-1 text-red-600 hover:bg-red-100 dark:hover:bg-red-900/30 rounded-full"
                    >
                      <Trash2 className="h-5 w-5" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}