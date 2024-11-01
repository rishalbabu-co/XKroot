import { RefreshCw } from 'lucide-react';

interface EmptyStateProps {
  onReset: () => void;
}

export default function EmptyState({ onReset }: EmptyStateProps) {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-dark-900 pt-16">
      <div className="max-w-md mx-auto px-4 py-16 text-center">
        <div className="bg-white dark:bg-dark-800 rounded-2xl p-8 shadow-xl">
          <div className="w-16 h-16 bg-indigo-100 dark:bg-indigo-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
            <RefreshCw className="h-8 w-8 text-indigo-600 dark:text-indigo-400" />
          </div>
          
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            No More Jobs
          </h2>
          
          <p className="text-gray-600 dark:text-gray-300 mb-8">
            You've reviewed all available jobs. Would you like to start over?
          </p>

          <button
            onClick={onReset}
            className="inline-flex items-center px-6 py-3 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition-colors duration-200"
          >
            <RefreshCw className="h-5 w-5 mr-2" />
            Start Over
          </button>
        </div>
      </div>
    </div>
  );
}