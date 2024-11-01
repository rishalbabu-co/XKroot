import { MapPin, Clock, DollarSign, Briefcase } from 'lucide-react';
import type { Job } from '../types';

interface JobCardProps {
  job: Job;
}

export default function JobCard({ job }: JobCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-200">
      <div className="flex items-start justify-between">
        <div className="flex items-start space-x-4">
          <img
            src={job.logo}
            alt={`${job.company} logo`}
            className="w-12 h-12 rounded-md object-cover"
          />
          <div>
            <h3 className="text-lg font-semibold text-gray-900">{job.title}</h3>
            <p className="text-gray-600">{job.company}</p>
          </div>
        </div>
        <span className={`px-3 py-1 rounded-full text-sm ${
          job.type === 'Full-time' ? 'bg-green-100 text-green-800' :
          job.type === 'Part-time' ? 'bg-blue-100 text-blue-800' :
          job.type === 'Contract' ? 'bg-orange-100 text-orange-800' :
          'bg-purple-100 text-purple-800'
        }`}>
          {job.type}
        </span>
      </div>

      <div className="mt-4 flex flex-wrap gap-4 text-sm text-gray-600">
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
      </div>

      <p className="mt-4 text-gray-600 line-clamp-2">{job.description}</p>

      <div className="mt-4 flex flex-wrap gap-2">
        {job.requirements.slice(0, 3).map((req, index) => (
          <span
            key={index}
            className="px-2 py-1 bg-gray-100 text-gray-600 rounded-md text-sm"
          >
            {req}
          </span>
        ))}
        {job.requirements.length > 3 && (
          <span className="px-2 py-1 text-gray-500 text-sm">
            +{job.requirements.length - 3} more
          </span>
        )}
      </div>

      <div className="mt-6 flex justify-between items-center">
        <button className="bg-indigo-600 text-white px-6 py-2 rounded-md hover:bg-indigo-700 transition-colors duration-200">
          Apply Now
        </button>
        <button className="text-gray-500 hover:text-gray-700">
          Save Job
        </button>
      </div>
    </div>
  );
}