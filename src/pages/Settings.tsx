import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Shield, Bell, Eye, Globe, Lock, Mail, MessageCircle, UserX, Smartphone, Key } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

export default function Settings() {
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const [settings, setSettings] = useState({
    // Privacy Settings
    profileVisibility: 'public', // public, connections, private
    showEmail: true,
    showPhone: false,
    showLocation: true,
    allowMessaging: true,
    showOnlineStatus: true,
    
    // Notification Settings
    emailNotifications: true,
    pushNotifications: true,
    jobAlerts: true,
    messageNotifications: true,
    applicationUpdates: true,
    
    // Security Settings
    twoFactorAuth: false,
    loginAlerts: true,
    deviceManagement: true,
    
    // Blocking & Restrictions
    restrictedCompanies: [] as string[],
    blockedUsers: [] as string[],
    restrictedIndustries: [] as string[],
    hideFromRecruiters: false,
    
    // Communication Preferences
    recruitersCanContact: true,
    jobRecommendations: true,
    newsletterSubscription: true
  });

  const handleToggle = (key: keyof typeof settings) => {
    setSettings(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const handleSelectChange = (key: keyof typeof settings, value: string) => {
    setSettings(prev => ({
      ...prev,
      [key]: value
    }));
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-dark-900 pt-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center">
            <button
              onClick={() => navigate('/')}
              className="mr-4 text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 group"
            >
              <ArrowLeft className="h-5 w-5 transition-transform group-hover:-translate-x-1" />
            </button>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Settings</h1>
          </div>
          <button
            onClick={() => console.log('Settings saved:', settings)}
            className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
          >
            Save Changes
          </button>
        </div>

        <div className="space-y-6">
          {/* Privacy Settings */}
          <div className="bg-white dark:bg-dark-800 rounded-xl shadow-lg p-6">
            <div className="flex items-center space-x-2 text-lg font-semibold text-gray-900 dark:text-white mb-6">
              <Eye className="h-5 w-5 text-indigo-600" />
              <h2>Privacy Settings</h2>
            </div>

            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Profile Visibility
                  </label>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Control who can see your profile
                  </p>
                </div>
                <select
                  value={settings.profileVisibility}
                  onChange={(e) => handleSelectChange('profileVisibility', e.target.value)}
                  className="ml-4 px-3 py-2 border border-gray-300 dark:border-dark-600 rounded-lg focus:ring-2 focus:ring-indigo-500 dark:bg-dark-700"
                >
                  <option value="public">Public</option>
                  <option value="connections">Connections Only</option>
                  <option value="private">Private</option>
                </select>
              </div>

              <div className="flex justify-between items-center">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Show Email Address
                  </label>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Display your email to other users
                  </p>
                </div>
                <button
                  onClick={() => handleToggle('showEmail')}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    settings.showEmail ? 'bg-indigo-600' : 'bg-gray-300 dark:bg-dark-600'
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      settings.showEmail ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>

              {/* Similar toggles for other privacy settings */}
              {/* ... */}
            </div>
          </div>

          {/* Security Settings */}
          <div className="bg-white dark:bg-dark-800 rounded-xl shadow-lg p-6">
            <div className="flex items-center space-x-2 text-lg font-semibold text-gray-900 dark:text-white mb-6">
              <Shield className="h-5 w-5 text-indigo-600" />
              <h2>Security Settings</h2>
            </div>

            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Two-Factor Authentication
                  </label>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Add an extra layer of security to your account
                  </p>
                </div>
                <button
                  onClick={() => handleToggle('twoFactorAuth')}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    settings.twoFactorAuth ? 'bg-indigo-600' : 'bg-gray-300 dark:bg-dark-600'
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      settings.twoFactorAuth ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>

              <div className="flex justify-between items-center">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Login Alerts
                  </label>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Get notified of new login attempts
                  </p>
                </div>
                <button
                  onClick={() => handleToggle('loginAlerts')}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    settings.loginAlerts ? 'bg-indigo-600' : 'bg-gray-300 dark:bg-dark-600'
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      settings.loginAlerts ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>
            </div>
          </div>

          {/* Blocking & Restrictions */}
          <div className="bg-white dark:bg-dark-800 rounded-xl shadow-lg p-6">
            <div className="flex items-center space-x-2 text-lg font-semibold text-gray-900 dark:text-white mb-6">
              <UserX className="h-5 w-5 text-indigo-600" />
              <h2>Blocking & Restrictions</h2>
            </div>

            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Hide from Recruiters
                  </label>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Prevent recruiters from finding your profile
                  </p>
                </div>
                <button
                  onClick={() => handleToggle('hideFromRecruiters')}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    settings.hideFromRecruiters ? 'bg-indigo-600' : 'bg-gray-300 dark:bg-dark-600'
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      settings.hideFromRecruiters ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>

              {/* Blocked Companies List */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Blocked Companies
                </label>
                <div className="flex flex-wrap gap-2">
                  {settings.restrictedCompanies.map((company, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-gray-100 dark:bg-dark-700"
                    >
                      {company}
                      <button
                        onClick={() => {
                          const newList = settings.restrictedCompanies.filter((_, i) => i !== index);
                          setSettings(prev => ({ ...prev, restrictedCompanies: newList }));
                        }}
                        className="ml-2 text-gray-500 hover:text-gray-700"
                      >
                        ×
                      </button>
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Notification Preferences */}
          <div className="bg-white dark:bg-dark-800 rounded-xl shadow-lg p-6">
            <div className="flex items-center space-x-2 text-lg font-semibold text-gray-900 dark:text-white mb-6">
              <Bell className="h-5 w-5 text-indigo-600" />
              <h2>Notification Preferences</h2>
            </div>

            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Email Notifications
                  </label>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Receive updates via email
                  </p>
                </div>
                <button
                  onClick={() => handleToggle('emailNotifications')}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    settings.emailNotifications ? 'bg-indigo-600' : 'bg-gray-300 dark:bg-dark-600'
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      settings.emailNotifications ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>

              <div className="flex justify-between items-center">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Push Notifications
                  </label>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Receive notifications on your device
                  </p>
                </div>
                <button
                  onClick={() => handleToggle('pushNotifications')}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    settings.pushNotifications ? 'bg-indigo-600' : 'bg-gray-300 dark:bg-dark-600'
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      settings.pushNotifications ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>
            </div>
          </div>

          {/* Communication Preferences */}
          <div className="bg-white dark:bg-dark-800 rounded-xl shadow-lg p-6">
            <div className="flex items-center space-x-2 text-lg font-semibold text-gray-900 dark:text-white mb-6">
              <MessageCircle className="h-5 w-5 text-indigo-600" />
              <h2>Communication Preferences</h2>
            </div>

            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Recruiter Messages
                  </label>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Allow recruiters to send you messages
                  </p>
                </div>
                <button
                  onClick={() => handleToggle('recruitersCanContact')}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    settings.recruitersCanContact ? 'bg-indigo-600' : 'bg-gray-300 dark:bg-dark-600'
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      settings.recruitersCanContact ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>

              <div className="flex justify-between items-center">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Job Recommendations
                  </label>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Receive personalized job suggestions
                  </p>
                </div>
                <button
                  onClick={() => handleToggle('jobRecommendations')}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    settings.jobRecommendations ? 'bg-indigo-600' : 'bg-gray-300 dark:bg-dark-600'
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      settings.jobRecommendations ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}