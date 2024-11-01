import { Copyright } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-white dark:bg-dark-800 border-t border-gray-200 dark:border-dark-700 py-4 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-center text-sm text-gray-600 dark:text-gray-400">
          <span className="flex items-center">
            XKroot.ai <Copyright className="h-4 w-4 mx-1" /> {new Date().getFullYear()}. Product of Yeppypot
          </span>
        </div>
      </div>
    </footer>
  );
}