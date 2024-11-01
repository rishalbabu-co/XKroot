import { MapPin, DollarSign, Clock, Users, Building2, Briefcase } from 'lucide-react';
import type { Job } from '../../types';

interface SwipeableJobCardProps {
  job: Job;
}

export default function SwipeableJobCard({ job }: SwipeableJobCardProps) {
  return (
    <div className="bg-white dark:bg-dark-800 rounded-2xl shadow-xl h-full flex flex-col">
      {/* Fixed Header */}
      <div className="flex-shrink-0">
        <div className="relative h-36 sm:h-48 bg-gradient-to-br from-indigo-500 to-purple-600">
          <img
            src={job.logo}
            alt={`${job.company} logo`}
            className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-20 h-20 sm:w-24 sm:h-24 rounded-xl border-4 border-white dark:border-dark-800 object-cover"
          />
        </div>

        <div className="text-center mt-12 px-4 mb-4">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-2">
            {job.title}
          </h2>
          <p className="text-lg text-indigo-600 dark:text-indigo-400">
            {job.company}
          </p>
        </div>

        <div className="grid grid-cols-2 gap-3 px-4 mb-4">
          <div className="flex items-center text-sm sm:text-base text-gray-600 dark:text-gray-400">
            <MapPin className="h-4 w-4 sm:h-5 sm:w-5 mr-2 flex-shrink-0" />
            <span className="truncate">{job.location}</span>
          </div>
          <div className="flex items-center text-sm sm:text-base text-gray-600 dark:text-gray-400">
            <DollarSign className="h-4 w-4 sm:h-5 sm:w-5 mr-2 flex-shrink-0" />
            <span className="truncate">{job.salary}</span>
          </div>
          <div className="flex items-center text-sm sm:text-base text-gray-600 dark:text-gray-400">
            <Clock className="h-4 w-4 sm:h-5 sm:w-5 mr-2 flex-shrink-0" />
            <span className="truncate">{job.posted}</span>
          </div>
          <div className="flex items-center text-sm sm:text-base text-gray-600 dark:text-gray-400">
            <Users className="h-4 w-4 sm:h-5 sm:w-5 mr-2 flex-shrink-0" />
            <span className="truncate">{job.applicants} applicants</span>
          </div>
        </div>
      </div>

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto px-4 pb-6 space-y-6 custom-scrollbar">
        <div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
            Description
          </h3>
          <p className="text-gray-600 dark:text-gray-300">
            {job.description}
          </p>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
            Requirements
          </h3>
          <ul className="list-disc list-inside space-y-1 text-gray-600 dark:text-gray-300">
            {job.requirements.map((req, index) => (
              <li key={index} className="text-sm sm:text-base">{req}</li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
            Benefits
          </h3>
          <div className="flex flex-wrap gap-2">
            {job.benefits.map((benefit, index) => (
              <span
                key={index}
                className="px-3 py-1 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 rounded-full text-sm"
              >
                {benefit}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}