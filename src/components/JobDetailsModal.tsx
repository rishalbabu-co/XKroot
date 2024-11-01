import { X, MapPin, DollarSign, Clock, Users, Building2, Briefcase, MessageCircle } from 'lucide-react';
import type { Job } from '../types';
import SaveJobButton from './SaveJobButton';

interface JobDetailsModalProps {
  job: Job;
  isOpen: boolean;
  onClose: () => void;
  onApply: () => void;
}

export default function JobDetailsModal({ job, isOpen, onClose, onApply }: JobDetailsModalProps) {
  if (!isOpen) return null;

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
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-dark-800 rounded-xl max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="p-6 border-b border-gray-200 dark:border-dark-700">
          <div className="flex items-start justify-between">
            <div className="flex items-start space-x-4">
              <img
                src={job.logo}
                alt={`${job.company} logo`}
                className="w-16 h-16 rounded-lg object-cover"
              />
              <div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                  {job.title}
                </h2>
                <p className="text-lg text-indigo-600 dark:text-indigo-400">{job.company}</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-500 dark:hover:text-gray-300"
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          <div className="mt-4 flex flex-wrap gap-4">
            <div className="flex items-center text-gray-600 dark:text-gray-400">
              <MapPin className="h-5 w-5 mr-2" />
              {job.location}
            </div>
            <div className="flex items-center text-gray-600 dark:text-gray-400">
              <DollarSign className="h-5 w-5 mr-2" />
              {job.salary}
            </div>
            <div className="flex items-center text-gray-600 dark:text-gray-400">
              <Clock className="h-5 w-5 mr-2" />
              {job.posted}
            </div>
            <div className="flex items-center text-gray-600 dark:text-gray-400">
              <Users className="h-5 w-5 mr-2" />
              {job.applicants} applicants
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              Job Description
            </h3>
            <p className="text-gray-600 dark:text-gray-300 whitespace-pre-line">
              {job.description}
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              Requirements
            </h3>
            <ul className="list-disc list-inside space-y-2 text-gray-600 dark:text-gray-300">
              {job.requirements.map((req, index) => (
                <li key={index}>{req}</li>
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

        {/* Footer */}
        <div className="p-6 border-t border-gray-200 dark:border-dark-700 bg-gray-50 dark:bg-dark-700">
          <div className="flex justify-between items-center">
            <div className="flex space-x-4">
              <button
                onClick={onApply}
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
    </div>
  );
}