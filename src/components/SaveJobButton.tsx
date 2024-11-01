import { Bookmark } from 'lucide-react';
import { useSavedJobs } from '../hooks/useSavedJobs';
import type { Job } from '../types';

interface SaveJobButtonProps {
  job: Job;
  className?: string;
}

export default function SaveJobButton({ job, className = '' }: SaveJobButtonProps) {
  const { isJobSaved, toggleSaveJob } = useSavedJobs();
  const saved = isJobSaved(job.id);

  return (
    <button
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        toggleSaveJob(job.id);
      }}
      className={`group flex items-center space-x-2 transition-colors ${
        saved
          ? 'text-indigo-600 dark:text-indigo-400'
          : 'text-gray-500 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400'
      } ${className}`}
      aria-label={saved ? 'Unsave job' : 'Save job'}
    >
      <Bookmark
        className={`h-5 w-5 transition-all ${
          saved ? 'fill-current' : 'group-hover:fill-current'
        }`}
      />
      <span className="text-sm">
        {saved ? 'Saved' : 'Save Job'}
      </span>
    </button>
  );
}