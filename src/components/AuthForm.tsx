import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { LogIn, Mail, Lock, Github } from 'lucide-react';
import { Link } from 'react-router-dom';
import TypewriterEffect from './TypewriterEffect';

interface AuthFormProps {
  mode: 'login' | 'signup';
}

export default function AuthForm({ mode }: AuthFormProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const { loginWithEmail, signupWithEmail, loginWithGoogle, loginWithGithub } = useAuth();

  const messages = [
    "Find your dream job seamlessly",
    "Connect with top companies",
    "Build your professional network",
    "Discover opportunities worldwide",
    "Advance your career with XKroot.ai"
  ];

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (mode === 'login') {
        await loginWithEmail(email, password);
      } else {
        await signupWithEmail(email, password);
      }
      window.location.href = '/';
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to authenticate');
    }

    setLoading(false);
  }

  async function handleGoogleLogin() {
    try {
      await loginWithGoogle();
      window.location.href = '/';
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to authenticate with Google');
    }
  }

  async function handleGithubLogin() {
    try {
      await loginWithGithub();
      window.location.href = '/';
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to authenticate with GitHub');
    }
  }

  return (
    <div className="min-h-screen flex">
      {/* Left Side - Auth Form */}
      <div className="w-full md:w-[45%] bg-white dark:bg-dark-800 flex items-center justify-center p-8">
        <div className="max-w-md w-full space-y-8">
          <div>
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900 dark:text-white">
              {mode === 'login' ? 'Welcome back!' : 'Create your account'}
            </h2>
            <p className="mt-2 text-center text-sm text-gray-600 dark:text-gray-400">
              {mode === 'login' ? (
                <>
                  New to XKroot?{' '}
                  <Link to="/signup" className="font-medium text-indigo-600 hover:text-indigo-500">
                    Create an account
                  </Link>
                </>
              ) : (
                <>
                  Already have an account?{' '}
                  <Link to="/login" className="font-medium text-indigo-600 hover:text-indigo-500">
                    Sign in
                  </Link>
                </>
              )}
            </p>
          </div>

          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
              <span className="block sm:inline">{error}</span>
            </div>
          )}

          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <div className="rounded-md shadow-sm -space-y-px">
              <div>
                <label htmlFor="email-address" className="sr-only">
                  Email address
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="email-address"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="appearance-none rounded-t-lg relative block w-full px-3 py-3 pl-10 border border-gray-300 dark:border-dark-600 placeholder-gray-500 dark:placeholder-gray-400 text-gray-900 dark:text-white focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm bg-white dark:bg-dark-700"
                    placeholder="Email address"
                  />
                </div>
              </div>
              <div>
                <label htmlFor="password" className="sr-only">
                  Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="appearance-none rounded-b-lg relative block w-full px-3 py-3 pl-10 border border-gray-300 dark:border-dark-600 placeholder-gray-500 dark:placeholder-gray-400 text-gray-900 dark:text-white focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm bg-white dark:bg-dark-700"
                    placeholder="Password"
                  />
                </div>
              </div>
            </div>

            {mode === 'login' && (
              <div className="flex items-center justify-end">
                <div className="text-sm">
                  <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">
                    Forgot your password?
                  </a>
                </div>
              </div>
            )}

            <div>
              <button
                type="submit"
                disabled={loading}
                className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
              >
                <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                  <LogIn className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400" />
                </span>
                {mode === 'login' ? 'Sign in' : 'Sign up'}
              </button>
            </div>

            <div className="mt-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300 dark:border-dark-600"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white dark:bg-dark-800 text-gray-500 dark:text-gray-400">
                    Or continue with
                  </span>
                </div>
              </div>

              <div className="mt-6 grid grid-cols-2 gap-3">
                <button
                  onClick={handleGoogleLogin}
                  className="w-full inline-flex justify-center items-center py-2.5 px-4 rounded-lg shadow-sm bg-white dark:bg-dark-700 border border-gray-300 dark:border-dark-600 text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-dark-600"
                >
                  <svg className="h-5 w-5 mr-2" viewBox="0 0 24 24">
                    <path
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                      fill="#4285F4"
                    />
                    <path
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                      fill="#34A853"
                    />
                    <path
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                      fill="#FBBC05"
                    />
                    <path
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                      fill="#EA4335"
                    />
                  </svg>
                  Google
                </button>
                <button
                  onClick={handleGithubLogin}
                  className="w-full inline-flex justify-center items-center py-2.5 px-4 rounded-lg shadow-sm bg-white dark:bg-dark-700 border border-gray-300 dark:border-dark-600 text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-dark-600"
                >
                  <Github className="h-5 w-5 mr-2" />
                  GitHub
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>

      {/* Right Side - Animation */}
      <div className="hidden md:flex md:w-[55%] bg-gradient-to-br from-indigo-600 to-purple-700 items-center justify-center p-8">
        <div className="max-w-2xl text-white">
          <h1 className="text-4xl font-bold mb-8">
            XKroot.ai
          </h1>
          <div className="h-20">
            <TypewriterEffect messages={messages} />
          </div>
          <div className="mt-12 grid grid-cols-2 gap-8">
            <div className="text-center">
              <h3 className="text-3xl font-bold mb-2">10k+</h3>
              <p className="text-indigo-200">Active Jobs</p>
            </div>
            <div className="text-center">
              <h3 className="text-3xl font-bold mb-2">5k+</h3>
              <p className="text-indigo-200">Companies</p>
            </div>
            <div className="text-center">
              <h3 className="text-3xl font-bold mb-2">50k+</h3>
              <p className="text-indigo-200">Job Seekers</p>
            </div>
            <div className="text-center">
              <h3 className="text-3xl font-bold mb-2">95%</h3>
              <p className="text-indigo-200">Success Rate</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}