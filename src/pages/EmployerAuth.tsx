import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mail, Building2, Shield, AlertCircle, CheckCircle2 } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

interface ValidationError {
  email?: string;
  domain?: string;
  company?: string;
}

export default function EmployerAuth() {
  const navigate = useNavigate();
  const { loginWithEmail } = useAuth();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<ValidationError>({});
  const [formData, setFormData] = useState({
    email: '',
    company: '',
    logo: '',
    website: '',
    size: '',
    industry: ''
  });

  // List of allowed email domains for employers
  const allowedDomains = [
    'google.com',
    'microsoft.com',
    'apple.com',
    'amazon.com',
    'meta.com',
    'netflix.com',
    'adobe.com',
    'salesforce.com',
    'oracle.com',
    'ibm.com'
  ];

  const validateEmail = (email: string) => {
    const errors: ValidationError = {};
    
    if (!email) {
      errors.email = 'Email is required';
      return errors;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      errors.email = 'Invalid email format';
      return errors;
    }

    const domain = email.split('@')[1];
    if (!allowedDomains.includes(domain)) {
      errors.domain = 'Please use your corporate email address';
      return errors;
    }

    return errors;
  };

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError({});
    
    const validationErrors = validateEmail(formData.email);
    if (Object.keys(validationErrors).length > 0) {
      setError(validationErrors);
      return;
    }

    setLoading(true);
    try {
      // Here you would typically:
      // 1. Send verification email
      // 2. Create temporary employer record
      // 3. Handle email verification flow
      
      await new Promise(resolve => setTimeout(resolve, 1500)); // Simulate API call
      setStep(2);
    } catch (err) {
      setError({ email: 'Failed to send verification email' });
    } finally {
      setLoading(false);
    }
  };

  const handleCompanySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError({});

    if (!formData.company) {
      setError({ company: 'Company name is required' });
      return;
    }

    setLoading(true);
    try {
      // Here you would typically:
      // 1. Validate company details
      // 2. Create employer profile
      // 3. Set up company branding
      
      await new Promise(resolve => setTimeout(resolve, 1500)); // Simulate API call
      setSuccess(true);
      setTimeout(() => {
        navigate('/post-job');
      }, 2000);
    } catch (err) {
      setError({ company: 'Failed to create employer profile' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-blue-100 dark:from-dark-900 dark:to-indigo-950 pt-16">
      <div className="max-w-md mx-auto px-4 py-12">
        <div className="bg-white dark:bg-dark-800 rounded-2xl shadow-xl overflow-hidden">
          {/* Header */}
          <div className="px-6 py-8 bg-gradient-to-r from-indigo-600 to-blue-600 text-white">
            <h1 className="text-2xl font-bold text-center mb-2">
              Employer Verification
            </h1>
            <p className="text-indigo-100 text-center">
              {step === 1 ? 'Verify your corporate email' : 'Complete your company profile'}
            </p>
          </div>

          {/* Progress Steps */}
          <div className="px-6 pt-6">
            <div className="flex items-center justify-center space-x-4">
              <div className={`flex items-center ${step >= 1 ? 'text-indigo-600' : 'text-gray-400'}`}>
                <span className="w-8 h-8 rounded-full border-2 flex items-center justify-center font-semibold">
                  1
                </span>
              </div>
              <div className={`w-16 h-0.5 ${step >= 2 ? 'bg-indigo-600' : 'bg-gray-300'}`} />
              <div className={`flex items-center ${step >= 2 ? 'text-indigo-600' : 'text-gray-400'}`}>
                <span className="w-8 h-8 rounded-full border-2 flex items-center justify-center font-semibold">
                  2
                </span>
              </div>
            </div>
          </div>

          {/* Form Content */}
          <div className="p-6">
            {step === 1 ? (
              <form onSubmit={handleEmailSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Corporate Email
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                    <input
                      type="email"
                      value={formData.email}
                      onChange={e => setFormData({ ...formData, email: e.target.value })}
                      className="pl-10 w-full input-primary"
                      placeholder="name@company.com"
                    />
                  </div>
                  {error.email && (
                    <p className="mt-1 text-sm text-red-600 dark:text-red-400 flex items-center">
                      <AlertCircle className="h-4 w-4 mr-1" />
                      {error.email}
                    </p>
                  )}
                  {error.domain && (
                    <p className="mt-1 text-sm text-red-600 dark:text-red-400 flex items-center">
                      <AlertCircle className="h-4 w-4 mr-1" />
                      {error.domain}
                    </p>
                  )}
                </div>

                <div className="bg-indigo-50 dark:bg-indigo-900/20 rounded-lg p-4">
                  <div className="flex items-start">
                    <Shield className="h-5 w-5 text-indigo-600 mt-0.5 mr-2" />
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      We'll send a verification link to your email to confirm your employer status.
                      Only corporate email domains are accepted.
                    </p>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full btn-primary py-2"
                >
                  {loading ? 'Verifying...' : 'Continue'}
                </button>
              </form>
            ) : (
              <form onSubmit={handleCompanySubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Company Name*
                  </label>
                  <div className="relative">
                    <Building2 className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                    <input
                      type="text"
                      value={formData.company}
                      onChange={e => setFormData({ ...formData, company: e.target.value })}
                      className="pl-10 w-full input-primary"
                      placeholder="Your company name"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Company Website
                  </label>
                  <input
                    type="url"
                    value={formData.website}
                    onChange={e => setFormData({ ...formData, website: e.target.value })}
                    className="w-full input-primary"
                    placeholder="https://example.com"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Company Size
                    </label>
                    <select
                      value={formData.size}
                      onChange={e => setFormData({ ...formData, size: e.target.value })}
                      className="w-full input-primary"
                    >
                      <option value="">Select size</option>
                      <option value="1-10">1-10 employees</option>
                      <option value="11-50">11-50 employees</option>
                      <option value="51-200">51-200 employees</option>
                      <option value="201-500">201-500 employees</option>
                      <option value="501+">501+ employees</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Industry
                    </label>
                    <select
                      value={formData.industry}
                      onChange={e => setFormData({ ...formData, industry: e.target.value })}
                      className="w-full input-primary"
                    >
                      <option value="">Select industry</option>
                      <option value="technology">Technology</option>
                      <option value="finance">Finance</option>
                      <option value="healthcare">Healthcare</option>
                      <option value="education">Education</option>
                      <option value="retail">Retail</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Company Logo
                  </label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={e => {
                      const file = e.target.files?.[0];
                      if (file) {
                        // Handle logo upload
                      }
                    }}
                    className="w-full input-primary"
                  />
                </div>

                {error.company && (
                  <p className="text-sm text-red-600 dark:text-red-400 flex items-center">
                    <AlertCircle className="h-4 w-4 mr-1" />
                    {error.company}
                  </p>
                )}

                {success && (
                  <div className="bg-green-50 dark:bg-green-900/20 text-green-800 dark:text-green-200 rounded-lg p-4 flex items-center">
                    <CheckCircle2 className="h-5 w-5 mr-2" />
                    Profile created successfully! Redirecting...
                  </div>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full btn-primary py-2"
                >
                  {loading ? 'Creating Profile...' : 'Complete Setup'}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}