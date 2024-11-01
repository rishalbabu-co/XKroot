import { MapPin, Clock, DollarSign, Briefcase, MessageCircle, Users } from 'lucide-react';
import { useState } from 'react';
import type { Job } from '../types';
import JobDetailsModal from './JobDetailsModal';
import JobApplicationModal from './JobApplicationModal';
import SaveJobButton from './SaveJobButton';

interface JobCardProps {
  job: Job;
}

export default function JobCard({ job }: JobCardProps) {
  const [showDetails, setShowDetails] = useState(false);
  const [showApplication, setShowApplication] = useState(false);

  const handleStartChat = () => {
    const event = new CustomEvent('startChat', { 
      detail: { 
        recipientId: job.id,
        recipientName: job.company,
        recipientPhoto: job.logo,
        context: `Regarding ${job.title} position`
      } 
    });
    window.dispatchEvent(event);
  };

  return (
    <>
      <div className="bg-white dark:bg-dark-800 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200">
        <div className="p-6">
          <div className="flex items-start justify-between">
            <div className="flex items-start space-x-4">
              <img
                src={job.logo}
                alt={`${job.company} logo`}
                className="w-12 h-12 rounded-md object-cover"
              />
              <div>
                <button
                  onClick={() => setShowDetails(true)}
                  className="text-lg font-semibold text-gray-900 dark:text-white hover:text-indigo-600 dark:hover:text-indigo-400"
                >
                  {job.title}
                </button>
                <p className="text-gray-600 dark:text-gray-300">{job.company}</p>
              </div>
            </div>
            <span className={`px-3 py-1 rounded-full text-sm font-medium ${
              job.type === 'Full-time' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' :
              job.type === 'Part-time' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200' :
              job.type === 'Contract' ? 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200' :
              'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200'
            }`}>
              {job.type}
            </span>
          </div>

          <div className="mt-4 flex flex-wrap gap-4 text-sm text-gray-600 dark:text-gray-400">
            <div className="flex items-center">
              <MapPin className="h-4 w-4 mr-1" />
              {job.location}
            </div>
            <div className="flex items-center">
              <DollarSign className="h-4 w-4 mr-1" />
              {job.salary}
            </div>
            <div className="flex items-center">
              <Clock className="h-4 w-4 mr-1" />
              {job.posted}
            </div>
            <div className="flex items-center">
              <Users className="h-4 w-4 mr-1" />
              {job.applicants} applicants
            </div>
          </div>

          <p className="mt-4 text-gray-600 dark:text-gray-300 line-clamp-2">{job.description}</p>

          <div className="mt-4 flex flex-wrap gap-2">
            {job.requirements.slice(0, 3).map((req, index) => (
              <span
                key={index}
                className="px-2 py-1 bg-gray-100 dark:bg-dark-700 text-gray-600 dark:text-gray-300 rounded-md text-sm"
              >
                {req}
              </span>
            ))}
            {job.requirements.length > 3 && (
              <span className="px-2 py-1 text-gray-500 dark:text-gray-400 text-sm">
                +{job.requirements.length - 3} more
              </span>
            )}
          </div>

          <div className="mt-6 flex justify-between items-center">
            <div className="flex space-x-4">
              <button
                onClick={() => setShowApplication(true)}
                className="bg-indigo-600 text-white px-6 py-2 rounded-md hover:bg-indigo-700 transition-colors duration-200"
              >
                Apply Now
              </button>
              <button
                onClick={handleStartChat}
                className="flex items-center space-x-2 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md hover:bg-gray-50 dark:hover:bg-dark-700 transition-colors duration-200"
              >
                <MessageCircle className="h-4 w-4" />
                <span>Message Recruiter</span>
              </button>
            </div>
            <SaveJobButton job={job} />
          </div>
        </div>
      </div>

      <JobDetailsModal
        job={job}
        isOpen={showDetails}
        onClose={() => setShowDetails(false)}
        onApply={() => {
          setShowDetails(false);
          setShowApplication(true);
        }}
      />

      <JobApplicationModal
        job={job}
        isOpen={showApplication}
        onClose={() => setShowApplication(false)}
      />
    </>
  );
}